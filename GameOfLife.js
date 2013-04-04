var GameOfLife = function(config) {
    var config = config || {};
    
    this.cols = config.width || 50;
    this.rows = config.height || 48;
    this.state = [];
    this.speed = config.speed || 10;
    this.cellWidth = config.cellWidth || 10;
    this.cellHeight = config.cellHeight || 10;
    this.cellBorder = config.cellBorder || 1;
    this.canvas = config.element;
    this.context = this.canvas.getContext('2d');
    this.interval;
    this.initialize();
}
GameOfLife.prototype = {    
    initialize: function() {
        this.canvas.width = this.cols * this.cellWidth;
        this.canvas.height = this.rows * this.cellHeight;
                    
        this.context.fillStyle = '#aaa';
        this.context.fillRect(0, 0, 1000, 1000);
        
        for (var i = 0; i < this.rows; i++) {
            this.state[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.state[i][j] = false;
            }
        }
        
        this.updateBoard();
        //document.body.appendChild(this.canvas);
    },
    fillCell: function(pos, on) {
        var x = pos[1] * this.cellWidth;
        var y = pos[0] * this.cellHeight;
        if (on) {
            this.context.fillStyle = 'orange';
        }
        else {
            this.context.fillStyle = '#CCC';
        }
        this.context.fillRect(x + this.cellBorder, y + this.cellBorder, this.cellWidth-this.cellBorder*2, this.cellHeight-this.cellBorder*2);
    },
    neighbors: function(pos) {
        var x = pos[0], y = pos[1], neighbors = [];
        var firstRow = y === 0;
        var lastRow = y === this.rows - 1;
        var firstCol = x === 0;
        var lastCol = x === this.cols - 1;
        
        if (firstRow) {
            if (firstCol) {
                neighbors.push(this.state[y][x+1]);
                neighbors.push(this.state[y+1][x]);
                neighbors.push(this.state[y+1][x+1]);
            }
            else if (lastCol) {
                neighbors.push(this.state[y][x-1]);
                neighbors.push(this.state[y+1][x-1]);
                neighbors.push(this.state[y+1][x]);
            }
            else {
                neighbors.push(this.state[y][x-1]);
                neighbors.push(this.state[y][x+1]);
                neighbors.push(this.state[y+1][x-1]);
                neighbors.push(this.state[y+1][x]);
                neighbors.push(this.state[y+1][x+1]);
            }
        }
        else if (lastRow) {
            if (firstCol) {
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y-1][x+1]);
                neighbors.push(this.state[y][x+1]);
            }
            else if (lastCol) {
                neighbors.push(this.state[y-1][x-1]);
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y][x-1]);
            }
            else {
                neighbors.push(this.state[y-1][x-1]);
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y-1][x+1]);
                neighbors.push(this.state[y][x-1]);
                neighbors.push(this.state[y][x+1]);
            }
        }
        else {
            if (firstCol) {
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y-1][x+1]);
                neighbors.push(this.state[y][x+1]);
                neighbors.push(this.state[y+1][x]);
                neighbors.push(this.state[y+1][x+1]);
            }
            else if (lastCol) {
                neighbors.push(this.state[y-1][x-1]);
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y][x-1]);
                neighbors.push(this.state[y+1][x-1]);
                neighbors.push(this.state[y+1][x]);
            }
            else {
                neighbors.push(this.state[y-1][x-1]);
                neighbors.push(this.state[y-1][x]);
                neighbors.push(this.state[y-1][x+1]);
                neighbors.push(this.state[y][x-1]);
                neighbors.push(this.state[y][x+1]);
                neighbors.push(this.state[y+1][x-1]);
                neighbors.push(this.state[y+1][x]);
                neighbors.push(this.state[y+1][x+1]);
            }
        }
        return neighbors;
    },
    step: function() {
        var pos, currentStatus, neighbors;
        var newState = [];
        
        for (var i = 0; i < this.rows; i++) {
            newState[i] = [];
            for (var j = 0; j < this.cols; j++) {
                pos = [j,i];
                currentStatus = this.state[i][j];
                neighbors = this.neighbors(pos);
                newState[i][j] = this.newStatus(currentStatus, neighbors);
            }
        }
        this.state = newState;
        this.updateBoard();
    },
    copyState: function() {
        var newState = [];
        for (var i = 0, count = this.state.length; i < count; i++) {
            newState[i] = [];
            for (var j = 0, len = this.state[i].length; j < len; j++) {
                newState[i][j] = this.state[i][j];
            }
        }
        return newState;
    },
    newStatus: function(currentStatus, neighbors) {
        var liveNeighbors = 0;
	
        for (var i = 0, count = neighbors.length; i < count; i++) {
            if (neighbors[i]) {
                liveNeighbors++;
            }
        }
	                
        if (currentStatus === true) {
            return (liveNeighbors === 2 || liveNeighbors === 3) ? true : false;
        }
        else {
            return liveNeighbors === 3 ? true : false;
        }
    },
    place: function(pos, pattern) {
        var x = pos[0], y = pos[1], height = pattern.length, row, value;
        for (var i = y, len = height + y; i < len; i++) {
            row = pattern[i-y];
            for (var j = x, len2 = row.length + x; j < len2; j++) {
                value = row[j-x];
                this.state[i][j] = value;
            }
        }
    },
    updateBoard: function () {
        var i, j, on;
        
        for (var i = 0; i < this.rows; i++) {
            for (j = 0; j < this.cols; j++) {
                on = this.state[i][j];
                this.fillCell([i,j], on);
            }
        }
    },
    start: function() {
        var self = this;
        if (typeof self.interval === 'number') {
            window.clearInterval(self.interval);
        }
        self.interval = window.setInterval(function(){
            self.step();
        }, self.speed);
    },
    stop: function() {
        if (typeof this.interval === 'number') {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    },
    clear: function() {
        if (typeof this.interval === 'number') {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        this.initialize();
        this.updateBoard();
    },
    cornerCrawlers: function() {
        var direction = '';
        var crawlers = {
            SE: {
                pos: [0,0],
                pattern: [
                [false,false,true],
                [true, false,true],
                [false,true, true]
                ]
            },
            SW: {
                pos: [this.cols-3, 0],
                pattern: [
                [true,false,false],
                [true,false,true],
                [true,true,false]
                ]
            },
            NW: {
                pos: [this.cols-3,this.rows-3],
                pattern: [
                [true,true, false],
                [true,false,true],
                [true,false,false]
                ]
            },
            NE: {
                pos: [0,this.rows-3],
                pattern: [
                [false,true,true],
                [true,false,true],
                [false,false,true]
                ]
            }
    	
        };
    
        if (arguments.length === 0) {
            this.place(crawlers.SE.pos, crawlers.SE.pattern);
            this.place(crawlers.SW.pos, crawlers.SW.pattern);
            this.place(crawlers.NW.pos, crawlers.NW.pattern);
            this.place(crawlers.NE.pos, crawlers.NE.pattern);
        }
        else {
            for (var i = 0, count = arguments.length; i < count; i++) {
                direction = arguments[i];
                if (typeof crawlers[direction] !== 'undefined') {
                    this.place(crawlers[direction].pos, crawlers[direction].pattern);
                }
            }
        }
    
        this.updateBoard();
    },
    logState: function() {
        var y, x;
        var lenY = this.state.length;
        var lenX = this.state[0].length;
        
        for (y = 0; y < lenY; y++) {
            console.log(this.state[y]);
        }
    }
};