(function(){

  var parser = document.createElement('a');
  parser.href = window.location.href

  const world = new World({
    element: document.querySelector(".game-container"),
    touchCircle: document.querySelector(".touchCircle"),
    ws: {hostname: parser.hostname,
         port: "8888",
         protocol: "ws"
    }
  });
  world.init();
})(); 
