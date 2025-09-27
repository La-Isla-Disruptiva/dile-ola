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

    // set up state
    this._x = config.x || mapUtils.withGrid(4)
    this._y = config.y || mapUtils.withGrid(5)
    this.direction = config.direction || "down"

    // Set up character
    this.ckey = config.ckey
    if (! Hero.availableCharacters.includes(this.ckey)){
      console.error("Character " + this.ckey + " do not exist")
      return
    }
    this.hero = new GameObject({
      x: this._x,
      y: this.y,
      src: "images/characters/people/" + this.ckey + ".png"
    })
    this.shadow = new GameObject({
      x: this._x,
      y: this._y,
      src: "images/characters/shadow.png"
    })
  // set up motion parameters
    this.movinProgressRemaining = 0;
    this.directionUpdate = {
      up: ["y", -1 ], 
      down: ["y", 1 ], 
      left: ["x", -1 ], 
      right: ["x", 1 ], 
    }
  }

  set x(value){
    this._x = value
    this.hero.x = value
    this.shadow.x = value
  }

  get x(){
    return this._x
  }
  
  set y(value){
    this._y = value
    this.hero.y = value
    this.shadow.y = value
  }
  get y(){
    return this._y
  }
  get state(){
    return { 
      ckey: this.ckey,
      x: this._x,
      y: this.y,
      direction: this.direction
    }
  }
  update(state){
    if( this.isPlayer && this.movinProgressRemaining === 0  && state.arrow){
      this.direction = state.arrow
      this.movinProgressRemaining = gridFactor;
    }
    this.updatePosition()
    this.updateSprite(state);

    // update position
    if (state.x){
      this.x = state.x
    }
    if (state.y){
      this.y = state.y
    }
    if (state.direction){
      this.direction = state.direction
    }
  }

  updatePosition(){
    if(this.movinProgressRemaining > 0 ){
      const [ property ,change ] = this.directionUpdate[this.direction]
      this[property] += change;
      this.movinProgressRemaining -= 1;
    }
  }

  updateSprite(state){
    if( this.isPlayer && this.movinProgressRemaining === 0  && !state.arrow){
      this.hero.sprite.setAnimation("idle-" + this.direction);
      return;
    }
    if (this.movinProgressRemaining > 0){
      this.hero.sprite.setAnimation("walk-" + this.direction);
    }
  }
  changeCharacter(ckey){
    this.ckey = ckey
    this.hero = new GameObject({
      x: this._x,
      y: this.y,
      src: "images/characters/people/" + this.ckey + ".png"
    })
  }
  
  draw(ctx, camera){
    this.shadow.sprite.draw(ctx,camera);
    this.hero.sprite.draw(ctx,camera);
  }
}
