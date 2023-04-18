const { Router } = require('express');
const { getAllTiposProgramas, getOneTipoPrograma, createTipoPrograma, updateTipoPrograma, deleteTipoPrograma } = require('../controllers/tipos_programas.controller')

const router = Router();

router.get('/tipos_programas', getAllTiposProgramas);

router.get('/tipos_programas/:id_tipo', getOneTipoPrograma);

router.post('/tipos_programas', createTipoPrograma);

router.put('/tipos_programas/:id_tipo', updateTipoPrograma);

router.delete('/tipos_programas/:id_tipo', deleteTipoPrograma);

module.exports = router;