const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./config')

const app = express();

const programasAcademicosRouter = require('./routes/programas_academicos.routes');
const facultadesRouter = require('./routes/facultades.routes');
const tiposProgramasRouter = require('./routes/tipos_programas.routes');
const asignaturasRouter = require('./routes/asignaturas.routes');
const semestresRouter = require('./routes/semestres.routes');
const salonesRouter = require('./routes/salones.routes');
const horariosRouter = require('./routes/horarios.routes');
const personasRouter = require('./routes/personas.routes');
const usuariosRouter = require('./routes/usuarios.routes');
const administradoresRouter = require('./routes/administradores.routes');
const docentesRouter = require('./routes/docentes.routes');
const estudiantesRouter = require('./routes/estudiantes.routes');
const gruposAsignaturasRouter = require('./routes/grupos_asignaturas.routes');
const gruposAsignaturasHorariosRouter = require('./routes/grupos_asignaturas_horarios.routes');
const actividadesRouter = require('./routes/actividades.routes');
const estudiantesGruposRouter = require('./routes/estudiantes_grupos.routes');
const notasActividadesRouter = require('./routes/notas_actividades.routes');

app.get('/', (request, response) => {
  response.send({
    message: 'Hola bienvenido a la app portal académico'
  });
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(programasAcademicosRouter);
app.use(facultadesRouter);
app.use(tiposProgramasRouter);
app.use(asignaturasRouter);
app.use(semestresRouter);
app.use(salonesRouter);
app.use(horariosRouter);
app.use(personasRouter);
app.use(usuariosRouter);
app.use(administradoresRouter);
app.use(docentesRouter);
app.use(estudiantesRouter);
app.use(gruposAsignaturasRouter);
app.use(gruposAsignaturasHorariosRouter);
app.use(actividadesRouter);
app.use(estudiantesGruposRouter);
app.use(notasActividadesRouter);

app.use((err, request, response, next) => {
  console.log(err.message);
  response.status(500).json({message: err.message});
});

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
});