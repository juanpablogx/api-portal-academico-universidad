const model = require('../models/facultades.model');
const { ERROR_RESPONSE_DB } = require('./base.controller')

const getAllFacultades = (request, response) => {
  model.selectFacultades()
    .then(result => {
      response.json({facultades: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const getOneFacultad = (request, response) => {
  model.selectOneFacultad(request.params.id_fac)
    .then(result => {
      response.json({facultades: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const createFacultad = (request, response) => {
  model.insertFacultad(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newFacultad: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const updateFacultad = (request, response) => {
  model.updateFacultad(request.params.id_fac, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedFacultad: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const deleteFacultad = (request, response) => {
  model.deleteFacultad(request.params.id_fac)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedFacultad: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

module.exports = {
  getAllFacultades,
  getOneFacultad,
  createFacultad,
  updateFacultad,
  deleteFacultad
};
