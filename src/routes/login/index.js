const { Router } = require('express');
const router = Router();
const jwt  = require('jsonwebtoken');
const { getConnection } = require('../server')
const { verifyToken } = require('../middleware')

// ORACLE DB
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const view = 'login';

router.post('/login' , async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = `SELECT * FROM usuario WHERE username='${username}' AND password='${password}'`;
        
        const connectionResponse = await getConnection({
            req,
            res,
            query,
            view
        })

        if (Object.keys(connectionResponse).length === 1){
            jwt.sign({ username, password }, process.env.LOGIN_SECRET_KEY, (err, token) => {
                res.json({
                    token
                })
            })
        }else{
            res.statusCode = 401
            res.json({
                message: 'Usuario y/o Contraseña incorrectos'
            })
        }
    } catch (error) {
        console.log('ERROR EN LOGIN INDEX')
    }
})

router.get('/login' , async (req, res) => {
    try {
        const result = await verifyToken(req, res);

        res.json({...result});

    } catch (error) {
        res.sendStatus(400)
    }
})

module.exports = router;