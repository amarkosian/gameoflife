
var state = [
	[0,0,0,0,1,1,0,0,0,0],
	[0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];


function neighbors(pos) {
	var x = pos[0];
	var y = pos[1];
	var cols = 10;
	var rows = 10;
	var beginY = y > 0 ? y-1 : 0;
	var endY = y < cols - 1 ? y + 2 : cols;
	var beginX = x > 0 ? x-1 : 0;
	var endX = x < rows - 1 ? x + 2 : rows;

	var neighbors = state.slice(beginY,endY).map(function(row){
		return row.slice(beginX, endX);
	}).reduce(function(a, b) {
	  return a.concat(b);
	});

	return neighbors;
	
}

console.log(neighbors([4,0]));
console.log(neighbors([4,1]));
console.log(neighbors([4,2]));
