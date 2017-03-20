from django.shortcuts import render,redirect,HttpResponse
from django.views.generic import View
from sympy import *
import numpy as np
import matplotlib.pyplot as plt
import math

class BasePage(View):
    def get(self, request):
        return render(request, 'base1.html')

class Calculate(View):
    def get(self, request):
        return render(request, 'derivative.html')
    def post(self,request):
        if 'derivative' in request.POST:
            lin_eq = request.POST['lin_eq']
            x = Symbol("x")
            print("HI")
            yprime = diff(lin_eq, x)
            context = {
                "eq": lin_eq,
                "derivative": yprime,
            }
            return render(request, 'derivative.html', context)
        elif 'integral' in request.POST:
            lin_eq = request.POST['lin_eq']
            x = symbols('x')
            integral = integrate(lin_eq, x)
            return render(request, 'integral.html', {'eq': lin_eq, 'integral': integral})


class GraphPlot(View):
    def post(self, request):
        minrange = int(request.POST['minrange'])
        maxrange = int(request.POST['maxrange'])
        ran = range(minrange,maxrange)
        x = np.array(ran)
        eq = request.POST['lin_eq']
        y = eval(eq)
        print(y)
        plt.axis([minrange, maxrange, minrange, maxrange])
        plt.plot(x, y)
        plt.savefig("test.png")
        plt.close()
        return render(request, 'graph.html')


class Models(View):
    def get(self, request):
        print("models")
        return render(request,'models.html')


class Pulleys(View):
    def get(self, request):
        return render(request, 'pulleys.html')


class Trig_Ratio(View):
    def get(self, request):
        return render(request, 'trig-ratios.html')


class Piston(View):
    def get(self, request):
        return render(request, 'piston.html')


class Dist_Formula(View):
    def get(self, request):
        return render(request, 'distance_formula.html')


class Normal_Dist(View):
    def get(self, request):
        return render(request, 'normal_dist.html')


class Logarithms(View):
    def get(self, request):
        return render(request, 'logarithm-calc.html')




