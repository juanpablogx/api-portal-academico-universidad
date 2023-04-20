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

app.get('/', (request, response) => {
  response.send({
    message: 'Hola bienvenido a la app portal académico'
  });
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).json({message: err.message});
});

app.use(programasAcademicosRouter);
app.use(facultadesRouter);
app.use(tiposProgramasRouter);
app.use(asignaturasRouter);
app.use(semestresRouter);
app.use(salonesRouter);
app.use(horariosRouter);

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
});