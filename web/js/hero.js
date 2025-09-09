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
  static gridFactor = 16;
  static gridXOffset = 8;
  static gridYOffset = 18;

  constructor(config){
    this.ctx = config.ctx
    this.characterKey = config.character
    this.position = {x: 5, y: 5}
    if (! Hero.availableCharacters.includes(this.characterKey)){
       console.err("Character " + this.characterKey + " do not exist")
    }
    this.image = new Image();
    this.image.src = "images/characters/people/" + this.characterKey + ".png";

    this.shadow = new Image();
    this.shadow.src = "images/characters/shadow.png";

  }

  

  draw(ctx){
      ctx.drawImage(
        this.shadow
        ,0 // left ctx
        ,0 // top cut
        ,32 // width of cut
        ,32 // hight of cut
        ,this.position.x * Hero.gridFactor - Hero.gridXOffset
        ,this.position.y * Hero.gridFactor - Hero.gridYOffset
        ,32
        ,32
      );

      ctx.drawImage(
        this.image
        ,0 // left ctx
        ,0 // top cut
        ,32 // width of cut
        ,32 // hight of cut
        ,this.position.x * Hero.gridFactor - Hero.gridXOffset
        ,this.position.y * Hero.gridFactor - Hero.gridYOffset
        ,32
        ,32
      );
  }
}
