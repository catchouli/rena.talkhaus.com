---
title: home
tab_order: -1
on_main_navigation: true
---
<div id="about" style="float: right; width: 50%; margin-left: 20px;">
<h2>about</h2>
<script src="/assets/scripts/chillis.js"></script>

hello everyone my name is cat and i like beans *holds up spork*

i like:
<ul>
  <li>watching dumb movies and writing reviews about them</li>
  <li>making websites</li>
  <li>purple</li>
  <li><a href="/chillies/">chillies</a> (growing and eating)</li>
  <li><a href="/jackie/">jackie chan</a></li>
  <li>fighting games</li>
  <li>bass guitar</li>
  <li>making games</li>
</ul>

<div style="text-align: center; margin-bottom: 30px;">
  <img src="/assets/images/roseblue.gif">
  <img src="/assets/images/Chilli.gif" id="pagechilli" class="hoverable" onClick="startChilliGame()">
  <img src="/assets/images/baked_beans.gif" width="75">
  <img src="/assets/images/keroppi.gif" class="hoverable" onClick="startChilliGame()">
  <img src="/assets/images/scotland.gif">
</div>
</div>

## Recent posts

here's some of the recent updates to my site. i mostly write reviews but it's mixed in with other stuff, you can click the sections above each post to see more like it!

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
<h3 style="margin-top: 0">{{ title }}</h3>
{{ post.content }}

{% endfor %}
