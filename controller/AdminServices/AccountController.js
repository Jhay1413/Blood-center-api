const HealthCenterAccountModel = require('../../Model/HealthCenterAccount');
const patientAccountModel = require('../../Model/PatientAccount');
const physicianAccountModel = require('../../Model/PhysicianAccount');

const router = require('express').Router();




router.get('/getAllCenterAccount', async(req,res)=>{

    try {
        const patientAcc = await patientAccountModel.find({});
        const centerAcc = await HealthCenterAccountModel.find({});
        const physicianAcc = await physicianAccountModel.find({});

        res.json([patientAcc,centerAcc,physicianAcc])
    } catch (error) {
        console.log(error);
    }

})

module.exports = router