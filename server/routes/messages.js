var express = require('express')
var router = express.Router();
var Message = require('../models/message')
var sequenceGenerator = require('./sequenceGenerator');


router.get('/', function (req, res, next) {
  Message.find()
    .populate('sender') //pass 1 param the property you want to populate
    .exec(function (err, message) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Message sccessfully retrieved',
        obj: message
      });
    });
});

router.post('/', function (req, res, next) {

  var maxMessageId = sequenceGenerator.nextId("messages");

  Contact.findOne({'id': req.body.sender.id}, {'_id': 1}, function (err, contactId) {
    if (err || !contactId) {
      return res.status(500).json({
        title: 'Invalid sender - sender not found',
        error: err
      });
    }

    var message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      text: req.body.text,
      sender: contactId
    });
    message.save(function (err, result) {
      res.setHeader('Content-Type', 'application/json');
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

router.patch('/:id', function (req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.content = req.body.content;
    message.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
