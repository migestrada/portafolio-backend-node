const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

router.get('/tareas', (req, res) => {
    const query = 'SELECT * FROM tarea'
    getConnection({
        req,
        res,
        query
    })
})

router.get('/tareas/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM tarea WHERE id=${id}`
    getConnection({
        req,
        res,
        query
    })
})

router.post('/tareas', (req, res) => {
    const { nombre, descripcion } = req.body
    const query = `CALL sp_crear_editar_tarea (-1, '${nombre}','${descripcion}')`
    getConnection({
        req,
        res,
        query
    })
})

router.put('/tareas/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion } = req.body
    const query = `CALL sp_crear_editar_tarea (${id}, '${nombre}','${descripcion}')`
    getConnection({
        req,
        res,
        query
    })
})

module.exports = router;