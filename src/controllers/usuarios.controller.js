const model = require('../models/usuarios.model');
const CryptoJS = require('crypto-js');

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
  const { codigo_dni, password } = request.params.body;
  model.selectOneUsuario(codigo_dni, password)
    .then(result => {
      response.json({usuarios: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createUsuario = (request, response, next) => {
  let hashPassword;
  if (request.body.password) {
    hashPassword = CryptoJS.SHA256(request.body.password);
  } else {
    hashPassword = CryptoJS.SHA256(request.body.codigo_dni);
  }
  request.body.password = hashPassword.toString(CryptoJS.enc.Hex);

  model.insertUsuario(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newUsuario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateUsuario = (request, response, next) => {
  if (request.body.password) {
    let hashPassword = CryptoJS.SHA256(request.body.password);
    request.body.password = hashPassword.toString(CryptoJS.enc.Hex);
  }
  model.updateUsuario(request.params.codigo_dni, request.body)
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
