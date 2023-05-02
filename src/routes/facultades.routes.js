const { Router } = require('express');
const { getAllFacultades, getOneFacultad, createFacultad, updateFacultad, deleteFacultad } = require('../controllers/facultades.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');


const router = Router();

router.get('/facultades', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllFacultades);

router.get('/facultades/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneFacultad);

router.post('/facultades', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createFacultad);

router.put('/facultades/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateFacultad);

router.delete('/facultades/:id_fac', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteFacultad);

module.exports = router;