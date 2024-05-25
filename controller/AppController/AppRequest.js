const router = require('express').Router();
const BloodLettingActivityModel = require('../../Model/ActivityModel');
const PatientRequestModel = require('../../Model/PatientRequest');



router.get('/getRequestById/:id',async (req,res)=>{
  try {
    const request = await PatientRequestModel.find({requestId:req.params.id}).populate('patient').populate('physician')
    return request ? res.status(200).json(request) : res.status(400).send('No Request Found !')
  } catch (error) {
    console.log(error)
    res.status(400).send('Error in fetching the request !');
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