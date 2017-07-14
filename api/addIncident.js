MongoClient = require('mongodb').MongoClient;
module.exports = {

  connectDB : function(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date){
    var dbLink = 'mongodb://'+'hermano360'+':'+'f00tball'+'@'+'ds137090.mlab.com:37090/meadowlark';
    var query = {};
    MongoClient.connect(dbLink, function(err, db) {
      console.log("Successfully connected to database");
      var doc = {
        reportType,
        category,
        formattedAddress,
        moreInfo,level,
        name,
        email,
        phone,
        date,
        lat:parseFloat(lat),
        lng:parseFloat(lng),
        showInfo:false
      }
      db.collection('reports').insertOne(doc,function(err,res){
        console.log('document added');
        db.close();
      });
    });
  }
}
