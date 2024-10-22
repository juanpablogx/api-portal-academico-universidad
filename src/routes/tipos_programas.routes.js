const { Router } = require('express');
const { getAllTiposProgramas, getOneTipoPrograma, createTipoPrograma, updateTipoPrograma, deleteTipoPrograma } = require('../controllers/tipos_programas.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getAllTiposProgramas);

router.get('/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), getOneTipoPrograma);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), createTipoPrograma);

router.put('/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), updateTipoPrograma);

router.delete('/:id_tipo', authenticateTokenUsuario, authenticateTipoUsuario('administrador'), deleteTipoPrograma);

module.exports = router;