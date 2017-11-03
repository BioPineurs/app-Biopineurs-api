// Model de la route '/actus'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import ActuSeeds from "../helpers/ActuSeeds";
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

let Schema = new mongoose.Schema({
  title: { type: String },         // le titre de l'actu
  author: { type: String },        // l'auteur de l'actu
  body: { type: String }  // le corps de l'actu
});

let Model = mongoose.model('Actu', Schema);

export default {
  seedActus: () => {
    let promises = [];
    for (let actu of ActuSeeds){
      promises[promises.legth] = Model.create(actu);
    }
    return Promise.all(promises);
  },

  getActus: () => {
    return Model.find({}).exec();
  },

  getActu: (_id) => {
    return Model.findOne({ _id }).exec();
  },
/*
  getAuthor: () => {
  	return Model.
  },
*/
  createActu: (actu) => {
    return Model.create({
      title: actu.title,
      author: actu.author,
      body: actu.body
    });
  },

  updateActu: (_id, actu) => {
    return Model.findOneAndUpdate({ _id }, {
      title: actu.title,
      author: actu.author,
      body: actu.body
    }, {upsert: true}).exec();
  },

  deleteActus: () => {
    return Model.remove({}).exec();
  },

  deleteActu: (_id) => {
    return Model.remove({ _id }).exec();
  },
};