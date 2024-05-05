const mongoose = require('mongoose')
const getPhilippineTime = () => {
    const currentDate = new Date();
  const utcTime = currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
  const timezoneOffset = 8 * 60 * 60 * 1000; // UTC+8 in milliseconds
  return new Date(utcTime + timezoneOffset);
  };

const PatientRequestSchema = new mongoose.Schema({
    requestId:{type:String,required:true},
    bloodType:{type:String,required:true},
    fileKey : {type:String,required:true},
    bucket : {type:String,required:true},
    status : {type:String,required:true},
    physician:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Physician'
    },
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Patients'
    },
    approvedBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'HealthCenter'
    },
    Date:{
        type:Date,
        default:getPhilippineTime
    }
})
const PatientRequestModel = mongoose.model('PatientRequest',PatientRequestSchema,'PatientRequest')
module.exports = PatientRequestModel