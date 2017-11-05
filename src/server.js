//màj le 28/10 à 13h30

// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import ContactController from "./controllers/ContactController";
import ActuController from "./controllers/ActuController";
import InfoController from "./controllers/InfoController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/contacts', ContactController.getContacts);
server.get('/contacts/id/:id', ContactController.getContact);
server.get('/contacts/create', ContactController.getCreateContact);
server.post('/contacts/create', ContactController.postCreateContact);
server.get('/contacts/update/:id', ContactController.getUpdateContact);
server.post('/contacts/update/:id', ContactController.postUpdateContact);
server.get('/contacts/delete/:id', ContactController.getDeleteContact);

server.get('/actus', ActuController.getActus);
server.get('/actus/id/:id', ActuController.getActu);
server.get('/actus/create', ActuController.getCreateActu);
server.post('/actus/create', ActuController.postCreateActu);
server.get('/actus/update/:id', ActuController.getUpdateActu);
server.post('/actus/update/:id', ActuController.postUpdateActu);
server.get('/actus/delete/:id', ActuController.getDeleteActu);

server.get('/infos', InfoController.getInfo);

// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/contacts', ContactController.getContactsApi);
server.get('/api/contacts/id/:id', ContactController.getContactApi);
server.post('/api/contacts/create', ContactController.postCreateContactApi);
server.post('/api/contacts/update/:id', ContactController.postUpdateContactApi);
server.post('/api/contacts/delete/:id', ContactController.postDeleteContactApi);

server.get('/api/actus', ActuController.getActusApi);
server.get('/api/actus/id/:id', ActuController.getActuApi);
server.post('/api/actus/create', ActuController.postCreateActuApi);
server.post('/api/actus/update/:id', ActuController.postUpdateActuApi);
server.post('/api/actus/delete/:id', ActuController.postDeleteActuApi);

server.get('/api/infos', InfoController.getInfoApi);
