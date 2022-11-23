const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  userid: {
    type: String,
  },
  city: {
    type: String,
  },
  // payment_methods: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: 'Payments',
  //   },
  // ],
  // profiles: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: 'Profiles',
  //   },
  // ],
});

mongoose.model('User', userSchema);
