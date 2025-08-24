  var character = document.getElementById('character-1')

/* position initiale */
  var map = document.getElementById('map').getBoundingClientRect();
  var position = {};
  var me= character.getBoundingClientRect();
  var position = {};
  position.x=map.x-me.x;
  position.y=map.y-me.y;

/* motion functions */
function move_up() {
  position.y = position.y - 20;
  character.style.top = position.y + "px";
  }

function move_down(){
  position.y = position.y + 20;
  character.style.top = position.y + "px";
  }
function move_left(){
  position.x = position.x - 20;
  character.style.left = position.x + "px";
  }
function move_right(){
  position.x = position.x + 20;
  character.style.left = position.x + "px";
  }

  /* move using keys */
  document.addEventListener('keydown', function(e) {
  switch(e.keyCode){
      case 37: // gauche
        move_left();
        break;
      case 39: //droite
        move_right();
        break;
      case 38: // haut
        move_up();
        break;
      case 40: //down
        move_down();
        break;
    }
    });


/* move using pad */
  var pad_up = document.getElementById('pad-up')
  pad_up.addEventListener('click', function(e){ move_up(); })
  var pad_down = document.getElementById('pad-down')
  pad_down.addEventListener('click', function(e){ move_down(); })
  var pad_left = document.getElementById('pad-left')
  pad_left.addEventListener('click', function(e){ move_left(); })
  var pad_right= document.getElementById('pad-right')
  pad_right.addEventListener('click', function(e){ move_right(); })


// TEXT CHAT
speakArea =  document.getElementById("character-1-text");
n_ola=0;
olas={};

function clearTextArea(area){
  area.value = "";
};
function deleteOla(n){
  setTimeout(() => {
    olas[n].remove();
    delete olas[n];
  },15000)
}

function dileOla(text){
    div = document.createElement( 'div' );
    div.innerHTML= text;
    div.classList.add("ola")
    speakArea.appendChild(div);
    olas[n_ola]=div;
    deleteOla(n_ola);
    n_ola=n_ola+1;
  }


// press enter key
var textArea = document.getElementById("chatedit-textarea");
  textArea.onkeyup = function(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
      dileOla(this.value)
      clearTextArea(this);
    }
};
// press dile button
var dileButton =  document.getElementById("dile");
dileButton.onclick = function(){
  dileOla(textArea.value)
  clearTextArea(textArea)
}

  // VIDEO CHAT

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    errorMsg(`OverconstrainedError: The constraints could not be satisfied by the available devices. Constraints: ${JSON.stringify(constraints)}`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('NotAllowedError: Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
//  const errorElement = document.querySelector('#errorMsg');
//  errorElement.innerHTML += `<p>${msg}</p>`;
    console.error(msg);
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

init()
