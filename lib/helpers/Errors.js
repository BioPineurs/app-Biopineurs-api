'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// màj 28/10 à 13h37

// Liste des erreurs que l'API peut renvoyer

var list = {
  noContactsError: {
    code: 500,
    error: 'noContactsError',
    error_description: 'La base ne contient pas de contacts'
  },
  noContactError: {
    code: 500,
    error: 'noContactError',
    error_description: 'Ce contact n\'existe pas'
  },
  noActuError: {
    code: 500,
    error: 'noActuError',
    error_description: 'Cette actualite n\'existe pas'
  }
};

exports.default = function (err) {
  if (err instanceof Error && err.message) {
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};