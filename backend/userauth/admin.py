from django.contrib import admin

from .models import User, VendorProfile, CustomerProfile


class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email']
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'date']
    search_fields = ['full_name', 'date']
    list_filter = ['date']

class VendorProfileAdmin(admin.ModelAdmin):
    list_display = ['brand', 'date']
    search_fields = ['brand']
    list_filter = ['date']
 
admin.site.register(User, UserAdmin)
admin.site.register(VendorProfile, VendorProfileAdmin)
admin.site.register(CustomerProfile, CustomerProfileAdmin)
 
 