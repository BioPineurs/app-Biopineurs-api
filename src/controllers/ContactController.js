// Controller de la route '/contacts'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import ContactModel from "../models/ContactModel";

const contacts = () => {
  // On fait appel à la fonction getContacts du model
  // Celle ci renvoie tous les contacts présents en base
  return ContactModel.getContacts()
  .then((data) => {
    // On récupère ici data qui est une liste de contacts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noContactsError'
      throw new Error('noContactsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let contact of data){
      // On parcours data. 
       response[response.length] = {
       id: contact._id,
       firstName: contact.firstName,
       lastName: contact.lastName,
       promo: contact.promo,
       email: contact.email,
       phone: contact.phone,
       photo: contact.photo,
      }
    }

    // Avant d'envoyer la réponse on la trie par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'lastName');
  });
}

const contact = (_id) => {
  // On fait appel à la fonction getContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return ContactModel.getContact(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de contacts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noContactError'
      throw new Error('noContactError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
       firstName: data.firstName,
       lastName: data.lastName,
       promo: data.promo,
       email: data.email,
       phone: data.phone,
       photo: data.photo,
    };
    return response;
  });
}

const createContact = (contact) => {
  // On fait appel à la fonction createContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return ContactModel.createContact(contact);
}

const updateContact = (id, contact) => {
  // On fait appel à la fonction updateContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return ContactModel.updateContact(id, contact);
}

const deleteContact = (id) => {
  // On fait appel à la fonction deleteContact du model
  // Celle ci renvoie le contact dont l'id est _id
  return ContactModel.deleteContact(id);
}

export default {
  // Controller des views
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

  getCreateContact: (req, res) => {
    res.render('contact/createContact');
  },

  postCreateContact: (req, res) => {
    let contact = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       promo: req.body.promo,
       email: req.body.email,
       phone: req.body.phone,
       photo: req.body.photo,
    };

    createContact(contact)
    .then((data) => {
      res.redirect('/contacts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateContact: (req, res) => {
    contact(req.params.id)
    .then((data) => {
      res.render('contact/updateContact', { contact: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateContact: (req, res) => {
    let contact = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       promo: req.body.promo,
       email: req.body.email,
       phone: req.body.phone,
       photo: req.body.photo,
    };

    updateContact(req.params.id, contact)
    .then((data) => {
      res.redirect('/contacts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteContact: (req, res) => {
    deleteContact(req.params.id)
    .then((data) => {
      res.redirect('/contacts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getContactsApi: (req, res) => {
    contacts()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de contacts
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getContactApi: (req, res) => {
    contact(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateContactApi: (req, res) => {
    let contact = {
      firstName: req.body.firstName,
       lastName: req.body.lastName,
       promo: req.body.promo,
       email: req.body.email,
       phone: req.body.phone,
       photo: req.body.photo,
    };

    createContact(contact)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateContactApi: (req, res) => {
    let contact = {
        firstName: req.body.firstName,
       lastName: req.body.lastName,
       promo: req.body.promo,
       email: req.body.email,
       phone: req.body.phone,
       photo: req.body.photo,
    };

    updateContact(req.params.id, contact)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteContactApi: (req, res) => {
    deleteContact(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
