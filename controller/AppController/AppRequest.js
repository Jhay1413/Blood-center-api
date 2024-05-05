const router = require('express').Router();
const BloodLettingActivityModel = require('../../Model/ActivityModel');
const PatientRequestModel = require('../../Model/PatientRequest');



router.get('/getRequestById/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const allRequestData = await PatientRequestModel.findById(id).populate('patient').populate('physician').populate('approvedBy');
        res.status(200).json(allRequestData)
    } catch (error) {
      console.log(error)
    }
  })
//Activities Endpoint
  router.get('/getActivities',async(req,res)=>{
    try {
        const activities = await BloodLettingActivityModel.find({});
        if(activities){
            res.status(200).json(activities);
        }
    } catch (error) {
        console.log(error)
    }
})

  module.exports = router