const model = require('../models/estudiantes_grupos.model');

const verificarMaxEstudiantesOneGrupo = (request, response, next) => {
  const id_asig = request.body.data?.id_asig;
  const id_semestre = request.body.data?.id_semestre;
  const numero_grupo = request.body.data?.numero_grupo;

  model.selectEstudiantesOneGrupo(id_asig, id_semestre, numero_grupo)
    .then(result => {
      if (result.rows.length < 35) {
        next();
      } else {
        next(Error('Se sobrepasó el límite de estudiantes (máx. 35)'));
      }
    })
    .catch(err => {
      next(err);
    });
};

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
  getEstudiantesOneGrupo,
  verificarMaxEstudiantesOneGrupo
};
