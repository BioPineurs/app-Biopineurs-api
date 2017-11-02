// Controller de la route '/'

export default {
  // Controller des views
  getInfo: (req, res) => {
    res.render('info/infos');
  },

  // Controller des Apis
  getInfoApi: (req, res) => {
    res.status(200).send('hello world');
  },
};