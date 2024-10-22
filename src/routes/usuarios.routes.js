const { Router } = require('express');
const { getAllUsuarios, getOneUsuario, getOneUsuarioLogin, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { authenticateTokenUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, getAllUsuarios);

router.get('/:codigo_dni', authenticateTokenUsuario, getOneUsuario);

router.post('/login', getOneUsuarioLogin);

router.post('/authenticateToken', authenticateTokenUsuario, (request, response) => {
  console.log(request.body.userAuth);
  response.json({user: request.body.userAuth});
});

router.post('/', authenticateTokenUsuario, createUsuario);

router.put('/:codigo_dni', authenticateTokenUsuario, updateUsuario);

router.delete('/:codigo_dni', authenticateTokenUsuario, deleteUsuario);

module.exports = router;