const model = require('../models/estudiantes.model');

const getAllEstudiantes = (request, response, next) => {
  model.selectEstudiantes()
    .then(result => {
      response.json({estudiantes: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneEstudiante = (request, response, next) => {
  model.selectOneEstudiante(request.params.codigo_dni)
    .then(result => {
      response.json({estudiantes: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createEstudiante = (request, response, next) => {
  model.insertEstudiante(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newEstudiante: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteEstudiante = (request, response, next) => {
  model.deleteEstudiante(request.params.codigo_dni)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedEstudiante: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllEstudiantes,
  getOneEstudiante,
  createEstudiante,
  deleteEstudiante
};
