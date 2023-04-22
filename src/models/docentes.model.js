const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'docentes';
const columns = ['codigo_dni', 'estado'];
const primaryKey = 'codigo_dni';

const selectDocentes = (limit = 100) => {
  const columns_select = [
    `${table}.codigo_dni`, 
    `usuarios.correo_inst`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}
    INNER JOIN usuarios ON ${table}.codigo_dni = usuarios.codigo_dni
    WHERE ${table}.estado = true 
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneDocente = (codigo_dni) => {
  const columns_select = [
    `${table}.codigo_dni`, 
    `usuarios.correo_inst`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN usuarios ON ${table}.codigo_dni = usuarios.codigo_dni
    WHERE ${table}.${primaryKey} = '${codigo_dni}' AND ${table}.estado = true ${wherePassword} 
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertDocente = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const deleteDocente = (codigo_dni) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = '${codigo_dni}' RETURNING *`);
  return result;
};

module.exports = {
  selectDocentes,
  selectOneDocente,
  insertDocente,
  deleteDocente
};