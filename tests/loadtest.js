var loadtest = require('loadtest')
var ip = require('ip')
var fs = require('fs')
var path = require('path')
var pack = require('../package.json')
const spawn = require('child_process').spawn
const child = spawn('node', ['app.js'])
var details = []
var options = {
  url: 'http://' + ip.address() + ':' + pack.config.port,
  maxRequests: 10000,
  concurrency: 20,
  maxSeconds: 60,
  requestsPerSecond: 5,
  statusCallback: statusCallback
}
function statusCallback (latency, result, error) {
  var obj = {
    current_latency: latency,
    result: error ? JSON.stringify(error) + result.toString() : result,
    milliseconds: error ? error.requestElapsed : result.requestElapsed,
    index: error ? error.requestIndex : result.requestIndex,
    instance_index: error ? error.instanceIndex : result.instanceIndex
  }
  details.push(obj)
}
child.on('error', (message) => {
  console.log('Failed to start child process.')
})
loadtest.loadTest(options, function (error, result) {
  if (error) {
    child.kill('SIGHUP')
    return console.error('Got an error: %s', error)
  } else {
    child.kill('SIGHUP')
    var html = '<html><head><title>LoadTest</title></head><body>'
    html += '<h1>LoadTest</h1>'
    html += '<h2>Total</h2>'
    html += '<table>'
    html += '<tr><th>totalRequests</th><td>' + result.totalRequests + '</td></tr>'
    html += '<tr><th>totalErrors</th><td>' + result.totalErrors + '</td></tr>'
    html += '<tr><th>totalTimeSeconds</th><td>' + result.totalTimeSeconds + '</td></tr>'
    html += '<tr><th>rps</th><td>' + result.rps + '</td></tr>'
    html += '</table>'
    html += '<h2>Latency</h2>'
    html += '<table>'
    html += '<tr><th>meanLatencyMs</th><td>' + result.meanLatencyMs + '</td></tr>'
    html += '<tr><th>maxLatencyMs</th><td>' + result.maxLatencyMs + '</td></tr>'
    html += '<tr><th>minLatencyMs</th><td>' + result.minLatencyMs + '</td></tr>'
    html += '</table>'
    html += '<h2>Percentiles</h2>'
    html += '<table>'
    for (var key in result.percentiles) {
      if (result.percentiles.hasOwnProperty(key)) {
        html += '<tr><th>' + key + '</th><td>' + result.percentiles[key] + '</td></tr>'
      }
    }
    html += '</table>'
    html += '<h2>errorCodes</h2>'
    html += '<table>'
    for (var ekey in result.errorCodes) {
      if (result.errorCodes.hasOwnProperty(ekey)) {
        html += '<tr><th>' + ekey + '</th><td>' + result.errorCodes[ekey] + '</td></tr>'
      }
    }
    html += '</table>'
    html += '<h2>Details</h2>'
    html += '<tr><th>current_latency</th><th>result</th><th>milliseconds</th><th>index</th><th>instance_index</th></tr>'
    html += '<table>'
    for (var i = 0; i < details.length; i++) {
      html += '<tr>'
      html += '<td>' + details[i].current_latency + '</td>'
      html += '<td>' + details[i].result + '</td>'
      html += '<td>' + details[i].milliseconds + '</td>'
      html += '<td>' + details[i].index + '</td>'
      html += '<td>' + details[i].instance_index + '</td>'
      html += '</tr>'
    }
    html += '</table>'
    html += '</body></html>'
    fs.writeFileSync(path.join(__dirname, '../docs/loadtest.html'), html)
    console.log('Tests run successfully')
  }
})
