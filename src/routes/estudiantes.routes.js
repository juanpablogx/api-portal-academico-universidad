const { Router } = require('express');
const { getAllEstudiantes, getOneEstudiante, createEstudiante, deleteEstudiante, getEstudiantesNotInGrupo } = require('../controllers/estudiantes.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllEstudiantes);

router.get('/not_in_grupo/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getEstudiantesNotInGrupo);

router.get('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneEstudiante);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createEstudiante);

router.delete('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteEstudiante);

module.exports = router;