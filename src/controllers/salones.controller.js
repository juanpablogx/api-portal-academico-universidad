const model = require('../models/salones.model');

const getAllSalones = (request, response, next) => {
  model.selectSalones()
    .then(result => {
      response.json({salones: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneSalon = (request, response, next) => {
  model.selectOneSalon(request.params.id_salon)
    .then(result => {
      response.json({salones: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createSalon = (request, response, next) => {
  model.insertSalon(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newSalon: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateSalon = (request, response, next) => {
  model.updateSalon(request.params.id_salon, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedSalon: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteSalon = (request, response, next) => {
  model.deleteSalon(request.params.id_salon)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedSalon: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllSalones,
  getOneSalon,
  createSalon,
  updateSalon,
  deleteSalon
};
