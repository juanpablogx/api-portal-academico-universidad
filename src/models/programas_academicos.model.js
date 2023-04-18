const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'programas_academicos';
const columns = ['id_prog', 'codigo', 'id_fac', 'nombre', 'id_tipo', 'estado'];
const primaryKey = 'id_prog';

const selectProgramas = (limit = 100) => {
  const columns_select = [
    `${table}.codigo`, 
    `${table}.id_fac`, 
    `${table}.nombre AS nombre_programa`, 
    `${table}.id_tipo`,
    `facultades.nombre AS nombre_facultad`,
    `tipos_programas.nombre AS tipo`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN facultades ON ${table}.id_fac = facultades.id_fac
    INNER JOIN tipos_programas ON ${table}.id_tipo = tipos_programas.id_tipo
    WHERE estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOnePrograma = (id_prog) => {
  const columns_select = [
    `${table}.codigo`, 
    `${table}.id_fac`, 
    `${table}.nombre AS nombre_programa`, 
    `${table}.id_tipo`,
    `facultades.nombre AS nombre_facultad`,
    `tipos_programas.nombre AS tipo`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN facultades ON ${table}.id_fac = facultades.id_fac
    INNER JOIN tipos_programas ON ${table}.id_tipo = tipos_programas.id_tipo 
    WHERE ${primaryKey} = ${id_prog} AND estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertPrograma = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updatePrograma = (id_prog, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${primaryKey} = ${id_prog} AND estado = true RETURNING *`);
  return result;
};

const deletePrograma = (id_prog) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_prog} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectProgramas,
  selectOnePrograma,
  insertPrograma,
  updatePrograma,
  deletePrograma
};