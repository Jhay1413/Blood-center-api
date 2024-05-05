const router = require('express').Router();
const HealthCenter = require('../../Model/HealthCenter');
const { createCenterAccount } = require('../../helper/centerAccountHelper');
const healthCenterAccount = require('../../Model/HealthCenterAccount');
const DonorModel = require('../../Model/DonorModel');
const { createDonorAccount } = require('../../helper/donorAccountHelper');
const BloodLettingActivityModel = require('../../Model/ActivityModel');

router.post('/addNewCenter',async(req,res)=>{
    try {
        const newCenter = await HealthCenter.create(req.body);
        if(newCenter){
            res.status(201).json(newCenter)
        }
    } catch (error) {
        console.log(error);
    }

})
router.get('/getAllCenter',async(req,res)=>{
    try {
        const getCenters = await HealthCenter.find({});
        if(getCenters){
            res.status(200).json(getCenters);
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/registerUser',async(req,res)=>{
    try {
        const {email,password,userRoles,userId} = req.body;

        const newAccount = await createCenterAccount(email,password,userRoles,userId);

        if(newAccount){
            res.status(201).json(newAccount)
        }

    } catch (error) {
        console.log(error);
    }
})
router.get('/getAllCenterAccount',async (req,res)=>{
    try {
        const accounts = await healthCenterAccount.find({}).populate('userId')
        res.status(201).json(accounts)
    } catch (error) {
        console.log(error);
    }
})
//endpoint for activities

router.post('/addNewActivity',async(req,res)=>{

    const {
        activity,
        time,
        dateFrom,
        dateTo,
        status,
        address,
        location:{
            latitude,
            longitude
        },
        bloodCenter
    } = req.body
    try {
        const newActivity = await BloodLettingActivityModel.create({
            activity,
            time,
            dateFrom,
            dateTo,
            status,
            address,
            location:{
                latitude,
                longitude
            },
            bloodCenter
        })

        if(newActivity){
            const populatedDoc = await BloodLettingActivityModel.findById(newActivity._id).populate('bloodCenter');
            if(populatedDoc){
                res.status(201).json(populatedDoc)
            }
         
        }
    } catch (error) {
        console.log(error);
    }
})
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

//endpoint for donors 

router.get('/getDonors',async(req,res)=>{
    try {
        const getDonors = await DonorModel.find({});
        if(getDonors){
            res.status(200).json(getDonors);
        }
    } catch (error) {
        console.log(error)
    }
})
router.delete('/deleteActivities/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const deletedActivity = await BloodLettingActivityModel.findByIdAndDelete(id);
        if(deletedActivity){
            res.status(201).json({message:"Deleted Successfully",data: deletedActivity});
        }
    } catch (error) {
        console.log(error);
    }
})
router.post('/addNewDonor',async(req,res)=>{
    const {
        firstName,
        lastName,
        sex,
        age,
        contactNumber,
        address,
        bloodType,
        DOB,
        email,
        password,
    } = req.body
    try {
        const newDonor = await DonorModel.create({
            firstName,
            lastName,
            sex,
            age,
            contactNumber,
            address,
            bloodType,
            DOB
        })

        if(newDonor){
            const accountResponse = await createDonorAccount(email,password,newDonor._id)
            if(accountResponse){
                res.status(201).json(newDonor);
            }
            else{
                res.json("burnoks")
            }
        }
    } catch (error) {
        console.log(error);
    }
})
router.delete('/deleteDonor/:id',async(req,res)=>{
    const id = req.params.id
    try {
        const deleteData = await DonorModel.findByIdAndDelete(id);
        if(deleteData){
            res.status(201).json({message:"Data deleted !"})
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"Data deleteion unsuccessfull!"})
    }
})

router.put('/updateDonor',async(req,res)=>{
    const {_id} = req.body;
    
    try {
        const response = await DonorModel.findByIdAndUpdate({_id:_id},req.body);

        if(response){
            res.status(201).json({message:"success"})
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router