function golStart() {
    let button = document.getElementById('startstop');
    gol.start();
    button.innerHTML = "Stop";
    button.classList.add('button-start-off');
    button.classList.remove('button-start-on');
    //$('#startstop').toggleClass('btn-success btn-danger');
}
function golStop() {
    let button = document.getElementById('startstop');
    gol.stop();
    if (typeof golInterval === 'number') {
        window.clearInterval(golInterval);
    }
    button.innerHTML = "Start";
    button.classList.add('button-start-on');
    button.classList.remove('button-start-off');
    //$('#startstop').toggleClass('btn-success btn-danger');
}
function golStep() {
    if ($('#startstop').html() === 'Stop') {
        golStop();
    }
    gol.step();
}
function golCrawlers() {
	let cornersEl = document.querySelector('.corners');
    let corners = Array.from(cornersEl.getElementsByTagName('input'));
    let auto = document.getElementById('auto').checked;

    corners.forEach(function(c){
        gol.cornerCrawlers(c.id);
    });

    if (typeof golInterval === 'number') {
		window.clearInterval(golInterval);
	}
    
	if (auto) {
		golInterval = window.setInterval(function(){
            corners.forEach(function(c){
                gol.cornerCrawlers(c.id);
            });
		}, 4000);
	}
}

var config;
var golInterval;
var gol;

window.onload = function() {
    let patternsForm = document.getElementById('patterns');

    patternsForm.addEventListener("submit", function(event) {
         event.preventDefault();
    }, false);


    document.getElementById('startstop').addEventListener("click", function(event) {
        event.preventDefault();
        if (this.innerHTML === 'Start') {
            golStart();
        }
        else {
            golStop();
        }
    }, false);

    document.getElementById('speed').addEventListener('change', function(event) {
        gol.speed = parseInt(this.value, 10);
        gol.start();
    }, false);


    document.getElementById('clear').addEventListener("click", function(event) {
        if (document.getElementById('startstop').innerHTML === 'Stop') {
            golStop()
        }
        gol.clear();
    }, false);

    document.getElementById('resize').addEventListener("click", function(event) {
       event.preventDefault();
        golStop();
        gol.clear();
        gol = new GameOfLife({
            width: document.getElementById('width').value,
            height: document.getElementById('height').value,
            element: document.getElementById('GOL_Board'),
            speed: document.getElementById('speed').value,
            cellWidth: 12,
        cellHeight: 12
        });
    }, false);


    document.getElementById('queenbee').addEventListener("click", function(event) {
        var pattern = gol.patterns.queenbee;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    }, false);

    document.getElementById('captivequeen').addEventListener("click", function(event) {
        var pattern = gol.patterns.captivequeen;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    }, false);

    document.getElementById('pentadecathlon').addEventListener("click", function(event) {
        var pattern = gol.patterns.pentadecathlon;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    }, false);

    document.getElementById('crab').addEventListener("click", function(event) {
        var pattern = gol.patterns.crab;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    }, false);

    document.getElementById('toad').addEventListener("click", function(event) {
        var pattern = gol.patterns.toad;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    }, false);

    document.getElementById('crawlers').addEventListener("click", function(event) {
        golCrawlers();
    }, false);


    config = {
        width: document.getElementById('width').value,
        height: document.getElementById('height').value,
        element: document.getElementById('GOL_Board'),
        speed: document.getElementById('speed').value,
        cellWidth: 12,
        cellHeight: 12
    };
    gol = new GameOfLife(config);
    gol.start();
    golCrawlers();
};