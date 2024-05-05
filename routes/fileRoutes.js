const router = require('express').Router();
const multer = require('multer');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId:'DO00LTXT4NUTKAV7G3P9',
    secretAccessKey:'KtGfE+26o5ln3ubMu7UXk2pm622C3KxDHHGpl+0QAiM',
    endpoint:'https://blood-donation-bucket.sgp1.digitaloceanspaces.com'
});

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/uploadToBucket',upload.single('file'),(req,res)=>{
    const file = req.file;
  /*if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Define the parameters for the file upload to your Space
  const params = {
    Bucket: 'YOUR_SPACE_NAME', // Replace with your Space's name
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read', // Make the uploaded file publicly accessible
  };

  // Upload the file to your Space
  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file to Space.');
    }

    // File was successfully uploaded, send the URL back to the client
    const fileUrl = data.Location;
    res.json({ url: fileUrl });
  });*/console.log(file)
});


router.get('/assd', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router