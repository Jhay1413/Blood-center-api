const PatientAccount = require('../Model/PatientAccount')
const bcrypt = require('bcrypt');
async function createPatientAccount (email,password,userRoles,id){
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)
        const newAccount = await PatientAccount.create({
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
    createPatientAccount
}