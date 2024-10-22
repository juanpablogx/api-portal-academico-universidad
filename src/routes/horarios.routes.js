const { Router } = require('express');
const { getAllHorarios, getOneHorario, createHorario, updateHorario, deleteHorario } = require('../controllers/horarios.controller');

const router = Router();

router.get('/', getAllHorarios);

router.get('/:id_horario', getOneHorario);

router.post('/', createHorario);

router.put('/:id_horario', updateHorario);

router.delete('/:id_horario', deleteHorario);

module.exports = router;