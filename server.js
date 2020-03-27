var express = require('express');

var http = require('http'); //to receive http request

var users = [];
var app = express();
var server = http.Server(app);

var io = require('socket.io')(server);

server.listen(3333, ()=>{
    console.log('server running at port 3333');
});


app.get('/',function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get('/styles/index.css', function(req,res){
    res.sendFile(__dirname+"/styles/index.css");
});

io.on('connection',function(socket){
    var name = "";

    socket.on('has connected', function(username){
        //create a list, add the usernames of the connected users to the list and then send the list to the ui
        name = username;
        users.push(name);

        io.emit('has connected',users); //send users to all the sockets from server, name of the socket is has connected
    });

    socket.on('disconnect', function(){
        //to remove the user from the users list when disconnected
        users.slice(users.indexOf(name), 1);
        io.emit('has disconnected', users);
    });

} );