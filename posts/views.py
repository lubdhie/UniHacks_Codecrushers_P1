from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Post, PostLike, PostComment
from .serializers import PostSerializer, CommentSerializer


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.filter(is_draft=False).order_by("-created_at")

        tag = self.request.query_params.get("tag")
        if tag:
            queryset = queryset.filter(tag=tag)

        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        like, created = PostLike.objects.get_or_create(
            post=post,
            user=request.user
        )

        if not created:
            like.delete()
            return Response({"message": "Unliked"})

        return Response({"message": "Liked"})


class PostCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs["pk"]
        post = get_object_or_404(Post, pk=post_id)
        serializer.save(user=self.request.user, post=post)
