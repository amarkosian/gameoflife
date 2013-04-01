var GameOfLife = function(dimensions) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.cols = dimensions[0] || 50;
    this.rows = dimensions[1] || 51;
    this.state = [];
    this.speed = 50;
    this.interval;
    this.initialize();
}
GameOfLife.prototype = {
    cellWidth: 10,
    cellHeight: 10,
    cellBorder: 1,
                
    initialize: function() {
        this.canvas.width = this.cols * this.cellWidth;
        this.canvas.height = this.rows * this.cellHeight;
                    
        this.context.fillStyle = '#aaa';
        this.context.fillRect(0, 0, 1000, 1000);
                    
        for (var i = 0; i < this.cols; i++) {
            this.state[i] = [];
            for (var j = 0; j < this.rows; j++) {
                this.state[i][j] = false;
            }
        }
        this.updateBoard();
        document.body.appendChild(this.canvas);
    },
    cell: function(pos, on) {
        var x = pos[0];
        var y = pos[1];
        if (on) {
            this.context.fillStyle = 'orange';
        }
        else {
            this.context.fillStyle = '#CCC';
        }
        this.context.fillRect(x + this.cellBorder, y + this.cellBorder, this.cellWidth-this.cellBorder*2, this.cellHeight-this.cellBorder*2);
    },
    updateBoard: function () {
        var i, j, x, y, on;
        for (i = 0; i < this.cols; i++) {
            x = i * this.cellWidth;
            for (j = 0; j < this.rows; j++) {
                y = j * this.cellHeight;
                on = this.state[i][j];
                this.cell([x,y], on);
            }
        }
    }
                
};