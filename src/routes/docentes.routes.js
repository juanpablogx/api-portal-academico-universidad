const { Router } = require('express');
const { getAllDocentes, getOneDocente, createDocente, deleteDocente } = require('../controllers/docentes.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/docentes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllDocentes);

router.get('/docentes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneDocente);

router.post('/docentes', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createDocente);

router.delete('/docentes/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteDocente);

module.exports = router;