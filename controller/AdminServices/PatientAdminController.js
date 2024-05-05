const router = require('express').Router();
const Patient = require('../../Model/Patient');
const PatientAccount = require('../../Model/PatientAccount');

router.get('/getAllPatient',async(req,res)=>{
    try {
        const patientData = await Patient.find({})
        res.json(patientData)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router