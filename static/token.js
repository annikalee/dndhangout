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
			currentTokens.removeToken(this);
			gameGrid.addToken(a, b); 
			this.x = a; 
			this.y = b;
			this.draw();
			currentTokens.addToken(this);
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

var currentTokens = function() {
	this.currentTokens = new Array(); 
	this.addToken = function(token) {
		this.currentTokens.push(token);
	}
	this.removeToken = function(token) {
		for (i = 0; i < this.currentTokens.length; i++) {
			if this.currentTokens[i] === token {
				this.currentTokens.removeByIndex(i);
			}
		}
	}
	this.toString = function() {
		var result = "";
		for (i = 0; i < this.currentTokens.length; i++) {
			result += JSON.stringify[this.currentTokens[i]];
		}
		return result;
	}
}
