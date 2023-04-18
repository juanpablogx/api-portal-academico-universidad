const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./config')

const app = express();

const programasAcademicosRouter = require('./routes/programas_academicos.routes');
const facultadesRouter = require('./routes/facultades.routes');
const tiposProgramasRouter = require('./routes/tipos_programas.routes');
const asignaturasRouter = require('./routes/asignaturas.routes');

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

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
});