/*
DROP TABLE usuario CASCADE CONSTRAINTS;
DROP TABLE empresa CASCADE CONSTRAINTS;
DROP TABLE funcion CASCADE CONSTRAINTS;
DROP TABLE rol_usuario CASCADE CONSTRAINTS;
DROP TABLE tarea CASCADE CONSTRAINTS;
DROP TABLE tarea_asignada CASCADE CONSTRAINTS;
DROP TABLE unidad CASCADE CONSTRAINTS;
*/

CREATE TABLE rol_usuario(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL UNIQUE,
    descripcion VARCHAR2(50) NOT NULL
);

CREATE TABLE usuario(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rut VARCHAR2(9) NOT NULL UNIQUE,
    username VARCHAR2(200) NOT NULL UNIQUE,
    password VARCHAR2(200) NOT NULL,
    nombre VARCHAR2(200) NOT NULL,
    apellido VARCHAR2(200) NOT NULL,
    email VARCHAR2(200) NOT NULL UNIQUE,
    telefono NUMBER,
    direccion VARCHAR2(200),
    region VARCHAR2(200),
    activo NUMBER(1) NOT NULL,
    id_rol_usuario NUMBER NOT NULL,
    CONSTRAINT fk_usuario_rolusuario FOREIGN KEY (id_rol_usuario) REFERENCES rol_usuario(id)
);

CREATE TABLE empresa(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rut VARCHAR2(200) NOT NULL UNIQUE,
    nombre VARCHAR2(200)  NOT NULL,
    telefono NUMBER NOT NULL,
    email VARCHAR2(200) NOT NULL,
    direccion VARCHAR2(200) NOT NULL,
    region VARCHAR2(200)
);

CREATE TABLE tarea(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(200) NOT NULL UNIQUE,
    descripcion VARCHAR2(200)  NOT NULL
);

CREATE TABLE unidad(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(200) NOT NULL UNIQUE,
    descripcion VARCHAR2(200)  NOT NULL,
    id_empresa NUMBER NOT NULL,
    CONSTRAINT fk_unidad_empresa FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

CREATE TABLE funcion(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(200) NOT NULL,
    descripcion VARCHAR2(200)  NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_termino DATE NOT NULL,
    id_unidad NUMBER NOT NULL,
    CONSTRAINT fk_funcion_unidad FOREIGN KEY (id_unidad) REFERENCES unidad(id)
);

CREATE TABLE tarea_asignada(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_tarea NUMBER  NOT NULL,
    id_usuario NUMBER NOT NULL,
    id_funcion NUMBER NOT NULL,
    CONSTRAINT fk_tareaasignada_tarea FOREIGN KEY (id_tarea) REFERENCES tarea(id),
    CONSTRAINT fk_tareaasignada_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT fk_tareaasignada_funcion FOREIGN KEY (id_funcion) REFERENCES funcion(id)
);

CREATE TABLE indicacion_tarea(
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion VARCHAR2(200) NOT NULL,
    id_tarea_asignada NUMBER NOT NULL,
    CONSTRAINT fk_indicaciontarea_tareaasignada FOREIGN KEY (id_tarea_asignada) REFERENCES tarea_asignada(id)
);
