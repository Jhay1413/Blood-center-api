const donationModel = require('../Model/DonationModel');

const router = require('express').Router();


router.post('/addNewDonation',async(req,res)=>{

    const {donor,bloodType,quantity,date,bloodCenter} = req.body
    try{
        const newDonation = await donationModel.create({
            donor:donor,
            bloodType: bloodType,
            quantity:quantity,
            date:date,
            bloodCenter:bloodCenter

        })
        const returnData = await donationModel.findById(newDonation._id).populate('donor').populate('bloodCenter')
        if(newDonation){
            res.status(201).json(returnData);
        }
    }catch (error){
        console.log(error);
    }
})

router.get('/getAllDonations',async (req,res)=>{
    try {
        const allDonation = await donationModel.find({}).populate('donor').populate('bloodCenter');
        if(allDonation){
            res.status(201).json(allDonation)
        }
    } catch (error) {
        console.log(error);
    }
})
router.delete('/deleteDonation/:id',async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const deletedDonation = await donationModel.findByIdAndDelete(id);
        if(deletedDonation){
            res.status(201).json({message:"successfully Deleted !",data:deletedDonation})
        }
     
    } catch (error) {
        console.log(error);
    }
})
module.exports = router