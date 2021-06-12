from django.urls import path
from .views import IndexView, EntryView, GameView, TakenokoGameView, KinokoGameView, EndView

urlpatterns = [
    path('', IndexView.as_view()),
    path('entry/', EntryView.as_view()),
    path('game/', GameView.as_view()),
    path('takenoko/', TakenokoGameView.as_view()),
    path('kinoko/', KinokoGameView.as_view()),
    path('whichever/', EndView.as_view()),
]
