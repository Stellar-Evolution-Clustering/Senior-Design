# Create your views here.

# from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from binarystars.models import BinaryStars, Attribute, InterpolatedBinaryStars, ClusterQueue
from binarystars.serializers import BinaryStarsSerializer, AttributeSerializer, InterpolatedBinaryStarsSerializer, ClusterQueueSerializer
from rest_framework.decorators import api_view
from binarystars.cluster.interpolation import interpolate_all

import binarystars.cluster.cluster as cluster
import enum
import threading


class ClusterRequestBody(enum.Enum):
    N_CLUSTERS = 'n_clusters'
    N_SAMPLES = 'n_samples'
    EPS = 'eps'
    STANDARDIZER = 'standardizer'
    CLUSTER_TYPE = 'cluster_type'
    ATTRIBUTES = 'attributes'
    TIME_STEPS = 'time_steps'
    START_TS = 'starting_time_step'


@api_view(['GET', 'POST', 'DELETE'])
def binarystars_list(request):
    if request.method == 'GET':
        binarystars = BinaryStars.objects.all()[:10]

        binarystar_serializer = BinaryStarsSerializer(binarystars, many=True)
        return JsonResponse(binarystar_serializer.data, safe=False)
    elif request.method == 'POST':
        binarystars_data = JSONParser().parse(request)
        binarystars_serializer = BinaryStarsSerializer(data=binarystars_data)
        if binarystars_serializer.is_valid():
            binarystars_serializer.save()
            return JsonResponse(binarystars_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(binarystars_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def binarystars_detail(request, pk):
    binarystar = InterpolatedBinaryStars.objects.get(pk=pk)

    if request.method == 'GET':
        binarystar_serializer = InterpolatedBinaryStarsSerializer(binarystar)
        return JsonResponse(binarystar_serializer.data, safe=False)


@api_view(['GET'])
def binarystars_attributes(request):
    att = Attribute.objects.all().exclude(enabled=False)
    att_serializer = AttributeSerializer(list(att), many=True)
    if request.method == 'GET':
        return JsonResponse(att_serializer.data, safe=False)


@api_view(['POST'])
def binarystars_cluster(request):
    if request.method == 'POST':
        body = JSONParser().parse(request)
        clust = None
        if body[ClusterRequestBody.CLUSTER_TYPE.value] == 'kmeans':
            try:
                # Using Kmeans, don't need to worry about n_samples or eps
                clust = cluster.get_stars(n_clusters=body[ClusterRequestBody.N_CLUSTERS.value],
                                          attributes=body[ClusterRequestBody.ATTRIBUTES.value],
                                          standardizer=body[ClusterRequestBody.STANDARDIZER.value],
                                          cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value],
                                          time_steps=body[ClusterRequestBody.TIME_STEPS.value],
                                          start_ts=body[ClusterRequestBody.START_TS.value])
            except:  # improper information provided to request...
                return JsonResponse({"msg": "BAD REQUEST"}, status=status.HTTP_400_BAD_REQUEST)
        elif body[ClusterRequestBody.CLUSTER_TYPE.value] == 'dbscan':
            try:
                # since it is dbscan, ignore n_clusters
                clust = cluster.get_stars(n_samples=body[ClusterRequestBody.N_SAMPLES.value],
                                          eps=body[ClusterRequestBody.EPS.value],
                                          attributes=body[ClusterRequestBody.ATTRIBUTES.value],
                                          standardizer=body[ClusterRequestBody.STANDARDIZER.value],
                                          cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value],
                                          time_steps=body[ClusterRequestBody.TIME_STEPS.value],
                                          start_ts=body[ClusterRequestBody.START_TS.value])
            except:  # improper information provided to request...
                return JsonResponse({"msg": "BAD REQUEST"}, status=status.HTTP_400_BAD_REQUEST)
        else:  # didn't provide cluster method, raise error
            return JsonResponse({"msg": "clustering method was not provided"}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(clust, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def interpolate_data(request):
    # I'm thinking in the future this can be a POST request that takes a DB name
    # This will take a very long time
    if request.method == 'GET':
        if InterpolatedBinaryStars.objects.get(pk=1):
            return JsonResponse("stars have already been interpolated for this database", status=status.HTTP_200_OK, safe=False)
        else:
            interpolate_all()
            return JsonResponse("stars successfully interpolated", status=status.HTTP_200_OK, safe=False)


@api_view(['POST', 'GET'])
def queue_cluster(request):
    if request.method == 'GET':
        queue = ClusterQueue.objects.values(
            "id", "finished", "query", "date_added", "error").order_by("date_added").reverse()
        return JsonResponse(list(queue), status=status.HTTP_200_OK, safe=False)

    body = JSONParser().parse(request)
    response = ClusterQueue.objects.create(
        query=body, finished=False, response=[])

    t = threading.Thread(target=process_stars_background,
                         args=[response.id, body])
    t.setDaemon(True)
    t.start()

    return JsonResponse(ClusterQueueSerializer(response).data, status=status.HTTP_201_CREATED)


def queue_get_cluster(request, uid):
    queueItem = ClusterQueue.objects.filter(id=uid).first()
    return JsonResponse(queueItem.response, status=status.HTTP_200_OK, safe=False)

# background version


def process_stars_background(id, body):
    clust = None
    if body[ClusterRequestBody.CLUSTER_TYPE.value] == 'kmeans':
        try:
            # Using Kmeans, don't need to worry about n_samples or eps
            clust = cluster.get_stars(n_clusters=body[ClusterRequestBody.N_CLUSTERS.value],
                                      attributes=body[ClusterRequestBody.ATTRIBUTES.value],
                                      standardizer=body[ClusterRequestBody.STANDARDIZER.value],
                                      cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value],
                                      time_steps=body[ClusterRequestBody.TIME_STEPS.value],
                                      start_ts=body[ClusterRequestBody.START_TS.value])
        except:  # improper information provided to request...
            ClusterQueue.objects.filter(id=id).update(error=True)
            return
    elif body[ClusterRequestBody.CLUSTER_TYPE.value] == 'dbscan':
        try:
            # since it is dbscan, ignore n_clusters
            clust = cluster.get_stars(n_samples=body[ClusterRequestBody.N_SAMPLES.value],
                                      eps=body[ClusterRequestBody.EPS.value],
                                      attributes=body[ClusterRequestBody.ATTRIBUTES.value],
                                      standardizer=body[ClusterRequestBody.STANDARDIZER.value],
                                      cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value],
                                      time_steps=body[ClusterRequestBody.TIME_STEPS.value],
                                      start_ts=body[ClusterRequestBody.START_TS.value])
        except:  # improper information provided to request...
            ClusterQueue.objects.filter(id=id).update(error=True)
            return
    ClusterQueue.objects.filter(id=id).update(response=clust, finished=True)
