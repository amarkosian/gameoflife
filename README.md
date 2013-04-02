Game of Life
==========

## Description
<a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a> on a configurable grid with "corner crawlers" and other features. <a href="http://htmlpreview.github.com/?http://github.com/amarkosian/gameoflife/master/index.html">Try it out</a>.

<canvas id="GOL"></canvas> <script type="text/javascript" src="https://raw.github.com/amarkosian/gameoflife/master/GameOfLife.js"></script><script type="text/javascript">
var config = {
element: document.getElementById('GOL'),
width: 44,
height: 45
};
var gol = new GameOfLife(config);
gol.cornerCrawlers();
gol.start();
window.setInterval(function(){gol.cornerCrawlers();}, 2000);
</script>
