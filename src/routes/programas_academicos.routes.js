const { Router } = require('express');
const { getAllProgramas, getOnePrograma, createPrograma, updatePrograma, deletePrograma } = require('../controllers/programas_academicos.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllProgramas);

router.get('/:id_prog', getOnePrograma);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createPrograma);

router.put('/:id_prog', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updatePrograma);

router.delete('/:id_prog', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deletePrograma);

module.exports = router;