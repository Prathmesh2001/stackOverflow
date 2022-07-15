from django.contrib import admin
from .models import *
from .models import User as myUser

# Register your models here.
admin.site.register(myUser)
admin.site.register(Question)
admin.site.register(Answers)