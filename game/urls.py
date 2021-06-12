from django.urls import path
from .views import IndexView, EntryView, GameView

urlpatterns = [
    path('', IndexView.as_view()),
    path('entry/', EntryView.as_view()),
    path('game/', GameView.as_view()),
]
