const router = require('express').Router();
const Physician = require('../../Model/Physician');
const physicianAccountModel = require('../../Model/PhysicianAccount');
const bcrypt = require('bcrypt');
router.get('/getAllPhysician',async (req,res)=>{
    try {
        const response = await Physician.find({});

        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/addNewPhysician',async (req,res)=>{
    try {
        const {   
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt,
            userRoles,
            password,
            email

        } = req.body

        const response = await Physician.create({
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt
        })
        if(response){


            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const  PhysicianAccount = await physicianAccountModel.create({
                email,
                password:hashPassword,
                userRoles:userRoles,
                userId : response._id
            })
            if(PhysicianAccount){
                res.status(201).json({message:"Physician Added !"})
            }
        }
    } catch (error) {
        console.log(error)
    }   
})
router.put('/editPhysicianInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id ;
        const {   
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt
        } = req.body

            const updateResult = await Patient.findByIdAndUpdate({_id:id},{
                firstName,
                lastName,
                contactNumber,
                sex,
                assignedAt
            },{new:true});
            if(updateResult){
                res.status(201).json({message:"Update success ! "})
            }
    } catch (error) {
        console.log(error)
    }
})
router.delete('/deletePhysicianInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id;
      
        const deletePhysician = await Physician.findByIdAndDelete(id)
        if(deletePhysician){
            res.status(201).json(deletePhysician)
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getAllPhysicianAccount', async (req,res)=>{
    try {
        const accounts = await physicianAccountModel.find({});
        res.status(201).json(accounts);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router
