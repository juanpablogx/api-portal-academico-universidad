const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'horarios';
const columns = ['id_horario', 'id_dia', 'hora_inicio', 'hora_fin', 'estado'];
const primaryKey = 'id_horario';

const selectHorarios = (limit = 100) => {
  const columns_select = [
    `${table}.id_horario`, 
    `${table}.id_dia`, 
    `${table}.hora_inicio`, 
    `${table}.hora_fin`,
    `dias_semana.dia`,
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN dias_semana ON ${table}.id_dia = dias_semana.id_dia
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneHorario = (id_horario) => {
  const columns_select = [
    `${table}.id_horario`, 
    `${table}.id_dia`, 
    `${table}.hora_inicio`, 
    `${table}.hora_fin`,
    `dias_semana.dia`,
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN dias_semana ON ${table}.id_dia = dias_semana.id_dia
    WHERE ${primaryKey} = ${id_horario} AND ${table}.estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertHorario = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateHorario = (id_horario, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = ${id_horario} RETURNING *`);
  return result;
};

const deleteHorario = (id_horario) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_horario} RETURNING *`);
  return result;
};

module.exports = {
  selectHorarios,
  selectOneHorario,
  insertHorario,
  updateHorario,
  deleteHorario
};