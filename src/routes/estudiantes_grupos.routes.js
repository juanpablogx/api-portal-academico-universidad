const { Router } = require('express');
const { getAllEstudiantesGrupos, getOneEstudianteGrupo, getEstudianteGruposOneSemestre, createEstudianteGrupo, updateEstudianteGrupo, deleteEstudianteGrupo } = require('../controllers/estudiantes_grupos.controller')

const router = Router();

router.get('/estudiantes_grupos', getAllEstudiantesGrupos);

router.get('/estudiantes_grupos/:codigo_estudiante/semestre/:id_semestre', getEstudianteGruposOneSemestre);

router.get('/estudiantes_grupos/:codigo_estudiante/:id_asig/:id_semestre', getOneEstudianteGrupo);

router.post('/estudiantes_grupos', createEstudianteGrupo);

router.put('/estudiantes_grupos/:codigo_estudiante/:id_asig/:id_semestre', updateEstudianteGrupo);

router.delete('/estudiantes_grupos/:codigo_estudiante/:id_asig/:id_semestre', deleteEstudianteGrupo);

module.exports = router;