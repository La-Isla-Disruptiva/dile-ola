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
      x: 4, y: 5,
      src: "images/characters/people/" + this.characterKey + ".png"
    })


    this.shadow = new GameObject({
      x: 4, y: 5,
      src: "images/characters/shadow.png"
    })
  }

  

  draw(ctx){
    this.shadow.sprite.draw(ctx);
    this.hero.sprite.draw(ctx);
  }
}
