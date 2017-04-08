var express = require('express')
var router = express.Router();
var Contact = require('../models/contact')
var sequenceGenerator = require('./sequenceGenerator');


router.get('/', function (req, res, next) {
  Contact.find()
    .populate('group')
    .exec(function (err, contact) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        title: 'Success',
        obj: contact
      });
    });
});

router.post('/', function (req, res, next) {

  var maxContactId = sequenceGenerator.nextId("contacts");

  if (err || !contactId) {
    return res.status(500).json({
      title: 'Invalid  -  not found',
      error: err
    });
  }

  var contact = new Contact({
    id: maxContactId,
    name: req.body.subject,
    email: req.body.text,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  getGroupContactIds(contact.group, callback)

});


var getGroupContactIds = function (group) {
  //getGroupContactIds( group: Contact[], callback){
  if (group === null && !group) {
    callback(null, null);
  }
  var groupIds = [];
  for (var i = 0; i < group.length; i++) {
    var groupContact = group[i];
    groupIds[i] = groupContact.id;
  }

  var group = [];

  Contact.find({id: {$in: groupIds}}, {'_id': 1}, function (err, contactsIds) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    else {
      contact.save(function (err, contact) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved contact',
          obj: contact
        });
      });
    }

  });
}



router.patch('/:id', function (req, res, next) {
  contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {message: 'Contact not found'}
      });
    }
    contact.content = req.body.content;
    contact.save(function (err, contact) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated contact',
        obj: contact
      });
    });
  });

  getGroupContactIds(contact.group, callback)

});

router.delete('/:id', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {message: 'Contact not found'}
      });
    }
    contact.remove(function (err, contact) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted contact',
        obj: contact
      });
    });
  });
});

module.exports = router;

/*
 var




 */
//var groupIds = [];

//groupIds[i] = groupContact.id;
