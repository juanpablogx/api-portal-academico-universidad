const model = require('../models/actividades.model');

const validarPorcentaje = (request, response, next) => {
  const porcentaje = request.body?.porcentaje;
  if (porcentaje === null || porcentaje === undefined) next();
  if (parseInt(porcentaje) >= 1 && parseInt(porcentaje) <= 100) {
    next();
  } else {
    next(Error('Porcentaje por fuera de intervalo (1-100)'));
  }
}

const getAllActividades = (request, response, next) => {
  model.selectActividades()
    .then(result => {
      response.json({actividades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneActividad = (request, response, next) => {
  model.selectOneActividad(request.params.id_actividad)
    .then(result => {
      response.json({actividades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createActividad = (request, response, next) => {
  model.insertActividad(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateActividad = (request, response, next) => {
  model.updateActividad(request.params.id_actividad, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteActividad = (request, response, next) => {
  model.deleteActividad(request.params.id_actividad)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllActividades,
  getOneActividad,
  createActividad,
  updateActividad,
  deleteActividad,
  validarPorcentaje
};
