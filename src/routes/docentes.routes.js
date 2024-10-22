const { Router } = require('express');
const { getAllDocentes, getOneDocente, createDocente, deleteDocente } = require('../controllers/docentes.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllDocentes);

router.get('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneDocente);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createDocente);

router.delete('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteDocente);

module.exports = router;