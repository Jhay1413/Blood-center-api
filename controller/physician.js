const router = require('express').Router();
const Physician = require('../Model/Physician');

router.post('/addPhysician',async(req,res)=>{
    try {
        
        const newPhysician = await Physician.create({
            firstName:"Kimberlay",
            lastName:"kim",
            contactNumber:"09345151"
        })
        console.log(newPhysician)
    } catch (error) {
        console.log(error)
    }
})
module.exports= router