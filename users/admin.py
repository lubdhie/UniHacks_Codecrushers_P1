from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {
            "fields": ("role", "bio", "profile_picture"),
        }),
    )

    readonly_fields = ("join_date",)
