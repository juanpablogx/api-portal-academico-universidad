const db = require('../database/conexion');
const { getColumnsValuesSQL } = require('./base.model');

const table = 'grupos_asignaturas_horarios';
const columns = ['id_horario', 'id_asig', 'id_semestre', 'numero_grupo', 'id_salon', 'estado'];
const primaryKey = ['id_asig', 'id_semestre', 'numero_grupo', 'id_horario'];

const selectGruposAsignaturasHorarios = (limit = 100) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.id_salon`,
    `horarios.hora_inicio AS hora_inicio`,
    `horarios.hora_fin AS hora_fin`,
    `dias_semana.dia AS dia`,
    `CASE 
      WHEN ${table}.id_salon IS NOT NULL THEN CONCAT(salones.edificio, '-', (salones.piso*100) + salones.numero)
      ELSE NULL
    END AS salon`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN horarios ON ${table}.id_horario = horarios.id_horario
    INNER JOIN dias_semana ON horarios.id_dia = dias_semana.id_dia
    LEFT JOIN salones ON ${table}.id_salon = salones.id_salon
    WHERE ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
    LIMIT ${limit}
  `);
  return result;
};

const selectGruposAsignaturasHorariosOneSemestre = (id_semestre, codigo_docente = null) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.id_salon`,
    `grupos_asignaturas.codigo_docente`,
    `asignaturas.nombre AS nombre_asignatura`,
    `horarios.hora_inicio AS hora_inicio`,
    `horarios.hora_fin AS hora_fin`,
    `dias_semana.dia AS dia`,
    `CASE 
      WHEN ${table}.id_salon IS NOT NULL THEN CONCAT(salones.edificio, '-', (salones.piso*100) + salones.numero)
      ELSE NULL
    END AS salon`,
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
    ) AS nombre_docente`
  ];

  let condCodigoDocente = '';
  if (codigo_docente !== null) {
    condCodigoDocente = `AND grupos_asignaturas.codigo_docente = '${codigo_docente}'`;
  }

  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN grupos_asignaturas ON ${table}.id_asig = grupos_asignaturas.id_asig AND ${table}.id_semestre = grupos_asignaturas.id_semestre AND ${table}.numero_grupo = grupos_asignaturas.numero
    INNER JOIN asignaturas ON grupos_asignaturas.id_asig = asignaturas.id_asig
    INNER JOIN personas ON grupos_asignaturas.codigo_docente = personas.codigo_dni
    INNER JOIN horarios ON ${table}.id_horario = horarios.id_horario
    INNER JOIN dias_semana ON horarios.id_dia = dias_semana.id_dia
    LEFT JOIN salones ON ${table}.id_salon = salones.id_salon
    WHERE ${table}.id_semestre = ${id_semestre} ${condCodigoDocente} AND ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
  `);
  return result;
};

const selectOneGrupoAsignaturaHorarios = (id_asig, id_semestre, numero_grupo) => {
  const columns_select = [
    `${table}.id_asig`, 
    `${table}.id_semestre`, 
    `${table}.numero_grupo`, 
    `${table}.id_salon`,
    `horarios.hora_inicio AS hora_inicio`,
    `horarios.hora_fin AS hora_fin`,
    `dias_semana.dia AS dia`,
    `CASE 
      WHEN ${table}.id_salon IS NOT NULL THEN CONCAT(salones.edificio, '-', (salones.piso*100) + salones.numero)
      ELSE NULL
    END AS salon`
  ];
  const result = db.query(`
    SELECT ${columns_select.join(', ')} FROM ${table} 
    INNER JOIN horarios ON ${table}.id_horario = horarios.id_horario
    INNER JOIN dias_semana ON horarios.id_dia = dias_semana.id_dia
    LEFT JOIN salones ON ${table}.id_salon = salones.id_salon
    WHERE ${table}.${primaryKey[1]} = ${id_asig} AND ${table}.${primaryKey[2]} = ${id_semestre} AND ${table}.${primaryKey[3]} = ${numero_grupo} AND ${table}.estado = true
    ORDER BY ${primaryKey.map(value => `${table}.${value}`).join(', ')}
  `);
  return result;
};

const insertGrupoAsignaturaHorario = (data) => {
  const [columns_insert, values_insert] = getColumnsValuesSQL(data);
  const result = db.query(`INSERT INTO ${table}(${columns_insert.join(', ')}) VALUES (${values_insert.join(', ')}) RETURNING *`);
  return result;
};

const updateGrupoAsignaturaHorario = (id_horario, id_asig, id_semestre, numero_grupo, data) => {
  const [columns_update, values_update] = getColumnsValuesSQL(data);
  const set_update = columns_update.map((col, i) => col+'='+values_update[i]);
  const result = db.query(`UPDATE ${table} SET ${set_update} WHERE ${primaryKey[0]} = ${id_horario} AND ${primaryKey[1]} = ${id_asig} AND ${primaryKey[2]} = ${id_semestre} AND ${primaryKey[3]} = ${numero_grupo} AND estado = true RETURNING *`);
  return result;
};

const deleteGrupoAsignaturaHorario = (id_horario, id_asig, id_semestre, numero_grupo) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey[0]} = ${id_horario} AND ${primaryKey[1]} = ${id_asig} AND ${primaryKey[2]} = ${id_semestre} AND ${primaryKey[3]} = ${numero_grupo} AND estado = true RETURNING *`);
  return result;
};

const deleteGruposAsignaturasAllHorarios = (id_asig, id_semestre, numero_grupo) => {
  const result = db.query(`UPDATE ${table} SET estado=false WHERE ${primaryKey[1]} = ${id_asig} AND ${primaryKey[2]} = ${id_semestre} AND ${primaryKey[3]} = ${numero_grupo} AND estado = true RETURNING *`);
  return result;
};

module.exports = {
  selectGruposAsignaturasHorarios,
  selectOneGrupoAsignaturaHorarios,
  insertGrupoAsignaturaHorario,
  updateGrupoAsignaturaHorario,
  deleteGrupoAsignaturaHorario,
  deleteGruposAsignaturasAllHorarios,
  selectGruposAsignaturasHorariosOneSemestre
};