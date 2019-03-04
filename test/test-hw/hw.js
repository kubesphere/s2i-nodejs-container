var http = require('http');
var ip = process.env.KUBESPHERE_NODEJS_IP || '0.0.0.0';
var port = process.env.PORT || process.env.port || process.env.KUBESPHERE_NODEJS_PORT || 8080;

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello World!');
});
server.listen(port);

console.log("Server running on " + ip + ":" + port);
