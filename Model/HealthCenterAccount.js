const mongoose = require('mongoose');

const HealthCenterAccountSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    userRoles:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'HealthCenter'
    }
})
    
const HealthCenterAccountModel = mongoose.model('CenterAccount',HealthCenterAccountSchema,'CenterAccount');
module.exports = HealthCenterAccountModel;