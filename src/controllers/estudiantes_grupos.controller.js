const model = require('../models/estudiantes_grupos.model');

const getAllEstudiantesGrupos = (request, response, next) => {
  model.selectEstudiantesGrupos()
    .then(result => {
      response.json({estudiantesGrupos: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneEstudianteGrupo = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre } = request.params;
  model.selectOneEstudianteGrupo(codigo_estudiante, id_asig, id_semestre)
    .then(result => {
      response.json({estudiantesGrupos: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getEstudianteGruposOneSemestre = (request, response, next) => {
  const { codigo_estudiante, id_semestre } = request.params;
  model.selectEstudianteGruposOneSemestre(codigo_estudiante, id_semestre)
    .then(result => {
      response.json({estudiantesGrupos: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getEstudiantesOneGrupo = (request, response, next) => {
  const { id_asig, id_semestre, numero_grupo } = request.params;
  model.selectEstudiantesOneGrupo(id_asig, id_semestre, numero_grupo)
    .then(result => {
      response.json({estudiantesGrupos: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createEstudianteGrupo = (request, response, next) => {
  model.insertEstudianteGrupo(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newEstudianteGrupo: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateEstudianteGrupo = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre } = request.params;
  model.updateEstudianteGrupo(codigo_estudiante, id_asig, id_semestre, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedEstudianteGrupo: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteEstudianteGrupo = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre } = request.params;
  model.deleteEstudianteGrupo(codigo_estudiante, id_asig, id_semestre)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedEstudianteGrupo: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllEstudiantesGrupos,
  getOneEstudianteGrupo,
  getEstudianteGruposOneSemestre,
  createEstudianteGrupo,
  updateEstudianteGrupo,
  deleteEstudianteGrupo,
  getEstudiantesOneGrupo
};
