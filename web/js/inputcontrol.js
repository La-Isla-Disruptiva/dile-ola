class InputControl{
  constructor(){
    this.touchStartX = null
    this.touchStartY = null
    this.lastTouchMotion = null
    this.heldDirections = [
    ];
    this.keyMap = {
      ArrowUp: "up",
      KeyK: "up",
      up: "up",
      ArrowDown: "down",
      KeyJ: "down",
      down: "down",
      ArrowLeft: "left",
      KeyH: "left",
      left: "left",
      ArrowRight: "right",
      KeyL: "right",
      right: "right"
    }
  }

  get direction(){
    return this.heldDirections[0];
  }
  get touchPosition(){
    return [ this.touchStartX, this.touchStartY ]
  }

  init(){
    document.addEventListener("keydown", e => {    
      const dir = this.keyMap[e.code];
      if(dir && this.heldDirections.indexOf(dir) === -1){
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.keyMap[e.code];
      const index = this.heldDirections.indexOf(dir);
      if(index > -1){
        this.heldDirections.splice(index,1)
      }
    })
    document.addEventListener("touchstart", e => {
        this.touchStartX = e.touches[0].screenX;
        this.touchStartY = e.touches[0].screenY;
    })

    document.addEventListener("touchmove", e => {
      const dX = e.touches[0].screenX - this.touchStartX;
      const dY = e.touches[0].screenY - this.touchStartY;
      let dir = null
      if ( Math.abs(dX) > Math.abs(dY)){ // move X
        if (dX > 0){ 
           dir = "right" 
        }else{
          dir = "left"
        }
      }else{ // move Y
        if (dY > 0){ 
           dir = "down" 
        }else{
          dir = "up"
        }
      }
      // Remove last touch direction if present
      if (this.lastTouchMotion != dir){
        const index = this.heldDirections.indexOf(this.lastTouchMotion);
        if(index > -1){
          this.heldDirections.splice(index,1)
        }
        this.lastTouchMotion = dir
      }

     // Select as touched
      if(dir && this.heldDirections.indexOf(dir) === -1){
        this.heldDirections.unshift(dir);
        //console.log(this.heldDirections)
      }
      e.preventDefault();
    }, { passive: false })
   

    document.addEventListener("touchend", e => {

      const index = this.heldDirections.indexOf(this.lastTouchMotion);
      if(index > -1){
        this.heldDirections.splice(index,1)
      }
      this.touchStartX = null
      this.touchStartY = null
      this.lastTouchMotion = null
    })

  }
}
