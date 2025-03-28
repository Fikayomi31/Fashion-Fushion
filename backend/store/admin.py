from ctypes.wintypes import SIZE
from django.contrib import admin
from store.models import Category, SubCategory, Product, Specification, Gallery, Size, Color, Cart, CartOrder, CartOrderItem, Review, Coupon, Notification, ProductFaq, SubCategory, Wishlist
from import_export.admin import ImportExportModelAdmin


class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0

class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0

class ColorInline(admin.TabularInline):
    model = Color
    extra = 0
class SizeInline(admin.TabularInline):
    model = Size
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'sub_category', 'price', 'shipping_amount', 'stock_qty', 'in_stock', 'vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInline, SpecificationInline, ColorInline, SizeInline]

    

class CartAdmin(admin.ModelAdmin):
    list_display = ['cart_id', 'product', 'user', 'qty', 'price', 'total', 'date']
    search_fields = ['cart_id', 'product__name', 'user__username']
    list_filter = ['date', 'product']

class CartOrderAdmin(admin.ModelAdmin):
    list_display = ['oid', 'buyer', 'total', 'payment_status', 'order_status', 'date']
    search_fields = ['oid', '']
    list_editable = ['payment_status', 'order_status']

class CartOrderItemAdmin(admin.ModelAdmin):
    list_display = ['oid', 'order', 'product', 'qty', 'price', 'total']
    search_fields = ['oid', 'order__order_id', 'product__name']
    list_filter = ['order__date']

class ProductFaqAdmin(ImportExportModelAdmin):
    list_editable = [ 'active', 'answer']
    list_display = ['user', 'question', 'answer' ,'active']

class NotificationAdmin(ImportExportModelAdmin):
    list_editable = ['seen']
    list_display = ['order', 'seen', 'user', 'vendor', 'date']


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'rating', 'active', 'date']
    search_fields = ['user__username', 'product__name']
    list_filter = ['active', 'rating']

class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'vendor', 'discount']
    search_fields = ['code', 'vendor__name']

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItem, CartOrderItemAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(ProductFaq, ProductFaqAdmin)
admin.site.register(Wishlist)