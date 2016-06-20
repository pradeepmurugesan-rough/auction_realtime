var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('bidUpdated', function(bid){
        console.log("======== received the message");
        console.log(bid);
        bidObj = JSON.parse(bid);
        console.log("broadcasting to the channel " + bidObj.auctionId);
        io.sockets.in(bidObj.auctionId).emit('bidUpdated', bid);
    });

    socket.on('register', function(channel){
        console.log("user joining in channel " + channel);
        socket.join(channel);
    });

});

http.listen(process.env.PORT, function(){
    console.log('listening on  ' + process.env.PORT);
});
