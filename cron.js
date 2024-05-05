const BloodLettingActivityModel = require("./Model/ActivityModel");

const checkDate = async () => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const updatedStatus = await BloodLettingActivityModel.updateMany(
      
        {
          $and: [
            { dateFrom: { $lt: formattedDate } },
            // Add your additional condition(s) here
            { status: 'On-going' },
          ],
        },
        { $set: { status: 'Ended' } }
      );
      console.log('Cron Job Result:',  formattedDate);
      console.log('Cron Job Result:',  updatedStatus);
    // Add your logic to process the results or take actions based on the data

  } catch (error) {
    console.error('Cron Job Error:', error);
  }
};

module.exports = checkDate;