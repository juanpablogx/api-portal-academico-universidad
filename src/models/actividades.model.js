const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'actividades';
const columns = ['id_actividad', 'id_asig', 'id_semestre', 'numero_grupo', 'descripcion', 'porcentaje', 'estado'];
const primaryKey = 'id_actividad';

const selectSumaPorcentajeActividadesOneGrupo = (id_asig, id_semestre, numero_grupo) => {
  const columns_select = [
    `SUM(porcentaje) AS suma`, 
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    WHERE id_asig = ${id_asig} AND id_semestre = ${id_semestre} AND numero_grupo = ${numero_grupo} AND estado = true
  `);
  return result;
} 

const selectActividades = (limit = 100) => {
  const columns_select = [
    `${table}.id_actividad`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`,
    `${table}.descripcion`,
    `${table}.porcentaje`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectActividadesOneGrupo = (id_asig, id_semestre, numero_grupo) => {
  const columns_select = [
    `${table}.id_actividad`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`,
    `${table}.descripcion`,
    `${table}.porcentaje`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    WHERE ${table}.id_asig = ${id_asig} AND ${table}.id_semestre = ${id_semestre} AND ${table}.numero_grupo = ${numero_grupo} AND ${table}.estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const selectOneActividad = (id_actividad) => {
  const columns_select = [
    `${table}.id_actividad`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`,
    `${table}.descripcion`,
    `${table}.porcentaje`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    WHERE ${table}.${primaryKey} = ${id_actividad} AND ${table}.estado = true
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertActividad = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateActividad = (id_actividad, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${primaryKey} = ${id_actividad} AND estado = true RETURNING *`);
  return result;
};

const deleteActividad = (id_actividad) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = ${id_actividad} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectActividades,
  selectOneActividad,
  insertActividad,
  updateActividad,
  deleteActividad,
  selectActividadesOneGrupo,
  selectSumaPorcentajeActividadesOneGrupo
};