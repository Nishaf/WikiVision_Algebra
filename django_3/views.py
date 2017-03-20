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
            import re


            # eq = '2*x + x**2+1'
            lin_eq = lin_eq.replace(' ', '')
            lin_eq = lin_eq.replace('^', '**')

            lin_eq = re.sub(r'([0-9]*)([a-zA-Z])', r'\1*\2', lin_eq)
            lin_eq = lin_eq.replace('+*', '+')
            lin_eq = lin_eq.replace('-*', '-')
            lin_eq = lin_eq.replace('/*', '/')
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
            lin_eq = re.sub(r'([0-9]*)([a-zA-Z])', r'\1*\2', lin_eq)
            lin_eq = lin_eq.replace('+*', '+')
            lin_eq = lin_eq.replace('-*', '-')
            lin_eq = lin_eq.replace('/*', '/')
            x = symbols('x')
            integral = integrate(lin_eq, x)
            return render(request, 'integral.html', {'eq': lin_eq, 'integral': integral})


class GraphPlot(View):
    def post(self, request):
        minrange = int(request.POST['minrange'])
        maxrange = int(request.POST['maxrange'])
        ran = range(minrange,maxrange)
        import re
        a =1
        x = np.array(ran)
        eq = request.POST['lin_eq']
        eq = eq.replace(' ', '')
        eq = eq.replace('^', '**')
        eq = re.sub(r'([0-9]*)([a-zA-Z])', r'\1*\2', eq)
        eq = eq.replace('+*', '+')
        eq = eq.replace('-*', '-')
        eq = eq.replace('/*', '/')
        y = eval(eq)
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





