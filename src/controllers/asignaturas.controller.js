const model = require('../models/asignaturas.model');
const { ERROR_RESPONSE_DB } = require('./base.controller')

const getAllAsignaturas = (request, response) => {
  model.selectAsignaturas()
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const getOneAsignatura = (request, response) => {
  model.selectOneAsignatura(request.params.id_asig)
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const createAsignatura = (request, response) => {
  model.insertAsignatura(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newAsignatura: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const updateAsignatura = (request, response) => {
  model.updateAsignatura(request.params.id_asig, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedAsignatura: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const deleteAsignatura = (request, response) => {
  model.deleteAsignatura(request.params.id_asig)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedAsignatura: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

module.exports = {
  getAllAsignaturas,
  getOneAsignatura,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura
};
