from django.shortcuts import render

from django.db import models
from store.models import CartOrder, Cart, Notification, Product, Wishlist, Review, Coupon
from store.serializers import CartOrderSerializer, NotificationSerializer, NotificationSummarySerializer, WishlistSerializer, SummarySerializer, VendorSerializer, ProductSerializer, EarningSerializer, ReviewSerializer, CouponSerializer, CouponSummarySerializer
from django.db.models.functions import ExtractMonth

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from userauth.models import User, Profile
from userauth.serializers import ProfileSerializer
from .models import Vendor

from rest_framework.decorators import api_view

from datetime import datetime, timedelta      
      

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

class FilterProductAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)

        filter = self.request.GET.get('filter')

        if filter == 'published':
            products = Product.objects.filter(vendor=vendor, status='published')
        elif filter == 'in_review':
            products = Product.objects.filter(vendor=vendor, status='in_review')
        elif filter == 'draft':
            products = Product.objects.filter(vendor=vendor, status='draft')
        elif filter == 'disabled':
            products = Product.objects.filter(vendor=vendor, status='disabled') 
        else:
            products = Product.objects.filter(vendor=vendor)    
        return products

class EarningAPIView(generics.ListAPIView):
    serializer_class = EarningSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)

        one_month_age = datetime.today() - timedelta(days=30)
        monthly_revenue = CartOrder.objects.filter(vendor=vendor, payment_status='paid', date__gte=one_month_age).aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0
        total_revenue = CartOrder.objects.filter(vendor=vendor, payment_status='paid').aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0   
        
        return [{   
            'monthly_revenue': monthly_revenue,
            'total_revenue': total_revenue
        }]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(["GET"])
def MonthlyEarningTracker(request, vendor_id):
    vendor = Vendor.objects.get(user__id=vendor_id)
    monthly_earning_tracker = (
        CartOrder.objects
        .filter(vendor=vendor, payment_status='paid')
        .annotate(month=ExtractMonth('date'))
        .values('month')
        .annotate(
            total_sales=models.Sum(models.F('sub_total') + models.F('shipping_amount')),
            total_orders=models.Count('id')
        )
        .order_by('month')
    )
    return Response(monthly_earning_tracker)


class ReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        review = Review.objects.filter(product__vendor=vendor)
        return review
    

class ReviewDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny, )
    lookup_field = 'id'             
    lookup_url_kwarg = 'review_id'   

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        review_id = self.kwargs['review_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        review = Review.objects.filter(product__vendor=vendor, id=review_id)
        return review
    
class CouponListAPIView(generics.ListAPIView):
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        coupon = Coupon.objects.filter(vendor=vendor)
        return coupon

from rest_framework.exceptions import NotFound

class CouponCreateAPIView(generics.CreateAPIView):
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()
    permission_classes = (AllowAny, )

    def create(self, request, *args, **kwargs):
        payload = request.data
        vendor_id = payload['vendor_id']

        try:
            vendor = Vendor.objects.get(user__id=vendor_id)
        except Vendor.DoesNotExist:
            raise NotFound(detail="Vendor not found for this user.")

        coupon = Coupon.objects.create(
            vendor=vendor,
            discount=payload['discount'],
            code=payload['code'],
            active=(str(payload['active']).lower() == 'true')
        )
        return Response({'message': 'Coupon created successfully'}, status=status.HTTP_201_CREATED)



class CouponDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CouponSerializer
    permission_classes = (AllowAny, )
    lookup_field = 'id'

    lookup_url_kwarg = 'coupon_id'

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        return Coupon.objects.filter(vendor=vendor)

class CouponStatsAPIView(generics.ListAPIView):
    serializer_class = CouponSummarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        
        total_coupons = Coupon.objects.filter(vendor=vendor).count()
        active_coupons = Coupon.objects.filter(vendor=vendor, active=True).count()


        return [{
            'total_coupons': total_coupons,
            'active_coupons': active_coupons
        }]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class NotificationAPIView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        notifications = Notification.objects.filter(vendor=vendor, seen=True).order_by('-id')
        return notifications


    

class NotificationSummaryAPIView(generics.ListAPIView):
    serializer_class = NotificationSummarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(user__id=vendor_id)
        

        unseen_notifications = Notification.objects.filter(vendor=vendor, seen=False).count()
        read_notifications = Notification.objects.filter(vendor=vendor, seen=True).count()        
        all_notifications = Notification.objects.filter(vendor=vendor).count()

        return [{
            'unseen_notifications': unseen_notifications,
            'read_notifications': read_notifications,           
            'all_notifications': all_notifications
        }]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class NotificationVendorMarkAsSeenAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = (AllowAny, )

    def get_object(self):
        vendor_id = self.kwargs.get('vendor_id')
        notification_id = self.kwargs.get('notification_id')

        try:
            vendor = Vendor.objects.get(user__id=vendor_id)  # ✅ match your earlier logic
        except Vendor.DoesNotExist:
            raise NotFound(detail="Vendor not found.")

        try:
            notification = Notification.objects.get(vendor=vendor, id=notification_id)
        except Notification.DoesNotExist:
            raise NotFound(detail="Notification not found.")

        notification.seen = True   # ✅ correct assignment
        notification.save()

        return notification

    

class VendorProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny, )

class ShopUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = (AllowAny, )
    lookup_field = 'pk'

    def get_object(self):
        # interpret pk from URL as a user id
        user_id = self.kwargs.get('pk')
        return Vendor.objects.get(user__id=user_id)
    
class ShopAPIView(generics.RetrieveAPIView):
    
    serializer_class = VendorSerializer
    permission_classes = (AllowAny, )

    def get_object(self):
        vendor_slug = self.kwargs['vendor_slug']
        vendor = Vendor.objects.get(slug=vendor_slug)
        return vendor
    

class ShopProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        vendor_slug = self.kwargs['vendor_slug']
        vendor = Vendor.objects.get(slug=vendor_slug)
        products = Product.objects.filter(vendor=vendor, status='published').order_by('-date')
        return products

