const { Router } = require('express');
const { getAllEstudiantes, getOneEstudiante, createEstudiante, deleteEstudiante, getEstudiantesNotInGrupo } = require('../controllers/estudiantes.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/estudiantes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllEstudiantes);

router.get('/estudiantes/not_in_grupo/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getEstudiantesNotInGrupo);

router.get('/estudiantes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneEstudiante);

router.post('/estudiantes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createEstudiante);

router.delete('/estudiantes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteEstudiante);

module.exports = router;