---
title: chilli ranking
tab_selected: chillies
parent: chillies
---
here's my chilli ranking, consisting of all of my favorite chillies plus short reviews of each one. also check out <a href="/chillies/plants.html">our chilli plants page</a> for the plants we're currently growing or want to grow because they're not necessarily listed here and some are quite pretty!

### my favorite chillies

{% assign sorted = site.chillies | sort: 'score' | reverse %}
{% for chilli in sorted %}
<h4 style="margin: 0">{{ chilli.name }} - {{ chilli.score }}/10</h4>
Heat rating: {{ chilli.scovilles }} scovilles
{{ chilli }}
{% endfor %}
