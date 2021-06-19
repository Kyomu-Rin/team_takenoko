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


class HowToPlayView(TemplateView):
    template_name = 'how_to_play.html'


class RankingView(TemplateView):
    template_name = 'ranking.html'


class ResultView(TemplateView):
    template_name = 'result.html'