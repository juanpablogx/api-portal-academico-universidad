const { Router } = require('express');
const { getAllAdministradores, getOneAdministrador, createAdministrador, deleteAdministrador } = require('../controllers/administradores.controller');

const router = Router();

router.get('/', getAllAdministradores);

router.get('/:codigo_dni', getOneAdministrador);

router.post('/', createAdministrador);

router.delete('/:codigo_dni', deleteAdministrador);

module.exports = router;