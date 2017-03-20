"""django_3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from .views import *
admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'models/logarithm-calculator', Logarithms.as_view(), name='log-calc'),
    url(r'models/normal-distribution', Normal_Dist.as_view(), name='norm-dist'),
    url(r'models/distance-formula', Dist_Formula.as_view(), name='distance_formula'),
    url(r'models/trig-ratios', Trig_Ratio.as_view(), name='trig-ratios'),
    url(r'models/piston-applet', Piston.as_view(), name='piston'),
    url(r'models/pulleys', Pulleys.as_view(), name='pulleys'),
    url(r'models/', Models.as_view(), name='models'),
    url(r'calculate/', Calculate.as_view()),
    url(r'graph/', GraphPlot.as_view()),
    url(r'^', BasePage.as_view(), name='basepage'),



]
