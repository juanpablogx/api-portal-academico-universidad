const { Router } = require('express');
const { getAllNotasActividades, getOneNotaActividad, getNotaActividadesOneGrupo, createNotaActividad, updateNotaActividad, deleteNotaActividad, validarAcvitidadMismoGrupo, getNotasActividadOneGrupo, getNotasActividadesOneEstudianteOneGrupo } = require('../controllers/notas_actividades.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'estudiante']), getAllNotasActividades);

router.get('/grupo_asignaturas/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'estudiante']), getNotaActividadesOneGrupo);

router.get('/grupo_asignaturas/:id_asig/:id_semestre/:numero_grupo/actividad/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'estudiante']), getNotasActividadOneGrupo);

router.get('/grupo_asignaturas/:id_asig/:id_semestre/:numero_grupo/estudiante/:codigo_estudiante', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'estudiante']), getNotasActividadesOneEstudianteOneGrupo);

router.get('/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'estudiante']), getOneNotaActividad);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'administrador']), validarAcvitidadMismoGrupo, createNotaActividad);

router.put('/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), validarAcvitidadMismoGrupo, updateNotaActividad);

router.delete('/:id_actividad/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), deleteNotaActividad);

module.exports = router;