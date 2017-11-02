"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _HandlebarsConfig = require("./helpers/HandlebarsConfig");

var _HandlebarsConfig2 = _interopRequireDefault(_HandlebarsConfig);

var _SeedDbController = require("./controllers/SeedDbController");

var _SeedDbController2 = _interopRequireDefault(_SeedDbController);

var _HomeController = require("./controllers/HomeController");

var _HomeController2 = _interopRequireDefault(_HomeController);

var _ContactController = require("./controllers/ContactController");

var _ContactController2 = _interopRequireDefault(_ContactController);

var _ActuController = require("./controllers/ActuController");

var _ActuController2 = _interopRequireDefault(_ActuController);

var _InfoController = require("./controllers/InfoController");

var _InfoController2 = _interopRequireDefault(_InfoController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration du serveur
//màj le 28/10 à 13h30

// Récupération des librairies de base permettant de faire un serveur d'API
var viewsPath = __dirname + '/views/';

// Récupération des controllers


// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku

var server = (0, _express2.default)();
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use((0, _cookieParser2.default)());
server.use((0, _serveFavicon2.default)(_path2.default.resolve('./src/assets/favicon.png')));

server.use(_express2.default.static(_path2.default.resolve('./src/assets')));
server.set('views', _path2.default.resolve('./src/views'));
server.engine('.hbs', (0, _expressHandlebars2.default)(_HandlebarsConfig2.default));
server.set('view engine', '.hbs');

server.set('port', process.env.PORT || 5000);
server.listen(server.get('port'), function () {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
_mongoose2.default.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + _config2.default.bddUri, {}, function (err, res) {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + _config2.default.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + _config2.default.bddUri);
  }
});

// Routes pour initialiser la base
server.post('/seeddb', _SeedDbController2.default.seedDb);

// Routes pour les vues
server.get('/', _HomeController2.default.getIndex);

server.get('/contacts', _ContactController2.default.getContacts);
server.get('/contacts/id/:id', _ContactController2.default.getContact);
server.get('/contacts/create', _ContactController2.default.getCreateContact);
server.post('/contacts/create', _ContactController2.default.postCreateContact);
server.get('/contacts/update/:id', _ContactController2.default.getUpdateContact);
server.post('/contacts/update/:id', _ContactController2.default.postUpdateContact);
server.get('/contacts/delete/:id', _ContactController2.default.getDeleteContact);

server.get('/actus', _ActuController2.default.getActus);
server.get('/actus/id/:id', _ActuController2.default.getActu);
server.get('/actus/create', _ActuController2.default.getCreateActu);
server.post('/actus/create', _ActuController2.default.postCreateActu);
server.get('/actus/update/:id', _ActuController2.default.getUpdateActu);
server.post('/actus/update/:id', _ActuController2.default.postUpdateActu);
server.get('/actus/delete/:id', _ActuController2.default.getDeleteActu);

server.get('/infos', _InfoController2.default.getInfo);

// Routes pour les APIs
server.get('/api/', _HomeController2.default.getIndexApi);

server.get('/api/contacts', _ContactController2.default.getContacts);
server.get('/api/contacts/id/:id', _ContactController2.default.getContactApi);
server.post('/api/contacts/create', _ContactController2.default.postCreateContactApi);
server.post('/api/contacts/update/:id', _ContactController2.default.postUpdateContactApi);
server.post('/api/contacts/delete/:id', _ContactController2.default.postDeleteContactApi);

server.get('/api/actus', _ActuController2.default.getActusApi);
server.get('/api/actus/id/:id', _ActuController2.default.getActuApi);
server.post('/api/actus/create', _ActuController2.default.postCreateActuApi);
server.post('/api/actus/update/:id', _ActuController2.default.postUpdateActuApi);
server.post('/api/actus/delete/:id', _ActuController2.default.postDeleteActuApi);

server.get('/api/infos', _InfoController2.default.getInfoApi);