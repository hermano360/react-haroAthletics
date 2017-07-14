var express = require('express');
var bodyParser = require('body-parser');
var getIncidents = require('./api/getIncidents.js');
var addIncident = require('./api/addIncident.js');
var twilioText = require('./api/twilioText.js');
var sendMail = require('./api/sendMail.js')

//Create out app

var app = express();
const PORT = process.env.PORT || 3000;

//making sure traffic is through http, if not converting to http because
// openWeatherMap doesn't work with https
app.use(function(req,res,next){
  if(req.headers['x-forwarded-proto']==='https'){
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
})
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/getIncidents', function(req,res,next){
  console.log("getting incidents");
  getIncidents.connectDB(function(docs){
    res.json(docs)
  });
});
app.get('/sendText/:lat/:long', function(req,res,next){
  console.log(req.params.lat,req.params.long);
  const message = `Hello Herminio, There is a Leak located at ${req.params.long} long and ${req.params.lat} lat that requires your immediate attention.`
  //twilioText.sendText('AC722a93dc407dc8dc0747750f8765780a','3072390f3d09657456b3cd9f59d3ec1e','17655884976','7655436533',message);
  sendMail.sendEmail();
  addIncident.connectDB(req.params.long,req.params.lat);
  res.json({"message":"sent","database":"updated"});

});

app.post('/sendFeedback', function(req,res,next){
  let {lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date} = req.body;
  sendMail.sendEmail(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date);
  addIncident.connectDB(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date);
  const message = `Hello,\nThere is a ${reportType} with severity level ${level} located at approximately ${formattedAddress}`
  twilioText.sendText('AC722a93dc407dc8dc0747750f8765780a','3072390f3d09657456b3cd9f59d3ec1e','17655884976','7655436533',message);
  res.json(req.body);
})

app.get('/addressText/:address', function(req,res,next){
  console.log(req.params.address);
  const message = `Hello Herminio, There is a Leak located at ${req.params.address} that requires your immediate attention.`
  twilioText.sendText('AC722a93dc407dc8dc0747750f8765780a','3072390f3d09657456b3cd9f59d3ec1e','17655884976','7655436533',message);
  sendMail.sendEmail();
  res.json({"message":"The a text was sent with address","database":"updated"});

});

app.listen(PORT,function(){
  console.log('Express server is up on port ' + PORT);
});
