from django.conf.urls import url
from django.urls import path
from binarystars import views

urlpatterns = [
    url(r'^api/binarystars$', views.binarystars_list),
    url(r'^api/binarystars/(?P<pk>[0-9]+)$', views.binarystars_detail),
    url(r'^api/binarystars/cluster$', views.binarystars_cluster),
    url(r'^api/binarystars/attributes$', views.binarystars_attributes),
    url(r'^api/binarystars/interpolate$', views.interpolate_data),
    url(r'api/binarystars/queue$', views.queue_cluster),
    path(r'api/binarystars/cluster/<str:uid>', views.queue_get_cluster)
]
