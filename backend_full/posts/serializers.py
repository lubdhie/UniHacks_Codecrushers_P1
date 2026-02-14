from rest_framework import serializers
from .models import Post, PostLike, PostComment


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author_username",
            "title",
            "content",
            "tag",
            "privacy",
            "is_draft",
            "created_at",
            "updated_at",
            "likes_count",
            "comments_count",
        ]
        read_only_fields = [
            "id",
            "author_username",
            "created_at",
            "updated_at",
            "likes_count",
            "comments_count",
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()


class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = PostComment
        fields = ["id", "user_username", "content", "created_at"]
        read_only_fields = ["id", "user_username", "created_at"]
