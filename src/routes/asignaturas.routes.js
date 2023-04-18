const { Router } = require('express');
const { getAllAsignaturas, getOneAsignatura, createAsignatura, updateAsignatura, deleteAsignatura } = require('../controllers/asignaturas.controller')

const router = Router();

router.get('/asignaturas', getAllAsignaturas);

router.get('/asignaturas/:id_asig', getOneAsignatura);

router.post('/asignaturas', createAsignatura);

router.put('/asignaturas/:id_asig', updateAsignatura);

router.delete('/asignaturas/:id_asig', deleteAsignatura);

module.exports = router;