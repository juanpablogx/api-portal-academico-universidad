const { Router } = require('express');
const { getAllSemestres, getOneSemestre, createSemestre, updateSemestre, deleteSemestre } = require('../controllers/semestres.controller');

const router = Router();

router.get('/semestres', getAllSemestres);

router.get('/semestres/:id_semestre', getOneSemestre);

router.post('/semestres', createSemestre);

router.put('/semestres/:id_semestre', updateSemestre);

router.delete('/semestres/:id_semestre', deleteSemestre);

module.exports = router;