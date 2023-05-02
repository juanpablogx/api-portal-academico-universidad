const { Router } = require('express');
const { getAllProgramas, getOnePrograma, createPrograma, updatePrograma, deletePrograma } = require('../controllers/programas_academicos.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/programas_academicos', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllProgramas);

router.get('/programas_academicos/:id_prog', getOnePrograma);

router.post('/programas_academicos', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createPrograma);

router.put('/programas_academicos/:id_prog', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updatePrograma);

router.delete('/programas_academicos/:id_prog', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deletePrograma);

module.exports = router;