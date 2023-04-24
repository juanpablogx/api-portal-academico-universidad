const { Router } = require('express');
const { getAllNotasActividades, getOneNotaActividad, getNotaActividadesOneGrupo, createNotaActividad, updateNotaActividad, deleteNotaActividad, validarAcvitidadMismoGrupo } = require('../controllers/notas_actividades.controller')

const router = Router();

router.get('/notas_actividades', getAllNotasActividades);

router.get('/notas_actividades/grupo_asignaturas/:id_asig/:id_semestre/:numero_grupo', getNotaActividadesOneGrupo);

router.get('/notas_actividades/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', getOneNotaActividad);

router.post('/notas_actividades', validarAcvitidadMismoGrupo, createNotaActividad);

router.put('/notas_actividades/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', validarAcvitidadMismoGrupo, updateNotaActividad);

router.delete('/notas_actividades/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', deleteNotaActividad);

module.exports = router;