# API RESTful Rent-a-car 

## Description

API RESTful creada con el framework [Nest](https://github.com/nestjs/nest). Su objetivo es el manejo de las peticiones desde el lado del servidor de una aplicacion de gestión de alquileres de autos.

## Utiliza entre otros modulos

  - [Mysql2](https://www.npmjs.com/package/mysql2). Para gestiónar base de datos.
  - [Sequelize](https://www.npmjs.com/package/sequelize). Como ORM(Object-relational-mapping).
  - [Passport](https://www.npmjs.com/package/passport). Como mecanismo de autenticación.
  - [Passport-jwt](https://www.npmjs.com/package/passport-jwt). Para la proteccion de endpoints especificos.
  - [Bcrypt](https://www.npmjs.com/package/bcrypt). Para la codificación de contraseñas.

## Instalación

```bash
$ npm install
```

## Variables de entorno

```bash
- Crear un archivo .env en la raíz del proyecto,
  guiandose por el archivo .env.dist en la misma ubicación.
```

## Ejecutar proyecto
```bash
# development
$ npm run start

# watch mode & development
$ npm run start:dev

# production mode
$ npm run start:prod

# Default route
  http://localhost:3000/

# API documentation
    http://localhost:3000/documentation/
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Diagrama C4

<img src= "https://github.com/JuuanmaSR/Rent-car-api/blob/dev/documentation/c4-diagram/level-1-c4-diagram.png" title="C4-Diagram-level-1">
<img src= "https://github.com/JuuanmaSR/Rent-car-api/blob/dev/documentation/c4-diagram/level-2-c4-diagram.png" title="C4-Diagram-level-2">

## License

Nest is [MIT licensed](LICENSE).
