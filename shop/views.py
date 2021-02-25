from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from shop.models import Subscribers


class IndexView(View):
    def get(self, request):
        cards_content = [
            {
                'img': '/static/shop/img/tabs/vegy.jpg',
                'alt': 'vegy',
                'title': 'Меню "Фитнес"',
                'description': 'Меню "Фитнес" - это новый подход к приготовлению блюд:'
                               ' больше свежих овощей и фруктов. Продукт активных и здоровых людей. '
                               'Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                'price': '229',
            },
            {
                'img': '/static/shop/img/tabs/elite.jpg',
                'alt': 'elite',
                'title': 'Меню “Премиум”',
                'description': 'В меню “Премиум” мы используем не только красивый дизайн упаковки, '
                               'но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - '
                               'ресторанное меню без похода в ресторан!',
                'price': '550',
            },
            {
                'img': '/static/shop/img/tabs/post.jpg',
                'alt': 'post',
                'title': 'Меню "Постное"',
                'description': 'Меню “Постное” - это тщательный подбор ингредиентов: '
                               'полное отсутствие продуктов животного происхождения, молоко из миндаля, '
                               'овса, кокоса или гречки, правильное количество белков за счет тофу и импортных '
                               'вегетарианских стейков.',
                'price': '430',
            },
        ]
        if request.is_ajax():
            return JsonResponse({'cards': cards_content}, status=200)

        return render(request, 'shop/index.html')

    def post(self, request):
        if request.is_ajax():
            name = request.POST.get('name')
            phone = request.POST.get('phone')
            Subscribers.objects.create(name=name, phone=phone)
            all_db = Subscribers.objects.all()
            print(all_db)
            return JsonResponse(request.POST, status=200)
        return render(request, 'shop/index.html')
