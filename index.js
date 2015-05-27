var RestifyServer = require('./lib/restify-static-server'),
    PEM = require('pem')

if(process.env.SECURE_COOKIE){
  PEM.createCertificate({days:1, selfSigned:true}, function(pemError, pemKeys){
    RestifyServer(pemError, pemKeys)
  })
}else{
  RestifyServer()
}
