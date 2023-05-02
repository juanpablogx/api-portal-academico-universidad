const model = require('../models/grupos_asignaturas.model');

const getAllGruposAsignaturas = (request, response, next) => {
  model.selectGruposAsignaturas()
    .then(result => {
      response.json({gruposAsignaturas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneGrupoAsignatura = (request, response, next) => {
  const { id_asig, id_semestre, numero } = request.params;
  model.selectOneGrupoAsignatura(id_asig, id_semestre, numero)
    .then(result => {
      response.json({gruposAsignaturas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createGrupoAsignatura = (request, response, next) => {
  model.insertGrupoAsignatura(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newGrupoAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateGrupoAsignatura = (request, response, next) => {
  const { id_asig, id_semestre, numero } = request.params;
  model.updateGrupoAsignatura(id_asig, id_semestre, numero, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedGrupoAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteGrupoAsignatura = (request, response, next) => {
  const { id_asig, id_semestre, numero } = request.params;
  model.deleteGrupoAsignatura(id_asig, id_semestre, numero)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedGrupoAsignatura: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteGruposAsignaturasOneSemestre = (request, response, next) => {
  const { id_semestre } = request.params;
  model.deleteGruposAsignaturasOneSemestre(id_semestre)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedGruposAsignaturas: result.rows});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllGruposAsignaturas,
  getOneGrupoAsignatura,
  createGrupoAsignatura,
  updateGrupoAsignatura,
  deleteGrupoAsignatura,
  deleteGruposAsignaturasOneSemestre
};
