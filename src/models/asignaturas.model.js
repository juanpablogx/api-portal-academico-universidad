const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'asignaturas';
const columns = ['id_asig', 'codigo_asig', 'id_prog', 'nombre', 'creditos', 'estado'];
const primaryKey = 'id_asig';

const selectAsignaturas = (limit = 100) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.codigo_asig`, 
    `${table}.id_prog`, 
    `${table}.nombre AS nombre_asignatura`, 
    `${table}.creditos`, 
    `programas_academicos.nombre AS nombre_programa`,
    `programas_academicos.codigo AS codigo_programa`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN programas_academicos ON ${table}.id_prog = programas_academicos.id_prog
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneAsignatura = (id_asig) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.codigo_asig`, 
    `${table}.id_prog`, 
    `${table}.nombre AS nombre_asignatura`, 
    `${table}.creditos`, 
    `programas_academicos.nombre AS nombre_programa`,
    `programas_academicos.codigo AS codigo_programa`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN programas_academicos ON ${table}.id_prog = programas_academicos.id_prog
    WHERE ${primaryKey} = ${id_asig} AND ${table}.estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertAsignatura = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateAsignatura = (id_asig, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_asig} RETURNING *`);
  return result;
};

const deleteAsignatura = (id_asig) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_asig} RETURNING *`);
  return result;
};

module.exports = {
  selectAsignaturas,
  selectOneAsignatura,
  insertAsignatura,
  updateAsignatura,
  deleteAsignatura
};