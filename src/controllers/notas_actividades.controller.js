const model = require('../models/notas_actividades.model');
const modelActividades = require('../models/actividades.model');
const modelEstudiantesGrupos = require('../models/estudiantes_grupos.model');

const validarAcvitidadMismoGrupo = (request, response, next) => {
  const id_actividad = request.body.data?.id_actividad ?? request.params?.id_actividad;
  const id_asig = request.body.data?.id_asig ?? request.params?.id_asig;
  const id_semestre = request.body.data?.id_semestre ?? request.params?.id_semestre;
  const codigo_estudiante = request.body.data?.codigo_estudiante ?? request.params?.codigo_estudiante;

  let actividad;

  modelActividades.selectOneActividad(id_actividad)
  .then(result => {
    if (result.rows.length == 1) {
      actividad = result.rows[0];

      return modelEstudiantesGrupos.selectOneEstudianteGrupo(codigo_estudiante, actividad.id_asig, actividad.id_semestre);
    } else {
      next();
    }
  })
  .then(result => {
    if (result.rows.length == 1) {
      const estudianteGrupo = result.rows[0];
      if (actividad.numero_grupo == estudianteGrupo.numero_grupo ) {
        next();
      } else {
        next(Error('La actividad no pertenece a este grupo'));
      }
    }
  })
  .catch(err => {
    next(err);
  });
};

const getAllNotasActividades = (request, response, next) => {
  model.selectNotasActividades()
    .then(result => {
      response.json({notasActividades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneNotaActividad = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre, id_actividad } = request.params;
  model.selectOneNotaActividad(codigo_estudiante, id_asig, id_semestre, id_actividad)
    .then(result => {
      response.json({notasActividades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getNotaActividadesOneGrupo = (request, response, next) => {
  const { id_asig, id_semestre, numero_grupo } = request.params;
  model.selectNotaActividadesOneGrupo(id_asig, id_semestre, numero_grupo)
    .then(result => {
      const resultTemp = result.rows;
      const estudiantesNotas = [];
      let indexEstudiantes = 0;
      let agregarEstudiante = true;
      resultTemp.forEach((value, index) => {
        if (index == 0) {
          agregarEstudiante = true;
          indexEstudiantes = 0;
        } else {
          const { codigo_estudiante, nombre_completo_estudiante, id_asig, id_semestre, numero_grupo } = estudiantesNotas[indexEstudiantes];
          if (value.codigo_estudiante == codigo_estudiante && value.nombre_completo_estudiante == nombre_completo_estudiante && value.id_asig == id_asig && value.id_semestre == id_semestre && value.numero_grupo == numero_grupo) {
            agregarEstudiante = false;
          } else {
            agregarEstudiante = true;
            indexEstudiantes++;
          }
        }

        if (agregarEstudiante) {
          estudiantesNotas.push({codigo_estudiante: value.codigo_estudiante, nombre_completo_estudiante: value.nombre_completo_estudiante, id_asig: value.id_asig, id_semestre: value.id_semestre, numero_grupo: value.numero_grupo, notas: []});
          agregarEstudiante = false;
        }

        estudiantesNotas[indexEstudiantes].notas.push({id_actividad: value.id_actividad, nota: value.nota, descripcion: value.descripcion, porcentaje: value.porcentaje});
      });
      response.json({notasActividades: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createNotaActividad = (request, response, next) => {
  model.insertNotaActividad(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newNotaActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateNotaActividad = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre, id_actividad } = request.params;
  model.updateNotaActividad(codigo_estudiante, id_asig, id_semestre, id_actividad, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedNotaActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteNotaActividad = (request, response, next) => {
  const { codigo_estudiante, id_asig, id_semestre, id_actividad } = request.params;
  model.deleteNotaActividad(codigo_estudiante, id_asig, id_semestre, id_actividad)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedNotaActividad: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllNotasActividades,
  getOneNotaActividad,
  getNotaActividadesOneGrupo,
  createNotaActividad,
  updateNotaActividad,
  deleteNotaActividad,
  validarAcvitidadMismoGrupo
};
