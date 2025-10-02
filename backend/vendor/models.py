from django.db import models
from django.utils.text import slugify

from userauth.models import User

class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to='vendors/', null=True, blank=True, default='vendors.jpg')
    name = models.CharField(max_length=100, help_text="Shop Name", null=True, blank=True)
    description = models.TextField(max_length=500, null=True, blank=True)
    mobile = models.CharField(max_length=15, help_text="Shop Mobile Number", null=True, blank=True)
    active = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, max_length=500, null=True, blank=True)

    class Meta:
        verbose_name = "Vendor"
        ordering = ['-date']

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.name)

        super(Vendor, self).save(*args, **kwargs)
    
