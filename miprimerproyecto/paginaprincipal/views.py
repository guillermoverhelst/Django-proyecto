from django.shortcuts import render

# Create your views here.

def paginaprincipal(request):
    return render(request,"paginaprincipal/paginaprincipal.html",None)