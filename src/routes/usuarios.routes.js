const { Router } = require('express');
const { getAllUsuarios, getOneUsuario, getOneUsuarioLogin, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/usuarios', getAllUsuarios);

router.get('/usuarios/:codigo_dni', getOneUsuario);

router.post('/usuarios/login', getOneUsuarioLogin);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:codigo_dni', updateUsuario);

router.delete('/usuarios/:codigo_dni', deleteUsuario);

module.exports = router;