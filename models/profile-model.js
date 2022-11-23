const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  profile_1: {
    type: String,
  },
  profile_2: {
    type: String,
  },
  profile_3: {
    type: String,
  },
  profile_4: {
    type: String,
  },
});

mongoose.model('Profile', profileSchema);
