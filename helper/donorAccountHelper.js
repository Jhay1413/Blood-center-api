const DonorAccountModel = require('../Model/DonorAccount');
const bcrypt = require('bcrypt');
async function createDonorAccount (email,password,id){
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)
        const newAccount = await DonorAccountModel.create({
            email :email,
            password : hashPassword,
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
    createDonorAccount
}