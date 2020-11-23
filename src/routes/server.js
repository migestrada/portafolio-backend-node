const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

async function getConnection(params) {
    const {req, res, query } = params
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "c##database",
            password: 'oracle',
            connectString: "127.0.0.1:1521/xe"
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

module.exports = {
    getConnection
}