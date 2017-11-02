"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ActuSeeds = require("../helpers/ActuSeeds");

var _ActuSeeds2 = _interopRequireDefault(_ActuSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/actus'

/*
let Schema = new mongoose.Schema({
  name: { type: String },         // le nom du concert
  venue: { type: String },        // le nom de la salle
  description: { type: String },  // la description
  capacity: { type: Number },     // la capacité du show
  price: { type: Number },        // le prix
  image: { type: String },        // l'url de l'image
  date: { type: String },         // la date du concert
  lat: { type: String },          // latitude du lieu
  lng: {type: String }            // longitude du lieu
});
*/

var Schema = new _mongoose2.default.Schema({
  title: { type: String }, // le titre de l'actu
  author: { type: String }, // l'autheur de l'actu
  body: { type: String // le corps de l'artu
  } });

var Model = _mongoose2.default.model('Actu', Schema);

exports.default = {
  seedActus: function seedActus() {
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _ActuSeeds2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var actu = _step.value;

        promises[promises.legth] = Model.create(actu);
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

  getActus: function getActus() {
    return Model.find({}).exec();
  },

  getActu: function getActu(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createActu: function createActu(actu) {
    return Model.create({
      title: actu.title,
      author: actu.author,
      body: actu.body
    });
  },

  updateActu: function updateActu(_id, actu) {
    return Model.findOneAndUpdate({ _id: _id }, {
      title: actu.title,
      author: actu.author,
      body: actu.body
    }, { upsert: true }).exec();
  },

  deleteActus: function deleteActus() {
    return Model.remove({}).exec();
  },

  deleteActu: function deleteActu(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};