
## API-Parking test
  
## Development

* Clone the Repository using
```
git clone 
```
* You need to download nodejs for running code on your local machine [Node](https://nodejs.org/en/).

* Than perform below command to install all the dependencies
```
npm install
```
* You have to setup ```.env``` file on your local machine with following content in it.
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=db_parking
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



