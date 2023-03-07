
## Description

Technical Assesment using [Nest](https://github.com/nestjs/nest) framework with TypeScript.


## Running the app

Clone the repository

```bash
$ git clone https://github.com/andresPanto/prueba-api-crud.git
```

Install dependencies using npm

```bash
$ npm install
```

Run the server in development mode

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


## Technologies

 - [Nest](https://github.com/nestjs/nest) 
 - [TypeScript](https://www.typescriptlang.org/) 
 - [TypeORM](https://typeorm.io/)
 - [SQLite](https://www.sqlite.org/index.html)
 - [Passport](https://www.passportjs.org/)
 - [JWT](https://jwt.io/)
 - [Winston](https://www.npmjs.com/package/winston)
 - [Swagger](https://swagger.io/)

## Usage

For Swagger documentation visit: http://localhost:3000/api

Endpoints:
  - /auth (GET) Gets access token - Returns object with access token
  - /task (GET) Gets all tasks - Returns array of tasks
  - /task/{id} (GET) Gets task by id - Returns task
  - /task (POST) Creates task by id. Requires body params name and description. Requires access token as bearer token - Returns task
  - /task/{id} (DELETE) Deletes task. Requires access token as bearer token - Returns task
  - /task/{id}/status (PATCH) Updates task status. Requires access token as bearer token - Returns task
  - /task/{id}/ (PUT) Updates task. Accepts name, description or status as body params. Requires access token as bearer token - Returns task

## Future improvements

  - Store secrets and configurations in .env file
  - Create unit and end to end tests
  - Implement authentication with users if needed. Use bcrypt for storing secure passwords

## License

Nest is [MIT licensed](LICENSE).
