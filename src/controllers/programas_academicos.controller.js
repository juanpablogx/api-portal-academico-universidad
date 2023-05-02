const model = require('../models/programas_academicos.model');

const getAllProgramas = (request, response, next) => {
  model.selectProgramas()
    .then(result => {
      response.json({programas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOnePrograma = (request, response, next) => {
  model.selectOnePrograma(request.params.id_prog)
    .then(result => {
      response.json({programas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createPrograma = (request, response, next) => {
  model.insertPrograma(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updatePrograma = (request, response, next) => {
  model.updatePrograma(request.params.id_prog, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deletePrograma = (request, response, next) => {
  model.deletePrograma(request.params.id_prog)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllProgramas,
  getOnePrograma,
  createPrograma,
  updatePrograma,
  deletePrograma
};
