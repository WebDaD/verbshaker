var loadtest = require('loadtest')
var ip = require('ip')
var fs = require('fs')
var path = require('path')
var pack = require('../package.json')
const spawn = require('child_process').spawn
console.log('Starting Test-Server')
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
    result: error ? JSON.stringify(error) : result.statusCode,
    milliseconds: error ? error.requestElapsed : result.requestElapsed,
    index: error ? error.requestIndex : result.requestIndex,
    instance_index: error ? error.instanceIndex : result.instanceIndex
  }
  process.stdout.write('.')
  details.push(obj)
}
child.on('error', (message) => {
  console.log('Failed to start server process.')
})
console.log('Started Server to Test')
setTimeout(function () {
  process.stdout.write('Testing')
  loadtest.loadTest(options, function (error, result) {
    if (error) {
      child.kill('SIGHUP')
      return console.error('Got an error: %s', error)
    } else {
      child.kill('SIGHUP')
      console.log('Test Complete. Writing Results.')
      var html = '<html><head><title>LoadTest</title><link rel="stylesheet" href="../css/main.min.css"></link></head><body style="background-color:#FFF !important;padding-top: 70px; ">'

      html += '<nav class="navbar navbar-default navbar-fixed-top">'
      html += '  <div class="container-fluid">'
      html += '    <div class="navbar-header">'
      html += '      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'
      html += '        <span class="sr-only">Toggle navigation</span>'
      html += '        <span class="icon-bar"></span>'
      html += '        <span class="icon-bar"></span>'
      html += '        <span class="icon-bar"></span>'
      html += '      </button>'
      html += '      <a class="navbar-brand" href="#">LoadTest-Results</a>'
      html += '    </div>'
      html += '    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">'
      html += '      <ul class="nav navbar-nav">'
      html += '        <li><a href="#total">Total</a></li>'
      html += '        <li><a href="#latency">Latency</a></li>'
      html += '        <li><a href="#percentiles">Percentiles</a></li>'
      html += '        <li><a href="#errorcodes">errorCodes</a></li>'
      html += '        <li><a href="#details">Details</a></li>'
      html += '      </ul>'
      html += '    </div><!-- /.navbar-collapse -->'
      html += '  </div><!-- /.container-fluid -->'
      html += '</nav>'

      html += '<div class="container">'
      html += '<h1>LoadTest Results</h1>'
      html += '<h2 id="total">Total</h2>'
      html += '<table class="table table-striped table-hover">'
      html += '<tr><th>totalRequests</th><td>' + result.totalRequests + '</td></tr>'
      html += '<tr><th>totalErrors</th><td>' + result.totalErrors + '</td></tr>'
      html += '<tr><th>totalTimeSeconds</th><td>' + result.totalTimeSeconds + '</td></tr>'
      html += '<tr><th>rps</th><td>' + result.rps + '</td></tr>'
      html += '</table>'
      html += '<h2 id="latency">Latency</h2>'
      html += '<table class="table table-striped table-hover">'
      html += '<tr><th>meanLatencyMs</th><td>' + result.meanLatencyMs + '</td></tr>'
      html += '<tr><th>maxLatencyMs</th><td>' + result.maxLatencyMs + '</td></tr>'
      html += '<tr><th>minLatencyMs</th><td>' + result.minLatencyMs + '</td></tr>'
      html += '</table>'
      html += '<h2 id="percentiles">Percentiles</h2>'
      html += '<table class="table table-striped table-hover">'
      for (var key in result.percentiles) {
        if (result.percentiles.hasOwnProperty(key)) {
          html += '<tr><th>' + key + '</th><td>' + result.percentiles[key] + '</td></tr>'
        }
      }
      html += '</table>'
      html += '<h2 id="errorcodes">errorCodes</h2>'
      html += '<table class="table table-striped table-hover">'
      for (var ekey in result.errorCodes) {
        if (result.errorCodes.hasOwnProperty(ekey)) {
          html += '<tr><th>' + ekey + '</th><td>' + result.errorCodes[ekey] + '</td></tr>'
        }
      }
      html += '</table>'
      html += '<h2 id="details">Details</h2>'
      html += '<table class="table table-condensed table-striped table-hover">'
      html += '<tr><th>result</th><th>milliseconds</th><th>index</th><th>instance_index</th></tr>'

      for (var i = 0; i < details.length; i++) {
        html += '<tr>'
        html += '<td>' + details[i].result + '</td>'
        html += '<td>' + details[i].milliseconds + '</td>'
        html += '<td>' + details[i].index + '</td>'
        html += '<td>' + details[i].instance_index + '</td>'
        html += '</tr>'
      }
      html += '</table>'
      html += '</div></body></html>'
      fs.writeFileSync(path.join(__dirname, '../docs/loadtest.html'), html)
      console.log('All Done')
    }
  })
}, 2000)
