const { Router } = require('express');
const { getAllActividades, getOneActividad, createActividad, updateActividad, deleteActividad, validarPorcentaje, getActividadesOneGrupo, validarSumaPorcentaje } = require('../controllers/actividades.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), getAllActividades);

router.get('/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), getOneActividad);


router.get('/grupo_asignatura/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['docente', 'administrador']), getActividadesOneGrupo);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), validarPorcentaje, validarSumaPorcentaje, createActividad);

router.put('/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), validarPorcentaje, validarSumaPorcentaje, updateActividad);

router.delete('/:id_actividad', authenticateTokenUsuario, authenticateTipoUsuario(['docente']), deleteActividad);

module.exports = router;