const net = require('net');
const HOST = '192.168.4.1';
const PORT = 333;
// const HOST = 'localhost';
// const PORT = 8124;

var client;
//var socket_exist = false;


client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('connected to server!');
    socket_exist = true;
});
client.on('data', (data) => {
    console.log(data.toString());
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
    // socket_exist = false;
    // initClient();
    console.log('connected to server!');
});
client.on('error', (e) => {
      console.log(e);
}) 

// initClient();
// function initClient(){
//     client = new net.Socket();
//     client.connect(PORT, HOST, function() {
//         console.log('connected to server!');
//         socket_exist = true;
//     });
//     client.on('data', (data) => {
//         console.log(data.toString());
//         // client.end();
//     });
//     client.on('end', () => {
//         console.log('disconnected from server');
//         socket_exist = false;
//         initClient();
//         console.log('connected to server!');
//     });
//     client.on('error', (e) => {
//           console.log(e);
//     }) 
// }

function rotateStr(typei, dir) {
    let type;
    switch(typei) {
        case 'front': type = 'F';break;
        case 'back': type = 'B';break;
        case 'top': type = 'U';break;
        case 'bottom': type = 'D';break;
        case 'left': type = 'L';break;
        case 'right': type = 'R';break;
    }
    let count;
    count = dir === 0 ? 1:3;
    return '$' + type + count + '~';
}

function sendRotate(type, dir) {
    // while(!socket_exist){};
    // client.connect(PORT, HOST, function() {
    //     console.log('connected to server!');
    //     client.write(rotateStr(type, dir));
    //     console.log(rotateStr(type, dir));
    //     socket_exist = true;
    // });
    client.write(rotateStr(type, dir));
    console.log(rotateStr(type, dir));

}

function sendRecover(recover_str) {
    // while(!socket_exist){};
    client.write(recover_str);
    // client.on('data', (data) => {
    //     console.log(data.toString());
    //     // client.end();
    // });
    // client.on('end', () => {
    //     console.log('disconnected from server');
    //     socket_exist = false;
    //     initClient();
    //     console.log('connected to server!');
    // });
    // client.on('error', (e) => {
    //       console.log(e);
    // }) 
    console.log(recover_str);
}

module.exports = {
    sendRotate: sendRotate,
    sendRecover: sendRecover
};