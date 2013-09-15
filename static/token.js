var token = function(color, type, name, x, y) {
	this.color = color; 
	this.type = type; 
	this.name = name; 
	this.x = x;
	this.y = y; 
	this.url = "//hangoutdnd.appspot.com/static/images/" + color + ".gif";
	this.moveToken = function(a, b)	{
		if (gameGrid[a][b].occupied === true) {
			//Nope message
		}
		else {
			gameGrid.removeToken(x, y); 
			gameGrid.addToken(a, b); 
			this.x = a; 
			this.y = b;
			// Redraw 
		}

	}
	this.draw = function() {
		var tokenImg = new Image(); 
		tokenImg.src = this.url; 
		tokenImg.onload = function() {
      		ctx.drawImage(tokenImg, this.x, this.y, 30, 30);
		}
	}
}