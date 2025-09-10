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

    // Set up character
    this.characterKey = config.character
    if (! Hero.availableCharacters.includes(this.characterKey)){
      console.err("Character " + this.characterKey + " do not exist")
      return
    }
    this.hero = new GameObject({
      x: config.x || 4,
      y: config.y || 5,
      src: "images/characters/people/" + this.characterKey + ".png"
    })
    this.shadow = new GameObject({
      x: config.x || 4,
      y: config.y || 5,
      src: "images/characters/shadow.png"
    })
  // set up motion parameters
    this.direction = "down"
    this.movinProgressRemaining = 0;
    this.directionUpdate = {
      up: ["movey", -1 ], 
      down: ["movey", 1 ], 
      left: ["movex", -1 ], 
      right: ["movex", 1 ], 
    }
  }

  update(state){
    if( this.isPlayer && this.movinProgressRemaining === 0  && state.arrow){
      this.direction = state.arrow
      this.movinProgressRemaining = 16;
    }
    this.updatePosition()

  }

  updatePosition(){
    if(this.movinProgressRemaining > 0 ){
      const [ property ,change ] = this.directionUpdate[this.direction]
      this[property](change);
      this.movinProgressRemaining -= 1;
    }
  }

  movex(x){
    this.shadow.x = this.shadow.x + x * 0.0625
    this.hero.x = this.shadow.x
  }
  movey(y){
    this.shadow.y = this.shadow.y + y * 0.0625
    this.hero.y = this.shadow.y
  }

  draw(ctx){
    this.shadow.sprite.draw(ctx);
    this.hero.sprite.draw(ctx);
  }
}
