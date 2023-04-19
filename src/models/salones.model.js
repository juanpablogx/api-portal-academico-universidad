const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'salones';
const columns = ['id_salon', 'edificio', 'piso', 'numero', 'estado'];
const primaryKey = 'id_salon';

const selectSalones = (limit = 100) => {
  const columns_select = [
    `id_salon`, 
    `edificio`, 
    `piso`, 
    `numero`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneSalon = (id_salon) => {
  const columns_select = [
    `id_salon`, 
    `edificio`, 
    `piso`, 
    `numero`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE ${primaryKey} = ${id_salon} AND estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertSalon = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateSalon = (id_salon, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_salon} RETURNING *`);
  return result;
};

const deleteSalon = (id_salon) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_salon} RETURNING *`);
  return result;
};

module.exports = {
  selectSalones,
  selectOneSalon,
  insertSalon,
  updateSalon,
  deleteSalon
};