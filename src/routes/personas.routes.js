const { Router } = require('express');
const { getAllPersonas, getOnePersona, createPersona, updatePersona, deletePersona } = require('../controllers/personas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/personas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllPersonas);

router.get('/personas/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOnePersona);

router.post('/personas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createPersona);

router.put('/personas/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updatePersona);

router.delete('/personas/:codigo_dni', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deletePersona);

module.exports = router;