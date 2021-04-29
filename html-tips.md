---
title: html tips
tab_order: 40
on_main_navigation: true
permalink: /html-tips/
---
if you want to super pimp out your websight like i have then you've come to the right place!

## html5 page template
technically you can put any old text and html tag soup into a .html file and your browser will do its best because it's that amazing, but here's how to actually structure a html file:
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>my cool websight!!</title>

  <link rel="stylesheet" href="style.css">
</head>

<body>
  <script src="js/scripts.js"></script>
</body>
</html>
```

## gifs
enhance your site with a few tasteful gifs to make it *bling*
* go to <a href="https://gifcities.org/">gifcities</a> and search for the kind of gif you're want
* (optional) click through on the gif to see the site it came from for extra inspiration
* right click and save the image, and then upload it to your website
* include it in your website with an img tag: ```<img src="myimage.gif">```
* bling!

## stylesheets
include a stylesheet on your page to add extra global styling like backgrounds and font styling, remember to put your stylesheets within the ```<head>...</head>``` tags on your page!!

upload the following as style.css:

```
/* this is a comment and won't affect the final page */
body {
  /* specify the background color and image */
  background: #659DBD;
  /* specify the text color */
  color: #FBEEC1;
  /* specify the font families (see web fonts below for open sans)*/
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}

/* center h1 and h2 headings */
h1, h2 {
  text-align: center;
}

/* make headings bigger */
h1 {
  font-size: 2em;
}

/* apply link styling */
a {
  color: #fce592;
  font-family: helvetica;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  color: #FFCB3E;
}

a:visited {
  color: #DAAD86;
}
```

and then include it in your page by putting the following html between your ```<head>...</head>``` tags:

```
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>my cool websight</h1>
  <h2>bean facts</h2>
  <p>hello and welcome to my cool page on bean facts</p>
  <ul>
    <li>beans are round</li>
    <li>beans are sometimes orange</li>
    <li>i like beans</li>
  </ul>
  <a href="#bean-facts">see more bean facts at bean-facts.africa</a>
</body>
</html>
```

alternatively you can just put an inline stylesheet right inside your ```<head>...</head>``` tags

```
<style type="text/css">
  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  body {
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }
</style>
```

note!! the ```<style>``` or ```<link>``` tags need to go within your head tags

## fonts

you can specify a font for your page using css, for example, try this:
```
body {
  font-family: "Times New Roman", Times, serif;
}
```

however, this will only work if the font is available on the pcs of everyone who views your website!

an alternative that gives us a lot more options is to use <a href="https://fonts.google.com/">google web fonts</a>:
1. go to <a href="https://fonts.google.com/">https://fonts.google.com/</a>
2. pick the font you like, for example <a href="https://fonts.google.com/specimen/New+Tegomin">New Tegomin</a>
3. on that page, click 'Select this style' next to one of the font styles
4. copy the html and css it gives you under 'use on the web' 

put the html in your ```<head>...</head>``` tags:

```
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet"> 
```

and the css in your stylesheet (putting it in the body {} tag makes it work for the whole page):

```
body {
  font-family: 'New Tegomin', serif;
}
```

and jajaan! your page looks like something out of the 90s, congrats

## tiling backgrounds

if you want a cool tiling background like mine you can use <a href="http://bg.siteorigin.com/">siteorigin's tiling background generator</a>!

1. go to <a href="http://bg.siteorigin.com/">http://bg.siteorigin.com</a>
2. mess with the color, pattern, and blend mode until you get something you like
3. click 'download background image'
4. upload the image to your site
5. set it as the background using css:
```
body {
  /* update the filename here! the slash at the front makes it work from any directory */
  background: url('/bg.png');
}
```

## more
if you want more html tips and tricks let me know by asking me questions in the talkhaus sites thread!
