const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'grupos_asignaturas';
const columns = ['id_asig', 'id_semestre', 'numero', 'codigo_docente', 'estado'];
const primaryKey = ['id_asig', 'id_semestre', 'numero'];

const selectGruposAsignaturas = (limit = 100) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero`, 
    `${table}.codigo_docente`,
    `asignaturas.nombre AS nombre_asignatura`,
    `asignaturas.id_prog`,
    `semestres.year AS year`,
    `semestres.numero AS numero_semestre`,
    `usuarios.correo_inst AS correo_docente`,
    `CONCAT(personas.nombre1, ' ', personas.nombre2, ' ', personas.apellido1, ' ', personas.apellido2) AS nombre_docente`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN asignaturas ON ${table}.id_asig = asignaturas.id_asig
    INNER JOIN semestres ON ${table}.id_semestre = semestres.id_semestre
    INNER JOIN docentes ON ${table}.codigo_docente = docentes.codigo_dni
    INNER JOIN usuarios ON docentes.codigo_dni = usuarios.codigo_dni
    INNER JOIN personas ON usuarios.codigo_dni = personas.codigo_dni
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneGrupoAsignatura = (id_asig, id_semestre, numero) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero`, 
    `${table}.codigo_docente`,
    `asignaturas.nombre AS nombre_asignatura`,
    `asignaturas.id_prog`,
    `semestres.year AS year`,
    `semestres.numero AS numero_semestre`,
    `usuarios.correo_inst AS correo_docente`,
    `CONCAT(personas.nombre1, ' ', personas.nombre2, ' ', personas.apellido1, ' ', personas.apellido2) AS nombre_docente`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN asignaturas ON ${table}.id_asig = asignaturas.id_asig
    INNER JOIN semestres ON ${table}.id_semestre = semestres.id_semestre
    INNER JOIN docentes ON ${table}.codigo_docente = docentes.codigo_dni
    INNER JOIN usuarios ON docentes.codigo_dni = usuarios.codigo_dni
    INNER JOIN personas ON usuarios.codigo_dni = personas.codigo_dni
    WHERE ${table}.${primaryKey[0]} = ${id_asig} AND ${table}.${primaryKey[1]} = ${id_semestre} AND ${table}.${primaryKey[2]} = ${numero} AND ${table}.estado = true
  `);
  return result;
};

const insertGrupoAsignatura = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateGrupoAsignatura = (id_asig, id_semestre, numero, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${primaryKey[0]} = ${id_asig} AND ${primaryKey[1]} = ${id_semestre} AND ${primaryKey[2]} = ${numero} AND estado = true RETURNING *`);
  return result;
};

const deleteGrupoAsignatura = (id_asig, id_semestre, numero) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey[0]} = ${id_asig} AND ${primaryKey[1]} = ${id_semestre} AND ${primaryKey[2]} = ${numero} AND estado = true RETURNING *`);
  return result;
};

const deleteGruposAsignaturasOneSemestre = (id_semestre) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey[1]} = ${id_semestre} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectGruposAsignaturas,
  selectOneGrupoAsignatura,
  insertGrupoAsignatura,
  updateGrupoAsignatura,
  deleteGrupoAsignatura,
  deleteGruposAsignaturasOneSemestre
};