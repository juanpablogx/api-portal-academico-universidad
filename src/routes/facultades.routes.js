const { Router } = require('express');
const { getAllFacultades, getOneFacultad, createFacultad, updateFacultad, deleteFacultad } = require('../controllers/facultades.controller')

const router = Router();

router.get('/facultades', getAllFacultades);

router.get('/facultades/:id_fac', getOneFacultad);

router.post('/facultades', createFacultad);

router.put('/facultades/:id_fac', updateFacultad);

router.delete('/facultades/:id_fac', deleteFacultad);

module.exports = router;