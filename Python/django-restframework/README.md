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

