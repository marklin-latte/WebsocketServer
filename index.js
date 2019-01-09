const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const path = require('path');

app.listen(8080);

function handler (req, res) {
  fs.readFile(path.resolve('./index.html'),
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
