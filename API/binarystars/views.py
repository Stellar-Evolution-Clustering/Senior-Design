from django.shortcuts import render

# Create your views here.

from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from binarystars.models import Binarystar
from binarystars.serializers import BinarystarSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def binarystars_list(request):
    if request.method == 'GET':
        binarystars = Binarystar.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            binarystars = binarystars.filter(title__icontains=title)
        
        binarystar_serializer = BinarystarSerializer(binarystars, many=True)
        return JsonResponse(binarystar_serializer.data, safe=False)
 
 