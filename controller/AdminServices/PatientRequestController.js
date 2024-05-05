const router = require('express').Router();
const multer = require('multer')
const PatientRequestModel = require('../../Model/PatientRequest')
const aws = require('aws-sdk');
const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const storage = multer.memoryStorage();
const upload = multer({storage});
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const Counter = require('../../Model/counter');


const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.BUCKET_ENDPOINT,
    region: "auto",
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_PRIVATE_KEY
    }
});

router.post('/addNewRequest',upload.single('file'),async (req,res)=>{

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

    const file =  req.file
    const {patientId,bloodType,quantity,physicianId} = req.body

    let counter = await Counter.findOne({ year: currentYear });
    if (!counter) {
      counter = new Counter({ year: currentYear });
    }
  
    try {
      if(!file){
        return res.status (400).send('No file uploaded.')
      }
      const params = {
        Bucket:'bloodapp',
        Key:file.originalname,
        Body:file.buffer,
        ACL:'public-read'
      }
      const data = await s3Client.send(new PutObjectCommand(params));
      
      if(data.$metadata.httpStatusCode === 200) {
            const newRequest = await PatientRequestModel.create({
                requestId :`${currentYear}-${counter.count}`,
                bloodType:bloodType,
                bloodQuantity:quantity,
                fileKey : file.originalname,
                bucket: 'bloodapp',
                physician:physicianId,
                patient:patientId
            })
            if (newRequest){
                res.status(201).json({message:'Request Created'});
                counter.count++;
            await counter.save();

            }
            else{
                res.status(400).send('Saving the Request Information failed !')
            }
      }
      else{
        res.status(400).send('Saving the file Failed !')
      }
    } catch (error) {
        console.log(error)
    }
})
router.get('/downloadRequestFile/:id',async(req,res)=>{
  const id = req.params.id
  
  try {
    const response = await PatientRequestModel.findById(id)
    if(response){
      
    const bucketParams = {
      Bucket: response.bucket,
      Key: response.fileKey
    };
       
      const s3response = await s3Client.send(new GetObjectCommand(bucketParams));

    
      if(s3response.Body){
         /*
      fs.writeFileSync(`./temp/${response.fileKey}`,data)*/
    
    
     
      res.setHeader('Access-Control-Expose-Headers', 'X-Suggested-Filename','Content-Type');

      res.setHeader('X-Suggested-Filename',response.fileKey)
      res.setHeader('Content-Type', s3response.ContentType);
      // Pipe S3 object data directly to the response
      s3response.Body.pipe(res);
     
      }
     else{
      console.log('The response does not have data');
     }
    }
  } catch (error) {
    console.log(error)
  }
})
router.get('/getAllRequest/',async (req,res)=>{
  try {
    const allRequestData = await PatientRequestModel.find({}).populate('patient').populate('physician').populate('approvedBy');
    res.status(200).json(allRequestData)
  } catch (error) {
    console.log(error)
  }

})
router.delete('/deleteRequest/:id',async (req,res)=>{
  try {
    const id = req.params
    const deleteRequest = await PatientRequestModel.findByIdAndDelete(id);
    if(deleteRequest){
      res.status(201).json({message:'Request Deleted ! '})
    }
  } catch (error) {
    console.log(error);
  }
})

router.put('/approvedRequest/:id',async (req,res)=>{
  try {
    const {id} = req.params
    const {userId} = req.body
    console.log(userId)
    
    const approveDocument = await PatientRequestModel.findByIdAndUpdate(id,{$set:{status:'Approved',approvedBy:userId}},{new:true})

    if(approveDocument) {
    
      res.status(200).json({message:'Request Updated !'});
    }
  } catch (error) {
    console.log(error);
  }
})
module.exports = router