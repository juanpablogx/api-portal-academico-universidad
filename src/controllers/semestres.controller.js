const model = require('../models/semestres.model');

const getAllSemestres = (request, response, next) => {
  model.selectSemestres()
    .then(result => {
      response.json({semestres: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const getOneSemestre = (request, response, next) => {
  model.selectOneSemestre(request.params.id_semestre)
    .then(result => {
      response.json({semestres: result.rows});
    })
    .catch(err => {
      next(err);
    });
};

const createSemestre = (request, response, next) => {
  model.insertSemestre(request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, newSemestre: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const updateSemestre = (request, response, next) => {
  model.updateSemestre(request.params.id_semestre, request.body.data)
  .then(result => {
    response.json({rowCount: result.rowCount, updatedSemestre: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

const deleteSemestre = (request, response, next) => {
  model.deleteSemestre(request.params.id_semestre)
  .then(result => {
    response.json({rowCount: result.rowCount, deletedSemestre: result.rows[0]});
  })
  .catch(err => {
    next(err);
  });
};

module.exports = {
  getAllSemestres,
  getOneSemestre,
  createSemestre,
  updateSemestre,
  deleteSemestre
};
