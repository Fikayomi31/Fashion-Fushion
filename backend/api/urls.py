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

]