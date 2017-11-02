// Controller de la route '/actus'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import ActuModel from "../models/ActuModel";

const actus = () => {
  // On fait appel à la fonction getActus du model
  // Celle ci renvoie tous les actus présents en base
  return ActuModel.getActus()
  .then((data) => {
    // On récupère ici data qui est une liste des actus

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noActusError'
      throw new Error('noActusError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let actu of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: actu._id,
        title: actu.title,
        author: actu.author,
        body: actu.body
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const actu = (_id) => {
  // On fait appel à la fonction getActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return ActuModel.getActu(_id)
  .then((data) => {
    // On récupère ici data qui est une liste des actus

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noActuError'
      throw new Error('noActuError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      title: data.title,
      author: data.author,
      body: data.body
    };
    return response;
  });
}

const createActu = (actu) => {
  // On fait appel à la fonction createActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return ActuModel.createActu(actu);
}

const updateActu = (id, actu) => {
  // On fait appel à la fonction updateActu du model
  // Celle ci renvoie le actu dont l'id est _id
  return ActuModel.updateActu(id, actu);
}

const deleteActu = (id) => {
  // On fait appel à la fonction deleteActu du model
  // Celle ci renvoie l actu dont l'id est _id
  return ActuModel.deleteActu(id);
}

export default {
  // Controller des views
  getActus: (req, res) => {
    actus()
    .then((data) => {
      // data contient une liste de actus
      res.render('actu/actus', { actus: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getActu: (req, res) => {
    actu(req.params.id)
    .then((data) => {
      res.render('actu/actu', { actu: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateActu: (req, res) => {
    res.render('actu/createActu');
  },

  postCreateActu: (req, res) => {
    let actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    createActu(actu)
    .then((data) => {
      res.redirect('/actus');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateActu: (req, res) => {
    actu(req.params.id)
    .then((data) => {
      res.render('actu/updateActu', { actu: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateActu: (req, res) => {
    let actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    updateActu(req.params.id, actu)
    .then((data) => {
      res.redirect('/actus');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteActu: (req, res) => {
    deleteActu(req.params.id)
    .then((data) => {
      res.redirect('/actus');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getActusApi: (req, res) => {
    actus()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste des actus
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getActuApi: (req, res) => {
    actu(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateActuApi: (req, res) => {
    let actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    createActu(actu)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateActuApi: (req, res) => {
    let actu = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    };

    updateActu(req.params.id, actu)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteActuApi: (req, res) => {
    deleteActu(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
