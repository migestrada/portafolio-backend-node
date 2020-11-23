CREATE OR REPLACE PROCEDURE sp_crear_editar_rol_usuario(
    v_id NUMBER,
    v_nombre STRING,
    v_descripcion STRING
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO rol_usuario (nombre, descripcion)
        VALUES (v_nombre, v_descripcion);
    ELSE
        UPDATE rol_usuario
        SET 
            nombre = v_nombre,
            descripcion = v_descripcion
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_usuario(
    v_id NUMBER,
    v_username STRING,
    v_password STRING,
    v_nombre STRING,
    v_apellido STRING,
    v_email STRING,
    v_telefono NUMBER,
    v_direccion STRING,
    v_region STRING,
    v_activo NUMBER,
    v_id_rol_usuario NUMBER
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO usuario (username, password, nombre, apellido, email, telefono,direccion,region, activo, id_rol_usuario)
        VALUES (v_username, v_password,v_nombre,v_apellido,v_email,v_telefono,v_direccion,v_region, v_activo , v_id_rol_usuario);
    ELSE
        UPDATE usuario
        SET 
            username = v_username,
            password = v_password,
            nombre = v_nombre, 
            apellido = v_apellido, 
            email = v_email, 
            telefono = v_telefono,
            direccion = v_direccion,
            region = v_region,
            activo = v_activo,
            id_rol_usuario = v_id_rol_usuario
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_empresa(
    v_id NUMBER,
    v_rut STRING,
    v_telefono NUMBER,
    v_email STRING,
    v_direccion STRING,
    v_region STRING
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO empresa (rut, nombre, telefono, email, direccion, region)
        VALUES (v_id, v_rut, v_telefono, v_email, v_direccion, v_region);
    ELSE
        UPDATE empresa
        SET 
            rut = v_rut, 
            nombre = v_telefono, 
            telefono = v_telefono, 
            email = v_email, 
            direccion = v_direccion, 
            region = v_region
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_usuario(
    v_id NUMBER,
    v_nombre STRING,
    v_descripcion STRING
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO tarea (nombre, descripcion)
        VALUES (v_nombre, v_descripcion);
    ELSE
        UPDATE tarea
        SET 
            nombre = v_nombre,
            descripcion = v_descripcion
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_unidad(
    v_id NUMBER,
    v_nombre STRING,
    v_descripcion STRING,
    v_id_empresa NUMBER
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO unidad (nombre, descripcion, id_empresa)
        VALUES (v_nombre, v_descripcion, v_id_empresa);
    ELSE
        UPDATE unidad
        SET 
            nombre = v_nombre,
            descripcion = v_descripcion,
            id_empresa = v_id_empresa
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_funcion(
    v_id NUMBER,
    v_nombre STRING,
    v_descripcion NUMBER,
    v_fecha_inicio DATE,
    v_fecha_termino DATE,
    v_id_unidad NUMBER
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO funcion (nombre, descripcion, fecha_inicio, fecha_termino, id_unidad)
        VALUES (v_nombre, v_descripcion, v_fecha_inicio, v_fecha_termino, v_id_unidad);
    ELSE
        UPDATE funcion
        SET 
            nombre = v_nombre, 
            descripcion = v_descripcion, 
            fecha_inicio = v_fecha_inicio, 
            fecha_termino = v_fecha_termino, 
            id_unidad = v_id_unidad
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE sp_crear_editar_tarea_asignada(
    v_id NUMBER,
    v_terminada NUMBER,
    v_id_tarea NUMBER,
    v_id_usuario NUMBER,
    v_id_funcion NUMBER
)
IS
BEGIN
    IF v_id = -1 THEN
        INSERT INTO tarea_asignada (terminada, id_tarea, id_usuario, id_funcion)
        VALUES (v_terminada, v_id_tarea, v_id_usuario, v_id_funcion);
    ELSE
        UPDATE tarea_asignada
        SET 
            terminada = v_terminada,
            id_tarea = v_id_tarea,
            id_usuario = v_id_usuario,
            id_funcion = v_id_funcion
        WHERE id = v_id;
    END IF;
    
    COMMIT;
END;

