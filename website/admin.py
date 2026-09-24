from django.contrib import admin
from .models import ContactLead


@admin.register(ContactLead)
class ContactLeadAdmin(admin.ModelAdmin):
    list_display = ("name", "company", "operation_type", "email", "created_at")
    list_filter = ("operation_type", "created_at")
    search_fields = ("name", "company", "email", "message")
    readonly_fields = ("created_at",)
