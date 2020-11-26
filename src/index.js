const express = require('express');
const app = express();
const morgan = require('morgan')
const oracledb = require('oracledb')
require('dotenv').config()

//settings
app.set('port', process.env.PORT)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/usuario/index'));
app.use(require('./routes/rol_usuario/index'));
app.use(require('./routes/empresa/index'));
app.use(require('./routes/tarea/index'));
app.use(require('./routes/unidad/index'));
app.use(require('./routes/funcion/index'));
app.use(require('./routes/tarea_asignada/index'));
app.use(require('./routes/login/index'));

//Run server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
