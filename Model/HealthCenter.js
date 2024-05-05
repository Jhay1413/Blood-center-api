const mongoose  = require('mongoose');

const healthCenterSchema = new mongoose.Schema({
    name : {type:String,require:true},
    address:{type:String,require:true},
    contact:{type:String,require:true},
    bloodTypeInventory: {
        A_positive: { type: Number, default: null },
        A_negative:{ type: Number, default: null },
        B_positive:{ type: Number, default: null },
        B_negative:{ type: Number, default: null },
        AB_positive:{ type: Number, default: null },
        AB_negative:{ type: Number, default: null },
        O_positive:{ type: Number, default: null },
        O_negative:{ type: Number, default: null },
    },
});
const healthCenterModel = mongoose.model('HealthCenter',healthCenterSchema,'HealthCenter')
module.exports = healthCenterModel