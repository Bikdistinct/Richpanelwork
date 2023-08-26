const mongoose = require('mongoose');
const { Monthly, Yearly } = require('./plan');
// const Monthly = require('../models/monthly'); // Adjust the path accordingly
// const Yearly = require('../models/yearly'); // Adjust the path accordingly
const { MonthlySubscription, YearlySubscription } = require('../models/Subscribtion'); // Adjust the path accordingly
// Connect to your MongoDB database
mongoose.connect('mongodb+srv://bikram:bikramMongo@cluster1.2bodz6h.mongodb.net/richpanel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// // Save Monthly plans
// Monthly.insertMany(Monthly)
//   .then(() => {
//     console.log('Monthly plans saved successfully');
//   })
//   .catch((error) => {
//     console.error('Error saving monthly plans:', error);
//   });

// // Save Yearly plans
// Yearly.insertMany(Yearly)
//   .then(() => {
//     console.log('Yearly plans saved successfully');
//   })
//   .catch((error) => {
//     console.error('Error saving yearly plans:', error);
//   });



const saveDataToMongoDB = async () => {
  try {
    await MonthlySubscription.insertMany(Monthly);
    await YearlySubscription.insertMany(Yearly);
    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

saveDataToMongoDB();

