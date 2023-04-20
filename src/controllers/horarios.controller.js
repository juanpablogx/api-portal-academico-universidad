const model = require('../models/horarios.model');

const getAllHorarios = (request, response, next) => {
  model.selectHorarios()
    .then(result => {
      response.json({horarios: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneHorario = (request, response, next) => {
  model.selectOneHorario(request.params.id_horario)
    .then(result => {
      response.json({horarios: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createHorario = (request, response, next) => {
  model.insertHorario(request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, newHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateHorario = (request, response, next) => {
  model.updateHorario(request.params.id_horario, request.body)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteHorario = (request, response, next) => {
  model.deleteHorario(request.params.id_horario)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedHorario: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllHorarios,
  getOneHorario,
  createHorario,
  updateHorario,
  deleteHorario
};
