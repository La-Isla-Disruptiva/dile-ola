class WebrtcController{
  constructor(config){
    this.localVideo = config.localVideo
    this.remoteVideo = config.remoteVideo

    this.signaling = config.signaling

    this.ps = null
    this.localStream = null

    this.emitters = {
       start: [],
       stop: []
    }

  }
  
  get isConnected(){
    if(this.pc){
      return true
    }
    return false
  }
  
  init(){

  }

  on(type, callback){
    this.emitters[type].push(callback)
  }

  async start(){
    //console.log("starting webrtc")
    //console.log(navigator.permissions)
    this.localStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    this.localVideo.srcObject = this.localStream;
    if(typeof this.startCB === 'function' ){
      this.startCB()
    }
  }

  async invite(uuid){
    await this.start()
    this.signaling.postMessage({
      uuid: uuid,
      data: {type: 'invite'}
    });
  }

  connect(uuid){
    this.signaling.postMessage({ 
      uuid: uuid,  
      data: {type: 'ready'}
    });

  }

  async disconnect(uuid){  
    this.hangup();
    this.signaling.postMessage({
      uuid: uuid, 
      data: { type: 'bye' }
//      ,type: 'bye'
    });    
  }

  async hangup() {
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

  async accept(uuid){
    await this.start()
    this.signaling.postMessage({
      uuid: uuid,
      data: {type: 'ready'}
    });
    
  }

async createPeerConnection(uuid) {
  this.pc = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
  this.pc.onicecandidate = e => {
    //console.log("candidate out ")
    //console.log(e.candidate)
    const message = {
      type: 'candidate',
      candidate: null
    };
    if (e.candidate) {
      message.candidate = e.candidate.candidate;
      message.sdpMid = e.candidate.sdpMid;
      message.sdpMLineIndex = e.candidate.sdpMLineIndex;
    }
      //console.log("createPeerConnection target uuid: ", uuid )
      //console.log("createPeerConnection",message)
    this.signaling.postMessage({
        uuid: uuid,
//        type: "candidate",
        data: message
      });
  };
  this.pc.ontrack = e => this.remoteVideo.srcObject = e.streams[0];
  this.localStream.getTracks().forEach(track => this.pc.addTrack(track, this.localStream));
}

  async makeCall(uuid) {
    //console.log("make a call to ", uuid)
    await this.createPeerConnection(uuid);

    const offer = await this.pc.createOffer();
    this.signaling.postMessage({
//      type: "offer",
      uuid: uuid,
      data: {type: 'offer', sdp: offer.sdp}
    });
    await this.pc.setLocalDescription(offer);
  }

  async handleOffer(uuid,offer) {
    if (this.pc) {
      //console.error('existing peerconnection');
      return;
    }
    await this.createPeerConnection(uuid);
    await this.pc.setRemoteDescription(offer);

    const answer = await this.pc.createAnswer();
    this.signaling.postMessage({
//      type: 'answer',
      uuid: uuid, 
      data: {type: 'answer', sdp: answer.sdp}
    });
    await this.pc.setLocalDescription(answer);
  }

  async handleAnswer(answer) {
    if (! this.pc) {
    //  console.error('no peerconnection');
      return;
    }
    await this.pc.setRemoteDescription(answer);
  }
  async handleCandidate(candidate) {
    //console.log("candidate in ")
    //console.log(candidate)
    if (!this.pc) {
      console.error('no peerconnection');
      return;
    }
    if (!candidate.candidate || candidate.candidate === null || candidate.candidate === undefined) {
      await this.pc.addIceCandidate({});
    } else {
      await this.pc.addIceCandidate(candidate);
    }
  }
}
