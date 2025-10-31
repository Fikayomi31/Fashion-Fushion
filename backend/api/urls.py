from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from userauth.views import (
    MyTokenObtainPairView,
    RegisterView,
    PasswordEmailVerify,
    PasswordChangeView,
    ProfileView
)
from store import views as store_view
from customer import views as customer_view
from vendor import views as vendor_view



urlpatterns = [
    # Authentication endpoints
    path('user/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', RegisterView.as_view(), name='register'),
    
    # Password reset flow
    path('user/password-reset/<str:email>/', PasswordEmailVerify.as_view(), name='password_reset_email'),
    path('user/password-change/', PasswordChangeView.as_view(), name='password_change'),
    
    # User profile management
    path('user/profile/<user_id>/', ProfileView.as_view()),

    # Store Endpoint
    path('category/', store_view.CategoryListAPIView.as_view()),
    path('sub-category/', store_view.SubCategoryListAPIView.as_view()),
    path('products/', store_view.ProductListAPIView.as_view()),
    path('product/<slug>/', store_view.ProductDetailAPIView.as_view()),
    path('cart-view/', store_view.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_view.CartListView.as_view()),
    path('cart-list/<str:cart_id>/', store_view.CartListView.as_view()),
    path('cart-detail/<str:cart_id>/', store_view.CartDetailView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/', store_view.CartDeleteAPIView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/', store_view.CartDeleteAPIView.as_view()),
    path('create-order/', store_view.CreateOrderAPIView.as_view()),
    path('checkout/<order_oid>/', store_view.CheckoutView.as_view()),
    path('coupon/', store_view.CouponAPIView.as_view()),
    path('reviews/<product_id>/', store_view.ReviewListAPIView.as_view()),
    path('search/', store_view.SearchProductAPIView.as_view()),

    # Customer Orders
    path('customer/orders/<user_id>/', customer_view.OrdersAPIView.as_view()),
    path('customer/orders/<user_id>/<order_oid>/', customer_view.OrdersDetailAPIView.as_view()),
    path('customer/wishlist/<user_id>/', customer_view.WishlistAPIView.as_view()),
    path('customer/notification/<user_id>/', customer_view.CustomerNotification.as_view()),
    path('customer/notification/<user_id>/<notification_id>', customer_view.MarkNotificationAsSeen.as_view()),

    # Vendor 
    path('vendor/stats/<vendor_id>/', vendor_view.DashboardAPIView.as_view()),
    path('vendor-orders-chart/<vendor_id>/', vendor_view.MonthlyOrderCharAPIView),
    path('vendor-products-chart/<vendor_id>/', vendor_view.MonthlyProductCharAPIView),
    path('vendor/products/<vendor_id>/', vendor_view.ProductAPIView.as_view()), 
    path('vendor/orders/<vendor_id>/', vendor_view.OrderAPIView.as_view()),
    path('vendor/orders/<vendor_id>/<order_oid>/', vendor_view.OrderDetailAPIView.as_view()),
    path('vendor/revenue/<vendor_id>/', vendor_view.RevenueAPIView.as_view()),
    path('vendor/filter-product/<vendor_id>/', vendor_view.FilterProductAPIView.as_view()),
    path('vendor/earnings/<vendor_id>/', vendor_view.EarningAPIView.as_view()),
    path('vendor/monthly-earning/<vendor_id>/', vendor_view.MonthlyEarningTracker),
    path('vendor/reviews/<vendor_id>/', vendor_view.ReviewListAPIView.as_view()),
    path('vendor/reviews/<vendor_id>/<review_id>/', vendor_view.ReviewDetailAPIView.as_view()),
    path('vendor/coupons/<vendor_id>/', vendor_view.CouponListAPIView.as_view()),
    path('vendor/coupons-detail/<vendor_id>/<coupon_id>/', vendor_view.CouponDetailAPIView.as_view()),
    path('vendor/coupons-stats/<vendor_id>/', vendor_view.CouponStatsAPIView.as_view()),
    path('vendor/unseen-notifications/<vendor_id>/', vendor_view.NotificationUnseenAPIView.as_view()),
    path('vendor/seen-notification/<vendor_id>/', vendor_view.NotificationSeenAPIView.as_view()),
    path('vendor/notifications-summary/<vendor_id>/', vendor_view.NotificationSummaryAPIView.as_view()),
    path('vendor/notifications-mark-seen/<vendor_id>/<notification_id>/', vendor_view.NotificationVendorMarkAsSeenAPIView.as_view()),
    path('vendor/profile-update/<int:pk>/', vendor_view.VendorProfileUpdateView.as_view()),
    path('vendor/shop-update/<int:pk>/', vendor_view.ShopUpdateView.as_view()),
    path('vendor/shop-view/<vendor_slug>/', vendor_view.ShopAPIView.as_view()),
    path('vendor/shop-products/<vendor_slug>/', vendor_view.ShopProductsAPIView.as_view()),

    #payment
    path('stripe-checkout/<order_oid>/', store_view.StripeCheckoutView.as_view()),
    path('payment-success/<order_oid>/', store_view.PaymentSuccessView.as_view()),
    
]