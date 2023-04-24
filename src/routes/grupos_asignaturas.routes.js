const { Router } = require('express');
const { getAllGruposAsignaturas, getOneGrupoAsignatura, createGrupoAsignatura, updateGrupoAsignatura, deleteGrupoAsignatura, deleteGruposAsignaturasOneSemestre } = require('../controllers/grupos_asignaturas.controller')

const router = Router();

router.get('/grupos_asignaturas', getAllGruposAsignaturas);

router.get('/grupos_asignaturas/:id_asig/:id_semestre/:numero', getOneGrupoAsignatura);

router.post('/grupos_asignaturas', createGrupoAsignatura);

router.put('/grupos_asignaturas/:id_asig/:id_semestre/:numero', updateGrupoAsignatura);

router.delete('/grupos_asignaturas/:id_asig/:id_semestre/:numero', deleteGrupoAsignatura);

router.delete('/grupos_asignaturas/semestre/:id_semestre', deleteGruposAsignaturasOneSemestre);

module.exports = router;