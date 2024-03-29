/*
* Copyright (c) 2011 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not
* use this file except in compliance with the License. You may obtain a copy of
* the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/
var serverPath = '//hangoutdnd.appspot.com/';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 510;
var height = 510;
var cellSize = 30;

function drawGridlines() {
    ctx.beginPath();
    for (i=cellSize; i<=width; i+=cellSize) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 510);
    }
    for (i=cellSize; i<=height; i+=cellSize) {
      ctx.moveTo(0, i);
      ctx.lineTo(510, i);
    }
    ctx.stroke();
}


// Uses knowledge of height/width and cellSize
// If (1,0), that means second row, first column. So, (30, 0)
function getPositionFromGrid(x, y)  {
    var x_coord = x * cellSize;
    var y_coord = y * cellSize;
    return (x_coord, y_coord);
}

var d4 = new Image(); 
d4.src = "//hangoutdnd.appspot.com/static/images/d4.jpg"; 
d4.onload = function() {
      ctx.drawImage(d4, 550, 0, 40, 40);
}

var d6 = new Image(); 
d6.src = "//hangoutdnd.appspot.com/static/images/d6.jpg"; 
d6.onload = function() {
      ctx.drawImage(d6, 550, 50, 40, 40);
}

var d8 = new Image(); 
d8.src = "//hangoutdnd.appspot.com/static/images/d8.jpg"; 
d8.onload = function() {
      ctx.drawImage(d8, 550, 100, 40, 40);
}

var d10 = new Image(); 
d10.src = "//hangoutdnd.appspot.com/static/images/d10.jpg"; 
d10.onload = function() {
      ctx.drawImage(d10, 550, 150, 40, 40);
}

var d12 = new Image(); 
d12.src = "//hangoutdnd.appspot.com/static/images/d12.jpg"; 
d12.onload = function() {
      ctx.drawImage(d12, 550, 200, 40, 40);
}

var d20 = new Image(); 
d20.src = "//hangoutdnd.appspot.com/static/images/d20.jpg"; 
d20.onload = function() {
      ctx.drawImage(d20, 550, 250, 40, 40);
}

var d100 = new Image(); 
d100.src = "//hangoutdnd.appspot.com/static/images/d100.jpg"; 
d100.onload = function() {
      ctx.drawImage(d100, 550, 300, 40, 40);
}

/* Function which takes in a string, and adds it to the game console */
function addToConsole(thing) {
  console.log(thing);
  /* var item= $("<p/>").addClass("console-item").html(thing);
  $(".game-console").append(item); */
  var state = gapi.hangout.data.getState()['game-console'];
  if (state === ' ') {
     gapi.hangout.data.submitDelta({'game-console': thing + '<br>'});
  }
  else {
    gapi.hangout.data.submitDelta({'game-console': state + '<br>'+ thing});
  }
}

function rollDice(numDice, name, is100) {
  var number = Math.floor(Math.random()*numDice) + 1; 
  if (is100) {
    number = number * 10; 
  }
  var numString = name + ' rolled a ' + number + '!'; 
  addToConsole(numString); 
}


function render(gameGrid)   {
    // Clear, then draw: Gridlines, game grid, and tokens
    var allTokens = JSON.parse(gapi.hangout.data.getState()['tokens']);
    ctx.clearRect(0, 0, width, height);
    drawGridlines();
    gameGrid.draw();
    var numTokens = allTokens.length;
    for (var i=0; i < numTokens; i++)
      allTokens[i].draw();
    return;
}


function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft; 
    var y = event.pageY - canvas.offsetTop; 
    var delta = 20; 
    var smallestX = x - delta; 
    var greatestX = x + delta; 
    var smallestY = y - delta; 
    var greatestY = y + delta; 
    if ((smallestX <= 570) && (570 <= greatestX)) {
        if ((smallestY <= 20) && (20 <= greatestY)) {
            console.log("Within D4");
            rollDice(4, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 70) && (70 <= greatestY)) {
            console.log("Within D6");
            rollDice(6, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 120) && (120 <= greatestY)) {
            console.log("Within D8");
            rollDice(8, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 170) && (170 <= greatestY)) {
            console.log("Within D10");
            rollDice(10, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 220) && (220 <= greatestY)) {
            console.log("Within D12");
            rollDice(12, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 270) && (270 <= greatestY)) {
            console.log("Within D20");
            rollDice(20, gapi.hangout.getLocalParticipant().person.displayName, false);
        }
        if ((smallestY <= 320) && (320 <= greatestY)) {
            console.log("Within D100");
            rollDice(10, gapi.hangout.getLocalParticipant().person.displayName, true);
        }
    }
}

function initPlayerTokens(tokensArray, playerArray) {
    var colors = ['darkblue', 'darkpurple', 'green', 'lightblue', 'lightpurple', 'red'];
    var y = 0; 
    for (i = 0; i < playerArray.length; i++) {
      var player = new token(colors[i%6], 'Player', playerArray[i].person.displayName, 0, y);
      tokensArray.addToken(player);
      y += cellSize; 
    }
    gapi.hangout.data.setValue('tokens',JSON.stringify(tokensArray));
    console.log("Created player tokens");
}

function countButtonClick() {
  gapi.hangout.data.setValue('game-console', 'Previous Rolls:');
  var menu = document.querySelector('#Welcome');
  menu.innerHTML="";
  canvas.style.display="block";
  var gameconsole = document.querySelector(".game-console");
  gameconsole.style.display="block";
  drawGridlines();
  var gameGrid = new grid(17, 17);
  for (i = 5; i < 13; i++) {
    for (j = 4; j < 16; j++) {
      if ((i >= 7) && (i < 11) && (j >= 7) && (j < 11)) {
          gameGrid.grid[i][j].terrain="ice";
      }
      else {
        gameGrid.grid[i][j].terrain="stone";
      }
    }
  }
  gameGrid.draw();
  var tokens = new currentTokens(); 
  initPlayerTokens(tokens, gapi.hangout.getParticipants());
  render(gameGrid); 
  /*var allTokens = JSON.parse(gapi.hangout.data.getState()['tokens']);
  var numTokens = allTokens.length;
  console.log(numTokens);
  for (i=0; i < numTokens; i++) {
    console.log("Drawing " + i + " token");
    allTokens[i].draw();
  }
  */
  canvas.addEventListener('mousedown', onMouseDown, false);
}

var forbiddenCharacters = /[^a-zA-Z!0-9_\- ]/;
function setText(element, text) {
  element.innerHTML = typeof text === 'string' ?
      text.replace(forbiddenCharacters, '') :
      '';
}

function updateStateUi(state) {
  var gameconsole = document.getElementById('game-console');
  var stateconsole = state['game-console'];
  setText(gameconsole, stateconsole);
}



function updateParticipantsUi(participants) {
  console.log('Participants count: ' + participants.length);
  var participantsListElement = document.getElementById('participants');
  setText(participantsListElement, participants.length.toString());
}

// A function to be run at app initialization time which registers our callbacks
function init() {
  console.log('Init app.');

  var apiReady = function(eventObj) {
    if (eventObj.isApiReady) {
      console.log('API is ready');

      gapi.hangout.data.setValue('game-console', 'Previous Rolls:');

      gapi.hangout.data.onStateChanged.add(function(eventObj) {
        updateStateUi(eventObj.state);
      });
      gapi.hangout.onParticipantsChanged.add(function(eventObj) {
        updateParticipantsUi(eventObj.participants);
      });

      updateStateUi(gapi.hangout.data.getState());
      updateParticipantsUi(gapi.hangout.getParticipants());

      gapi.hangout.onApiReady.remove(apiReady);

    }
  };

  // This application is pretty simple, but use this special api ready state
  // event if you would like to any more complex app setup.
  gapi.hangout.onApiReady.add(apiReady);
}

gadgets.util.registerOnLoadHandler(init);
