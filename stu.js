(function($){
    function displaySpeed(speed) {
        var value = 100 - speed;
        return value > 0 ? value : 1;
    }

    $(document).ready(function(){
        var $form = $('.gol-controller');
        var startSpeed = 50;
        var $speed = $form.find('input.speed').val(startSpeed);
        var $currentspeed = $form.find('.current-speed');
        var $width = $form.find('input.width');



        var config = {
            element: document.getElementById('GOL'),
            width: 89,
            height: 58,
            cellWidth: 10,
            cellHeight: 10,
            speed: $speed.val()
        };
        var gol = new GameOfLife(config);


        var pattern = gol.patterns.captivequeen;
        var x = parseInt((gol.cols / 2) - pattern[0].length / 2, 10);
        var y = parseInt((gol.rows / 2) - pattern.length / 2, 10);

        gol.place([x,y], pattern);
        gol.updateBoard();

        //gol.cornerCrawlers();
        gol.start();
        window.setInterval(function(){gol.cornerCrawlers();}, 3000);
        console.log($speed.val())
        $currentspeed.text(displaySpeed($speed.val()));


        $speed.on('change', function(){
            var speed = $(this).val();
            gol.speed = speed;
            gol.start();
            $currentspeed.text(displaySpeed(speed));
            console.log(gol.speed);
        });


    });



    


    console.log('iris');

    
})(jQuery);







