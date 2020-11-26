# portafolio-backend-node
Backend del portafolio en nodejs

### Instalación

[Node js](https://nodejs.org/es/download/)


Clonar repositorio, entrar y correr comando

```
npm install
```

Crear variable de entorno (.env) con el sigueinte contenido:
```
PORT=8000
USER_DB="c##database"
PASSWORD_DB="oracle"
CONNECT_STRING_DB="127.0.0.1:1521/xe"
LOGIN_SECRET_KEY = "2020DuocSecretKeyLoginPortafolio"
```

Para correr el server:

```
npm run dev
```
