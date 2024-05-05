const mongoose = require('mongoose');

const DonorInfo = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    contactNumber:{type:String,required:true},
    address: {type:String,required:true},
    age: {type:Number,required:true},
    sex:{type:String,required:true},
    DOB:{type:String,required:true},
    bloodType:{type:String,required:true},

})
const DonorModel = mongoose.model('Donors',DonorInfo,'Donors')
module.exports = DonorModel