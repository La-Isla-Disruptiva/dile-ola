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
    this.characterKey = config.character
    if (! Hero.availableCharacters.includes(this.characterKey)){
       console.err("Character " + this.characterKey + " do not exist")
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
  }
    movex(x){
    this.shadow.x = this.shadow.x + x
    this.hero.x = this.shadow.x
  }
    movey(y){
    this.shadow.y = this.shadow.y + y
    this.hero.y = this.shadow.y
  }

  draw(ctx){
    this.shadow.sprite.draw(ctx);
    this.hero.sprite.draw(ctx);
  }
}
