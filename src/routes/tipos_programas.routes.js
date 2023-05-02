const { Router } = require('express');
const { getAllTiposProgramas, getOneTipoPrograma, createTipoPrograma, updateTipoPrograma, deleteTipoPrograma } = require('../controllers/tipos_programas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/tipos_programas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllTiposProgramas);

router.get('/tipos_programas/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneTipoPrograma);

router.post('/tipos_programas', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createTipoPrograma);

router.put('/tipos_programas/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateTipoPrograma);

router.delete('/tipos_programas/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteTipoPrograma);

module.exports = router;