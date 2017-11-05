"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _ActuModel = require("../models/ActuModel");

var _ActuModel2 = _interopRequireDefault(_ActuModel);

var _ContactModel = require("../models/ContactModel");

var _ContactModel2 = _interopRequireDefault(_ContactModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
// Controller de la route '/actus'
var actus = function actus() {
  // On fait appel à la fonction getActus du model
  // Celle ci renvoie tous les actus présents en base
  return _ActuModel2.default.getActus().then(function (data) {
    // On récupère ici data qui est une liste des actus
    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noActusError'
      throw new Error('noActusError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _actu = _step.value;

        // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
        response[response.length] = {
          id: _actu._id,
          title: _actu.title,
          author: _actu.author, //author._id
          body: _actu.body
        };
      }

      // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
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

    return _lodash2.default.sortBy(response, 'name');
  });
};
// Récupération du model de contact pour les auteurs


var actu = function actu(_id) {
  // On fait appel à la fonction getActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return _ActuModel2.default.getActu(_id).then(function (data) {
    // On récupère ici data qui est une liste des actus

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noActuError'
      throw new Error('noActuError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      title: data.title,
      author: data.author,
      body: data.body
    };
    return response;
  });
};

var authors = function authors() {
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
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var author = _step2.value;

        // On parcours data. 
        response[response.length] = {
          id: contact._id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          fullName: contact.firstName + contact.lastName
        };
      }
      // Avant d'envoyer la réponse on la trie par ordre alphabétique croissant sur le champs name
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return _lodash2.default.sortBy(response, 'lastName');
  });
};

var createActu = function createActu(actu) {
  // On fait appel à la fonction createActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return _ActuModel2.default.createActu(actu);
};

var updateActu = function updateActu(id, actu) {
  // On fait appel à la fonction updateActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return _ActuModel2.default.updateActu(id, actu);
};

var deleteActu = function deleteActu(id) {
  // On fait appel à la fonction deleteActu du model
  // Celle ci renvoie l actu dont l'id est _id
  return _ActuModel2.default.deleteActu(id);
};

exports.default = {
  // Controller des views
  getActus: function getActus(req, res) {
    actus().then(function (data) {
      // data contient une liste de actus
      res.render('actu/actus', { actus: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getActu: function getActu(req, res) {
    actu(req.params.id).then(function (data) {
      res.render('actu/actu', { actu: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  /*
    // controller pour les auteurs depuis les contacts enregistrés
    getContacts: (req, res) => {
      contacts()
      .then((data) => {
        // data contient une liste de contacts
        res.render('contact/contacts', { contacts: data });
      }, (err) => {
        console.log(err);
        res.status(Errors(err).code).send(Errors(err));
      });
    },
  
    getContact: (req, res) => {
      contact(req.params.id)
      .then((data) => {
        res.render('contact/contact', { contact: data });
      }, (err) => {
        console.log(err);
        res.status(Errors(err).code).send(Errors(err));
      });
    },
  */
  getCreateActu: function getCreateActu(req, res) {
    _ContactModel2.default.getContacts().then(function (data) {
      res.render('actu/createActu', { contacts: data }); // load contacts data as well
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateActu: function postCreateActu(req, res) {
    var actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    createActu(actu).then(function (data) {
      res.redirect('/actus');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateActu: function getUpdateActu(req, res) {
    actu(req.params.id).then(function (data) {
      res.render('actu/updateActu', { actu: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateActu: function postUpdateActu(req, res) {
    var actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    updateActu(req.params.id, actu).then(function (data) {
      res.redirect('/actus');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteActu: function getDeleteActu(req, res) {
    deleteActu(req.params.id).then(function (data) {
      res.redirect('/actus');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getActusApi: function getActusApi(req, res) {
    actus().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste des actus
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getActuApi: function getActuApi(req, res) {
    actu(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // Controllers API pour les auteurs
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

  postCreateActuApi: function postCreateActuApi(req, res) {
    var actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    createActu(actu).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateActuApi: function postUpdateActuApi(req, res) {
    var actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    updateActu(req.params.id, actu).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteActuApi: function postDeleteActuApi(req, res) {
    deleteActu(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};