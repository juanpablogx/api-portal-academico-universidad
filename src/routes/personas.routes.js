const { Router } = require('express');
const { getAllPersonas, getOnePersona, createPersona, updatePersona, deletePersona } = require('../controllers/personas.controller');

const router = Router();

router.get('/personas', getAllPersonas);

router.get('/personas/:codigo_dni', getOnePersona);

router.post('/personas', createPersona);

router.put('/personas/:codigo_dni', updatePersona);

router.delete('/personas/:codigo_dni', deletePersona);

module.exports = router;