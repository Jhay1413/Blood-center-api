const mongoose = require('mongoose');

const physicianAccountSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    userRoles:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Physician'
    }
})
const physicianAccountModel = mongoose.model('PhysicianAccountModel',physicianAccountSchema,'PhysicianAccounts');
module.exports = physicianAccountModel;