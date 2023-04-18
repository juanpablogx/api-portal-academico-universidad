const model = require('../models/tipos_programas.model');
const { ERROR_RESPONSE_DB } = require('./base.controller')

const getAllTiposProgramas = (request, response) => {
  model.selectTiposProgramas()
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const getOneTipoPrograma = (request, response) => {
  model.selectOneTipoPrograma(request.params.id_tipo)
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(ERROR_RESPONSE_DB);
    });
};

const createTipoPrograma = (request, response) => {
  model.insertTipoPrograma(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const updateTipoPrograma = (request, response) => {
  model.updateTipoPrograma(request.params.id_tipo, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

const deleteTipoPrograma = (request, response) => {
  model.deleteTipoPrograma(request.params.id_tipo)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    console.log(err);
    response.status(500).json(ERROR_RESPONSE_DB);
  });
};

module.exports = {
  getAllTiposProgramas,
  getOneTipoPrograma,
  createTipoPrograma,
  updateTipoPrograma,
  deleteTipoPrograma
};
