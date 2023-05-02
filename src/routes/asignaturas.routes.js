const { Router } = require('express');
const { getAllAsignaturas, getOneAsignatura, createAsignatura, updateAsignatura, deleteAsignatura } = require('../controllers/asignaturas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/asignaturas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllAsignaturas);

router.get('/asignaturas/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneAsignatura);

router.post('/asignaturas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createAsignatura);

router.put('/asignaturas/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateAsignatura);

router.delete('/asignaturas/:id_asig', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteAsignatura);

module.exports = router;