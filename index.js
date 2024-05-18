require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const fileRoutes = require('./routes/fileRoutes')
const authRoutes = require('./controller/Auth')
const patientRoutes = require('./controller/patientController')
const patientRequestRoutes = require('./controller/patientRequestController')
const physicianRoutes = require('./controller/physician')
const patientAdminRoutes = require('./controller/AdminServices/PatientAdminController')
const patientRequestAdminRoutes = require('./controller/AdminServices/PatientRequestController')
const physicianAdminRoutes = require('./controller/AdminServices/PhysicianAdminController')
const healthCenterAdminRoutes = require('./controller/AdminServices/HealthCenterAdminController')
const appRequestRoutes = require('./controller/AppController/AppRequest')
const appAuthRoutes = require('./controller/AppController/AppAuth')
const accountRoutes = require('./controller/AdminServices/AccountController');
const donationRoutes = require('./controller/donation')
const resetPasswordRoutes = require('./controller/Auth/resetPassword')
const path = require('path');
const app = express();
const cron = require('node-cron');
const checkDate = require('./cron');
const http = require('http');
const io = require('socket.io')(3002,{
    cors : "*"
});


app.use(express.json())
app.use(cors())
app.use(express.static('dist'));
const port =  process.env.PORT || 3001

//  cron.schedule('*/1 * * * *', () => {
//      checkDate();
//    }, {
//      scheduled: true,
//      timezone: 'Asia/Manila', 
//    });


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo connectd: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

io.on('connection', (socket) => {
    console.log('New client connected');
    
})

app.use((req, res, next) => {
    req.io = io;
    next();
  });

  
app.use('/api/fileRoute',fileRoutes);
app.use('/api/authRoutes',authRoutes);
app.use('/api/patientRoutes',patientRoutes);
app.use('/api/patientRequestRoutes',patientRequestRoutes)
app.use('/api/physicianRoutes',physicianRoutes)

//ADMIN ROUTES
app.use('/admin/api/patientRoutes',patientAdminRoutes);
app.use('/admin/api/patientRequestRoutes',patientRequestAdminRoutes);
app.use('/admin/api/physicianRoutes',physicianAdminRoutes);
app.use('/admin/api/healthCenterRoutes',healthCenterAdminRoutes);

//APP ROUTES
app.use('/api/requestRoutes',appRequestRoutes);
app.use('/api/appAuthRoutes',appAuthRoutes);

//Donation Routes

app.use('/api/donationRoutes', donationRoutes )

app.use('/api/accountRoutes',accountRoutes);

//reset password
app.use('/api/resetAuth',resetPasswordRoutes);



module.exports = io;
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})