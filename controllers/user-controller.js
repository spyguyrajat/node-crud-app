const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');
const Payment = mongoose.model('Payment');

// router.get('/:id', (req, res) => {
//   Employee.findById(req.params.id, (err, doc) => {
//       if (!err) {
//           res.render("employee/addOrEdit", {
//               viewTitle: "Update Employee",
//               employee: doc
//           });
//       }
//   });
// });

// IMPLEMENT PAGINATION
router.get('/list', (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: 'invalid page number, should start with 1',
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  User.find({}, {}, query, function (err, docs) {
    if (err) {
      response = { type: 'error', message: 'Error fetching data' };
    } else {
      response = { type: 'success', message: docs };
    }
    res.json(response);
  });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id, (err, doc) => {
    const docJson = doc;
    if (!err) {
      res.status(200).json({
        message: 'User Found',
        type: 'success',
        docJson,
      });
    } else {
      console.log('Unable to find user');
    }
  });
});

router.patch('/', async (req, res) => {
  // console.log(req.body.id);
  // console.log(req.body.fullName);
  const user = await User.findByIdAndUpdate(req.body.id, {
    fullName: req.body.fullName,
  });
  const userJson = await User.findById(req.body.id);
  res.status(200).json({
    message: 'User Successfully Edited',
    type: 'success',
    userJson,
  });
});

router.post('/', async (req, res) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.userid = req.body.userid;
  user.city = req.body.city;
  try {
    console.log('Inside Add...');
    const savedPost = await user.save();
    res.status(200).json({
      message: 'User Successfully added to DB',
      type: 'success',
      savedPost,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// router.get('/list', (req, res) => {
//   User.find((err, docs) => {
//     if (!err) {
//       res.json(docs);
//       res.status(200);
//       res.render('user/list', {
//         list: docs,
//       });
//     } else {
//       console.log('Error in retrieving employee list :' + err);
//     }
//   });
// });

router.get('/', (req, res) => {
  var userJson = User.aggregate([
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
  ]).exec((err, result) => {
    if (err) {
      console.log('error', err);
    }
    if (result) {
      console.log(result[0]);
      res.status(200).json({
        message: 'User details API',
        type: 'success',
        result,
      });
    }
  });
});

router.delete('/', (req, res) => {
  User.findByIdAndRemove(req.body.id, (err, doc) => {
    const docJson = doc;
    if (!err) {
      res.status(200).json({
        message: 'User Successfully Deleted',
        type: 'success',
        docJson,
      });
    } else {
      console.log('Error in user delete :' + err);
    }
  });
});

module.exports = router;
