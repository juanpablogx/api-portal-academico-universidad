const { Router } = require('express');
const { getAllSalones, getOneSalon, createSalon, updateSalon, deleteSalon } = require('../controllers/salones.controller');

const router = Router();

router.get('/', getAllSalones);

router.get('/:id_salon', getOneSalon);

router.post('/', createSalon);

router.put('/:id_salon', updateSalon);

router.delete('/:id_salon', deleteSalon);

module.exports = router;