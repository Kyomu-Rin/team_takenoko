from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'base.html'

class EntryView(TemplateView):
    template_name = 'entry.html'

class GameView(TemplateView):
    template_name = 'game.html'
