const net = require('net');

const server = net.createServer((socket) => {
  // 'connection' listener
  console.log('success');
  socket.setTimeout(10000000000000000);
  socket.on('data', (data) => {
    console.log(data.toString());
  });
  socket.on('end', () => {
    console.log('client disconnected');
  });
  socket.write('hello\r\n');
});
server.on('error', (err) => {
  console.log('connetct');
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});