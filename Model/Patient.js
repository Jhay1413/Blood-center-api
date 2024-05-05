const mongoose = require('mongoose');

const PatientInfo = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    contactNumber:{type:String,required:true},
    address: {type:String,required:true},
    age: {type:Number,required:true},
    sex:{type:String,required:true},
})
const PatientModel = mongoose.model('Patients',PatientInfo,'Patients')
module.exports = PatientModel