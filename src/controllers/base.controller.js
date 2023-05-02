const jwt = require('jsonwebtoken');
const model = require('../models/usuarios.model');

const authenticateTokenUsuario = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (token == null || token == undefined) return response.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    // console.log(err);
    if (err) return response.sendStatus(401);

    model.selectOneUsuario(user.codigo_dni)
      .then(result => {
        if (result.rows.length == 1) {
          const { codigo_dni, tipo } = result.rows[0];
          request.body.userAuth = { codigo_dni, tipo };
          next();
        } else {
          response.sendStatus(401);
        }
      })
      .catch(err => {
        next(err);
      });
  })
};

const authenticateTipoUsuario = tipo => {
  return (request, response, next) => {
    let autorizado = false;
    if (tipo instanceof Array) {
      autorizado = tipo.includes(request?.body?.userAuth.tipo);
    } else {
      autorizado = request?.body?.userAuth.tipo === tipo
    }

    if (autorizado) {
      next();
    } else {
      response.sendStatus(401);
    }
  };
};

module.exports = {
  authenticateTokenUsuario,
  authenticateTipoUsuario
}