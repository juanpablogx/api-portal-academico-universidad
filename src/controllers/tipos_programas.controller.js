const model = require('../models/tipos_programas.model');

const getAllTiposProgramas = (request, response, next) => {
  model.selectTiposProgramas()
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneTipoPrograma = (request, response, next) => {
  model.selectOneTipoPrograma(request.params.id_tipo)
    .then(result => {
      response.json({tiposProgramas: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createTipoPrograma = (request, response, next) => {
  model.insertTipoPrograma(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateTipoPrograma = (request, response, next) => {
  model.updateTipoPrograma(request.params.id_tipo, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteTipoPrograma = (request, response, next) => {
  model.deleteTipoPrograma(request.params.id_tipo)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedTipoPrograma: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllTiposProgramas,
  getOneTipoPrograma,
  createTipoPrograma,
  updateTipoPrograma,
  deleteTipoPrograma
};
