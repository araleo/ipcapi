from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('ipca', include('ipca.urls')),
    path('admin/', admin.site.urls),
]
