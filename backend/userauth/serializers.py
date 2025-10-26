from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from userauth.models import User, Profile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # User details to token payload
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
       
        try:
            token['vendor_id'] = user.vendor_id
        except:
            token['vendor_id'] = 0

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=[('customer', 'Customer'), ('vendor', 'Vendor')], default='customer')
    shop_name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone', 'password', 'password2', 'role', 'shop_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password does not match"})
        return attrs

    def create(self, validated_data):
        role = validated_data.pop('role', 'customer')
        shop_name = validated_data.pop('shop_name', None)

        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            role=role,
        )
        user.set_password(validated_data['password'])
        user.save()

        if role == 'vendor' and shop_name:
            from vendor.models import Vendor  # Import here to avoid circular imports
            Vendor.objects.create(user=user, name=shop_name)

        return user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for Customer profiles with nested user details."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['pid', 'date']

    
    """Method to include nested user details in the serialized output."""
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
    