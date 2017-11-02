'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Controller de la route '/'

exports.default = {
  // Controller des views
  getInfo: function getInfo(req, res) {
    res.render('info/infos');
  },

  // Controller des Apis
  getInfoApi: function getInfoApi(req, res) {
    res.status(200).send('hello world');
  }
};