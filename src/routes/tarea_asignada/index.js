const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

const view = 'tarea_asignada';

router.get('/tareas_asignadas', (req, res) => {
    const query = 'SELECT * FROM tarea_asignada'
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.get('/tareas_asignadas/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM tarea_asignada WHERE id=${id}`
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.post('/tareas_asignadas', (req, res) => {
    const { terminada, id_tarea, id_usuario, id_funcion } = req.body
    const query = `CALL sp_crear_editar_tarea_asignada (-1, ${terminada ? 1 : 0}, ${id_tarea}, ${id_usuario}, ${id_funcion})`
    getConnection({
        req,
        res,
        query,
        view
    })
})

router.put('/tareas_asignadas/:id', (req, res) => {
    const { id } = req.params
    const { terminada, id_tarea, id_usuario, id_funcion } = req.body
    const query = `CALL sp_crear_editar_tarea_asignada (${id}, ${terminada}, ${id_tarea}, ${id_usuario}, ${id_funcion})`
    getConnection({
        req,
        res,
        query,
        view
    })
})

module.exports = router;