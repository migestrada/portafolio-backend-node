const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

router.get('/unidades', (req, res) => {
    const query = 'SELECT * FROM unidad'
    getConnection({
        req,
        res,
        query
    })
})

router.get('/unidades/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM unidad WHERE id=${id}`
    getConnection({
        req,
        res,
        query
    })
})

router.post('/unidades', (req, res) => {
    const { nombre, descripcion, id_empresa } = req.body
    const query = `CALL sp_crear_editar_unidad (-1, '${nombre}','${descripcion}', ${id_empresa})`
    getConnection({
        req,
        res,
        query
    })
})

router.put('/unidades/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, id_empresa} = req.body
    const query = `CALL sp_crear_editar_unidad (${id}, '${nombre}','${descripcion}', ${id_empresa})`
    getConnection({
        req,
        res,
        query
    })
})

module.exports = router;