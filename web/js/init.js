(function(){
  const world = new World({
    element: document.querySelector(".game-container"),
    touchCircle: document.querySelector(".touchCircle")
  });
  world.init();
})(); 
