const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'notas_actividades';
const columns = ['codigo_estudiante', 'id_asig', 'id_semestre', 'id_actividad', 'nota', 'estado'];
const primaryKey = ['codigo_estudiante', 'id_asig', 'id_semestre', 'id_actividad'];

const selectNotasActividades = (limit = 100) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`,
    `${table}.id_actividad`,
    `${table}.nota`,
    `actividades.descripcion`,
    `actividades.porcentaje`,
    `estudiantes_grupos.numero_grupo`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes_grupos ON ${table}.id_asig = estudiantes_grupos.id_asig AND ${table}.id_semestre = estudiantes_grupos.id_semestre AND ${table}.codigo_estudiante = estudiantes_grupos.codigo_estudiante
    INNER JOIN actividades ON ${table}.id_actividad = actividades.id_actividad
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneNotaActividad = (codigo_estudiante, id_asig, id_semestre, id_actividad) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`,
    `${table}.id_actividad`,
    `${table}.nota`,
    `actividades.descripcion`,
    `actividades.porcentaje`,
    `estudiantes_grupos.numero_grupo`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes_grupos ON ${table}.id_asig = estudiantes_grupos.id_asig AND ${table}.id_semestre = estudiantes_grupos.id_semestre AND ${table}.codigo_estudiante = estudiantes_grupos.codigo_estudiante
    INNER JOIN actividades ON ${table}.id_actividad = actividades.id_actividad
    WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.${primaryKey[3]} = ${id_actividad} AND ${table}.estado = true
  `);
  return result;
};

const selectNotaActividadesOneGrupo = (id_asig, id_semestre, numero_grupo) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `CONCAT(personas.apellido1, ' ', personas.apellido2, ' ', personas.nombre1, ' ', personas.nombre2) AS nombre_completo_estudiante`,
    `${table}.id_asig`, 
    `${table}.id_semestre`,
    `estudiantes_grupos.numero_grupo`,
    `${table}.id_actividad`,
    `${table}.nota`,
    `actividades.descripcion`,
    `actividades.porcentaje`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes_grupos ON ${table}.id_asig = estudiantes_grupos.id_asig AND ${table}.id_semestre = estudiantes_grupos.id_semestre AND ${table}.codigo_estudiante = estudiantes_grupos.codigo_estudiante
    INNER JOIN grupos_asignaturas ON estudiantes_grupos.id_asig = grupos_asignaturas.id_asig AND estudiantes_grupos.id_semestre = grupos_asignaturas.id_semestre AND estudiantes_grupos.codigo_estudiante = grupos_asignaturas.codigo_estudiante AND estudiantes_grupos.numero_grupo = grupos_asignaturas.numero
    INNER JOIN actividades ON ${table}.id_actividad = actividades.id_actividad
    INNER JOIN estudiantes ON estudiantes_grupos.codigo_estudiante = estudiantes.codigo_dni
    INNER JOIN personas ON estudiantes.codigo_dni = personas.codigo_dni
    WHERE grupos_asignaturas.id_asig = ${id_asig} AND grupos_asignaturas.id_semestre = ${id_semestre} AND grupos_asignaturas.numero = ${numero_grupo} AND ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
  `);
  return result;
};

const insertNotaActividad = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateNotaActividad = (codigo_estudiante, id_asig, id_semestre, id_actividad, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.${primaryKey[3]} = ${id_actividad} AND estado = true RETURNING *`);
  return result;
};

const deleteNotaActividad = (codigo_estudiante, id_asig, id_semestre, id_actividad) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.${primaryKey[3]} = ${id_actividad} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectNotasActividades,
  selectOneNotaActividad,
  selectNotaActividadesOneGrupo,
  insertNotaActividad,
  updateNotaActividad,
  deleteNotaActividad
};