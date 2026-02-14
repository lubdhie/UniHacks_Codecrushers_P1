from rest_framework import serializers
from .models import Project, Decision, DecisionComment


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']


class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = '__all__'
        read_only_fields = ['project', 'decided_by', 'created_at']


class DecisionCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecisionComment
        fields = '__all__'
        read_only_fields = ['decision', 'user', 'created_at']
