const { Router } = require('express');
const { getAllEstudiantesGrupos, getOneEstudianteGrupo, getEstudianteGruposOneSemestre, createEstudianteGrupo, updateEstudianteGrupo, deleteEstudianteGrupo, getEstudiantesOneGrupo, verificarMaxEstudiantesOneGrupo } = require('../controllers/estudiantes_grupos.controller')
const { authenticateTokenUsuario, authenticateTipoUsuario } = require('../controllers/base.controller');

const router = Router();

router.get('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), getAllEstudiantesGrupos);

router.get('/:codigo_estudiante/semestre/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'estudiante']), getEstudianteGruposOneSemestre);

router.get('/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'estudiante']), getOneEstudianteGrupo);

router.get('/grupo/:id_asig/:id_semestre/:numero_grupo', authenticateTokenUsuario, authenticateTipoUsuario(['administrador', 'docente']), getEstudiantesOneGrupo);

router.post('/', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), verificarMaxEstudiantesOneGrupo, createEstudianteGrupo);

router.put('/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), updateEstudianteGrupo);

router.delete('/:codigo_estudiante/:id_asig/:id_semestre', authenticateTokenUsuario, authenticateTipoUsuario(['administrador']), deleteEstudianteGrupo);

module.exports = router;