from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify

# Choices for user_type
USER_TYPE = (
    ('Vendor', 'Vendor'),
    ('Customer', 'Customer')
)

class User(AbstractUser):
    """Custom User model with user_type for Vendors and Customers."""
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=200, blank=True)
    otp = models.CharField(max_length=250, null=True, blank=True)
    refresh_token = models.CharField(max_length=250, null=True, blank=True)
    user_type = models.CharField(max_length=255, choices=USER_TYPE, default="Customer")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # Automatically set full_name and username if they are empty
        if not self.full_name:
            self.full_name = self.username
        if not self.username:
            self.username = self.email.split('@')[0]
        
        # Call the parent save method
        super().save(*args, **kwargs)
        
        # We'll use signals for profile creation instead of handling it here
        # to avoid duplication with the post_save signal

    @property
    def is_vendor(self):
        """Returns True if the user is a Vendor."""
        return hasattr(self, 'vendor_profile')

    @property
    def is_customer(self):
        """Returns True if the user is a Customer."""
        return hasattr(self, 'customer_profile')


class VendorProfile(models.Model):
    """Vendor profile model for store owners."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vendor_profile')
    full_name = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='vendor/images', default='vendor.jpg', blank=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    mobile = models.CharField(max_length=100, help_text='Shop Mobile Number', null=True, blank=True)
    active = models.BooleanField(default=False)
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.user.full_name or self.user.username
    
    def save(self, *args, **kwargs):
        # Ensure full_name in profile is the same as in the user model
        if not self.full_name:
            self.full_name = self.user.full_name
            
        # Generate slug if needed
        if not self.slug:
            self.slug = slugify(self.full_name)
            
        super().save(*args, **kwargs)


class CustomerProfile(models.Model):
    """Customer profile model for shoppers."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer_profile')
    image = models.ImageField(upload_to='user_folder', default='default.jpg', null=True, blank=True)
    full_name = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    mobile = models.CharField(max_length=100, help_text='Customer Mobile Number', null=True, blank=True)
    active = models.BooleanField(default=False)
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.user.full_name or self.user.username
    
    def save(self, *args, **kwargs):
        # Ensure full_name in profile is the same as in the user model
        if not self.full_name:
            self.full_name = self.user.full_name
            
        # Generate slug if needed (fixed the reference to non-existent 'name' field)
        if not self.slug:
            self.slug = slugify(self.full_name)
            
        super().save(*args, **kwargs)


# Signals to ensure profile is created for every user
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create profile when a user is created."""
    if created:
        if instance.user_type == 'Vendor':
            # Only create if it doesn't exist
            if not hasattr(instance, 'vendor_profile'):
                VendorProfile.objects.create(user=instance, full_name=instance.full_name)
        elif instance.user_type == 'Customer':
            # Only create if it doesn't exist
            if not hasattr(instance, 'customer_profile'):
                CustomerProfile.objects.create(user=instance, full_name=instance.full_name)

# Connect the signal
post_save.connect(create_user_profile, sender=User)