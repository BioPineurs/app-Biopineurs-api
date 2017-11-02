// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import ContactModel from "../models/ContactModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      ContactModel.deleteContacts(),
    ])
    .then((data) => {
      return Promise.all([
        ContactModel.seedContacts(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};