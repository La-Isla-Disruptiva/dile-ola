class Sprite {
  constructor(config){

    this.gameObject = config.gameObject;

    // Set up sprite parameters
    this.gridFactor   = config.gridFactor   || 16;
    this.gridXOffset  = config.gridXOffset  || 8;
    this.gridYOffset  = config.gridYOffset  || 18;
    this.spriteWidth  = config.spriteWidth  || 32;
    this.spriteHeight = config.spriteHeight || 32;

    // Set up the Image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    // Config animation & initial state
    this.animations = config.animations || {
      idleDown: [
        [ 0, 0 ]
      ]
    }
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;
  }

  draw(ctx){
    const x = this.gameObject.x * this.gridFactor - this.gridXOffset;
    const y = this.gameObject.y * this.gridFactor - this.gridYOffset;
    
    this.isLoaded && ctx.drawImage(
      this.image,
      0,0,
      this.spriteWidth, this.spriteHeight,
      x,y,
      this.spriteWidth, this.spriteHeight
    )
  }
}

