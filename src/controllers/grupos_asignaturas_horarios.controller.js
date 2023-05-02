const model = require('../models/grupos_asignaturas_horarios.model');

const getAllGruposAsignaturasHorarios = (request, response, next) => {
  model.selectGruposAsignaturasHorarios()
    .then(result => {
      const resultTemp = result.rows;
      const gruposAsignaturasHorarios = [];
      let indexGrupos = 0;
      let agregarGrupo = true;
      resultTemp.forEach((value, index) => {
        if (index == 0) {
          agregarGrupo = true;
          indexGrupos = 0;
        } else {
          const { id_asig, id_semestre, numero_grupo } = gruposAsignaturasHorarios[indexGrupos];
          if (value.id_asig == id_asig && value.id_semestre == id_semestre && value.numero_grupo == numero_grupo) {
            agregarGrupo = false;
          } else {
            agregarGrupo = true;
            indexGrupos++;
          }
        }

        if (agregarGrupo) {
          gruposAsignaturasHorarios.push({id_asig: value.id_asig, id_semestre: value.id_semestre, numero_grupo: value.numero_grupo, horarios: []});
          agregarGrupo = false;
        }

        gruposAsignaturasHorarios[indexGrupos].horarios.push({id_salon: value.id_salon, hora_inicio: value.hora_inicio, hora_fin: value.hora_fin, dia: value.dia, salon: value.salon});
      });
      response.json({gruposAsignaturasHorarios: gruposAsignaturasHorarios});
    })
    .catch(err => {
      next(err);
    });
};

const getGruposAsignaturasHorariosOneSemestre = (request, response, next) => {
  let codigo_docente = request.params?.codigo_docente ? request.params?.codigo_docente : null;
  model.selectGruposAsignaturasHorariosOneSemestre(request.params.id_semestre, codigo_docente)
    .then(result => {
      const resultTemp = result.rows;
      const gruposAsignaturasHorarios = [];
      let indexGrupos = 0;
      let agregarGrupo = true;
      resultTemp.forEach((value, index) => {
        if (index == 0) {
          agregarGrupo = true;
          indexGrupos = 0;
        } else {
          const { id_asig, id_semestre, numero_grupo } = gruposAsignaturasHorarios[indexGrupos];
          if (value.id_asig == id_asig && value.id_semestre == id_semestre && value.numero_grupo == numero_grupo) {
            agregarGrupo = false;
          } else {
            console.log('Nuevo Grupo');
            agregarGrupo = true;
            indexGrupos++;
          }
        }

        if (agregarGrupo) {
          gruposAsignaturasHorarios.push({id_asig: value.id_asig, id_semestre: value.id_semestre, numero_grupo: value.numero_grupo, codigo_docente: value.codigo_docente, nombre_docente: value.nombre_docente, nombre_asignatura: value.nombre_asignatura, horarios: []});
          agregarGrupo = false;
        }

        gruposAsignaturasHorarios[indexGrupos].horarios.push({id_salon: value.id_salon, hora_inicio: value.hora_inicio, hora_fin: value.hora_fin, dia: value.dia, salon: value.salon});
      });
      console.log(gruposAsignaturasHorarios);
      response.json({gruposAsignaturasHorarios: gruposAsignaturasHorarios});
    })
    .catch(err => {
      next(err);
    });
};

const getOneGrupoAsignaturaHorario = (request, response, next) => {
  const { id_asig, id_semestre, numero_grupo } = request.params;
  model.selectOneGrupoAsignaturaHorarios(id_asig, id_semestre, numero_grupo)
    .then(result => {
      const resultTemp = result.rows;
      const gruposAsignaturasHorarios = [];
      let indexGrupos = 0;
      let agregarGrupo = true;
      resultTemp.forEach((value, index) => {
        if (index == 0) {
          agregarGrupo = true;
          indexGrupos = 0;
        } else {
          const { id_asig, id_semestre, numero_grupo } = gruposAsignaturasHorarios[indexGrupos];
          if (value.id_asig == id_asig && value.id_semestre == id_semestre && value.numero_grupo == numero_grupo) {
            agregarGrupo = false;
          } else {
            agregarGrupo = true;
            indexGrupos++;
          }
        }

        if (agregarGrupo) {
          gruposAsignaturasHorarios.push({id_asig: value.id_asig, id_semestre: value.id_semestre, numero_grupo: value.numero_grupo, horarios: []});
          agregarGrupo = false;
        }

        gruposAsignaturasHorarios[indexGrupos].horarios.push({id_salon: value.id_salon, hora_inicio: value.hora_inicio, hora_fin: value.hora_fin, dia: value.dia, salon: value.salon});
      });
      response.json({gruposAsignaturasHorarios: gruposAsignaturasHorarios});
    })
    .catch(err => {
      next(err);
    });
};

const createGrupoAsignaturaHorario = (request, response, next) => {
  model.insertGrupoAsignaturaHorario(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newGrupoAsignaturaHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateGrupoAsignaturaHorario = (request, response, next) => {
  const { id_horario, id_asig, id_semestre, numero_grupo } = request.params;
  model.updateGrupoAsignaturaHorario(id_horario, id_asig, id_semestre, numero_grupo, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedGrupoAsignaturaHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteGrupoAsignaturaHorario = (request, response, next) => {
  const { id_horario, id_asig, id_semestre, numero_grupo } = request.params;
  model.deleteGrupoAsignaturaHorario(id_horario, id_asig, id_semestre, numero_grupo)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedGrupoAsignaturaHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteGruposAsignaturasAllHorarios = (request, response, next) => {
  const { id_asig, id_semestre, numero_grupo } = request.params;
  model.deleteGruposAsignaturasHorariosOneSemestre(id_asig, id_semestre, numero_grupo)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedGruposAsignaturasHorarios: result.rows});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllGruposAsignaturasHorarios,
  getOneGrupoAsignaturaHorario,
  createGrupoAsignaturaHorario,
  updateGrupoAsignaturaHorario,
  deleteGrupoAsignaturaHorario,
  deleteGruposAsignaturasAllHorarios,
  getGruposAsignaturasHorariosOneSemestre
};
