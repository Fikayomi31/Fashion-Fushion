from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from userauth.views import (
    MyTokenObtainPairView,
    RegisterView,
    PasswordEmailVerify,
    PasswordChangeView,
    UserProfileView
)
from store import views as store_view



urlpatterns = [
    # Authentication endpoints
    path('user/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', RegisterView.as_view(), name='register'),
    
    # Password reset flow
    path('user/password-reset/<str:email>/', PasswordEmailVerify.as_view(), name='password_reset_email'),
    path('user/password-change/', PasswordChangeView.as_view(), name='password_change'),
    
    # User profile management
    path('profile/', UserProfileView.as_view(), name='user_profile'),

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

    
    #payment
    path('stripe-checkout/<order_oid>/', store_view.StripeCheckoutView.as_view()),
    path('payment-success/<order_oid>/', store_view.PaymentSuccessView.as_view()),
    
]