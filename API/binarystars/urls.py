from django.conf.urls import url 
from binarystars import views 
 
urlpatterns = [ 
    url(r'^api/binarystars$', views.binarystars_list)
]