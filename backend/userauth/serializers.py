from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from userauth.models import User, CustomerProfile, VendorProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add user details to token payload
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        token['user_type'] = user.user_type
        
        # Add vendor_id if the user is a vendor
        if user.user_type == 'Vendor' and hasattr(user, 'vendor_profile'):
            token['vendor_id'] = user.vendor_profile.id
        else:
            token['vendor_id'] = 0

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'user_type', 'password', 'password2']
        extra_kwargs = {
            'full_name': {'required': True},
            'user_type': {'default': 'Customer'}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Additional validation could be added here
        return attrs
    
    def create(self, validated_data):
        # Remove password2 since it's not part of the User model
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        
        # Create user with the remaining validated data
        user = User.objects.create(**validated_data)
        
        # Set password separately to ensure proper hashing
        user.set_password(password)
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model with limited fields for security."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'user_type']
        read_only_fields = ['id']

class CustomerProfileSerializer(serializers.ModelSerializer):
    """Serializer for Customer profiles with nested user details."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CustomerProfile
        fields = ['id', 'user', 'image', 'full_name', 'country', 'mobile', 'active', 'slug', 'date']
        read_only_fields = ['id', 'date', 'slug']

    def update(self, instance, validated_data):
        """Ensure user data is updated correctly."""
        # Update profile fields
        instance = super().update(instance, validated_data)
        
        # If full_name is updated in profile, sync it with user model
        if 'full_name' in validated_data and validated_data['full_name']:
            user = instance.user
            user.full_name = validated_data['full_name']
            user.save()
            
        return instance

class VendorProfileSerializer(serializers.ModelSerializer):
    """Serializer for Vendor profiles with nested user details."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = VendorProfile
        fields = ['id', 'user', 'image', 'full_name', 'brand', 'description', 
                 'mobile', 'active', 'slug', 'date']
        read_only_fields = ['id', 'date', 'slug']

    def update(self, instance, validated_data):
        """Ensure user data is updated correctly."""
        # Update profile fields
        instance = super().update(instance, validated_data)
        
        # If full_name is updated in profile, sync it with user model
        if 'full_name' in validated_data and validated_data['full_name']:
            user = instance.user
            user.full_name = validated_data['full_name']
            user.save()
            
        return instance
    