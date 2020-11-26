const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

router.get('/funciones', (req, res) => {
    const query = 'SELECT * FROM funcion'
    getConnection({
        req,
        res,
        query
    })
})

router.get('/funciones/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM funcion WHERE id=${id}`
    getConnection({
        req,
        res,
        query
    })
})

router.post('/funciones', (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_termino, id_unidad } = req.body
    const query = `CALL sp_crear_editar_funcion (-1, '${nombre}','${descripcion}', '${fecha_inicio}', '${fecha_termino}', ${id_unidad})`
    getConnection({
        req,
        res,
        query
    })
})

router.put('/funciones/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, fecha_inicio, fecha_termino, id_unidad } = req.body
    const query = `CALL sp_crear_editar_funcion (${id}, '${nombre}','${descripcion}', '${fecha_inicio}', '${fecha_termino}', ${id_unidad})`
    getConnection({
        req,
        res,
        query
    })
})

module.exports = router;