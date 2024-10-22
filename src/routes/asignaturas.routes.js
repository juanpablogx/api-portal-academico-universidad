const { Router } = require('express');
const { getAllAsignaturas, getOneAsignatura, createAsignatura, updateAsignatura, deleteAsignatura } = require('../controllers/asignaturas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllAsignaturas);

router.get('/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneAsignatura);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createAsignatura);

router.put('/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateAsignatura);

router.delete('/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteAsignatura);

module.exports = router;