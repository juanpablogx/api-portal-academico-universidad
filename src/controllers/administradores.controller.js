const model = require('../models/administradores.model');

const getAllAdministradores = (request, response, next) => {
  model.selectAdministradores()
    .then(result => {
      response.json({administradores: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneAdministrador = (request, response, next) => {
  model.selectOneAdministrador(request.params.codigo_dni)
    .then(result => {
      response.json({administradores: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createAdministrador = (request, response, next) => {
  model.insertAdministrador(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newAdministrador: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteAdministrador = (request, response, next) => {
  model.deleteAdministrador(request.params.codigo_dni)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedAdministrador: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllAdministradores,
  getOneAdministrador,
  createAdministrador,
  deleteAdministrador
};
