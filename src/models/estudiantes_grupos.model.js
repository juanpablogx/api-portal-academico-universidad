const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'estudiantes_grupos';
const columns = ['codigo_estudiante', 'id_asig', 'id_semestre', 'numero_grupo', 'promedio', 'estado'];
const primaryKey = ['codigo_estudiante', 'id_asig', 'id_semestre'];

const selectEstudiantesGrupos = (limit = 100) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.promedio`,
    `asignaturas.nombre AS nombre_asignatura`,
    `asignaturas.creditos AS creditos_asignatura`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes ON ${table}.codigo_estudiante = estudiantes.codigo_dni
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    INNER JOIN asignaturas ON grupos_asignaturas.id_asig = asignaturas.id_asig
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneEstudianteGrupo = (codigo_estudiante, id_asig, id_semestre) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.promedio`,
    `asignaturas.nombre AS nombre_asignatura`,
    `asignaturas.creditos AS creditos_asignatura`,
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes ON ${table}.codigo_estudiante = estudiantes.codigo_dni
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    INNER JOIN asignaturas ON grupos_asignaturas.id_asig = asignaturas.id_asig
    WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.estado = true
  `);
  return result;
};

const selectEstudiantesOneGrupo = (id_asig, id_semestre, numero_grupo) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.promedio`,
    `CONCAT(
      personas.nombre1, 
      ' ', 
      CASE 
        WHEN personas.nombre2 IS NOT NULL THEN CONCAT(personas.nombre2, ' ')
        ELSE ''
      END, 
      personas.apellido1,
      CASE 
        WHEN personas.apellido2 IS NOT NULL THEN CONCAT(' ', personas.apellido2)
        ELSE ''
      END
    ) AS nombre_completo_estudiante`,
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes ON ${table}.codigo_estudiante = estudiantes.codigo_dni
    INNER JOIN personas ON estudiantes.codigo_dni = personas.codigo_dni
    WHERE ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.numero_grupo = ${numero_grupo} AND ${table}.estado = true
  `);
  return result;
};

const selectEstudianteGruposOneSemestre = (codigo_estudiante, id_semestre) => {
  const columns_select = [
    `${table}.codigo_estudiante`, 
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.promedio`,
    `asignaturas.nombre AS nombre_asignatura`,
    `asignaturas.creditos AS creditos_asignatura`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN estudiantes ON ${table}.codigo_estudiante = estudiantes.codigo_dni
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    INNER JOIN asignaturas ON grupos_asignaturas.id_asig = asignaturas.id_asig
    WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.estado = true
  `);
  return result;
};

const insertEstudianteGrupo = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateEstudianteGrupo = (codigo_estudiante, id_asig, id_semestre, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND estado = true RETURNING *`);
  return result;
};

const deleteEstudianteGrupo = (codigo_estudiante, id_asig, id_semestre) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${table}.${primaryKey[0]} = '${codigo_estudiante}' AND ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectEstudiantesGrupos,
  selectOneEstudianteGrupo,
  selectEstudianteGruposOneSemestre,
  insertEstudianteGrupo,
  updateEstudianteGrupo,
  deleteEstudianteGrupo,
  selectEstudiantesOneGrupo
};