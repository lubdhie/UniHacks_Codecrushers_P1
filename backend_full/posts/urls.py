from django.urls import path
from .views import PostListCreateView, PostLikeView, PostCommentView

urlpatterns = [
    path("", PostListCreateView.as_view()),  
    path("<uuid:pk>/like/", PostLikeView.as_view()),
    path("<uuid:pk>/comment/", PostCommentView.as_view()),
]
