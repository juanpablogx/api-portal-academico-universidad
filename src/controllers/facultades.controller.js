const model = require('../models/facultades.model');

const getAllFacultades = (request, response, next) => {
  model.selectFacultades()
    .then(result => {
      response.json({facultades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneFacultad = (request, response, next) => {
  model.selectOneFacultad(request.params.id_fac)
    .then(result => {
      response.json({facultades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createFacultad = (request, response, next) => {
  model.insertFacultad(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newFacultad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateFacultad = (request, response, next) => {
  model.updateFacultad(request.params.id_fac, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedFacultad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteFacultad = (request, response, next) => {
  model.deleteFacultad(request.params.id_fac)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedFacultad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllFacultades,
  getOneFacultad,
  createFacultad,
  updateFacultad,
  deleteFacultad
};
