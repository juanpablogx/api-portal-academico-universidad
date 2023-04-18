const model = require('../models/programas_academicos.model');
const { ERROR_RESPONSE_DB } = require('./base.controller')

const getAllProgramas = (request, response) => {
  model.selectProgramas()
    .then(result => {
      response.json({programas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const getOnePrograma = (request, response) => {
  model.selectOnePrograma(request.params.id_prog)
    .then(result => {
      response.json({programas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const createPrograma = (request, response) => {
  model.insertPrograma(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const updatePrograma = (request, response) => {
  model.updatePrograma(request.params.id_prog, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const deletePrograma = (request, response) => {
  model.deletePrograma(request.params.id_prog)
  .then(result => {
    response.json({rowCount: result.rowCount, newPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

module.exports = {
  getAllProgramas,
  getOnePrograma,
  createPrograma,
  updatePrograma,
  deletePrograma
};
