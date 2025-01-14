

CREATE TABLE public.actividades (
    id_actividad bigint NOT NULL,
    id_asig integer NOT NULL,
    id_semestre integer NOT NULL,
    numero_grupo smallint NOT NULL,
    descripcion character varying(255) NOT NULL,
    porcentaje numeric(4,2) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




COMMENT ON COLUMN public.actividades.porcentaje IS 'Valor entero entre 1 y 100 (ambos incluidos)';



ALTER TABLE public.actividades ALTER COLUMN id_actividad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.actividades_id_actividad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.administradores (
    codigo_dni character(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.asignaturas (
    id_asig integer NOT NULL,
    codigo_asig character(4) NOT NULL,
    id_prog integer NOT NULL,
    nombre character varying(50) NOT NULL,
    creditos smallint NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.asignaturas ALTER COLUMN id_asig ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.asignaturas_id_asig_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.dias_semana (
    id_dia smallint NOT NULL,
    dia character varying(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.dias_semana ALTER COLUMN id_dia ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dias_semana_id_dia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.docentes (
    codigo_dni character(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.estudiantes (
    codigo_dni character(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.estudiantes_grupos (
    codigo_estudiante character(15) NOT NULL,
    id_asig integer NOT NULL,
    id_semestre integer NOT NULL,
    numero_grupo smallint NOT NULL,
    promedio numeric(4,2),
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.facultades (
    id_fac smallint NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.facultades ALTER COLUMN id_fac ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.facultades_id_fac_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.grupos_asignaturas (
    id_asig integer NOT NULL,
    id_semestre integer NOT NULL,
    numero smallint NOT NULL,
    codigo_docente character(15),
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.grupos_asignaturas_horarios (
    id_horario integer NOT NULL,
    id_asig integer NOT NULL,
    id_semestre integer NOT NULL,
    numero_grupo smallint NOT NULL,
    id_salon integer,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.horarios (
    id_horario integer NOT NULL,
    id_dia smallint NOT NULL,
    hora_inicio time without time zone,
    hora_fin time without time zone,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.horarios ALTER COLUMN id_horario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.horarios_id_horario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.notas_actividades (
    codigo_estudiante character(15) NOT NULL,
    id_asig integer NOT NULL,
    id_semestre integer NOT NULL,
    id_actividad bigint NOT NULL,
    nota numeric(4,2) DEFAULT 0.00,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.personas (
    codigo_dni character(15) NOT NULL,
    nombre1 character varying(20) NOT NULL,
    nombre2 character varying(20),
    apellido1 character varying(20) NOT NULL,
    apellido2 character varying(20),
    telefono character(10),
    celular character(10) NOT NULL,
    correo_pers character varying(100) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.programas_academicos (
    id_prog integer NOT NULL,
    codigo character(4) NOT NULL,
    id_fac smallint NOT NULL,
    nombre character varying(30) NOT NULL,
    id_tipo smallint NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.programas_academicos ALTER COLUMN id_prog ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.programas_academicos_id_prog_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.programas_estudiantes (
    codigo_estudiante character(15) NOT NULL,
    id_prog integer NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




CREATE TABLE public.salones (
    id_salon integer NOT NULL,
    edificio character varying(20) NOT NULL,
    piso smallint NOT NULL,
    numero smallint NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.salones ALTER COLUMN id_salon ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.salones_id_salon_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.semestres (
    id_semestre integer NOT NULL,
    year integer NOT NULL,
    numero smallint NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.semestres ALTER COLUMN id_semestre ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.semestres_id_semestre_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.tipos_programas (
    id_tipo smallint NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




ALTER TABLE public.tipos_programas ALTER COLUMN id_tipo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipos_programas_id_tipo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.usuarios (
    codigo_dni character(15) NOT NULL,
    correo_inst character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);




INSERT INTO public.actividades OVERRIDING SYSTEM VALUE VALUES (3, 2, 7, 1, 'Ejemplo Actividad', 30.00, true);
INSERT INTO public.actividades OVERRIDING SYSTEM VALUE VALUES (2, 1, 7, 3, 'Actividad 1', 20.00, true);
INSERT INTO public.actividades OVERRIDING SYSTEM VALUE VALUES (4, 1, 7, 2, 'Parcial 1', 30.00, true);
INSERT INTO public.actividades OVERRIDING SYSTEM VALUE VALUES (5, 1, 7, 2, 'Parcial 2', 25.00, true);
INSERT INTO public.actividades OVERRIDING SYSTEM VALUE VALUES (10, 1, 7, 2, 'Parcial 3', 45.00, true);



INSERT INTO public.administradores VALUES ('1234567890     ', true);



INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (1, '123 ', 1, 'Programación 2', 3, true);
INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (2, '101 ', 1, 'Bases de Datos', 4, true);
INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (4, '121 ', 2, 'Dibujo 1', 4, true);
INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (5, '111 ', 4, 'Historia del Arte 1', 2, true);
INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (6, '109 ', 1, 'Gramáticas y Lenguajes Formales', 4, true);
INSERT INTO public.asignaturas OVERRIDING SYSTEM VALUE VALUES (7, '130 ', 7, 'Complejidad Computacional 1', 4, true);



INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (1, 'Domingo', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (2, 'Sábado', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (3, 'Viernes', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (4, 'Jueves', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (5, 'Miércoles', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (6, 'Martes', true);
INSERT INTO public.dias_semana OVERRIDING SYSTEM VALUE VALUES (7, 'Lunes', true);



INSERT INTO public.docentes VALUES ('1005092069     ', true);
INSERT INTO public.docentes VALUES ('1002002002     ', true);
INSERT INTO public.docentes VALUES ('1003003003     ', true);



INSERT INTO public.estudiantes VALUES ('1001001001     ', true);
INSERT INTO public.estudiantes VALUES ('1004004004     ', true);
INSERT INTO public.estudiantes VALUES ('1005005005     ', true);
INSERT INTO public.estudiantes VALUES ('1006006006     ', true);
INSERT INTO public.estudiantes VALUES ('1007007007     ', true);
INSERT INTO public.estudiantes VALUES ('1200200200     ', true);



INSERT INTO public.estudiantes_grupos VALUES ('1001001001     ', 2, 7, 1, NULL, true);
INSERT INTO public.estudiantes_grupos VALUES ('1004004004     ', 2, 7, 1, NULL, true);
INSERT INTO public.estudiantes_grupos VALUES ('1005005005     ', 2, 7, 1, NULL, true);
INSERT INTO public.estudiantes_grupos VALUES ('1001001001     ', 1, 7, 2, 4.13, true);
INSERT INTO public.estudiantes_grupos VALUES ('1004004004     ', 1, 7, 2, 2.65, true);
INSERT INTO public.estudiantes_grupos VALUES ('1005005005     ', 1, 7, 2, 1.90, true);
INSERT INTO public.estudiantes_grupos VALUES ('1006006006     ', 1, 7, 2, 1.54, true);
INSERT INTO public.estudiantes_grupos VALUES ('1007007007     ', 1, 7, 2, 0.00, true);



INSERT INTO public.facultades OVERRIDING SYSTEM VALUE VALUES (1, 'Ingenierías', true);
INSERT INTO public.facultades OVERRIDING SYSTEM VALUE VALUES (3, 'Administración', true);
INSERT INTO public.facultades OVERRIDING SYSTEM VALUE VALUES (4, 'Bellas Artes', true);
INSERT INTO public.facultades OVERRIDING SYSTEM VALUE VALUES (5, 'Ciencias Ambientales', true);
INSERT INTO public.facultades OVERRIDING SYSTEM VALUE VALUES (6, 'Ciencias de la Salud', true);



INSERT INTO public.grupos_asignaturas VALUES (1, 11, 1, '1005092069     ', true);
INSERT INTO public.grupos_asignaturas VALUES (1, 7, 2, '1005092069     ', true);
INSERT INTO public.grupos_asignaturas VALUES (2, 7, 1, '1005092069     ', true);
INSERT INTO public.grupos_asignaturas VALUES (4, 7, 1, '1005092069     ', true);
INSERT INTO public.grupos_asignaturas VALUES (6, 7, 1, '1002002002     ', true);
INSERT INTO public.grupos_asignaturas VALUES (7, 7, 1, '1003003003     ', true);
INSERT INTO public.grupos_asignaturas VALUES (1, 7, 3, '1002002002     ', true);
INSERT INTO public.grupos_asignaturas VALUES (2, 7, 2, '1003003003     ', true);



INSERT INTO public.grupos_asignaturas_horarios VALUES (1, 1, 7, 3, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (2, 1, 7, 3, 1, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (1, 4, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (2, 4, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (1, 1, 7, 2, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (1, 1, 11, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (2, 2, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (1, 6, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (2, 6, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (3, 7, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (5, 7, 7, 1, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (3, 2, 7, 2, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (4, 2, 7, 2, NULL, true);
INSERT INTO public.grupos_asignaturas_horarios VALUES (2, 2, 7, 2, NULL, true);



INSERT INTO public.horarios OVERRIDING SYSTEM VALUE VALUES (1, 5, '07:00:00', '09:00:00', true);
INSERT INTO public.horarios OVERRIDING SYSTEM VALUE VALUES (2, 3, '14:00:00', '16:00:00', true);
INSERT INTO public.horarios OVERRIDING SYSTEM VALUE VALUES (3, 7, '14:00:00', '16:00:00', true);
INSERT INTO public.horarios OVERRIDING SYSTEM VALUE VALUES (4, 6, '09:00:00', '11:00:00', true);
INSERT INTO public.horarios OVERRIDING SYSTEM VALUE VALUES (5, 4, '07:00:00', '08:00:00', true);



INSERT INTO public.notas_actividades VALUES ('1001001001     ', 1, 7, 10, 4.70, true);
INSERT INTO public.notas_actividades VALUES ('1004004004     ', 1, 7, 10, 2.80, true);
INSERT INTO public.notas_actividades VALUES ('1005005005     ', 1, 7, 10, 0.00, true);
INSERT INTO public.notas_actividades VALUES ('1006006006     ', 1, 7, 10, 0.00, true);
INSERT INTO public.notas_actividades VALUES ('1007007007     ', 1, 7, 10, 0.00, true);
INSERT INTO public.notas_actividades VALUES ('1001001001     ', 1, 7, 5, 4.50, true);
INSERT INTO public.notas_actividades VALUES ('1005005005     ', 1, 7, 5, 4.00, true);
INSERT INTO public.notas_actividades VALUES ('1007007007     ', 1, 7, 5, 0.00, true);
INSERT INTO public.notas_actividades VALUES ('1006006006     ', 1, 7, 5, 2.60, true);
INSERT INTO public.notas_actividades VALUES ('1004004004     ', 1, 7, 5, 2.00, true);
INSERT INTO public.notas_actividades VALUES ('1005005005     ', 2, 7, 3, 0.00, true);
INSERT INTO public.notas_actividades VALUES ('1001001001     ', 1, 7, 4, 3.01, true);
INSERT INTO public.notas_actividades VALUES ('1004004004     ', 1, 7, 4, 2.99, true);
INSERT INTO public.notas_actividades VALUES ('1005005005     ', 1, 7, 4, 3.00, true);
INSERT INTO public.notas_actividades VALUES ('1006006006     ', 1, 7, 4, 2.99, true);
INSERT INTO public.notas_actividades VALUES ('1007007007     ', 1, 7, 4, 0.00, true);



INSERT INTO public.personas VALUES ('1234567890     ', 'Albert', NULL, 'Boyer', NULL, NULL, '3301231234', 'albert@mail.com', true);
INSERT INTO public.personas VALUES ('1005092069     ', 'Juan', 'Pablo', 'Garcia', 'Montes', NULL, '3001230000', 'juan@gmail.com', true);
INSERT INTO public.personas VALUES ('1001001001     ', 'Sara', NULL, 'Carmona', 'Torres', NULL, '3451002345', 'sara@gmail.com', true);
INSERT INTO public.personas VALUES ('1002002002     ', 'Fulano', NULL, 'De Tal', NULL, NULL, '3231231234', 'fulano@mail.com', true);
INSERT INTO public.personas VALUES ('1003003003     ', 'Rigoberto', 'Alfonso', 'Pérez', NULL, NULL, '3550011234', 'rigoberto@mail.com', true);
INSERT INTO public.personas VALUES ('1004004004     ', 'Aitor', '', 'Tilla', 'Torres', '3451212   ', '3451234321', 'aitortilla@mail.com', true);
INSERT INTO public.personas VALUES ('1005005005     ', 'Samuel', '', 'Maroto', '', '3331234   ', '3331231234', 'samuel@mail.com', true);
INSERT INTO public.personas VALUES ('1006006006     ', 'Helen', '', 'Chufe', '', '          ', '3454564567', 'helen@mail.com', true);
INSERT INTO public.personas VALUES ('1007007007     ', 'Zacarías', '', 'Flores', 'Del Campo', '          ', '3450980987', 'zacarias@mail.com', true);
INSERT INTO public.personas VALUES ('1200200200     ', 'Sebastián', 'Armando', 'Casas', 'Parado', '          ', '3218787878', 'sebas@mail.com', true);



INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (1, 'IS  ', 1, 'Ingeniería de Sistemas', 1, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (3, 'IF  ', 1, 'Ingeniería Física', 1, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (4, 'LARV', 4, 'Licenciatura Artes Visuales', 1, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (6, 'ADMA', 5, 'Administración Ambiental', 1, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (5, 'MED ', 6, 'Medicina', 1, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (7, 'MIS ', 1, 'M. Ingeniería de Sistemas', 2, true);
INSERT INTO public.programas_academicos OVERRIDING SYSTEM VALUE VALUES (2, 'IE  ', 1, 'Ingeniería Eléctrica 2', 1, true);






INSERT INTO public.salones OVERRIDING SYSTEM VALUE VALUES (1, '15', 4, 6, true);



INSERT INTO public.semestres OVERRIDING SYSTEM VALUE VALUES (7, 2023, 1, '2023-02-06', '2023-05-26', true);
INSERT INTO public.semestres OVERRIDING SYSTEM VALUE VALUES (8, 2023, 2, '2023-08-07', '2023-11-30', true);
INSERT INTO public.semestres OVERRIDING SYSTEM VALUE VALUES (11, 2022, 1, '2022-02-07', '2022-06-01', true);



INSERT INTO public.tipos_programas OVERRIDING SYSTEM VALUE VALUES (1, 'Pregrado', true);
INSERT INTO public.tipos_programas OVERRIDING SYSTEM VALUE VALUES (2, 'Maestría', true);
INSERT INTO public.tipos_programas OVERRIDING SYSTEM VALUE VALUES (3, 'Especialización', true);



INSERT INTO public.usuarios VALUES ('1234567890     ', 'albert22@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1001001001     ', 'sara@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1005092069     ', 'juanpa@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1002002002     ', 'fulano@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1003003003     ', 'rigoberto@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1004004004     ', 'aitortilla@universidad.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', true);
INSERT INTO public.usuarios VALUES ('1005005005     ', 'samuel@universidad.com', '4c4531cfed7359673339b47de105e883eeffaa2f17daa28950e761e916d16332', true);
INSERT INTO public.usuarios VALUES ('1006006006     ', 'helen@universidad.com', 'ac109ead37fe94c0651fb362d06759313a05d04e8ca27fa08ee7e6c1411ee471', true);
INSERT INTO public.usuarios VALUES ('1007007007     ', 'zacarias@universidad.com', 'ee0345d74f70b9a59d0b1e4c3d7c0eee0e9653c76b93a410184ee5c72d3213f8', true);
INSERT INTO public.usuarios VALUES ('1200200200     ', 'sebas@universidad.com', '9055994062b7612af1a50f87a9b757f08300ae36699ea11583965f36c0de57be', true);



SELECT pg_catalog.setval('public.actividades_id_actividad_seq', 10, true);



SELECT pg_catalog.setval('public.asignaturas_id_asig_seq', 7, true);



SELECT pg_catalog.setval('public.dias_semana_id_dia_seq', 7, true);



SELECT pg_catalog.setval('public.facultades_id_fac_seq', 6, true);



SELECT pg_catalog.setval('public.horarios_id_horario_seq', 5, true);



SELECT pg_catalog.setval('public.programas_academicos_id_prog_seq', 7, true);



SELECT pg_catalog.setval('public.salones_id_salon_seq', 1, true);



SELECT pg_catalog.setval('public.semestres_id_semestre_seq', 11, true);



SELECT pg_catalog.setval('public.tipos_programas_id_tipo_seq', 3, true);



ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT actividades_pkey PRIMARY KEY (id_actividad);



ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_pkey PRIMARY KEY (codigo_dni);



ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_codigo_asig_key UNIQUE (codigo_asig);



ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_pkey PRIMARY KEY (id_asig);



ALTER TABLE ONLY public.dias_semana
    ADD CONSTRAINT dias_semana_pkey PRIMARY KEY (id_dia);



ALTER TABLE ONLY public.docentes
    ADD CONSTRAINT docentes_pkey PRIMARY KEY (codigo_dni);



ALTER TABLE ONLY public.estudiantes_grupos
    ADD CONSTRAINT estudiantes_grupos_pkey PRIMARY KEY (codigo_estudiante, id_asig, id_semestre);



ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (codigo_dni);



ALTER TABLE ONLY public.facultades
    ADD CONSTRAINT facultades_pkey PRIMARY KEY (id_fac);



ALTER TABLE ONLY public.grupos_asignaturas_horarios
    ADD CONSTRAINT grupos_asignaturas_horarios_pkey PRIMARY KEY (id_horario, id_asig, id_semestre, numero_grupo);



ALTER TABLE ONLY public.grupos_asignaturas
    ADD CONSTRAINT grupos_asignaturas_pkey PRIMARY KEY (id_asig, id_semestre, numero);



ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id_horario);



ALTER TABLE ONLY public.notas_actividades
    ADD CONSTRAINT notas_actividades_pkey PRIMARY KEY (codigo_estudiante, id_asig, id_semestre, id_actividad);



ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_correo_pers_key UNIQUE (correo_pers);



ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (codigo_dni);



ALTER TABLE ONLY public.programas_academicos
    ADD CONSTRAINT programas_academicos_codigo_key UNIQUE (codigo);



ALTER TABLE ONLY public.programas_academicos
    ADD CONSTRAINT programas_academicos_pkey PRIMARY KEY (id_prog);



ALTER TABLE ONLY public.programas_estudiantes
    ADD CONSTRAINT programas_estudiantes_pkey PRIMARY KEY (codigo_estudiante, id_prog);



ALTER TABLE ONLY public.salones
    ADD CONSTRAINT salones_pkey PRIMARY KEY (id_salon);



ALTER TABLE ONLY public.semestres
    ADD CONSTRAINT semestres_pkey PRIMARY KEY (id_semestre);



ALTER TABLE ONLY public.tipos_programas
    ADD CONSTRAINT tipos_programas_pkey PRIMARY KEY (id_tipo);



ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_inst_key UNIQUE (correo_inst);



ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (codigo_dni);



ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT actividades_id_asig_id_semestre_numero_grupo_fkey FOREIGN KEY (id_asig, id_semestre, numero_grupo) REFERENCES public.grupos_asignaturas(id_asig, id_semestre, numero) ON UPDATE CASCADE NOT VALID;



ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_codigo_dni_fkey FOREIGN KEY (codigo_dni) REFERENCES public.usuarios(codigo_dni);



ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_id_prog_fkey FOREIGN KEY (id_prog) REFERENCES public.programas_academicos(id_prog);



ALTER TABLE ONLY public.docentes
    ADD CONSTRAINT docentes_codigo_dni_fkey FOREIGN KEY (codigo_dni) REFERENCES public.usuarios(codigo_dni);



ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_codigo_dni_fkey FOREIGN KEY (codigo_dni) REFERENCES public.usuarios(codigo_dni);



ALTER TABLE ONLY public.estudiantes_grupos
    ADD CONSTRAINT estudiantes_grupos_codigo_estudiante_fkey FOREIGN KEY (codigo_estudiante) REFERENCES public.estudiantes(codigo_dni);



ALTER TABLE ONLY public.estudiantes_grupos
    ADD CONSTRAINT estudiantes_grupos_id_asig_id_semestre_numero_grupo_fkey FOREIGN KEY (id_asig, id_semestre, numero_grupo) REFERENCES public.grupos_asignaturas(id_asig, id_semestre, numero);



ALTER TABLE ONLY public.grupos_asignaturas
    ADD CONSTRAINT grupos_asignaturas_codigo_docente_fkey FOREIGN KEY (codigo_docente) REFERENCES public.docentes(codigo_dni) NOT VALID;



ALTER TABLE ONLY public.grupos_asignaturas_horarios
    ADD CONSTRAINT grupos_asignaturas_horarios_id_asig_id_semestre_numero_gru_fkey FOREIGN KEY (id_asig, id_semestre, numero_grupo) REFERENCES public.grupos_asignaturas(id_asig, id_semestre, numero) ON UPDATE CASCADE NOT VALID;



ALTER TABLE ONLY public.grupos_asignaturas_horarios
    ADD CONSTRAINT grupos_asignaturas_horarios_id_horario_fkey FOREIGN KEY (id_horario) REFERENCES public.horarios(id_horario);



ALTER TABLE ONLY public.grupos_asignaturas_horarios
    ADD CONSTRAINT grupos_asignaturas_horarios_id_salon_fkey FOREIGN KEY (id_salon) REFERENCES public.salones(id_salon);



ALTER TABLE ONLY public.grupos_asignaturas
    ADD CONSTRAINT grupos_asignaturas_id_asig_fkey FOREIGN KEY (id_asig) REFERENCES public.asignaturas(id_asig);



ALTER TABLE ONLY public.grupos_asignaturas
    ADD CONSTRAINT grupos_asignaturas_id_semestre_fkey FOREIGN KEY (id_semestre) REFERENCES public.semestres(id_semestre);



ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_id_dia_fkey FOREIGN KEY (id_dia) REFERENCES public.dias_semana(id_dia);



ALTER TABLE ONLY public.notas_actividades
    ADD CONSTRAINT notas_actividades_codigo_estudiante_id_asig_id_semestre_fkey FOREIGN KEY (codigo_estudiante, id_asig, id_semestre) REFERENCES public.estudiantes_grupos(codigo_estudiante, id_asig, id_semestre);



ALTER TABLE ONLY public.notas_actividades
    ADD CONSTRAINT notas_actividades_id_actividad_fkey FOREIGN KEY (id_actividad) REFERENCES public.actividades(id_actividad);



ALTER TABLE ONLY public.programas_academicos
    ADD CONSTRAINT programas_academicos_id_fac_fkey FOREIGN KEY (id_fac) REFERENCES public.facultades(id_fac);



ALTER TABLE ONLY public.programas_academicos
    ADD CONSTRAINT programas_academicos_id_tipo_fkey FOREIGN KEY (id_tipo) REFERENCES public.tipos_programas(id_tipo) NOT VALID;



ALTER TABLE ONLY public.programas_estudiantes
    ADD CONSTRAINT programas_estudiantes_codigo_estudiante_fkey FOREIGN KEY (codigo_estudiante) REFERENCES public.estudiantes(codigo_dni);



ALTER TABLE ONLY public.programas_estudiantes
    ADD CONSTRAINT programas_estudiantes_id_prog_fkey FOREIGN KEY (id_prog) REFERENCES public.programas_academicos(id_prog);



ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_codigo_dni_fkey FOREIGN KEY (codigo_dni) REFERENCES public.personas(codigo_dni);




