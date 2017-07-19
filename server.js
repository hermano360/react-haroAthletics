var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configureStripe = require('stripe');

//Create out app
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

var stripe = configureStripe('sk_test_Ln4I7mzcg3YZ0CwM3tOo5QWs');
var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/checkout', function (req,res,next){
  stripe.charges.create(req.body,postStripeCharge(res));
})

app.listen(PORT,function(){
  console.log('Express server is up on port ' + PORT);
});
