from itertools import product
from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import post_save

from userauth.models import User, Profile


CATEGORY_TYPE = (
    ('MEN', 'MEN'),
    ('WOMEN', 'WOMEN'),
    ('TEEN', 'TEEN'),
    ('UNISEX', 'UNISEX')
)

SUB_CATEGORY_TYPE = (
    # MEN'S CATEGORIES
    ('SHIRTS', 'Shirts'),
    ('T_SHIRTS', 'T-Shirts'),
    ('JEANS', 'Jeans'),
    ('TROUSERS', 'Trousers'),
    ('SUITS', 'Suits'),
    ('TOPS', 'Tops'),
    ('JEANS', 'Jeans'),
    ('SKIRTS', 'Skirts'),
    ('LEGGINGS', 'Leggings'),
    ('JACKETS', 'Jackets'),
    ('HOODIES', 'Hoodies'),
    ('SHORTS', 'Shorts'),
    ('JOGGERS', 'Joggers'),
    ('DRESS', 'Dress'),
)

RATING = (
    (1, '1 Star'),
    (2, '2 Star'),
    (3, '3 Star'),
    (4, '4 Star'),
    (5, '5 Star'),
)

STATUS = (
    ('Draft', 'Draft'),
    ('Disable', 'Disable'),
    ('In_Review', 'In Review'),
    ('Published', 'Published'),
)

PAYMENT_STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('failed', 'Failed'),
)

ORDER_STATUS = (
    ('Pending', 'Pending'),
    ('Shipped', 'Shipped'),
    ('Delivered', 'Delivered'),
    ('Cancelled', 'Cancelled'),
)

PAYMENT_STATUS = (
    ('Pending', 'Pending'),
    ('Processing', 'Processing'),
    ('Failed', 'Failed'),
)



class Category(models.Model):
    title = models.CharField(max_length=100, choices=CATEGORY_TYPE, default='MEN')
    image = models.FileField(upload_to='category', default='category.jpg', null=True, blank=True)
    active = models.BooleanField(default=True)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Category'
        ordering = ['title']

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Category, self).save()

class SubCategory(models.Model):
    title = models.CharField(max_length=100, choices=SUB_CATEGORY_TYPE, default="T-shirt")
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="subcategories/", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
         

class Product(models.Model):
    title = models.CharField(max_length=100)

    image = models.FileField(upload_to='products', default='product.jpg', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="category")
    sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="sub_category")
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    old_price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    shipping_amount = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    
    stock_qty = models.PositiveIntegerField(default=1)
    in_stock = models.BooleanField(default=True)

    status = models.CharField(max_length=100, choices=STATUS, default='Published')
    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0, null=True, blank=True)

    vendor = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="vendor")
    pid = ShortUUIDField(unique=True, length=10, alphabet='abcdefg12345')
    slug = models.SlugField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
         
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Handle slug creation
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        
        # Only calculate rating if the product is already saved
        if self.pk:
            self.rating = self.product_rating()
        
        super(Product, self).save(*args, **kwargs)
    
    def product_rating(self):
        # Only calculate rating if the product exists in the database
        if not self.pk:
            return 0
        
        product_rating = Review.objects.filter(product=self).aggregate(avg_rating=models.Avg("rating"))
        return product_rating["avg_rating"] or 0 

    def rating_count(self):
        return Review.objects.filter(product=self).count()
        
    
    def gallery(self):
        return Gallery.objects.filter(product=self)

    def specification(self):
        return Specification.objects.filter(product=self)

    def size(self):
        return Size.objects.filter(product=self)

    def color(self):
        return Color.objects.filter(product=self)

    
class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.FileField(upload_to='products', default='product.jpg')
    active = models.BooleanField(default=True)
    gid = ShortUUIDField(unique=True, length=10, alphabet='abcdefg12345')

    def __str__(self):
        return self.product.title
    

class Specification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return self.product.title
    
class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)

    def __str__(self):
        return self.name
    
class Color(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000)
    color_code = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    sub_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    shipping_amount = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    service_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    tax_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    country = models.CharField(max_length=100, null=True, blank=True)
    size = models.CharField(max_length=1000, null=True, blank=True)
    color = models.CharField(max_length=1000, null=True, blank=True)
    cart_id = models.CharField(max_length=1000, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.cart_id} - {self.product.title}'
    
class CartOrder(models.Model):
    vendor = models.ManyToManyField(VendorProfile, blank=True)
    buyer = models.ForeignKey(CustomerProfile, on_delete=models.SET_NULL, null=True, blank=True)
    
    sub_total = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    shipping_amount = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    tax_fee = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    service_fee = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    total = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)

    payment_status = models.CharField(choices=PAYMENT_STATUS, max_length=100, default='Pending')
    order_status = models.CharField(choices=ORDER_STATUS, max_length=100, default='Pending')

    #coupon
    initial_cost = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    saved = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)

    #Bio data
    full_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    mobile = models.CharField(max_length=100, null=True, blank=True)

    #Shipping Address
    address= models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)

    stripe_session_id = models.CharField(max_length=1000, null=True, blank=True)

    oid = ShortUUIDField(unique=True, length=10, alphabet='abcdefg12345')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.oid
    
    def orderitem(self):
        return CartOrderItem.objects.filter(order=self)
    
class CartOrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE)

    qty = models.CharField(default=0, max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    
    sub_total = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    shipping_amount = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    tax_fee = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    service_fee = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    total = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    country = models.CharField(max_length=100, null=True, blank=True)

    size = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)

    #coupon
    coupon = models.ManyToManyField('store.Coupon', blank=True)
    initial_cost = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    saved = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)

    oid = ShortUUIDField(unique=True, length=10, alphabet='abcdefg12345')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.oid
    
class ProductFaq(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    email = models.EmailField(null=True, blank=True)
    question = models.CharField(max_length=1000)
    answer = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question
    
    class Meta:
        verbose_name_plural = 'Product FAQs'


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review = models.TextField()
    reply = models.TextField(null=True, blank=True)
    rating = models.IntegerField(choices=RATING, default=3, null=True, blank=True)    
    active = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name_plural = 'Review & Rating'

    def profile(self):
       
        if self.user.is_vendor:
            return getattr(self.user, 'vendor_profile', None)
        elif self.user.is_customer:
            return getattr(self.user, 'customer_profile', None)
        return None


@receiver(post_save, sender=Review)
def update_product_rating(sender, instance, **kwargs):
    if instance.product:
        instance.product.save()

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name_plural = "Wishlist"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE)
    order = models.ForeignKey(CartOrder, on_delete=models.SET_NULL, null=True, blank=True)
    order_item = models.ForeignKey(CartOrderItem, on_delete=models.SET_NULL, null=True, blank=True)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.order:
            return self.order.oid
        else:
            return f"Notification - {self.pk}"
        
class Coupon(models.Model):
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE)
    user_by = models.ManyToManyField(User, blank=True)
    code = models.CharField(max_length=1000)
    discount = models.IntegerField(default=1)
    active = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code


class Tax(models.Model):
    country = models.CharField(max_length=100)
    rate = models.IntegerField(default=5, help_text="Number added here are in pecentage e.g 5%")
    active = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.country
    
    class Meta:
        verbose_name_plural = "Taxes"
        ordering = ['country']