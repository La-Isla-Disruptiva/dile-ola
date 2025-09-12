(function(){
  // development
  // var parser = document.createElement('a');
  // parser.href = window.location.href

  var storage = new Storage()

  if ( !storage.uuid ){ // initialization at first connection
    storage.uuid = uuid()
  }

  const world = new World({
    element: document.querySelector(".game-container"),
    touchCircle: document.querySelector(".touchCircle"),
    storage: storage,
    ws: {
         hostname: "ws.dile-ola.disruptiva.org",
         //hostname: parser.hostname,
         protocol: "ws"
    }
  });
  world.init();
})(); 
