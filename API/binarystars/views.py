from django.shortcuts import render

# Create your views here.

from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from binarystars.models import BinaryStars
from binarystars.serializers import BinaryStarsSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def binarystars_list(request):
    if request.method == 'GET':
        binarystars = BinaryStars.objects.all()[:10]
        
        title = request.GET.get('title', None)
        if title is not None:
            binarystars = binarystars.filter(title__icontains=title)
        
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
    binarystar = BinaryStars.objects.all(pk=pk)
 
    if request.method == 'GET': 
        binarystar_serializer = BinaryStarsSerializer(binarystar) 
        return JsonResponse(binarystar_serializer.data) 
 
    
 
 