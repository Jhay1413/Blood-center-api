const router = require('express').Router();
const BloodLettingActivityModel = require('../../Model/ActivityModel');
const PatientRequestModel = require('../../Model/PatientRequest');




router.get('/getRequestById/:id',async (req,res)=>{
  try {
      const id = req.params.id
      const allRequestData = await PatientRequestModel.findOne({requestId:id}).populate('patient').populate('physician').populate('approvedBy');
      res.status(200).json(allRequestData)
  } catch (error) {
    console.log(error)
  }
})
//Activities Endpoint
router.get('/getActivities',async(req,res)=>{
  try {
      const activities = await BloodLettingActivityModel.find({}).populate('bloodCenter');
      if(activities){
          res.status(200).json(activities);
      }
  } catch (error) {
      console.log(error)
  }
})
router.get('/getAllDonors',async(req,res)=>{
try {
    const activities = await DonorModel.find({});
    if(activities){
        res.status(200).json(activities);
    }
} catch (error) {
    console.log(error)
}
})
router.get('/getAllPatient',async(req,res)=>{
try {
    const activities = await PatientModel.find({});
    if(activities){
        res.status(200).json(activities);
    }
} catch (error) {
    console.log(error)
}
})
router.get('/getAllPhysician',async(req,res)=>{
try {
    const activities = await PhysicianModel.find({});
    if(activities){
        res.status(200).json(activities);
    }
} catch (error) {
    console.log(error)
}
})
router.get('/getAllCenters',async(req,res)=>{
try {
    const activities = await healthCenterModel.find({});
    if(activities){
        res.status(200).json(activities);
    }
} catch (error) {
    console.log(error)
}
})

module.exports = router