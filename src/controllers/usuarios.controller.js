const model = require('../models/usuarios.model');
const { hash, generateAccessToken } = require('../tools');

const getAllUsuarios = (request, response, next) => {
  model.selectUsuarios()
    .then(result => {
      response.json({usuarios: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneUsuario = (request, response, next) => {
  model.selectOneUsuario(request.params.codigo_dni)
    .then(result => {
      response.json({usuarios: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneUsuarioLogin = (request, response, next) => {
  const { codigo_dni, password } = request.body.data;

  const hashPassword = hash(password);

  model.selectOneUsuario(codigo_dni, hashPassword)
    .then(result => {
      let token = result.rows.length == 1 ? generateAccessToken({ codigo_dni: result.rows[0].codigo_dni }) : null;
      response.json({usuarios: result.rows, token});
    })
    .catch(err => {
      next(err);
    });
};

const createUsuario = (request, response, next) => {
  let hashPassword;
  if (request.body.data.password) {
    hashPassword = hash(request.body.data.password);
  } else {
    hashPassword = hash(request.body.data.codigo_dni);
  }
  request.body.data.password = hashPassword;

  model.insertUsuario(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newUsuario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateUsuario = (request, response, next) => {
  if (request.body.data.password) {
    let hashPassword = hash(request.body.data.password);
    request.body.data.password = hashPassword;
  }
  model.updateUsuario(request.params.codigo_dni, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedUsuario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteUsuario = (request, response, next) => {
  model.deleteUsuario(request.params.codigo_dni)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedUsuario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  getOneUsuarioLogin,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
