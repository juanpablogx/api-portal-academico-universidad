const { Router } = require('express');
const { getAllSemestres, getOneSemestre, createSemestre, updateSemestre, deleteSemestre } = require('../controllers/semestres.controller');
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/semestres', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente', 'estudiante']), getAllSemestres);

router.get('/semestres/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente', 'estudiante']), getOneSemestre);

router.post('/semestres', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), createSemestre);

router.put('/semestres/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), updateSemestre);

router.delete('/semestres/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteSemestre);

module.exports = router;