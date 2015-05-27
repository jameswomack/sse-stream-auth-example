var SSEStream = require('sse-stream-auth')

function authenticationResolver(request, response, done){
  // error, response, body
  done(null, {}, {})
}

module.exports = function restifySSE(SSEServer, ssePrefixes){
  var sseStreamConfig = { create: true };
  ssePrefixes && (sseStreamConfig.prefixes = ssePrefixes);
  process.env.SECURE_COOKIE &&
    (sseStreamConfig.authenticationResolver = authenticationResolver)

  var sseStream = SSEStream(sseStreamConfig)
  sseStream.install(SSEServer.server)
  return sseStream
}
