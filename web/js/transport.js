class Transporter {
  constructor(config){
    this.hostname= config.hostname
    this.port     = config.port
    this.protocol = config.protocol
   
    this.uuid     = config.uuid || "1234"
    this.password = config.password || "start"

    this.socket   = null
    this.isConnected = false
    //this.connectionFailed = 0
  }
  init(){
    this.socket = new WebSocket(this.protocol + "://" + this.hostname + ":" + this.port)
    console.log(this.socket)
    // OPEN
    this.socket.onopen = (e) => {
      const msg = {
        password: this.password,
        uuid: this.uuid,
        ckey: "any",
        x:   "0" ,
        y:    "0"
      }
      this.socket.send(JSON.stringify(msg));
      this.isConnected = true
      console.log("connection", this.socket)
    }
    // ERROR
    this.socket.onerror = (e) => {
      console.log("transport error: ",e)
    }
    // CLOSE
    this.socket.onclose = (e) => {
      if (e.wasClean) {
        console.log(`connection closed (code=${e.code} reason=${e.reason})`)
      }else{
        console.log("connection died", e)
      }
    }
    // RECEIVED
    this.socket.onmessage = (e) => {
      console.log("data received", e)
    }
  }

    update(pos){
      if ( ! this.isConnected ) { return }
      const msg = {
        password: this.password,
        uuid: this.uuid,
        ckey: pos.ckey,
        x:    pos.x,
        y:    pos.y
      }
      console.log("msg", msg)
      console.log("socket", this.socket)
      this.socket.send(JSON.stringify(msg)); 
  }

}
