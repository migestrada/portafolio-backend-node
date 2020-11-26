const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const { verifyToken } = require('./middleware')

async function getConnection(params) {
    const { req, res, query, view } = params
    
    if (view != 'login'){
        await verifyToken (req, res, view);
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