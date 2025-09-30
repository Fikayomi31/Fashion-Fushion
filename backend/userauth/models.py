from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify


class User(AbstractUser):
    username = models.CharField(max_length=500, null=True, blank=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=500, null=True, blank=True)
    phone = models.CharField(max_length=500)
    otp = models.CharField(max_length=1000, null=True, blank=True)
    reset_token  = models.CharField(max_length=1000, null=True, blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        email_username, mobile = self.email.split('@')
        if self.full_name == "" or self.full_name == None:
             self.full_name = self.email
        if self.username == "" or self.username == None:
             self.username = email_username
        super(User, self).save(*args, **kwargs)
        

class Profile(models.Model):
    """Profile model."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='images', default='default.jpg', null=True, blank=True)
    full_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(max_length=100, null=True, blank=True)
    address = models.TextField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    pid = ShortUUIDField(unique=True, length=10, max_length=15, alphabet="abcdefghjk")
    

    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.user.email)
    
    def save(self, *args, **kwargs):
        
        if self.full_name == "" or self.full_name == None:
            self.full_name = self.user.full_name
        
        super(Profile, self).save(*args, **kwargs)


# Signals to ensure profile is created for every user
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create profile when a user is created."""
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    """Save the user profile when the user is saved."""
    instance.profile.save()

# Connect the signal
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
