class Sprite {
  constructor(config){

    this.gameObject = config.gameObject;

    // Set up sprite parameters
    
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
      "idle-down": [ [ 0, 0 ] ],
      "idle-right": [ [ 0, 1 ] ],
      "idle-up":    [ [ 0, 2 ] ],
      "idle-left":  [ [ 0, 3 ] ],
      "walk-down":  [ [ 1, 0 ], [ 0, 0 ], [ 3, 0 ], [ 0, 0 ] ],
      "walk-right": [ [ 1, 1 ], [ 0, 1 ], [ 3, 1 ], [ 0, 1 ] ],
      "walk-up":    [ [ 1, 2 ], [ 0, 2 ], [ 3, 2 ], [ 0, 2 ] ],
      "walk-left":  [ [ 1, 3 ], [ 0, 3 ], [ 3, 3 ], [ 0, 3 ] ],
    }
    this.currentAnimation =  config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = config.animationFrameLimit || 4;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key){
    if (this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress(){
    // Downtick frame progress
    if (this.animationFrameProgress > 0){
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.currentAnimationFrame >= this.animations[this.currentAnimation].length){
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx){
    const x = this.gameObject.x * gridFactor - this.gridXOffset;
    const y = this.gameObject.y * gridFactor - this.gridYOffset;
    
    const [frameX, frameY] = this.frame


    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * this.spriteWidth,frameY * this.spriteHeight,
     
      this.spriteWidth, this.spriteHeight,
      x,y,
      this.spriteWidth, this.spriteHeight
    )
    this.updateAnimationProgress();
  }
}

