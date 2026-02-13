from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("USER", "User"),
        ("HR", "HR"),
        ("ADMIN", "Admin"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="USER")
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)
    join_date = models.DateTimeField(auto_now_add=True)
