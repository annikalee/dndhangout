var grid = function(n, m) {
	this.grid = initGrid(n, m);
	this.addToken = function(x, y) {
		this.grid[x][y].occupied = true; 
	}
	this.removeToken = function(x, y) {
		this.grid[x][y].occupied = false; 
	}
	this.getTerrain = function(x, y) {
		return this.grid[x][y].terrain; 
	}
}

var gridInfo = function() { 
	this.occupied = false; 
	this.terrain = "Wall"; 
}

function initGrid(n, m) = 
	var array = new Array[n];
	for (i = 0; i < n; i++) {
		array[i] = new Array[m]; 
		for (j = 0; j < m; j++ ) {
			array[i][j] = new gridInfo(); 
		}
	}
	return array; 
