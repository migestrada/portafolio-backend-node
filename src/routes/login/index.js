const { Router } = require('express');
const router = Router();
const jwt  = require('jsonwebtoken');
const { verifyToken } = require('../middleware')
const { getConnection } = require('../server')
// ORACLE DB
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

router.post('/login' , async (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM usuario WHERE username='${username}' AND password='${password}'`;
    
    const connectionResponse = await getConnection({
        req,
        res,
        query,
        view: 'login'
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
})

router.get('/login' , verifyToken, (req, res) => {
    
})



module.exports = router;