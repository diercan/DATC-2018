
const express = require('express');
const app = express();

//sockets
var io = require('socket.io');
var http = require('http');

//database
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var server =http.createServer(app).listen(3000);
console.log("Server is listening on port 3000");
io = io.listen(server); 


app.use(express.static('public'));
app.use('*/css',express.static('public'));
app.set('view engine', 'ejs')



app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    res.render('index');
  })




// Create connection to database
var config = 
{
    userName: 'echipa404', 
    password: 'ste5woUnces', 
    server: 'sistemirigatii.database.windows.net', 
    options:
    {
        database: 'SistemIrigatiiDb', 
        encrypt: true
    }
}


var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
          //while(1){
             //queryDatabase();
            // sleep(5000)
           //}
        }
    }
);

io.sockets.on("connection", function()
{  
  console.log("Client is conected!");
  setInterval(function(){
    queryDatabase();
}, 10000);
     
});


// io.sockets.on("querydb", function()
// {  
//   console.log("Client query");
//     queryDatabase();
     
// })

function queryDatabase()
{
    console.log('Reading rows from the Table...');
   
  
    // Read all rows from table
    var request = new Request(
        "select locatie as locatie, umiditate as umiditate, starepompa as starepompa from sistemirigatii ",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {

            var locatie=columns[0].value;
            var umiditate= columns[1].value;
            var starepompa= columns[2].value;
            
            var results= locatie+ "," + umiditate + "," +starepompa;
            results=JSON.stringify(results);
            //results=JSON.parse(results);
            console.log(results);
            io.sockets.emit("message",{locatie:locatie, umiditate:umiditate,starepompa:starepompa});

        });
       connection.execSql(request);
       
     }









 function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}