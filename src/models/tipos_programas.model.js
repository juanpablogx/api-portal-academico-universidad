const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'tipos_programas';
const columns = ['id_tipo', 'nombre', 'estado'];
const primaryKey = 'id_tipo';

const selectTiposProgramas = (limit = 100) => {
  const columns_select = [
    `id_tipo`, 
    `nombre`, 
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    ORDER BY ${primaryKey}
    WHERE estado = true
    LIMIT ${limit}
  `);
  return result;
};

const selectOneTipoPrograma = (id_tipo) => {
  const columns_select = [
    `id_tipo`, 
    `nombre`, 
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    WHERE ${primaryKey} = ${id_tipo} AND estado = true 
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertTipoPrograma = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateTipoPrograma = (id_tipo, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_tipo} RETURNING *`);
  return result;
};

const deleteTipoPrograma = (id_tipo) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_tipo} RETURNING *`);
  return result;
};

module.exports = {
  selectTiposProgramas,
  selectOneTipoPrograma,
  insertTipoPrograma,
  updateTipoPrograma,
  deleteTipoPrograma
};