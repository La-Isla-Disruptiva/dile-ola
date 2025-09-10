class InputControl{
  constructor(){
    this.heldDirections = [
    ];
    this.keyMap = {
      ArrowUp: "up",
      KeyK: "up",
      ArrowDown: "down",
      KeyJ: "down",
      ArrowLeft: "left",
      KeyH: "left",
      ArrowRight: "right",
      KeyL: "right",
    }

  }

  get direction(){
    return this.heldDirections[0];
  }

  init(){
    document.addEventListener("keydown", e => {    
      const dir = this.keyMap[e.code];
      if(dir && this.heldDirections.indexOf(dir) === -1){
        this.heldDirections.unshift(dir);
        //console.log(this.heldDirections)
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.keyMap[e.code];
      const index = this.heldDirections.indexOf(dir);
      if(index > -1){
        this.heldDirections.splice(index,1)
        //console.log(this.heldDirections)
      }
    })
  }
}
