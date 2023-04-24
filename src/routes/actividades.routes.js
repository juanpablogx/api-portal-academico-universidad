const { Router } = require('express');
const { getAllActividades, getOneActividad, createActividad, updateActividad, deleteActividad, validarPorcentaje } = require('../controllers/actividades.controller')

const router = Router();

router.get('/actividades', getAllActividades);

router.get('/actividades/:id_actividad', getOneActividad);

router.post('/actividades', validarPorcentaje, createActividad);

router.put('/actividades/:id_actividad', validarPorcentaje, updateActividad);

router.delete('/actividades/:id_actividad', deleteActividad);

module.exports = router;