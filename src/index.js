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

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/programas_academicos', programasAcademicosRouter);
app.use('/facultades', facultadesRouter);
app.use('/tipos_programas', tiposProgramasRouter);
app.use('/asignaturas', asignaturasRouter);
app.use('/semestres', semestresRouter);
app.use('/salones', salonesRouter);
app.use('/horarios', horariosRouter);
app.use('/personas', personasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/administradores', administradoresRouter);
app.use('/docentes', docentesRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/grupos_asignaturas', gruposAsignaturasRouter);
app.use('/grupos_asignaturas_horarios', gruposAsignaturasHorariosRouter);
app.use('/actividades', actividadesRouter);
app.use('/estudiantes_grupos', estudiantesGruposRouter);
app.use('/notas_actividades', notasActividadesRouter);

app.use((err, request, response, next) => {
  console.log(err.message);
  response.status(500).json({message: err.message});
});

app.get('/', (request, response) => {
  response.send({
    message: 'Hola bienvenido a la app portal académico'
  });
});

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
});