const { Router } = require('express');
const { getAllPersonas, getOnePersona, createPersona, updatePersona, deletePersona } = require('../controllers/personas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllPersonas);

router.get('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOnePersona);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createPersona);

router.put('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updatePersona);

router.delete('/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deletePersona);

module.exports = router;