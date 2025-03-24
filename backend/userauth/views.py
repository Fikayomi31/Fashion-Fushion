from django.shortcuts import render, get_object_or_404
import shortuuid
from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError

from userauth.models import User, CustomerProfile, VendorProfile
from userauth.serializers import (
    MyTokenObtainPairSerializer, 
    RegisterSerializer, 
    UserSerializer,
    CustomerProfileSerializer,
    VendorProfileSerializer
)


class MyTokenObtainPairView(TokenObtainPairView):
    """Custom token view that includes additional user information in the token."""
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """View for registering new users."""
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate token for the newly registered user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


def generate_otp():
    """Generate a 6-character unique OTP."""
    uuid_key = shortuuid.uuid()
    unique_key = uuid_key[:6]
    return unique_key


class PasswordEmailVerify(generics.RetrieveAPIView):
    """View for sending a password reset email with OTP."""
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs['email']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise NotFound("No user found with this email address.")
        
        user.otp = generate_otp()
        uidb64 = user.pk
        
        # Generate a token and include it in the reset link sent via email
        refresh = RefreshToken.for_user(user)
        reset_token = str(refresh.access_token)

        # Store the reset_token in the user model for later verification
        user.refresh_token = reset_token  # Use refresh_token field instead of reset_token
        user.save()

        # Frontend URL for password reset
        link = f"http://localhost:5173/create-password?otp={user.otp}&uidb64={uidb64}&reset_token={reset_token}"
        
        merge_data = {
            'link': link, 
            'username': user.username, 
        }
        subject = "Password Reset Request"
        text_body = render_to_string("email/password_reset.txt", merge_data)
        html_body = render_to_string("email/password_reset.html", merge_data)
        
        try:
            msg = EmailMultiAlternatives(
                subject=subject, 
                from_email=settings.FROM_EMAIL,
                to=[user.email], 
                body=text_body
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        except Exception as e:
            # Log the error but don't expose it to the user
            print(f"Email sending error: {str(e)}")
            # Still return the user but with a note that email might not have been sent
        
        return user


class PasswordChangeView(generics.CreateAPIView):
    """View for changing password using OTP."""
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        payload = request.data
        
        # Validate required fields
        required_fields = ['otp', 'uidb64', 'reset_token', 'password']
        for field in required_fields:
            if field not in payload:
                return Response(
                    {"error": f"Missing required field: {field}"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        otp = payload['otp']
        uidb64 = payload['uidb64']
        reset_token = payload['reset_token']
        password = payload['password']
        
        # Add validation for password strength if needed
        if len(password) < 8:
            return Response(
                {"error": "Password must be at least 8 characters long"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = get_object_or_404(User, id=uidb64, otp=otp)
            
            # Verify the refresh token matches
            if user.refresh_token != reset_token:
                return Response(
                    {"error": "Invalid reset token"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user.set_password(password)
            user.otp = ""  # Clear the OTP
            user.refresh_token = ""  # Clear the refresh token
            user.save()
            
            return Response(
                {"message": "Password changed successfully"}, 
                status=status.HTTP_200_OK
            )
        
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid reset information"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserProfileView(generics.RetrieveUpdateAPIView):
    """View for retrieving and updating user profile."""
    permission_classes = (IsAuthenticated,)
    
    def get_serializer_class(self):
        if self.request.user.user_type == 'Vendor':
            return VendorProfileSerializer
        return CustomerProfileSerializer
    
    def get_object(self):
        user = self.request.user
        if user.user_type == 'Vendor':
            return get_object_or_404(VendorProfile, user=user)
        return get_object_or_404(CustomerProfile, user=user)