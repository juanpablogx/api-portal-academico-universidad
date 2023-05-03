const model = require('../models/actividades.model');

const validarPorcentaje = (request, response, next) => {
  const porcentaje = request.body.data?.porcentaje;
  if (porcentaje === null || porcentaje === undefined) next();
  if (parseInt(porcentaje) >= 1 && parseInt(porcentaje) <= 100) {
    next();
  } else {
    next(Error('Porcentaje por fuera de intervalo (1-100)'));
  }
}

const validarSumaPorcentaje = (request, response, next) => {
  const porcentaje = request.body.data?.porcentaje;
  const id_asig = request.body.data?.id_asig;
  const id_semestre = request.body.data?.id_semestre;
  const numero_grupo = request.body.data?.numero_grupo;

  model.selectSumaPorcentajeActividadesOneGrupo(id_asig, id_semestre, numero_grupo)
    .then(result => {
      let total = parseInt(result.rows[0].suma) + porcentaje;
      if (total > 100) {
        next(Error(`El porcentaje total del grupo superó el 100% en un ${total - 100}%`));
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });

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

const getActividadesOneGrupo = (request, response, next) => {
  const { id_asig, id_semestre, numero_grupo } = request.params;
  model.selectActividadesOneGrupo(id_asig, id_semestre, numero_grupo)
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
  model.insertActividad(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateActividad = (request, response, next) => {
  model.updateActividad(request.params.id_actividad, request.body.data)
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
  validarPorcentaje,
  getActividadesOneGrupo,
  validarSumaPorcentaje
};
