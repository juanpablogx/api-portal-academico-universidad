const model = require('../models/personas.model');

const getAllPersonas = (request, response, next) => {
  model.selectPersonas()
    .then(result => {
      response.json({personas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOnePersona = (request, response, next) => {
  model.selectOnePersona(request.params.codigo_dni)
    .then(result => {
      response.json({personas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createPersona = (request, response, next) => {
  model.insertPersona(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newPersona: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updatePersona = (request, response, next) => {
  model.updatePersona(request.params.codigo_dni, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedPersona: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deletePersona = (request, response, next) => {
  model.deletePersona(request.params.codigo_dni)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedPersona: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllPersonas,
  getOnePersona,
  createPersona,
  updatePersona,
  deletePersona
};
