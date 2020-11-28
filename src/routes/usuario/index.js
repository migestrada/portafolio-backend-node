const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

const view = 'usuario';

router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const query = `select * from usuario where id = ${id}`
    getConnection({
        req,
        res,
        query,
        view
    })
    console.log('HEADERS',req.headers)
})

router.get('/usuarios',(req, res) => {
    const query = 'select * from usuario'
    getConnection({
        req,
        res,
        query,
        view
    })
})


router.post('/usuarios', (req, res) => {
    const { rut, username, password, nombre, apellido, email, telefono, direccion, region, activo, id_rol_usuario } = req.body
    const query = `CALL sp_crear_editar_usuario (-1,'${rut}', '${username}', '${password}', '${nombre}', '${apellido}', '${email}', ${telefono}, '${direccion}', '${region}', ${activo},${id_rol_usuario})`;
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const { rut, username, password, nombre, apellido, email, telefono, direccion, region, activo, id_rol_usuario } = req.body
    const query = `CALL sp_crear_editar_usuario (${id},'${rut}', '${username}', '${password}', '${nombre}', '${apellido}', '${email}', ${telefono}, '${direccion}', '${region}', ${activo},${id_rol_usuario})`;
    getConnection({
        req,
        res,
        query,
        view
    })
})

module.exports = router;