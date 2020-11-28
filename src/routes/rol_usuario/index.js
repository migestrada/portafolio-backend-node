const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

const view = 'rol_usuario';

router.get('/roles', (req, res) => {
    const query = 'SELECT * FROM rol_usuario'
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.get('/roles/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM rol_usuario WHERE id=${id}`
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.post('/roles', (req, res) => {
    const { nombre, descripcion } = req.body
    const query = `CALL sp_crear_editar_rol_usuario (-1, '${nombre}','${descripcion}')`
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.put('/roles/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body
    const query = `CALL sp_crear_editar_rol_usuario (${id}, '${nombre}','${descripcion}')`
    getConnection({
        req,
        res,
        query,
        view
    })
})

module.exports = router;