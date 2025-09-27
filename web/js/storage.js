class Storage{
  constructor(){

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
}
