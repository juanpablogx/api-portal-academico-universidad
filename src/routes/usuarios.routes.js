const { Router } = require('express');
const { getAllUsuarios, getOneUsuario, getOneUsuarioLogin, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { authenticateTokenUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/usuarios', authenticateTokenUsuario, getAllUsuarios);

router.get('/usuarios/:codigo_dni', authenticateTokenUsuario, getOneUsuario);

router.post('/usuarios/login', getOneUsuarioLogin);

router.post('/usuarios/authenticateToken', authenticateTokenUsuario, (request, response) => {
  console.log(request.body.userAuth);
  response.json({user: request.body.userAuth});
});

router.post('/usuarios', authenticateTokenUsuario, createUsuario);

router.put('/usuarios/:codigo_dni', authenticateTokenUsuario, updateUsuario);

router.delete('/usuarios/:codigo_dni', authenticateTokenUsuario, deleteUsuario);

module.exports = router;