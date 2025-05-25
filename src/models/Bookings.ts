import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  carMake: {
    type: String,
    required: [true, 'Car make is required']
  },
  carModel: {
    type: String,
    required: [true, 'Car model is required']
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  }
}, {
  timestamps: true
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;