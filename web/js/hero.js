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

   if(this.movinProgressRemaining > 0){
       this.updatePosition();
    }else{
      // more cases here ...

      // keyboard ready and have an arrow pressed
      if( this.isPlayer && state.arrow){
         this.startBehavior(state, { type: "walk", direction: state.arrow } );
      }

      this.updateSprite();
    }
  }
  
  mount(map){
    this.hero.mount(map);
  }
  unmount(map){
    this.hero.unmount(map);
  }
  startBehavior(state, behavior){
      this.direction = behavior.direction;
      if( behavior.type === "walk"){
        // stop if space is already taken
        if( state.map.isSpaceTaken(this.x, this.y, this.direction)){
          //console.log("space taken, cannot move")
          return;
        } 
      //console.log("is space taken?", state.map.isSpaceTaken(this.x, this.y, this.direction))
      //console.log("current position", this.x, this.y)
      //console.log("next position", mapUtils.nextPosition(this.x, this.y, this.direction))
      //console.log("walls", state.map.walls)
      state.map.moveWall(this.x, this.y, this.direction)
      this.movinProgressRemaining = gridFactor;
      }
  }

  updatePosition(){
    if(this.movinProgressRemaining > 0 ){
      const [ property ,change ] = this.directionUpdate[this.direction]
      this[property] += change;
      this.movinProgressRemaining -= 1;
    }
  }

  updateSprite(){
    if (this.movinProgressRemaining > 0){
      this.hero.sprite.setAnimation("walk-" + this.direction);
      return
    }
    this.hero.sprite.setAnimation("idle-" + this.direction);
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
