"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ContactSeeds = require("../helpers/ContactSeeds");

var _ContactSeeds2 = _interopRequireDefault(_ContactSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; //màj 30/10 à 13h35

// Model de la route '/contacts'

var Schema = new _mongoose2.default.Schema({
  firstName: { type: String }, // le prénom de l'étudiant
  lastName: { type: String }, // le nom de l'étudiant
  promo: { type: Number }, // l'année de diplomation
  email: { type: String }, // le mail de l'étudiant
  phone: { type: String }, // le numéro de téléphone de l'étudiant
  photo: { type: String }, // l'url de la photo
  createdAt: { type: Date }, // la date de création de la fiche contact
  updatedAt: { type: Date } // la date de modification de la fiche contact
});

var Model = _mongoose2.default.model('Contact', Schema);

exports.default = {
  seedContacts: function seedContacts() {
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _ContactSeeds2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var contact = _step.value;

        promises[promises.legth] = Model.create(contact);
      }
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

    return Promise.all(promises);
  },

  getContacts: function getContacts() {
    return Model.find({}).exec();
  },

  getContact: function getContact(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createContact: function createContact(contact) {
    return Model.create({
      firstName: contact.firstName,
      lastName: contact.lastName,
      promo: contact.promo,
      email: contact.email,
      phone: contact.phone,
      photo: contact.photo,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  updateContact: function updateContact(_id, contact) {
    return Model.findOneAndUpdate({ _id: _id }, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      promo: contact.promo,
      email: contact.email,
      phone: contact.phone,
      photo: contact.photo,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { upsert: true }).exec();
  },

  deleteContacts: function deleteContacts() {
    return Model.remove({}).exec();
  },

  deleteContact: function deleteContact(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};