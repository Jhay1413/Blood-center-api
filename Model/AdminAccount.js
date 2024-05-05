const mongoose = require('mongoose');

const adminAccountSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    userRoles:{type:String,required:true},
    
})
const adminAccountModel = mongoose.model('adminAccountModel',adminAccountSchema,'adminAccounts');
module.exports = adminAccountModel;