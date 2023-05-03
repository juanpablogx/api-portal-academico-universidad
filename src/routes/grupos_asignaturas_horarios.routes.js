const { Router } = require('express');
const { getAllGruposAsignaturasHorarios, getOneGrupoAsignaturaHorario, createGrupoAsignaturaHorario, updateGrupoAsignaturaHorario, deleteGrupoAsignaturaHorario, deleteGruposAsignaturasAllHorarios, getGruposAsignaturasHorariosOneSemestre } = require('../controllers/grupos_asignaturas_horarios.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/grupos_asignaturas_horarios', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getAllGruposAsignaturasHorarios);

router.get('/grupos_asignaturas_horarios/semestre/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getGruposAsignaturasHorariosOneSemestre);

router.get('/grupos_asignaturas_horarios/semestre/:id_semestre/docente/:codigo_docente', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente']), getGruposAsignaturasHorariosOneSemestre);

router.get('/grupos_asignaturas_horarios/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getOneGrupoAsignaturaHorario);

router.post('/grupos_asignaturas_horarios', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), createGrupoAsignaturaHorario);

router.put('/grupos_asignaturas_horarios/:id_horario/:id_asig/:id_semestre/:numero_grupo', updateGrupoAsignaturaHorario);

router.delete('/grupos_asignaturas_horarios/:id_horario/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGrupoAsignaturaHorario);

router.delete('/grupos_asignaturas_horarios/todos_horarios/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGruposAsignaturasAllHorarios);

module.exports = router;