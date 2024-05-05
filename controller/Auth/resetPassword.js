const physicianAccountModel = require("../../Model/PhysicianAccount");
const nodemailer = require('nodemailer');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const generateUniqueCode = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'detech.ubaldo@gmail.com', // Your Gmail address
      pass: 'rngqzfcutwzngmla' // Your Gmail password
    }
  });
router.post('/resetPassword',async (req,res)=>{
    const {email,newPassword} = req.body
    try {

        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword,salt);
        const response = await physicianAccountModel.findOneAndUpdate({email:email},
            {$set:{password:hashPassword}},
            {new:true});

        if(response){
            res.status(200).json({message:"Password has been changed ! "})
            console.log("123");
        }
        else{
            res.status(202).json({message:"Email dosen't exist ! "})
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}) 
router.post('/genEmailCode',async (req,res)=>{

    try {
        const {email} = req.body;
        console.log(email);

        const response = await physicianAccountModel.findOne({email});
        console.log(response);
        if(response){
             const uniqueCode = generateUniqueCode();

             const mailOptions = {
                from : 'detech.ubaldo@gmail.com',
                to:email,
                subject: "reset code",
                text:uniqueCode.toString()
             }
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                  res.status(200).json({uniqueCode});
                }
              });
        }
        else{
            res.status(202).json({message:"Email dosent exist !"})
        }
      
    
    } catch (error) {
        res.status(500).json({data:error});
    }

})

module.exports = router