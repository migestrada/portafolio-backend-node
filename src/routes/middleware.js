const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

async function verifyToken(req, res, view) {
    const authorization = req.get('Authorization');

    if (authorization){
        jwt.verify(authorization, process.env.LOGIN_SECRET_KEY, async (err, userData) => {
            if (err){
                res.sendStatus(403);
            }else{
                const { username, password } = userData
                const query = `SELECT rol_usuario.nombre FROM rol_usuario, usuario 
                where usuario.username='${username}' 
                AND usuario.password='${password}' 
                AND rol_usuario.id = usuario.id_rol_usuario`;

                let connection;
                try {
                    connection = await oracledb.getConnection({
                        user:  process.env.USER_DB,
                        password:  process.env.PASSWORD_DB,
                        connectString: process.env.CONNECT_STRING_DB
                    });
                    
                    result = await connection.execute(query);
                } catch (err) {
                    res.statusCode = 400;
                    return res.send(err.message);
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err.message);
                        }
                    }
                    
                    return res.send({...result.rows});
                }
            
            }
        })
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}