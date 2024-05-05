const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PhysicianAccount = require('../Model/PhysicianAccount')
const AdminAccount = require('../Model/AdminAccount')
const healthCenterAccount = require('../Model/HealthCenterAccount')

router.post('/register',async (req,res)=>{
    try {
        const {email,password} = req.body;

        const existingUser = await PhysicianAccount.findOne({email});

        if(existingUser){
            return res.status(400).json({message:'Email already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = await PhysicianAccount.create({
           email,
           password:hashPassword,
           userRoles:'Doctor',
           userId : '652400427df012d436b13bf4'
        })
        if(newUser){
            res.status(201).send('User Successfully Registered')
        }else{
            res.status(400).json({message:'Invalid Data !'})
        }
    } catch (error) {
        console.log(error)
    }
})
/*router.post('/registerAdmin',async(req,res)=>{
    try {
        const email = "admin@gmail.com"
        const password = "2323"
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = await AdminAccount.create({
            email,
            password:hashPassword,
            userRoles:'Admin',
            userId : '652400427df012d436b13bf4'
         })
         if(newUser){
             res.status(201).send('User Successfully Registered')
         }else{
             res.status(400).json({message:'Invalid Data !'})
         }
    } catch (error) {
        console.log(error);
    }
})*/
router.post('/login',async(req,res)=>{
    try {
        const {email,password,roles} = req.body
    
        if(roles == "Doctor"){
            const user = await PhysicianAccount.findOne({email});
            if(user && (await bcrypt.compare(password, user.password))){
                const payload = {
                    accountId: user._id,
                    userRoles: user.userRoles,
                    userId : user.userId
                }
                res.json({
                    _id:user._id,
                    email:user.email,
                    token:generateToken(payload)
                })
            }
            else{
                res.status(400).json("Incorrect username or password")
            }
        }
        else if(roles == "HealthCenter"){
            const user = await healthCenterAccount.findOne({email});
            if(user && (await bcrypt.compare(password, user.password))){
                const payload = {
                    accountId: user._id,
                    userRoles: user.userRoles,
                    userId : user.userId
                }
                res.json({
                    _id:user._id,
                    email:user.email,
                    token:generateToken(payload)
                })
            }
            else{
                res.status(400).json("Incorrect username or password")
            }
        }
        else if(roles == "Admin"){
            const user = await AdminAccount.findOne({email});
            if(user && (await bcrypt.compare(password, user.password))){
                const payload = {
                    accountId: user._id,
                    userRoles: user.userRoles,
                }
                res.json({
                    _id:user._id,
                    email:user.email,
                    token:generateToken(payload)
                })
            }
            else{
                res.status(400).json("Incorrect username or password")
            }
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