const { Router } = require('express');
const { getAllHorarios, getOneHorario, createHorario, updateHorario, deleteHorario } = require('../controllers/horarios.controller');

const router = Router();

router.get('/horarios', getAllHorarios);

router.get('/horarios/:id_horario', getOneHorario);

router.post('/horarios', createHorario);

router.put('/horarios/:id_horario', updateHorario);

router.delete('/horarios/:id_horario', deleteHorario);

module.exports = router;