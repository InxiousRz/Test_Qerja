# Test_Qerja

## Project Spec

- Framework : Express JS
- language : Javascript
- DB : SQLite

## How to Use

1. clone this project to local machine
2. run node package setup command on terminal / command prompt

```
npm i
```

3. run dev server with command

```
node run_dev.js
```

4. you can access API on `http://localhost:4050/test_api`

```
note : to change port, go to run_dev.js and change the port
```

## API Endpoint

Default Host : `http://localhost:4050/test_api`

1. **POST** `/auth/login`

- Body
- - description : string ( optional )
- - location : string ( optional )
- - full_time : string one of ['true', 'false'] ( optional )
- - page : number ( min 1 ) ( optional )

2. **GET** `/jobs/get`

- Query Parameter
- - description : string ( optional )
- - location : string ( optional )
- - full_time : string one of ['true', 'false'] ( optional )
- - page : number ( min 1 ) ( optional )

3. **GET** `/jobs/get/:id`

- URL Param
- - id : string ( required )
