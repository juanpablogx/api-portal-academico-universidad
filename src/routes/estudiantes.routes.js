const { Router } = require('express');
const { getAllEstudiantes, getOneEstudiante, createEstudiante, deleteEstudiante } = require('../controllers/estudiantes.controller');

const router = Router();

router.get('/estudiantes', getAllEstudiantes);

router.get('/estudiantes/:codigo_dni', getOneEstudiante);

router.post('/estudiantes', createEstudiante);

router.delete('/estudiantes/:codigo_dni', deleteEstudiante);

module.exports = router;