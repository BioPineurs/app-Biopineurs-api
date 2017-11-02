"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _ContactModel = require("../models/ContactModel");

var _ContactModel2 = _interopRequireDefault(_ContactModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contacts = function contacts() {
  // On fait appel à la fonction getContacts du model
  // Celle ci renvoie tous les contacts présents en base
  return _ContactModel2.default.getContacts().then(function (data) {
    // On récupère ici data qui est une liste de contacts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noContactsError'
      throw new Error('noContactsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _contact = _step.value;

        // On parcours data. 
        response[response.length] = {
          id: _contact._id,
          firstName: _contact.firstName,
          lastName: _contact.lastName,
          promo: _contact.promo,
          email: _contact.email,
          phone: _contact.phone,
          photo: _contact.photo
        };
      }

      // Avant d'envoyer la réponse on la trie par ordre alphabétique croissant sur le champs name
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _lodash2.default.sortBy(response, 'lastName');
  });
};

// Récupération du model
// Controller de la route '/contacts'


var contact = function contact(_id) {
  // On fait appel à la fonction getContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return _ContactModel2.default.getContact(_id).then(function (data) {
    // On récupère ici data qui est une liste de contacts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noContactError'
      throw new Error('noContactError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      promo: data.promo,
      email: data.email,
      phone: data.phone,
      photo: data.photo
    };
    return response;
  });
};

var createContact = function createContact(contact) {
  // On fait appel à la fonction createContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return _ContactModel2.default.createContact(contact);
};

var updateContact = function updateContact(id, contact) {
  // On fait appel à la fonction updateContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return _ContactModel2.default.updateContact(id, contact);
};

var deleteContact = function deleteContact(id) {
  // On fait appel à la fonction deleteContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return _ContactModel2.default.deleteContact(id);
};

exports.default = {
  // Controller des views
  getContacts: function getContacts(req, res) {
    contacts().then(function (data) {
      // data contient une liste de contacts
      res.render('contact/contacts', { contacts: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getContact: function getContact(req, res) {
    contact(req.params.id).then(function (data) {
      res.render('contact/contact', { contact: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateContact: function getCreateContact(req, res) {
    res.render('contact/createContact');
  },

  postCreateContact: function postCreateContact(req, res) {
    var contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      promo: req.body.promo,
      email: req.body.email,
      phone: req.body.phone,
      photo: req.body.photo
    };

    createContact(contact).then(function (data) {
      res.redirect('/contacts');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateContact: function getUpdateContact(req, res) {
    contact(req.params.id).then(function (data) {
      res.render('contact/updateContact', { contact: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateContact: function postUpdateContact(req, res) {
    var contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      promo: req.body.promo,
      email: req.body.email,
      phone: req.body.phone,
      photo: req.body.photo
    };

    updateContact(req.params.id, contact).then(function (data) {
      res.redirect('/contacts');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteContact: function getDeleteContact(req, res) {
    deleteContact(req.params.id).then(function (data) {
      res.redirect('/contacts');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getContactsApi: function getContactsApi(req, res) {
    contacts().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de contacts
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getContactApi: function getContactApi(req, res) {
    contact(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateContactApi: function postCreateContactApi(req, res) {
    var contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      promo: req.body.promo,
      email: req.body.email,
      phone: req.body.phone,
      photo: req.body.photo
    };

    createContact(contact).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateContactApi: function postUpdateContactApi(req, res) {
    var contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      promo: req.body.promo,
      email: req.body.email,
      phone: req.body.phone,
      photo: req.body.photo
    };

    updateContact(req.params.id, contact).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteContactApi: function postDeleteContactApi(req, res) {
    deleteContact(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};