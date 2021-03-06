const { Router } = require('express');
const router = Router();
const { getConnection } = require('../server')

router.get('/empresas/:id', (req, res) => {
    const { id } = req.params
    const query = `select * from empresa where id = ${id}`
    getConnection({
        req,
        res,
        query
    })
})

router.get('/empresas', (req, res) => {
    const query = 'select * from empresa'
    getConnection({
        req,
        res,
        query
    })
})


router.post('/empresas', (req, res) => {
    const { rut, nombre, telefono, email, direccion, region} = req.body
    const query = `CALL sp_crear_editar_empresa (-1,'${rut}', '${nombre}', ${telefono}, '${email}', '${direccion}', '${region}')`;
    getConnection({
        req,
        res,
        query
    })
})

router.put('/empresas/:id', (req, res) => {
    const { id } = req.params
    const { rut, nombre, telefono, email, direccion, region } = req.body
    const query = `CALL sp_crear_editar_empresa (${id},'${rut}', '${nombre}', ${telefono}, '${email}', '${direccion}', '${region}')`;
    getConnection({
        req,
        res,
        query
    })
})

module.exports = router;