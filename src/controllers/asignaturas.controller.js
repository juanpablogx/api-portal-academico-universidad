const model = require('../models/asignaturas.model');

const getAllAsignaturas = (request, response, next) => {
  model.selectAsignaturas()
    .then(result => {
      response.json({asignaturas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneAsignatura = (request, response, next) => {
  model.selectOneAsignatura(request.params.id_asig)
    .then(result => {
      response.json({asignaturas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createAsignatura = (request, response, next) => {
  model.insertAsignatura(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateAsignatura = (request, response, next) => {
  model.updateAsignatura(request.params.id_asig, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteAsignatura = (request, response, next) => {
  model.deleteAsignatura(request.params.id_asig)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllAsignaturas,
  getOneAsignatura,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura
};
