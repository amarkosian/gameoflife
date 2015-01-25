var GameOfLife = function(config) {
    var config = config || {};
    
    this.cols = config.width || 50;
    this.rows = config.height || 48;
    this.state = [];
    this.speed = config.speed || 10;
    this.cellWidth = config.cellWidth || 10;
    this.cellHeight = config.cellHeight || 10;
    this.cellBorder = typeof config.cellBorder !== 'undefined' ? config.cellBorder : 1;
    this.canvas = config.element;
    this.context = this.canvas.getContext('2d');
    this.interval;
    this.initialize();
};

GameOfLife.prototype = {    
    initialize: function() {
        this.canvas.width = this.cols * this.cellWidth;
        this.canvas.height = this.rows * this.cellHeight;
        
        this.context.fillStyle = '#aaa';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (var i = 0; i < this.rows; i++) {
            this.state[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.state[i][j] = false;
            }
        }
        
        this.updateBoard();
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
        var self = this;
        var newState = self.state.map(function(row, y){
            return row.map(function(cell, x){
                pos = [x,y];
                currentStatus = self.state[y][x];
                neighbors = self.neighbors(pos);
                return self.newStatus(currentStatus, neighbors);
            });
            
        });
        
        this.state = newState;
        this.updateBoard();
    },
    newStatus: function(currentStatus, neighbors) {
        var liveNeighbors = 0;
        
        for (var i = 0, count = neighbors.length; i < count; i++) {
            if (neighbors[i] === 1) {
                liveNeighbors++;
            }
        }
        
        if (currentStatus === 1) {
            return (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0;
        }
        else {
            return liveNeighbors === 3 ? 1 : 0;
        }
    },
    place: function(pos, pattern) {
        var x = pos[0], 
        	y = pos[1], 
        	height = pattern.length, 
        	row, 
        	value;
        
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
    writeString: function(str, pos) {
    	var x = pos[0];
    	var y = pos[1] + 30;
    	this.context.fillStyle = '#f00';
		this.context.font = 'bold 30px sans-serif';
		this.context.textBaseline = 'bottom';
		this.context.fillText(str, x, y);
    },
    cornerCrawlers: function() {
        var direction = '';
        var crawlers = this.crawlers;
        var pos = {
            SE: [0,0],
            SW: [this.cols-3,0],
            NW: [this.cols-3,this.rows-3],
            NE: [0,this.rows-3]
        };
        
        if (arguments.length === 0) {
            this.place(pos.SE, crawlers.SE);
            this.place(pos.SW, crawlers.SW);
            this.place(pos.NW, crawlers.NW);
            this.place(pos.NE, crawlers.NE);
        }
        else {
            for (var i = 0, count = arguments.length; i < count; i++) {
                direction = arguments[i];
                if (typeof pos[direction] !== 'undefined') {
                    this.place(pos[direction], crawlers[direction]);
                }
            }
        }
        
        this.updateBoard();
    },
    crawlers: {
        SE: [
        [0,0,1],
        [1,0,1],
        [0,1,1]
        ],
        SW: [
        [1,0,0],
        [1,0,1],
        [1,1,0]
        ],
        NW: [
        [1,1,0],
        [1,0,1],
        [1,0,0]
        ],
        NE: [
        [0,1,1],
        [1,0,1],
        [0,0,1]
        ]
    },
    patterns: {
      glider: [
          [0,1,0],
          [0,1,1],
          [1,0,1]
      ],
      queenbee: [
          [1,1,0,0],
          [0,0,1,0],
          [0,0,0,1],
          [0,0,0,1],
          [0,0,0,1],
          [0,0,1,0],
          [1,1,0,0]
	],
        captivequeen: [
           [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0], 
           [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
           [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], 
           [1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1], 
           [1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1], 
           [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], 
           [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        pentadecathlon: [
            [1,1,1,1,1,1,1,1,1,1]
        ],
        crab: [
            [0,1,0],
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [0,1,0],
        ],
        toad: [
            [0,1,1,1],
            [1,1,1,0]
        ]
    }
};
