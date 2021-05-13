---
title: home
tab_order: -1
on_main_navigation: true
---
hello everyone my name is cat and i like beans *holds up spork*

i like:
* watching dumb movies and writing reviews about them
* making websites
* purple
* <a href="/chillies/">chillies (growing and eating)</a>
* <a href="/jackie/">jackie chan</a>
* fighting games
* bass guitar
* making games

<div style="text-align: center; margin-bottom: 30px;">
  <img src="/assets/images/roseblue.gif">
  <img src="/assets/images/Chilli.gif">
  <img src="/assets/images/baked_beans.gif" width="75">
  <img src="/assets/images/keroppi.gif">
  <img src="/assets/images/scotland.gif">
</div>

## Recent posts

{% comment %}
  set all_posts to an empty array, then we fill all_posts with any post with date in it
{% endcomment %}

{% assign all_posts = '' | split: '' %}

{% for col in site.collections %}
  {% for post in site[col.label] %}
    {% if post.date %}
      {% assign all_posts = all_posts | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}

{% assign all_posts = all_posts | sort: "date" | reverse %}

{% for post in all_posts limit:10 %}

{% assign title = post.name %}
{% if post.score %}
  {% assign title = title | append: " - " | append: post.score | append: "/10" %}
{% endif %}
{% if post.year %}
  {% assign title = title | append: " (" | append: post.year | append: ")" %}
{% endif %}

<p style="margin-top: 30px; margin-bottom: 5px; font-style: italic;">{{ post.date | date_to_string: "ordinal" }} - {% include section.html section=post.section %}</p>
### {{ title }}
{{ post.content }}

{% endfor %}
