const mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  upi_id: {
    type: String,
  },
  credit_card: {
    type: String,
  },
  paytm: {
    type: String,
  },
});

mongoose.model('Payment', paymentSchema);
