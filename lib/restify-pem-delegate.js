function authConfigFromPEMResponse(pemError, pemKeys){
  pemError && console.error(pemError)

  return pemKeys ? {
    key: pemKeys.serviceKey,
    cert: pemKeys.certificate,
    requestCert: false,
    rejectUnauthorized: false
  } : {}
}

module.exports = {
  authConfigFromPEMResponse: authConfigFromPEMResponse
}
