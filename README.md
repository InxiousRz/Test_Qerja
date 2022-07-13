# Test_Qerja

## Project Spec

- Framework : Express JS
- language : Javascript
- DB : SQLite
- JWT Token Used : Bearer Token with HS256 encryption and 30 minutes expired time

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

### Default Host : `http://localhost:4050/test_api`
### Default User :
**Username** : `admin` 
<br />
**Password** : `123456`

### Endpoint List
1. **POST** `/auth/login`

- Body
  - username : string ( required ) 
  - password : string ( required )

- Response Result
  - User_Data : your User Data
  - Access_Token : Bearer Token to use on other Endpoint

2. **GET** `/jobs/get`

- Header
  - Authorization : Bearer {Your Token Here} ( required )

- Query Parameter
  - description : string ( optional )
  - location : string ( optional )
  - full_time : string one of ['true', 'false'] ( optional )
  - page : number ( min 1 ) ( optional )

3. **GET** `/jobs/get/:id`

- Header
  - Authorization : Bearer {Your Token Here} ( required )

- URL Param
  - id : string ( required )
