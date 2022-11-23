const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Payment = mongoose.model('Payment');

// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Payments API connected Successfully',
//     type: 'success',
//   });
// });

router.get('/', (req, res) => {
  Payment.find((err, docs) => {
    if (!err) {
      res.json(docs);
      res.status(200);
    } else {
      console.log('Error in retrieving employee list :' + err);
    }
  });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Payment.findById(req.params.id, (err, doc) => {
    const docJson = doc;
    if (!err) {
      res.status(200).json({
        message: 'Payment Details for User found',
        type: 'success',
        docJson,
      });
    } else {
      console.log('Unable to find user');
      res.sendStatus(404);
    }
  });
});

router.post('/', async (req, res) => {
  console.log(req.body.mobile);
  console.log(req.body.fullName);
  var payment = new Payment();
  payment.userid = req.body.userid;
  payment.upi_id = req.body.upi;
  payment.credit_card = req.body.credit_card;
  payment.paytm = req.body.paytm;
  try {
    console.log('Adding Payment Method...');
    const savedPost = await payment.save();
    res.status(200).json({
      message: 'User Successfully added to DB',
      type: 'success',
      savedPost,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
