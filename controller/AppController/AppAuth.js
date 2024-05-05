const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DonorAccountModel = require('../../Model/DonorAccount');

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
    
            const user = await DonorAccountModel.findOne({email}).populate('userId');
            if(user && (await bcrypt.compare(password, user.password))){
                const payload = {
                    accountId: user._id,
                    userRoles: user.userRoles,
                    userId:user.userId._id,
                
                }
                res.json({
                    _id:user._id,
                    email:user.email,
                    token:generateToken(payload)
                })
            }
            else{
                res.status(500).json("Incorrect username or passwosssrd")
            }
        
    } catch (error) {
        console.log(error)
    }
})

const generateToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'1hr'
    })
}
     
module.exports = router