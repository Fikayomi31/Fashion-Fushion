from django.shortcuts import render

from django.db import models
from store.models import CartOrder, Cart, Notification, Product, Wishlist
from store.serializers import CartOrderSerializer, NotificationSerializer, WishlistSerializer, SummarySerializer, ProductSerializer
from django.db.models.functions import ExtractMonth

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from userauth.models import User
from .models import Vendor

class DashboardAPIView(generics.ListAPIView):
    serializer_class = SummarySerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)

        # Calculate the summary values
        product_count = Product.objects.filter(vendor=vendor).count()
        order_count = CartOrder.objects.filter(vendor=vendor, payment_status='paid').count()
        revenue = CartOrder.objects.filter(vendor=vendor, payment_status='paid').aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0

        return [{
            'products': product_count,
            'orders': order_count,
            'revenue': revenue
        }]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

@api_view(("GET",))
def MonthlyOrderCharAPIView(request, vendor_id):
    vendor = Vendor.objects.get(user__id=vendor_id)
    orders = CartOrder.objects.filter(vendor=vendor, payment_status='paid')
    orders_by_month = orders.annotate(month=ExtractMonth('date')).values('month').annotate(count=models.Count('id')).order_by('month')
    return Response(orders_by_month)

@api_view(("GET",))
def MonthlyProductCharAPIView(request, vendor_id):
    vendor = Vendor.objects.get(user__id=vendor_id)
    products = Product.objects.filter(vendor=vendor)
    products_by_month = products.annotate(month=ExtractMonth('date')).values('month').annotate(count=models.Count('id')).order_by('month')
    return Response(products_by_month)

class ProductAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        products = Product.objects.filter(vendor=vendor).order_by('-date')
        return products


class OrderAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        orders = CartOrder.objects.filter(vendor=vendor, payment_status='paid').order_by('-id')
        return orders   
    
class OrderDetailAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        order_oid = self.kwargs['order_oid']
        vendor = Vendor.objects.get(user__id=vendor_id)
        order = CartOrder.objects.filter(vendor=vendor, oid=order_oid)
        return order    


class RevenueAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)

        # Calculate the revenue value
        revenue = CartOrder.objects.filter(vendor=vendor, payment_status='paid').aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0

        return [{
            'revenue': revenue
        }]
