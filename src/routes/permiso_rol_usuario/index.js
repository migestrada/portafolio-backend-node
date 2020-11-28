const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

const view = 'permiso_rol_usuario'

router.get('/permisos_roles', (req, res) => {
    const query = 'SELECT * FROM permiso_rol_usuario'
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.get('/permisos_roles/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM permiso_rol_usuario WHERE id=${id}`
    getConnection({
        req,
        res,
        query
    })
})

router.post('/permisos_roles', (req, res) => {
    const { nombre, id_rol_usuario } = req.body
    const query = `CALL sp_crear_editar_permiso_rol_usuario (-1, '${nombre}',${id_rol_usuario})`
    getConnection({
        req,
        res,
        query
    })
})

router.put('/permisos_roles/:id', (req, res) => {
    const { id } = req.params
    const { nombre, id_rol_usuario } = req.body
    const query = `CALL sp_crear_editar_permiso_rol_usuario (${id}, '${nombre}',${id_rol_usuario})`
    getConnection({
        req,
        res,
        query
    })
})

module.exports = router;