(function(){

  // CONFIG WEBRTC
  let hostname
  let port
  let protocol
  if (ENVIRONMENT === "local"){
    var parser = document.createElement('a');
    parser.href = window.location.href
    hostname = parser.hostname,
    port = 8888
    protocol = "ws"
  }else{
    hostname = "ws.dile-ola.disruptiva.org"
    protocol = "wss"
  }

  // SETUP STORAGE
  let storage
  if (ENVIRONMENT === "local"){
    storage = { uuid: uuid()}
  }else{
    storage = new Storage()
    if ( !storage.uuid ){ // initialization at first connection
      storage.uuid = uuid()
    }
  }

  const preferences = new PreferencesController()
  preferences.init(storage)
  // START !!
  const world = new World({
    element: document.querySelector(".game-container"),
    touchCircle: document.querySelector(".touchCircle"),
    storage: storage,
    ws: {
         hostname: hostname,
         port: port,
         protocol: protocol
    }
  });
  world.init();
})(); 

