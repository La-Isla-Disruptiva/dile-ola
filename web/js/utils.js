// https://stackoverflow.com/questions/1349404/generate-a-string-of-random-characters
// !!!! only for development purpose !!!!!!!!
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function uuid() {
  if ( "crypto" in window && "randomUUID" in window.crypto){
    return window.crypto.randomUUID()
  }else{
    return makeid(32)
  }
}
