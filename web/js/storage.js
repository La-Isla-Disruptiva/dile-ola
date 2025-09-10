class Storage{
  constructor(){

  }
 
  set uuid(value){
    localStorage.setItem("uuid", value)
  }
  get uuid(){
    return localStorage.getItem("uuid")
  }

}
