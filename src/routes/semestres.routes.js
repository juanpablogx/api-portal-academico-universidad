const { Router } = require('express');
const { getAllSemestres, getOneSemestre, createSemestre, updateSemestre, deleteSemestre } = require('../controllers/semestres.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente', 'estudiante']), getAllSemestres);

router.get('/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente', 'estudiante']), getOneSemestre);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), createSemestre);

router.put('/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), updateSemestre);

router.delete('/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteSemestre);

module.exports = router;