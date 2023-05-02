const model = require('../models/docentes.model');

const getAllDocentes = (request, response, next) => {
  model.selectDocentes()
    .then(result => {
      response.json({docentes: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneDocente = (request, response, next) => {
  model.selectOneDocente(request.params.codigo_dni)
    .then(result => {
      response.json({docentes: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createDocente = (request, response, next) => {
  model.insertDocente(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newDocente: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteDocente = (request, response, next) => {
  model.deleteDocente(request.params.codigo_dni)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedDocente: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllDocentes,
  getOneDocente,
  createDocente,
  deleteDocente
};
