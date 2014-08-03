// web.js
var express = require("express");
var logfmt = require("logfmt");
var fs = require('fs');

var app = express();

app.use(logfmt.requestLogger());

var posteddata = '';
var jsonResponse;

//Recieve data from JSON file with curl command
app.post('/', function(request, response){
	
  request.on('data', function (chunk) {
      posteddata += chunk;
    });

//When All data is recieved, process the data to filter the fields
  request.on('end', function () {
    
      
        try{
            var data = JSON.parse(posteddata);
            
            var response = []; 
              
                for(var i=0; i < data['payload'].length ; i++) {
                    var desiredObject = data['payload'][i];
                     
                    if(desiredObject.drm === true && parseInt(desiredObject.episodeCount) > 0){
                    	//Creating JSON from Filtered objects
                        response.push({'image': desiredObject.image.showImage, 'slug' : desiredObject.slug, 'title' : desiredObject.title});
                    }
                   
                }
                
                jsonResponse= {'response': response};
          }
        catch(err) {
            jsonResponse = {"error": "Could not decode request: JSON parsing failed"};
        }

      console.log(jsonResponse);
  });

});

app.get('/', function(request, response){
	response.send(jsonResponse);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});