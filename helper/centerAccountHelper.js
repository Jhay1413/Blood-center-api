const healthCenterAccount = require('../Model/HealthCenterAccount')
const bcrypt = require('bcrypt');
async function createCenterAccount (email,password,userRoles,id){
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)
        const newAccount = await healthCenterAccount.create({
            email :email,
            password : hashPassword,
            userRoles : userRoles,
            userId : id
        })
        if(newAccount){
            return newAccount
        }
        else{
            return null
        }
    } catch (error) {
        return error
    }

}
module.exports= {
    createCenterAccount
}