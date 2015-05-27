var Path = require('path'),
    SegfaultHandler = require('segfault-handler'),
    Restify = require('restify'),
    CookieParser = require('restify-cookies'),
    merge = require('merge'),
    Config = require('../package'),
    RestifySSE = require('./restify-sse'),
    RestifyPEMDelegate = require('./restify-pem-delegate')

SegfaultHandler.registerHandler()

function createPEMAwareStaticServer(pemError, pemKeys){
  var serverAuthConfig = RestifyPEMDelegate.authConfigFromPEMResponse(pemError, pemKeys)

  var SSEServer = Restify.createServer(merge(serverAuthConfig, {
    name: Config.name,
    version: Config.version
  }))

  SSEServer.use(CookieParser.parse)

  SSEServer.get(/^\/?.*/, Restify.serveStatic({
    directory: Path.join(process.cwd(), '/public'),
    default: 'index.html'
  }))

  SSEServer.listen(Config.port || 3000, function () {
    console.info('%s running on %s', SSEServer.name, SSEServer.url);
  })

  var restifySSE = RestifySSE(SSEServer, Config.testPaths.sseListen)

  if(restifySSE){
    restifySSE.on('connection', function(client) {
      client.write('Foo ' + Date.now() + '\n')
      setInterval(function(){
        client.write('Foo ' + Date.now() + '\n')
      }, 1000)
    })
  }

  return SSEServer
}

module.exports = createPEMAwareStaticServer
