$(document).ready(function() {
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
            golStop()
        }
        gol.step();
    }
    function golCrawlers() {
        $('.corners input:checked').each(function(){
            gol.cornerCrawlers($(this).attr('id'));
        });
    }
    function addPattern(pos, pattern) {
        
    }
    
    var config = {
        width: $('#width').val(),
        height: $('#height').val(),
        element: document.getElementById('GOL_Board'),
        speed: $('#speed').val()
    };
    var golInterval;
    
    var gol = new GameOfLife(config);
    
    $('#auto').attr('checked', 'checked');
    $('#speed').val(50);
    gol.speed = $('#speed').val();
    gol.cornerCrawlers();
    golStart();
    golInterval = window.setInterval(function(){
    	golCrawlers();
    }, 4000);

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
        if ($('#auto:checked').length) {
            golInterval = window.setInterval(function(){
                golCrawlers();
            }, 4000);
        }
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
            speed: $('#speed').val()
        });
        gol.cornerCrawlers();
    });
});
