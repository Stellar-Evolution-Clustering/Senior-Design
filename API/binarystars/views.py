# Create your views here.

# from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from binarystars.models import BinaryStars, Attribute
from binarystars.serializers import BinaryStarsSerializer, AttributeSerializer
from rest_framework.decorators import api_view
from binarystars.cluster.interpolation import interpolate_all

import binarystars.cluster.cluster as cluster
import enum
import json

class ClusterRequestBody(enum.Enum):
    N_CLUSTERS = 'n_clusters'
    N_SAMPLES = 'n_samples'
    EPS = 'eps'
    STANDARDIZER = 'standardizer'
    CLUSTER_TYPE = 'cluster_type'
    ATTRIBUTES = 'attributes'
    # Not sure if these should be here... or if they should be defined at all.
    # If they should be defined, I think we either put them in cluster.py or in a new file entirely

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
    binarystar = BinaryStars.objects.get(pk=pk)

    if request.method == 'GET':
        binarystar_serializer = BinaryStarsSerializer(binarystar)
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
                                        cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value])
            except: # improper information provided to request...
                return JsonResponse({"msg": "BAD REQUEST"}, status=status.HTTP_400_BAD_REQUEST)
        elif body[ClusterRequestBody.CLUSTER_TYPE.value] == 'dbscan':
            try:
                # since it is dbscan, ignore n_clusters
                clust = cluster.get_stars(n_samples=body[ClusterRequestBody.N_SAMPLES.value],
                                        eps=body[ClusterRequestBody.EPS.value],
                                        attributes=body[ClusterRequestBody.ATTRIBUTES.value],
                                        standardizer=body[ClusterRequestBody.STANDARDIZER.value],
                                        cluster_type=body[ClusterRequestBody.CLUSTER_TYPE.value])
            except: # improper information provided to request...
                return JsonResponse({"msg": "BAD REQUEST"}, status=status.HTTP_400_BAD_REQUEST)
        else: # didn't provide cluster method, raise error
            return JsonResponse({"msg": "clustering method was not provided"}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(clust, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
def interpolate_data(request):
    # I'm thinking in the future this can be a POST request that takes a DB name
    # This will take a very long time
    if request.method == 'GET':
        interpolate_all()
        return JsonResponse("stars successfully interpolated", status=status.HTTP_200_OK, safe=False)
