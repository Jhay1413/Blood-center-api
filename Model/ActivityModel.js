const mongoose  = require('mongoose');

const BloodLettingActivitySchema = new mongoose.Schema({
    activity : {type:String,require:true},
    address:{type:String,require:true},
    location:{
        latitude:{type:Number,require:true},
        longitude:{type:Number,require:true},
    },
    time:{type:String,require:true},
    dateFrom:{type:String,require:true},
    dateTo:{type:String,require:true},
    status:{type:String,require:true},
    bloodCenter:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'HealthCenter'
    }
   
});
const BloodLettingActivityModel = mongoose.model('Activity',BloodLettingActivitySchema,'Activity')
module.exports = BloodLettingActivityModel;