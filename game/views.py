from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'base.html'

class EntryView(TemplateView):
    template_name = 'entry.html'

class GameView(TemplateView):
    template_name = 'game.html'

class TakenokoGameView(TemplateView):
    template_name = 'takenoko_game.html'

class KinokoGameView(TemplateView):
    template_name = 'kinoko_game.html'

class EndView(TemplateView):
    template_name = 'end.html'
