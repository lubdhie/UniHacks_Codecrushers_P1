import uuid
from django.db import models
from django.conf import settings


class Suggestion(models.Model):

    CATEGORY_CHOICES = (
        ("culture", "Work Culture"),
        ("leadership", "Leadership"),
        ("hiring", "Hiring"),
        ("general", "General"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    content = models.TextField()

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    is_anonymous = models.BooleanField(default=True)

    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    is_revealed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category
