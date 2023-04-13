const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send({'message': 'Hola bienvenido a la app portal académico'})
});

app.listen(port, () => {
  console.log(`Server active on port ${port}`)
});