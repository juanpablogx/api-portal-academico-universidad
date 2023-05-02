const { Router } = require('express');
const { getAllEstudiantes, getOneEstudiante, createEstudiante, deleteEstudiante } = require('../controllers/estudiantes.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/estudiantes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllEstudiantes);

router.get('/estudiantes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneEstudiante);

router.post('/estudiantes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createEstudiante);

router.delete('/estudiantes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteEstudiante);

module.exports = router;