const { Router } = require('express');
const { getAllProgramas, getOnePrograma, createPrograma, updatePrograma, deletePrograma } = require('../controllers/programas_academicos.controller')

const router = Router();

router.get('/programas_academicos', getAllProgramas);

router.get('/programas_academicos/:id_prog', getOnePrograma);

router.post('/programas_academicos', createPrograma);

router.put('/programas_academicos/:id_prog', updatePrograma);

router.delete('/programas_academicos/:id_prog', deletePrograma);

module.exports = router;