/* global EventSource */

(function js() {

  function subToChannelNamed(channelName) {
    var eventSource = new EventSource('/sse/' + channelName + '/foo'),
        pre = document.createElement('pre'),
        closed = false

    document.body.appendChild(pre)

    eventSource.onmessage = function(ev) {
      if(closed) return

      pre.appendChild(document.createTextNode(channelName + ': ' + ev.data))

      window.scrollTo(0, pre.clientHeight)
    }

    eventSource.addEventListener('end', function() {
      eventSource.close()
      closed = true
    }, true)

    eventSource.onerror = function(e) {
      console.error(e)
      closed = true
    }
  }

  ['qux', 'bar'].forEach(subToChannelNamed)

})()
