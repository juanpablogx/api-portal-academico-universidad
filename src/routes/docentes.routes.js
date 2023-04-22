const { Router } = require('express');
const { getAllDocentes, getOneDocente, createDocente, deleteDocente } = require('../controllers/docentes.controller');

const router = Router();

router.get('/docentes', getAllDocentes);

router.get('/docentes/:codigo_dni', getOneDocente);

router.post('/docentes', createDocente);

router.delete('/docentes/:codigo_dni', deleteDocente);

module.exports = router;