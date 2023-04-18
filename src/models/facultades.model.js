const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'facultades';
const columns = ['id_fac', 'nombre', 'estado'];
const primaryKey = 'id_fac';

const selectFacultades = (limit = 100) => {
  const columns_select = [
    `id_fac`, 
    `nombre`, 
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneFacultad = (id_fac) => {
  const columns_select = [
    `id_fac`, 
    `nombre`, 
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    WHERE ${primaryKey} = ${id_fac}  
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertFacultad = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateFacultad = (id_fac, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_fac} RETURNING *`);
  return result;
};

const deleteFacultad = (id_fac) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_fac} RETURNING *`);
  return result;
};

module.exports = {
  selectFacultades,
  selectOneFacultad,
  insertFacultad,
  updateFacultad,
  deleteFacultad
};