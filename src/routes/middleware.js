const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

async function verifyToken(req, res, view) {
    const authorization = req.get('Authorization');
    let havePerm = false;
    if (authorization){
        await jwt.verify(authorization, process.env.LOGIN_SECRET_KEY, async (err, userData) => {
            if (err){
                res.sendStatus(403);
            }else{
                const { username, password } = userData
                const query = `SELECT rol_usuario.id FROM rol_usuario, usuario 
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
                    
                    havePerm = await checkPerm(req, res, view, {...result.rows});
                }
            
            }
        })
    }else{
        res.sendStatus(403);
    }

    return havePerm;
}


async function checkPerm(req, res, view, role){
    role = Object.values(role)[0].ID;
    const method = req.method;
    let perm;

    if (role === 1 ) return true;

    switch (method) {
        case 'GET':
            perm = 'can_get_'
        break;
        case 'POST':
            perm = 'can_post_'
        break;
        case 'DELETE':
            perm = 'can_delete_'
            break;
        case 'PUT':
            perm = 'can_put_'
            break;
        default:
            return false;
    }

    const query = `SELECT * FROM permiso_rol_usuario WHERE id_rol_usuario = ${role} AND nombre= '${perm + view}'`

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
        
        return result.rows.length ? true : false
    }
    
}
module.exports = {
    verifyToken
}