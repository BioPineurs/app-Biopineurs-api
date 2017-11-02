//màj 30/10 à 13h35

// Model de la route '/contacts'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import ContactSeeds from "../helpers/ContactSeeds";

let Schema = new mongoose.Schema({
  firstName: { type: String },   // le prénom de l'étudiant
  lastName: { type: String },    // le nom de l'étudiant
  promo: { type: Number },       // l'année de diplomation
  email: { type: String },       // le mail de l'étudiant
  phone: { type: String },       // le numéro de téléphone de l'étudiant
  photo: { type: String },        // l'url de la photo
  createdAt: { type: Date },     // la date de création de la fiche contact
  updatedAt: { type: Date },     // la date de modification de la fiche contact
});

let Model = mongoose.model('Contact', Schema);

export default {
  seedContacts: () => {
    let promises = [];
    for (let contact of ContactSeeds){
      promises[promises.legth] = Model.create(contact);
    }
    return Promise.all(promises);
  },

  getContacts: () => {
    return Model.find({}).exec();
  },

  getContact: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createContact: (contact) => {
    return Model.create({
      firstName: contact.firstName,
      lastName: contact.lastName,
      promo: contact.promo,
      email: contact.email,
      phone: contact.phone,
      photo: contact.photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  updateContact: (_id, contact) => {
    return Model.findOneAndUpdate({ _id }, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      promo: contact.promo,
      email: contact.email,
      phone: contact.phone,
      photo: contact.photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {upsert: true}).exec();
  },

  deleteContacts: () => {
    return Model.remove({}).exec();
  },

  deleteContact: (_id) => {
    return Model.remove({ _id }).exec();
  },
};