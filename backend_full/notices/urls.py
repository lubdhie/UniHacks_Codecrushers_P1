from django.urls import path
from .views import NoticeCreateView, NoticeListView, LatestNoticeView

urlpatterns = [
    path("", NoticeListView.as_view()),          
    path("create/", NoticeCreateView.as_view()),  
    path("latest/", LatestNoticeView.as_view()),  
]
