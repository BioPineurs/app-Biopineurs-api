"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _ContactModel = require("../models/ContactModel");

var _ContactModel2 = _interopRequireDefault(_ContactModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Controller de la route '/shows'
exports.default = {
  seedDb: function seedDb(req, res) {
    return Promise.all([_ContactModel2.default.deleteContacts()]).then(function (data) {
      return Promise.all([_ContactModel2.default.seedContacts()]);
    }).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};

// Récupération du model