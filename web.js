// web.js
var express = require("express");
var logfmt = require("logfmt");
// reference the http module so we can create a webserver
var http = require("http");
var fs = require('fs');

var app = express();

app.use(logfmt.requestLogger());



// create a server
http.createServer(function(req, res) {
    
    var file = 'shows.json';
 
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      
      var jsonResponse;
      
        try{
            data = JSON.parse(data);
            
             var response = []; 
              
                for(var i=0; i < data['payload'].length ; i++) {
                    var desiredObject = data['payload'][i];
                     
                    if(desiredObject.drm === true && parseInt(desiredObject.episodeCount) > 0){
                        response.push({'image': desiredObject.image.showImage, 'slug' : desiredObject.slug, 'title' : desiredObject.title});
                    }
                   
                }
                
                jsonResponse= {'response': response};
          }
        catch(err) {
            jsonResponse = {"error": "Could not decode request: JSON parsing failed"};
        }
    
     
      console.dir(jsonResponse);
    });
    
res.send('Sapan Great');
 res.end('succes');

}).listen(process.env.PORT, process.env.IP);

    
    
   



app.get('/', function(req, res) {
  res.send('Hello Sapan World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});