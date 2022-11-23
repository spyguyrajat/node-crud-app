const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Profile = mongoose.model('Profile');

router.get('/', (req, res) => {
  Profile.find((err, docs) => {
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
  Profile.findById(req.params.id, (err, doc) => {
    const docJson = doc.aggregate([
      {
        $lookup: {
          from: 'payments',
          localField: 'userid',
          foreignField: 'userid',
          as: 'pay_meth',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'userid',
          foreignField: 'userid',
          as: 'profiles_all',
        },
      },
    ]);
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
  var profile = new Profile();
  profile.userid = req.body.userid;
  profile.profile_1 = req.body.profile_1;
  profile.profile_2 = req.body.profile_2;
  profile.profile_3 = req.body.profile_3;
  profile.profile_4 = req.body.profile_4;
  try {
    console.log('Adding New Profile');
    const savedPost = await profile.save();
    res.status(200).json({
      message: 'New Profile Successfully Created!',
      type: 'success',
      savedPost,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
