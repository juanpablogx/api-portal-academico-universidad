const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'usuarios';
const columns = ['codigo_dni', 'correo_inst', 'password', 'estado'];
const primaryKey = 'codigo_dni';

const selectUsuarios = (limit = 100) => {
  const columns_select = [
    `${table}.codigo_dni`, 
    `${table}.correo_inst`, 
    `personas.nombre1`, 
    `personas.nombre2`, 
    `personas.apellido1`,
    `personas.apellido2`,
    `CASE 
      WHEN administradores.codigo_dni IS NOT NULL THEN 'administrador'
      WHEN docentes.codigo_dni IS NOT NULL THEN 'docente'
      WHEN estudiantes.codigo_dni IS NOT NULL THEN 'estudiante'
      ELSE NULL
    END AS tipo`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}
    INNER JOIN personas ON ${table}.codigo_dni = personas.codigo_dni
    LEFT JOIN administradores ON ${table}.codigo_dni = administradores.codigo_dni AND administradores.estado = true
    LEFT JOIN docentes ON ${table}.codigo_dni = docentes.codigo_dni AND docentes.estado = true
    LEFT JOIN estudiantes ON ${table}.codigo_dni = estudiantes.codigo_dni AND estudiantes.estado = true
    WHERE ${table}.estado = true 
    ORDER BY ${primaryKey}
    LIMIT ${limit}
  `);
  return result;
};

const selectOneUsuario = (codigo_dni, password = null) => {
  const columns_select = [
    `${table}.codigo_dni`, 
    `${table}.correo_inst`, 
    `personas.nombre1`, 
    `personas.nombre2`, 
    `personas.apellido1`,
    `personas.apellido2`,
    `CASE 
      WHEN administradores.codigo_dni IS NOT NULL THEN 'administrador'
      WHEN docentes.codigo_dni IS NOT NULL THEN 'docente'
      WHEN estudiantes.codigo_dni IS NOT NULL THEN 'estudiante'
      ELSE NULL
    END AS tipo`
  ];
  const wherePassword = password != null ? ` AND ${table}.password = ${password}`:``;
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table}   
    INNER JOIN personas ON ${table}.codigo_dni = personas.codigo_dni
    LEFT JOIN administradores ON ${table}.codigo_dni = administradores.codigo_dni AND administradores.estado = true
    LEFT JOIN docentes ON ${table}.codigo_dni = docentes.codigo_dni AND docentes.estado = true
    LEFT JOIN estudiantes ON ${table}.codigo_dni = estudiantes.codigo_dni AND estudiantes.estado = true
    WHERE ${table}.${primaryKey} = '${codigo_dni}' AND ${table}.estado = true ${wherePassword} 
    ORDER BY ${primaryKey}
  `);
  return result;
};

const insertUsuario = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateUsuario = (codigo_dni, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update.join(', ')} WHERE ${primaryKey} = '${codigo_dni}' RETURNING *`);
  return result;
};

const deleteUsuario = (codigo_dni) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey} = '${codigo_dni}' RETURNING *`);
  return result;
};

module.exports = {
  selectUsuarios,
  selectOneUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario
};