var mongoose = require('mongoose');
//schema to our host details
var hostSchema = mongoose.Schema({
firstName:{type:String},
lastName:{type:String},
email:{type:String},
nic:{type:String},
address:{type:String},
phonenumber:{type:Number},

c_fname: {type:String},
c_lname:{type:String},
c_address:{type:String},
c_email_address: {type:String},
c_phone: {type:String},
c_order_notes:{type:String},

carId:{type:String}

});


module.exports = mongoose.model('host', hostSchema);
