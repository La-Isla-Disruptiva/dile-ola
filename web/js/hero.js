class Hero{
  static availableCharacters = [
    "lucia",
    "rodrigo",
    "alicia",
    "emilia",
    "carlos",
    "laura",
    "gustavio"
  ]

  constructor(config){
    // set up parameters
    this.isPlayer = config.isPlayer || false;
    this.uuid = config.uuid || uuid()

    this.velocityFactor = config.velocityFactor || 10

    // set up state
    this.x = config.x || 4
    this.y = config.y || 5
    this.direction = config.direction || "down"

    // Set up character
    this.ckey = config.ckey
    if (! Hero.availableCharacters.includes(this.ckey)){
      console.error("Character " + this.ckey + " do not exist")
      return
    }
    this.hero = new GameObject({
      x: this.x,
      y: this.y,
      src: "images/characters/people/" + this.ckey + ".png"
    })
    this.shadow = new GameObject({
      x: config.x || 4,
      y: config.y || 5,
      src: "images/characters/shadow.png"
    })
  // set up motion parameters
    this.movinProgressRemaining = 0;
    this.directionUpdate = {
      up: ["movey", -1 ], 
      down: ["movey", 1 ], 
      left: ["movex", -1 ], 
      right: ["movex", 1 ], 
    }
  }

  get state(){
    return { 
      ckey: this.ckey,
      x: this.x,
      y: this.y,
      direction: this.direction
    }
  }
  update(state){
    if( this.isPlayer && this.movinProgressRemaining === 0  && state.arrow){
      this.direction = state.arrow
      this.movinProgressRemaining = this.velocityFactor;
    }
    this.updatePosition()

    // update position
    if (state.x){
      this.x = state.x
      this.hero.x = state.x
      this.shadow.x = state.x
    }
    if (state.y){
      this.y = state.y
      this.hero.y = state.y
      this.shadow.y = state.y
    }
    if (state.direction){
      this.direction = state.direction
      this.shadow.x = state.x
    }
  }

  updatePosition(){
    if(this.movinProgressRemaining > 0 ){
      const [ property ,change ] = this.directionUpdate[this.direction]
      this[property](change);
      this.movinProgressRemaining -= 1;
    }
  }

  movex(x){
    this.x += x * 1/this.velocityFactor
    this.shadow.x = this.x
    this.hero.x = this.x
  }
  movey(y){
    this.y += y * 1/this.velocityFactor
    this.shadow.y = this.y
    this.hero.y = this.y
  }
  draw(ctx){
    this.shadow.sprite.draw(ctx);
    this.hero.sprite.draw(ctx);
  }
}
