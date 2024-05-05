const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Donors'
    },
    bloodType : {type:String,required:true},
    quantity:{type:String,required:true},
    date:{type:String,required:true},
    bloodCenter:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'HealthCenter'
    }

    
})
const donationModel = mongoose.model('Donation',DonationSchema,'Donation');
module.exports = donationModel;