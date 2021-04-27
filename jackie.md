---
title: jackie chan
tab_order: 1
on_main_navigation: true
permalink: /jackie/
---
I'm a big fan of Jackie Chan and have watched a ton of his movies. Any movie with Jackie Chan or his co-stars Sammo Hung and Yuen Biao is pretty much gold as long as it was made before ~2000. I've written notes on them as I've watched them and given them a score out of 10, so here's my ranking chart of Jackie Chan movies.

{% assign sorted = site.jackie-movies | sort: 'score' | reverse %}
{% for movie in sorted %}
### {{ movie.name }} ({{ movie.year }}) - {{ movie.score }}/10
{{ movie }}
{% endfor %}
