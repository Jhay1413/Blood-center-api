const mongoose = require('mongoose')

const PhysicianInfoSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    contactNumber:{type:String,required:true},
    assignedAt:{type:String,required:true},
    sex:{type:String,required:true}

});

const PhysicianModel = mongoose.model('Physician',PhysicianInfoSchema,'Physician');
module.exports = PhysicianModel