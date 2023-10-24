# Django Rest Framework

## Get started
1. Create python project with venv
Maybe delete main.py created by default (PyCharm)

2. pip install django

````
pip install django
````

3. start project
This will create django configurations

````
django-admin startproject django_project .
````

4. Install djangorestframework

```
pip install djangorestframework
```

5. Install restframework in project
django_project/settings.py

```
INSTALLED_APPS = [
	...
	'rest_framework'
	...
]
```

6. Init application project
This will create applications files


```
python manage.py startapp django_app
```

7. Install application project in project
django_project/settings.py

```
INSTALLED_APPS = [
	...
	'rest_framework'
	'django_app'
	...
]
```

8. Start server

```
python manage.py runserver
```

## Config CORS
https://pypi.org/project/django-cors-headers/


```
pip install django-cors-headers
```

django_project/settings.py

```
INSTALLED_APPS = [
	...
	'corsheaders'
	'rest_framework'
	'django_app'
	...
]
```

django_project/settings.py

```
MIDDLEWARE = [
    ...,
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...,
]
```

django_project/settings.py
**At the end**

```
# CORS Configuration

# CORS_ALLOW_ALL_ORIGINS: True
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_METHODS = (
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
)

CORS_ALLOW_HEADERS = (
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)
```

------------------------------------------------------------------------------------------------------------------------

# Database settings

```
# Databases
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
    	'ENGINE': 'django.db.backends.postgresql',
    	'NAME': 'db_name',
			'HOST': 'localhost',
			'USER': 'postgres',
			'PASSWORD': 'secret',   
    }
}
```

------------------------------------------------------------------------------------------------------------------------

# Models
django_app/models.py

```
from django.db import models
from django_app.models import Person


class Person(models.Model):
	# resolve objects
	objects = models.Manager() # has default CRUD
	
	# attributes
    name: models.CharField(blank=False)
    email: models.CharField(max_length=200)
    nickname: models.CharField(blank=True)
    active: models.BooleanField(default=True)

    def __str__(self):
        return {"name": self.name}

```

## Create migrations configuration

```
python manage.py makemigrations django_app
```

## Execute migrations

```
python manage.py migrate django_app
```

# Serializer
django_app/serializer.py

```
from rest_framework import serializers
from .models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        # fields = ('id', 'name', 'email', 'nickname', 'active')
        fields = '__all__'

```

# View
django_app/views.py

```
from rest_framework import viewsets

from django_app.models import Person
from django_app.serializer import PersonSerializer


# Create your views here.
class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

```

# Url
django_app/urls.py

```
from django.urls import path, include
from rest_framework import routers
from django_app import views

# API versioning
router = routers.DefaultRouter()
router.register(r'persons', views.PersonView, 'persons')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]

```

# Register in project Urls
django_project/urls.py

```
from django.contrib import admin
from django.urls import path, include
from django_app import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('persons/', include(urls)),
]
```

------------------------------------------------------------------------------------------------------------------------

# Default Django Admin Console

```
http://ip:port/admin
``` 

You can change path in django_project/urls.py

Set username and password

```
python manage.py createsuperuser
```

Add django app to admin console
django_app/admin.py

```
admin.site.register(Person)
```

------------------------------------------------------------------------------------------------------------------------
