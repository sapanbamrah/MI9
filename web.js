// web.js
var express = require("express");
var logfmt = require("logfmt");
var fs = require('fs');

var app = express();

app.use(logfmt.requestLogger());

// reference the http module so we can create a webserver
var posteddata = '';
app.post('/', function(request, response){
	
  request.on('data', function (chunk) {
      posteddata += chunk;
    });

  request.on('end', function () {
    var jsonResponse;
      
        try{
            var data = JSON.parse(posteddata);
            
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
            jsonResponse = {"error": err};
        }

      console.log(jsonResponse);
  });

});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});