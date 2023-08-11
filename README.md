
## API-Parking test
  
## Development

* Clone el repositorio usando:
```
git clone https://github.com/aramaysm/api-parking-test.git
```
* Descarga NodeJs en [Node](https://nodejs.org/en/).

* Corra el siguiente comando para instalar las dependencias
```
npm install
```
* Setea ```.env``` file añadiendo el contenido adecuado a tu base de datos. Nota: Este archivo no se debe subir al repositorio, en este caso se subio para facilitar la evaluacion de este test
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=db_parking
```

* Corre los siguientes comandos para ejecutar las migraciones.
```bash
$ npm run typeorm:run-migrations
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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



