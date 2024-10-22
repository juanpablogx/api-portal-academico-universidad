const { Router } = require('express');
const { getAllGruposAsignaturas, getOneGrupoAsignatura, createGrupoAsignatura, updateGrupoAsignatura, deleteGrupoAsignatura, deleteGruposAsignaturasOneSemestre, getGruposOneAsignaturaOneSemestre } = require('../controllers/grupos_asignaturas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getAllGruposAsignaturas);

router.get('/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getOneGrupoAsignatura);

router.get('/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getGruposOneAsignaturaOneSemestre);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), createGrupoAsignatura);

router.put('/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), updateGrupoAsignatura);

router.delete('/:id_asig/:id_semestre/:numero', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGrupoAsignatura);

router.delete('/semestre/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteGruposAsignaturasOneSemestre);

module.exports = router;