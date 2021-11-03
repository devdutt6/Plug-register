const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
   address: {
       type: String
   },
   email: {
       type: String
   },
   fullName: {
       type: String
   },
   phone: {
       type: Number
   },
   latitude: {
       type: String
   },
   longitude: {
       type: String
   },
   connector: {
       type: String
   },
   kwpower: {
       type: String
   },
   isFast: {
       type: Boolean
   },
   photo: {
       type: String
   },
   isVerified: {
       type: Boolean,
       default: false
   },
   isParkingAvailable: {
       type: Boolean,
       default: true
   },
   isParkingFree: {
       type: Boolean
   },
   parkingCharge: {
       type: Number
   },
   isAvailableAllTime: {
       type: Boolean
   },
   startTime: {
       type: String
   },
   endTime: {
       type: String
   }
})

const Station = mongoose.model('Station' , StationSchema);
module.exports = { Station };