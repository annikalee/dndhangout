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
canvas.width = 510;
canvas.height = 510;

function drawGridlines() {
  ctx.beginPath();
  for (i=30; i<=510; i+=30) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 510);
  }
  for (i=30; i<=510; i+=30) {
    ctx.moveTo(0, i);
    ctx.lineTo(510, i);
  }
  ctx.stroke();
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

/* function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft; 
    var y = event.pageY - canvas.offsetTop; 
    var delta = 25; 
    var smallestX = x - delta; 
    var greatestX = x + delta; 
    var smallestY = y - delta; 
    var greatestY = y + delta; 
    if (smallestX <= 550 && 550 <= greatestX) {
       console.log('Within x');
    }
}*/

// The functions triggered by the buttons on the Hangout App
function countButtonClick() {
  // Note that if you click the button several times in succession,
  // if the state update hasn't gone through, it will submit the same
  // delta again.  The hangout data state only remembers the most-recent
  // update.
  var menu = document.querySelector('#Welcome');
  menu.innerHTML="";

  canvas.style.display="block";
  drawGridlines();


  // Send update to shared state.
  // NOTE:  Only ever send strings as values in the key-value pairs
  gapi.hangout.data.submitDelta({'state': 'Started'});
}

function resetButtonClick() {
  console.log('Resetting count to 0');
  gapi.hangout.data.submitDelta({'count': '0'});
}

var forbiddenCharacters = /[^a-zA-Z!0-9_\- ]/;
function setText(element, text) {
  element.innerHTML = typeof text === 'string' ?
      text.replace(forbiddenCharacters, '') :
      '';
}

function getMessageClick() {
  console.log('Requesting message from main.py');
  var http = new XMLHttpRequest();
  http.open('GET', serverPath);
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonResponse = JSON.parse(http.responseText);
      console.log(jsonResponse);

      var messageElement = document.getElementById('message');
      setText(messageElement, jsonResponse['message']);
    }
  }
  http.send();
}

function updateStateUi(state) {
  var countElement = document.getElementById('count');
  var stateCount = state['count'];
  if (!stateCount) {
    setText(countElement, 'Probably 0');
  } else {
    setText(countElement, stateCount.toString());
  }
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


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

