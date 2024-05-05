const mongoose = require('mongoose');

const DonorAccountSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Donors'
    }
})
const DonorAccountModel = mongoose.model('DonorAccount',DonorAccountSchema,'DonorAccount');
module.exports = DonorAccountModel;