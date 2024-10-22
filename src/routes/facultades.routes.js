const { Router } = require('express');
const { getAllFacultades, getOneFacultad, createFacultad, updateFacultad, deleteFacultad } = require('../controllers/facultades.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');


const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllFacultades);

router.get('/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneFacultad);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createFacultad);

router.put('/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateFacultad);

router.delete('/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteFacultad);

module.exports = router;