function golStart() {
    gol.start();
    $('#startstop').html('Stop');
    $('#startstop').toggleClass('btn-success btn-danger');
}
function golStop() {
    gol.stop();
    if (typeof golInterval === 'number') {
        window.clearInterval(golInterval);
    }
    $('#startstop').html('Start');
    $('#startstop').toggleClass('btn-success btn-danger');
}
function golStep() {
    if ($('#startstop').html() === 'Stop') {
        golStop();
    }
    gol.step();
}
function golCrawlers() {
	if (typeof golInterval === 'number') {
		window.clearInterval(golInterval);
	}
	$('.corners input:checked').each(function(){
        gol.cornerCrawlers($(this).attr('id'));
    });
	if ($('#auto').is(':checked')) {
		golInterval = window.setInterval(function(){
			$('.corners input:checked').each(function(){
	        	gol.cornerCrawlers($(this).attr('id'));
	    	});
		}, 4000);
	}
}

var config;
var golInterval;
var gol;
	
$(document).ready(function() {
	config = {
	    width: $('#width').val(),
	    height: $('#height').val(),
	    element: document.getElementById('GOL_Board'),
	    speed: $('#speed').val(),
	    cellWidth: 12,
	    cellHeight: 12
	};
	gol = new GameOfLife(config);

    gol.start();
	
	$('#auto').click();
	golCrawlers();

    $('#startstop').click(function(event){
        if ($(this).html() === 'Start') {
            golStart();
        }
        else {
            golStop();
        }
    });
    $('#step').click(function(){
        golStep();
    });
    $('#clear').click(function(){
        if ($('#startstop').html() === 'Stop') {
            golStop()
        }
        gol.clear();
    });
    $('#crawlers').on('click', function(event){
        event.preventDefault();
        golCrawlers();
    });
    
    $('#queenbee').on('click', function(event){
        event.preventDefault();
        var pattern = gol.patterns.queenbee;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    });
    
    $('#captivequeen').on('click', function(event){
        event.preventDefault();
        var pattern = gol.patterns.captivequeen;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    });
    
    $('#crab').on('click', function(event){
        event.preventDefault();
        var pattern = gol.patterns.crab;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    });
    
    $('#pentadecathlon').on('click', function(event){
        event.preventDefault();
        var pattern = gol.patterns.pentadecathlon;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    });
    
    $('#toad').on('click', function(event){
        event.preventDefault();
        var pattern = gol.patterns.toad;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);
        
        gol.place([x,y], pattern);
        gol.updateBoard();
    });



    $('#speed').on('change', function(){
        gol.speed = parseInt($(this).val(), 10);
        gol.start();
    });
    $('#resize').click(function(event){
    	event.preventDefault();
        golStop();
        gol.clear();
        gol = new GameOfLife({
            width: $('#width').val(),
            height: $('#height').val(),
            element: document.getElementById('GOL_Board'),
            speed: $('#speed').val(),
            cellWidth: 12,
	    cellHeight: 12
        });
        gol.cornerCrawlers();
    });
    
    $('#startstop').click();
});
