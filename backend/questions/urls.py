from django.urls import path

from . import views

urlpatterns = [
    path('register', views.UserRegisteration),
    path('login', views.UserLogin),
    path('userProfile', views.UserView),
    path('', views.getQuestions),
    path('getquestion/<int:pk>', views.get_Question),
]
