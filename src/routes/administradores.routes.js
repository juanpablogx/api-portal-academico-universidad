const { Router } = require('express');
const { getAllAdministradores, getOneAdministrador, createAdministrador, deleteAdministrador } = require('../controllers/administradores.controller');

const router = Router();

router.get('/administradores', getAllAdministradores);

router.get('/administradores/:codigo_dni', getOneAdministrador);

router.post('/administradores', createAdministrador);

router.delete('/administradores/:codigo_dni', deleteAdministrador);

module.exports = router;