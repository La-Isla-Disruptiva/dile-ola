class Storage{
  constructor(){

        this.emitters = {}
  }
 
  set uuid(value){
    localStorage.setItem("uuid", value)
  }
  get uuid(){
    return localStorage.getItem("uuid")
  }

  set name(value){
    localStorage.setItem("name", value)
  }
  get name(){
    return localStorage.getItem("name") || ""
  }

  set maternalLanguage(value){
    localStorage.setItem("maternalLanguage", value)
  }
  get maternalLanguage(){
    return localStorage.getItem("maternalLanguage") || ""
  }

  set learningLanguage(value){
    localStorage.setItem("learningLanguage", value)
  }
  get learningLanguage(){
    return localStorage.getItem("learningLanguage") || ""
  }
  set character(value){
    localStorage.setItem("character", value)
    if(this.emitters["character"] != undefined){
        this.emitters["character"].forEach((fn) =>{
          fn(value)
        })
      }
  }
  get character(){
    return localStorage.getItem("character") || "laura"
  }

  oni(type , callback){

    if( ! (type in this.emitters) ){
      this.emitters[type] = []
    }
    this.emitters[type].push(callback)

  }
}
