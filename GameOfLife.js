var GameOfLife = function(dimensions) {
    this.dimensions = dimensions || [40, 41];
    this.width = dimensions[0];
    this.height = dimensions[1];
    this.state = [];
    this.speed = 50;
    this.interval;
    this.initialize();
    
    if ($('#GOL_Board').length) {
        if (typeof this.interval === 'number') {
            window.clearInterval(this.interval);
            self.interval = null;
        }
        $('#GOL_Board').remove();
    }
    $(document.body).append(this.board());
    this.updateBoard();
};

GameOfLife.prototype.board = function(parent) {
    var $table = $('<table>').attr('id', 'GOL_Board'), $tr, $td;
    var self = this;
    var pos;
    
    for (var i = 0; i < this.height; i++) {
        $tr = $('<tr>');
        for (var j = 0; j < this.width; j++) {
            pos = [i,j];
            $td = $('<td>').on('click', pos, function(event){
                self.editCell(event.data);
            });
            $tr.append($td);
        }
        $table.append($tr);
    }
    
    return $table;
};

GameOfLife.prototype.initialize = function() {
    for (var i = 0; i < this.dimensions[1]; i++) {
        this.state[i] = [];
        for (var j = 0; j < this.dimensions[0]; j++) {
            this.state[i][j] = 0;
        }
    }
};
            
GameOfLife.prototype.updateBoard = function() {
    var self = this;
    
    $rows = $('#GOL_Board tr');
    $rows.each(function(rowIndex, elem){
        $cols = $(elem).find('td');
        $cols.each(function(colIndex, td){
            if (self.state[rowIndex][colIndex] === 1) {
                $(td).addClass('on');
            }
            else {
                $(td).removeClass();
            }
        });
    });
};
            
GameOfLife.prototype.step = function() {
    var pos, currentStatus, neighbors;
    var newState = [];
    
    for (var i = 0; i < this.height; i++) {
        newState[i] = this.state[i].slice(0)
        for (var j = 0; j < this.width; j++) {
            pos = [j,i];
            currentStatus = this.state[i][j];
            neighbors = this.neighbors(pos);
            newState[i][j] = this.newStatus(currentStatus, neighbors);
        }
    }
    this.state = $.extend(true, [], newState);
    this.updateBoard();
};

GameOfLife.prototype.neighbors = function(pos) {
    var x = pos[0], y = pos[1], neighbors = [];
    var firstRow = y === 0;
    var lastRow = y === this.height - 1;
    var firstCol = x === 0;
    var lastCol = x === this.width -1;
                
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
};

GameOfLife.prototype.newStatus = function(currentStatus, neighbors) {
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
};

GameOfLife.prototype.editCell = function(pos) {
    var alive = 0;
    if (pos.length === 2) {
        alive = this.state[pos[0]][pos[1]];
        this.state[pos[0]][pos[1]] = alive ? 0 : 1;
        this.updateBoard();
    }
};

GameOfLife.prototype.place = function(pos, pattern) {
    var x = pos[0], y = pos[1], height = pattern.length, row, value;
    for (var i = y, len = height + y; i < len; i++) {
        row = pattern[i-y];
        for (var j = x, len2 = row.length + x; j < len2; j++) {
            value = row[j-x];
            this.state[i][j] = value;
        }
                    
    }
};

GameOfLife.prototype.cornerCrawlers = function() {
    var direction = '';
    var crawlers = {
    	SE: {
    		pos: [0,0],
    		pattern: [
    			[0,0,1],
    			[1,0,1],
    			[0,1,1]
    		]
    	},
    	SW: {
    		pos: [this.width-3, 0],
    		pattern: [
    			[1,0,0],
    			[1,0,1],
    			[1,1,0]
    		]
    	},
    	NW: {
    		pos: [this.width-3,this.height-3],
    		pattern: [
		    	[1,1,0],
		    	[1,0,1],
		    	[1,0,0]
		    ]
    	},
    	NE: {
    		pos: [0,this.height-3],
    		pattern: [
    			[0,1,1],
    			[1,0,1],
    			[0,0,1]
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
    
    /*
    this.place([0,0], crawlers.SE);
    this.place([this.width-3, 0], crawlers.SW);
    this.place([0,this.height-3], crawlers.NE);
    this.place([this.width-3,this.height-3], crawlers.NW);
    */
    
    this.updateBoard();
};

GameOfLife.prototype.start = function() {
    var self = this;
    if (typeof self.interval === 'number') {
        window.clearInterval(self.interval);
    }
    self.interval = window.setInterval(function(){
        self.step();
    }, self.speed);
};

GameOfLife.prototype.stop = function() {
    if (typeof this.interval === 'number') {
        window.clearInterval(this.interval);
        this.interval = null;
    }
};

GameOfLife.prototype.clear = function() {
    if (typeof this.interval === 'number') {
        window.clearInterval(this.interval);
        this.interval = null;
    }
    this.initialize();
    this.updateBoard();
};

GameOfLife.prototype.print = function() {
    var out = '<pre>';
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            out += this.state[i][j];
        }
        out += '\n';
    }
    out += '\n';
    out += '</pre>';
    document.body.innerHTML += out;
};

