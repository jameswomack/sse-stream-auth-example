var SSEStream = require('sse-stream-auth')

function authenticationResolver(request, response, done){
  // error, response, body
  done(null, {}, {})
}

module.exports = function restifySSE(SSEServer, ssePath){
  var sseStreamConfig = { path: ssePath || '/sse', create: true };
  process.env.SECURE_COOKIE &&
    (sseStreamConfig.authenticationResolver = authenticationResolver)

  var sseStream = SSEStream(sseStreamConfig)
  sseStream.install(SSEServer.server)
  return sseStream
}
