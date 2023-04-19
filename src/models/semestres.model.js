const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'semestres';
const columns = ['id_semestre', 'year', 'numero', 'fecha_inicio', 'fecha_fin', 'estado'];
const primaryKey = 'id_semestre';

const selectSemestres = (limit = 100) => {
  const columns_select = [
    `id_semestre`, 
    `year`, 
    `numero`, 
    `fecha_inicio`, 
    `fecha_fin`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneSemestre = (id_semestre) => {
  const columns_select = [
    `id_semestre`, 
    `year`, 
    `numero`, 
    `fecha_inicio`, 
    `fecha_fin`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    WHERE ${primaryKey} = ${id_semestre} AND estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertSemestre = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateSemestre = (id_semestre, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_semestre} RETURNING *`);
  return result;
};

const deleteSemestre = (id_semestre) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_semestre} RETURNING *`);
  return result;
};

module.exports = {
  selectSemestres,
  selectOneSemestre,
  insertSemestre,
  updateSemestre,
  deleteSemestre
};