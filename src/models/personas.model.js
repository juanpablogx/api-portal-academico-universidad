const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'personas';
const columns = ['codigo_dni', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'telefono', 'celular', 'correo_pers', 'estado'];
const primaryKey = 'codigo_dni';

const selectPersonas = (limit = 100) => {
  const columns_select = [
    `codigo_dni`, 
    `nombre1`, 
    `nombre2`, 
    `apellido1`,
    `apellido2`,
    `telefono`,
    `celular`,
    `correo_pers`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOnePersona = (codigo_dni) => {
  const columns_select = [
    `codigo_dni`, 
    `nombre1`, 
    `nombre2`, 
    `apellido1`,
    `apellido2`,
    `telefono`,
    `celular`,
    `correo_pers`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE ${primaryKey} = '${codigo_dni}' AND estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertPersona = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updatePersona = (codigo_dni, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = '${codigo_dni}' RETURNING *`);
  return result;
};

const deletePersona = (codigo_dni) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = '${codigo_dni}' RETURNING *`);
  return result;
};

module.exports = {
  selectPersonas,
  selectOnePersona,
  insertPersona,
  updatePersona,
  deletePersona
};