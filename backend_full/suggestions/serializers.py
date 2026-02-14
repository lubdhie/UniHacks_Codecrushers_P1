from rest_framework import serializers
from .models import Suggestion


class SuggestionSerializer(serializers.ModelSerializer):
    submitted_by_username = serializers.SerializerMethodField()

    class Meta:
        model = Suggestion
        fields = [
            "id",
            "content",
            "category",
            "is_anonymous",
            "is_revealed",
            "submitted_by_username",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "is_revealed",
            "submitted_by_username",
            "created_at",
        ]

    def get_submitted_by_username(self, obj):
        if obj.is_anonymous and not obj.is_revealed:
            return "Anonymous Employee"
        return obj.submitted_by.username
