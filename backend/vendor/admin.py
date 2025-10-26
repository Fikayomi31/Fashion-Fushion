from django.contrib import admin

from .models import Vendor

class VendorAdmin(admin.ModelAdmin):
    list_display = ['user', 'shop_name','active', 'date']

admin.site.register(Vendor, VendorAdmin)