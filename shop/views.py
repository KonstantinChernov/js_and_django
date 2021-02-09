from django.shortcuts import render
from django.views import View
from django.http import JsonResponse


class IndexView(View):
    def get(self, request):
        return render(request, 'shop/index.html')

    def post(self, request):

        if request.is_ajax():
            print(request.POST.get('name'))

            return JsonResponse(request.POST, status=200)
        return render(request, 'shop/index.html')
