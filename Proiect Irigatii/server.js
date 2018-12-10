
const express = require('express');
const app = express();
//var tediousExpress = require('express4-tedious');
var io = require('socket.io');
var http = require('http');

var server =http.createServer(app).listen(3000);
//Server listens on the port 200
io = io.listen(server); 
/*initializing the websockets communication , server instance has to be sent as the argument */
 
io.sockets.on("connection",function(socket){
    /*Associating the callback function to be executed when client visits the page and 
      websocket connection is made */
      
      var message_to_client = {
      	
        'place' : 'Botanic',
		'umitidate' : 20,
		'temperatura' : 29
      
  }

      socket.send(JSON.stringify(message_to_client)); 
      /*sending data to the client , this triggers a message event at the client side */
	    console.log('Socket.io Connection with the client established');
	    socket.on("message",function(data){
        /*This event is triggered at the server side when client sends the data using socket.send() method */
        data = JSON.parse(data);
 
        console.log(data);
        /*Printing the data */
        var ack_to_client = {
        data:"Server Received the message"
      }
      socket.send(JSON.stringify(ack_to_client));
        /*Sending the Acknowledgement back to the client , this will trigger "message" event on the clients side*/
    });
 

 
});




// var connection = { "server"  : "<<server name or ip>>",
// 	"userName": "<<user name>>",
// 	"password": "<<password>>",
// 	"options": { "encrypt": true, "database": "<<database name>>" } };

// app.use(function (req, res, next) {
//     req.sql = tediousExpress(connection);
//     next();
// });


app.use(express.static('public'));
app.use('*/css',express.static('public'));
app.set('view engine', 'ejs')



app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    res.render('index');
  })




 // router.post('/valoriSenzori', function(req, res, next) {
 //      var obj = {};
 //            console.log('body: ' + JSON.stringify(req.body));
 //            res.send(req.body);
 //    });