const { Router } = require('express');
const { getAllActividades, getOneActividad, createActividad, updateActividad, deleteActividad, validarPorcentaje, getActividadesOneGrupo, validarSumaPorcentaje } = require('../controllers/actividades.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/actividades', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), getAllActividades);

router.get('/actividades/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), getOneActividad);


router.get('/actividades/grupo_asignatura/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'administrador']), getActividadesOneGrupo);

router.post('/actividades', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), validarPorcentaje, validarSumaPorcentaje, createActividad);

router.put('/actividades/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), validarPorcentaje, validarSumaPorcentaje, updateActividad);

router.delete('/actividades/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), deleteActividad);

module.exports = router;