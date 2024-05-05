const mongoose = require('mongoose');

const patientAccountSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    userRoles:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Patients'
    }
})
const patientAccountModel = mongoose.model('PatientAccountModel',patientAccountSchema,'PatientAccounts');
module.exports = patientAccountModel;