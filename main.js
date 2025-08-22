  var character = document.getElementById('character-1')

/* position initiale */
  var map = document.getElementById('map').getBoundingClientRect();
  var position = {};
  var me= character.getBoundingClientRect();
  var position = {};
  position.x=map.x-me.x;
  position.y=map.y-me.y;

  document.addEventListener('keydown', function(e) {
  // GAUCHE:   37, // gauche
  // HAUT:     38, // haut
  // DROITE:  39,  // droite
  // BAS:   40     // bas
  switch(e.keyCode){
      case 37: // gauche
        position.x = position.x - 20;
        character.style.left = position.x + "px";
        break;
      case 39: //droite
        position.x = position.x + 20;
        character.style.left = position.x + "px";
        break;
      case 38: // haut
        position.y = position.y - 20;
        character.style.top = position.y + "px";
        break;
      case 40: 
        position.y = position.y + 20;
        character.style.top = position.y + "px";
        break;
    }
    });

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
