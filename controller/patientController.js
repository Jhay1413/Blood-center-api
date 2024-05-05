const router = require('express').Router();
const Patient = require('../Model/Patient');
const PatientAccount = require('../Model/PatientAccount');
const { createPatientAccount } = require('../helper/patientAccountHelper');


router.post('/insertPatientInfo',async(req,res)=>{
    const {
        firstName,
        lastName,
        sex,
        age,
        contactNumber,
        address,
        email,
        password,
        userRoles
    } = req.body
    try {  
       
        const newPatient = await Patient.create({
            firstName,
            lastName,
            sex,
            age,
            contactNumber,
            address
        })
        if(newPatient){
            /*const accountResponse = await createPatientAccount(email,password ,userRoles,newPatient._id)
            if(accountResponse){
              
            }
            else{
                res.json("burnoks")
            }*/
            res.status(201).json({message:'User Created Successfully'});
        }
       
    } catch (error) {
        console.log(error)
    }

})
router.delete('/deletePatientInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id;
      
        const deletePatient = await Patient.findByIdAndDelete(id)
        if(deletePatient){
            const deleteAccount = await PatientAccount.findOneAndDelete({userId:id})
            if(deleteAccount){
                res.status(201).json({message:'Patient Deleted !'})
            }
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getAllPatient',async (req,res) =>{
    try {
        const patientData = await Patient.find({})
        res.json(patientData);
    } catch (error) {
        
    }
})
router.put('/editPatientInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id ;
        const {   
            firstName,
            lastName,
            sex,
            age,
            contactNumber,
            address} = req.body

            const updateResult = await Patient.findByIdAndUpdate({_id:id},{
                firstName,
                lastName,
                sex,
                age,
                contactNumber,
                address
            },{new:true});
            if(updateResult){
                res.status(201).json({message:"Update success ! "})
            }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router