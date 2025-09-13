class WebrtcController{
  constructor(config){
    this.localVideo = config.localVideo
    this.remoteVideo = config.remoteVideo

    this.signaling = config.signaling

    this.startCB: config.startCB
    this.stopCB: config.stopCB

    this.ps = null
    this.localstream = null
  }


  init(){

  }

  async start(){
    this.localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    this.localVideo.srcObject = this.localStream;
    if(typeof this.startCB === 'function' ){
      this.startCB()
    }
    //  this.signaling.postMessage({type: 'ready'});

  }

  async stop(){  
    this.hangup();
    this.signaling.postMessage({type: 'bye'});    
  }

async function hangup() {
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    this.localStream.getTracks().forEach(track => track.stop());
    this.localStream = null;
    if(typeof this.startCB === 'function' ){
      this.startCB()
    }

};

}
