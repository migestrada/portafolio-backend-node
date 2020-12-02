const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const { verifyToken, checkPerm } = require('./middleware')

async function getConnection(params) {
    const { req, res, query, view } = params;

    try {
        const role = await verifyToken (req, res, view);
        const token = await checkPerm(req, res, view, {...role});
        console.log(token)
        if ( view != 'login' && !token ){
            return res.sendStatus(403);
        }
    } catch (error) {
        console.log('ERROR')
    }

    
    
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
        
        if (view === 'login'){
            return {...result.rows}
        }else{
            return res.send({...result.rows});
        }

    }
}

module.exports = {
    getConnection
}