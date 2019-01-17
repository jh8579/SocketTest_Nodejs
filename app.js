// 3000 포트로 소켓을 연다
var io = require('socket.io').listen(3000);
console.log("socket server connected 3000 port")

// connection이 발생할 때 핸들러를 실행한다.
io.sockets.on('connection', function (socket) {
    var header = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
    //var header1 = client.handshake.headers['x-forwarded-for'] || client.handshake.address.address;

    console.log('user connected');
    console.log(socket.handshake.headers)

    // 클라이언트로 news 이벤트를 보낸다.
    socket.emit('news', { hello: 'world' }), function(){
        console.log('sending')
    };

    // 클라이언트에서 my other event가 발생하면 데이터를 받는다.
    socket.on('my other event', function (data) {  
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});