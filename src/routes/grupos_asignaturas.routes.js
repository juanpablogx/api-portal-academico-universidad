const { Router } = require('express');
const { getAllGruposAsignaturas, getOneGrupoAsignatura, createGrupoAsignatura, updateGrupoAsignatura, deleteGrupoAsignatura, deleteGruposAsignaturasOneSemestre, getGruposOneAsignaturaOneSemestre } = require('../controllers/grupos_asignaturas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/grupos_asignaturas', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getAllGruposAsignaturas);

router.get('/grupos_asignaturas/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getOneGrupoAsignatura);

router.get('/grupos_asignaturas/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getGruposOneAsignaturaOneSemestre);

router.post('/grupos_asignaturas', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), createGrupoAsignatura);

router.put('/grupos_asignaturas/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), updateGrupoAsignatura);

router.delete('/grupos_asignaturas/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGrupoAsignatura);

router.delete('/grupos_asignaturas/semestre/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGruposAsignaturasOneSemestre);

module.exports = router;