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
	this.draw = function() {
		for (i = 0; i < n; i++) {
			for (j = 0; j < m; j++) {
				terrain = this.grid[i][j].terrain; 
				drawTerrain(terrain, i, j); 
			}
		}
	}
}

function drawTerrain(terrain, i, j) {
	if (terrain === "wall") {
		//don't draw
	}
	else {
		console.log("Drawing terrain at" + i + j);
		var url = "//hangoutdnd.appspot.com/static/images/" + terrain + ".jpg";
		var tokenImg = new Image(); 
		tokenImg.src = url; 
		tokenImg.onload = function() {
      		ctx.drawImage(tokenImg, i*30, j*30, 30, 30);
		}
	}
}

var gridInfo = function() { 
	this.occupied = false; 
	this.terrain = "wall"; 
}

function initGrid(n, m) {
	var array = new Array();
	for (i = 0; i < n; i++) {
		array[i] = new Array(); 
		for (j = 0; j < m; j++ ) {
			array[i][j] = new gridInfo(); 
		}
	}
	return array; 
}
