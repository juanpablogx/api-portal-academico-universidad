const { Router } = require('express');
const { getAllGruposAsignaturasHorarios, getOneGrupoAsignaturaHorario, createGrupoAsignaturaHorario, updateGrupoAsignaturaHorario, deleteGrupoAsignaturaHorario, deleteGruposAsignaturasAllHorarios } = require('../controllers/grupos_asignaturas_horarios.controller')

const router = Router();

router.get('/grupos_asignaturas_horarios', getAllGruposAsignaturasHorarios);

router.get('/grupos_asignaturas_horarios/:id_asig/:id_semestre/:numero_grupo', getOneGrupoAsignaturaHorario);

router.post('/grupos_asignaturas_horarios', createGrupoAsignaturaHorario);

router.put('/grupos_asignaturas_horarios/:id_horario/:id_asig/:id_semestre/:numero_grupo', updateGrupoAsignaturaHorario);

router.delete('/grupos_asignaturas_horarios/:id_horario/:id_asig/:id_semestre/:numero_grupo', deleteGrupoAsignaturaHorario);

router.delete('/grupos_asignaturas_horarios/todos_horarios/:id_asig/:id_semestre/:numero_grupo', deleteGruposAsignaturasAllHorarios);

module.exports = router;