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
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    
    # Password reset flow
    path('password-reset-email/<str:email>/', PasswordEmailVerify.as_view(), name='password_reset_email'),
    path('password-change/', PasswordChangeView.as_view(), name='password_change'),
    
    # User profile management
    path('profile/', UserProfileView.as_view(), name='user_profile'),

    # Store Endpoint
    path('category', store_view.CategoryListAPIView.as_view()),
    path('products', store_view.ProductListAPIView.as_view()),
     path('products/<slug>/', store_view.ProductDetailAPIView.as_view()),

]