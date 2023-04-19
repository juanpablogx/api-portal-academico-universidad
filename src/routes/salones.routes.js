const { Router } = require('express');
const { getAllSalones, getOneSalon, createSalon, updateSalon, deleteSalon } = require('../controllers/salones.controller');

const router = Router();

router.get('/salones', getAllSalones);

router.get('/salones/:id_salon', getOneSalon);

router.post('/salones', createSalon);

router.put('/salones/:id_salon', updateSalon);

router.delete('/salones/:id_salon', deleteSalon);

module.exports = router;