# NODE JS
----------------------------------------------------------------------------------------
## Prefered version 12.10.0
----------------------------------------------------------------------------------------
## So Cool APIs
https://rapidapi.com
----------------------------------------------------------------------------------------


## Simple callback
```
// Call back function
let getUserById = (id, callback) => {

    let user = {
        name: "Victor",
        id
    }

    if(id === 20)
        callback(`El usuario con id ${id} no existe`);
    else
        callback(null, user);

}

// Using call back
getUserById(1, (err, user) => {
    if(err)
        return console.log(err);

    console.log("Usuario ", user);
});
```

----------------------------------------------------------------------------------------

## Find magical function on Array
```
let user = users.find( user => {
        return user.id === id
    });
```

## Simple Promise
```
let getUser = (id) => {

    return new Promise((resolve, reject) => {
        let user = users.find( user => {
            return user.id === id;
        });
    
        if(!user)
            reject(`No existe un empleado con id ${id}`);
        else
            resolve(user);
    });
    
}

getUser(12)
.then((user) => {
    console.log(`Usuario encontrado ${user.name}`);
})
.catch((err) => {
    console.log(err);
})
```

----------------------------------------------------------------------------------------



## Promises chain
```
let getUser = (id) => {

    return new Promise((resolve, reject) => {
        let user = users.find( user => {
            return user.id === id;
        });
    
        if(!user)
            reject(`No existe un empleado con id ${id}`);
        else
            resolve(user);
    });
    
}

let getSalary = (user) => {

    return new Promise((resolve, reject) => {
        let salary = salaries.find(salary => {
            return salary.id === user.id;
        });
    
        if(!salary)
            reject(`No se encontró salario para usuario ${user.name}`);
        else
            resolve({name: user.name, salary: salary.salary});
    });

}

getUser(10)
.then((user) => {
    console.log(`Usuario encontrado ${user.name}`);
    return getSalary(user);
})
.then((obj) => {
    console.log(`Salario de ${obj.name} es de $ ${obj.salary}`);
})
.catch((err) => {
    console.log(err);
})
```


----------------------------------------------------------------------------------------


## Promises with async await
```
let getUser = async (id) => {

    let user = users.find( user => {
        return user.id === id;
    });

    if(!user)
        throw new Error(`No existe un empleado con id ${id}`);
    
    return user;
}

let getSalary = async (user) => {

    let salary = salaries.find(salary => {
        return salary.id === user.id;
    });

    if(!salary)
        throw new Error(`No se encontró salario para usuario ${user.name}`);
    
    return {name: user.name, salary: salary.salary};

}

let getData = async (id) => {
    let user = await getUser(id);
    let obj = await getSalary(user);
    console.log(`Salario de ${obj.name} es de $ ${obj.salary}`);
}

getData(10)
.catch((err) => {
    console.log(err.message);
});
```


----------------------------------------------------------------------------------------


## File System in Node

**fs.writeFile fs.readFile**
```
const fs = require('fs');

const createFile = async () => {
    let content = buildContent();

    let response = await writeFile(`./files/file.txt`, content); // Use `${__dirname}/../` To go back
    console.log(response.msg);
}

const buildContent = () => {
    return "Contenido";
} 

const writeFile = (pathFile,data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathFile, data, (err) => {
            if(err)
                reject(err);
            else
                resolve(`Archivo creado ${pathFile}`);
        });
    }); 
}

const read = (pathFile) => {
	 let data = await FileSystem.readFile(pathFile);
    return data;
}

const writeFileSync = (pathFile, data) => {
    fs.writeFileSync(pathFile, data);
}

const readFileSync = (pathFile) => {
    return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    //return require(pathFile); // This has cache or something
}

const readFile = (pathFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathFile,{encoding: 'UTF-8'}, (err, data) => {
            if (err) 
                reject(err);
            else 
                resolve(data);
        });
    });
}

createFile()
.catch(err => console.log(err.message));

read(`${__dirname}/../files/data.json`)
.catch(err => console.log(err.message));
```

----------------------------------------------------------------------------------------


## Use functions on other js file
1. Logic.js:
```
module.exports.myLogic = () => {
	console.log("Hola desde otro File");
}
```
**OR**
```
const myLogic = () => {
	console.log("Hola desde otro File");
}

module.exports = {
	myLogic
}
```

2. Use Logic:
```
const Logic = require("./logic/Logic");
Logic.myLogic();
```


----------------------------------------------------------------------------------------


## Use node package manager, npm on base project 
1. Init package.json. This file is really important.
Here we reference dependencies
```
$ npm init
```
2. know you can use npm to use node_modules
```
$ npm install yargs --save // --save To add dependency to package.json
```
3. Use packages
```
const yargs = require('yargs');
// MORE CODE
```
3. Optional.
```
$ npm uninstall <name> --save // Also removes it from dependencies in package.json
```
**NOTE ADVISE**
For deploys, make sure script start in in package.json
```
"scripts": {
    "start": "node server/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

----------------------------------------------------------------------------------------



## Get Params from command line with process object
```
console.log(process.argv);
```


----------------------------------------------------------------------------------------



## Get Params from command line with node package yargs
**Create Commands with options flags**
```
const Multiply = require('./src/logic/multiply');
const argv = require('yargs')
                    .command('list','Lista tabla de multiplcar',{ // command, description
                        base: { // Flag base, example listar --base
                            demand: true, // Required
                            alias: 'b', // listar -b
									 description: 'Descripcion'
                        },
                        limit: {
                            alias: 'l',
                            default: 10, // Valor por defecto
                        }
                    })
                    .command('multiply','Multiplica los valores',{
                        number1: {
                            demand: true,
                            alias: 'a'
                        },
                        number2: {
                            demand: true,
                            alias: 'b'
                        }
                    })
                    .help()
                    .argv;

let command = argv._[0];

switch(command){
    case 'list':
        let base = argv.base;
        let limit = argv.limit;

        Multiply.createFile(base, limit)
        .catch(err => console.log(err.message));
        
        break;
    case 'multiply':
        Multiply.executeMultiply(argv.number1, argv.number2);
        break;
    default:
        console.log(`Comando ${command} no es válido.\n\n node app --help`);
}
```
**Create options flags without command**
```
const argv = require('yargs').options({
    address: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

module.exports = {
    argv
};
```
----------------------------------------------------------------------------------------


## Colors on command line
1. Install colors
```
$ npm install colors --save
```
2. Use it!!
```
const colors = require('colors);
console.log(`${colors.green("Resultado: ")} ${a} x ${b} = ${result}`);
```


----------------------------------------------------------------------------------------


## Http Server
**Simple Http Server**
```
const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':'application/json'})
    let responseObj = {name: 'Victor', url: req.url};
    res.write(JSON.stringify(responseObj));
    res.end();
})
.listen(8080);

console.log("Started");
```



----------------------------------------------------------------------------------------



## Express

**Basic Example** 
1. Install it 
```
$ npm install --save express
```
2. Create server.js file on root project and write
```
const express = require('express');
/** Create app express */
const app = express();

/** ROUTES */
app.get('/',(req, res) => {
    let responseObj = {name: 'Victor', url: req.url};
    res.send(responseObj);
})

/** Listen Port */
app.listen(8000, () => {
    console.log("Server Started. Listen on 8000");
});
```

**Structure and Init Classes Configuration for express app**
0. Install
``express, body-parser``

1. Structure
- public
- src/app
- src/app/controller
- src/app/controller/exampleController.js
- src/app/routes
- src/app/routes/exampleRoute.js
- src/app/routes/index.js
- src/server
- src/server/Server.js
- src/server/Startup.js
- src/server/config
- src/server/config/config.js
- index.js

2. Controller example
```
class ExampleController{

    exampleFunction(req, res) {
        res.status(200).send("Hello my dear!!");
        /** If you have middleware body-parser */
        /*
        res.status(200).json({
            ok:true
        });
        */
    }
}

const buildClass = () => {
    return new ExampleController();
}

module.exports = {buildClass};
```

3. Route example
```
const router = require('express').Router();
const exampleController = require('../controller/ExampleController').buildClass();

router.get('/',(req, res) => {
    exampleController.exampleFunction(req, res);
});

module.exports = router;
```

4. Route index
```
const router = require('express').Router();

/** Register routes */
router.use(require('./exampleRoute'));

module.exports = router;
```

5. config example
```
/** ********************* SERVER CONFIG *********************** */
/** Port */
process.env.PORT = process.env.PORT || 8000;
/*********** */
```

6. Server.js
```
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

class Server{
    constructor(){
        this.app = express();
    }

    buildHttpServer() {
        return http.createServer(this.getApp());
    }

    enablePublicContent() {
        this.setMiddleware(express.static(path.join(__dirname,'../../public')));
    }

    enableBodyParser() {
        this.setMiddleware(bodyParser.urlencoded({extended: false}));
        this.setMiddleware(bodyParser.json());
    }

    setRoutes() {
        this.setMiddleware(require('../app/routes'));
    }

    enableViewEngine(engine) {
        //For example if you install hbs, pass parameter 'hbs'
        this.app.set('view engine', engine);
    }

    setMiddleware(middleware) {
        this.app.use(middleware);
    }

    getApp() {
        return this.app;
    }
}

const buildClass = () => {
    return new Server();
}

module.exports = {buildClass}
```

7. Startup.js
```
require('./config/config');
//Some Other Configuration imports,
//for example socket.io, DataBase ORM or View Engine HBS
//const hbs = require('./hbs');

class Startup{
    constructor(server){
        this.server = server;
    }

    /** MAIN NETRY to call in index.js main file */
    async main() {
        
        //May be call some other function Configs, 
        //for example to init socket.io, DataBase ORM or View Engine

        //hbs.registerPartials();
        //hbs.registerHelpers();

        this.configureServer();
        let start = await this.startServer(this.buildServer());
        console.log(start);
    }

    startServer(server) {
        let port = process.env.PORT;
        return new Promise((resolve, reject) => {
            server.listen(port, (err) => {
                if(err) reject(err);

                resolve(`Server stated at port ${port}`);
            });
        });
    }

    configureServer() {
        this.server.enablePublicContent();
        this.server.enableBodyParser();
        //this.server.enableViewEngine('hbs');
        this.server.setRoutes();
        return this.server;
    }

    buildServer() {
        return this.server.buildHttpServer();
    }
}

const buildClass = (server) => {
    return new Startup(server);
}

module.exports = {buildClass}
```

8. index.js MAIN
```
const server = require('./src/server/Server').buildClass();
const startup = require('./src/server/Startup').buildClass(server);

startup.main()
.catch((err) => {
    console.log(err.message);
    process.exit();
});
```

9. **If you use hbs**
```
//hbs.js
const hbs = require('hbs');
const path = require('path')

const registerPartials = () => {
    hbs.registerPartials(path.join(__dirname,'../../views/partials'));
}

const registerHelpers = () => {
    hbs.registerHelper('getActualYear',require('../helpers/dateHelper').getActualYear);
}

module.exports = {
    registerPartials,
    registerHelpers
}
```


**Use express to serve static content**
1. create folder public and create all html files here. For example
2. On server.js write
```
const express = require('express');
/** Create app express */
const app = express();

/** Middleware */
/** Serve static content */
app.use( express.static(__dirname + '/public'));

/** Listen Port */
app.listen(80, () => {
    console.log("Server Started. Listen on 80");
});
```
3. This serve pages with path match. For example
If you create index.html and home.html.
	URL: /
	SERVE: index.html
	
	URL: /home.html
	SERVE: home.html
4. Serve images pasting all images folder in public folder example
```
/public/assets/images
```
And call image for url with
```
host:port/assets/images/myimage.ong
```



**Use express to create monolithic web application using views**
1. Package Structure

- src/app
- src/app/controller
- src/app/middleware
- src/app/routes
- src/app/routes/index.js
- src/public
- src/public/assets
- src/server
- src/server/config
- src/service
- src/dal/entities
- src/dal/repository
- views
- views/partials
- index.js

2. Install express, hbs, body-parser
```
$ npm install --save express
$ npm install --save hbs
$ npm install --save body-parser
```

3. In src/public/assets. Put all inages. Public will static served

4. In views/partials, create all components templates files .hbs For example AppBar.hbs and Footer.hbs
```
<!DOCTYPE html>
<html>
    <head>
        <title>Learning Express</title>
    </head>
    <body>
	<h4>AppBar</h4>
```
```
    <h4>{{ getFooterDesc }} {{ year }}</h4>
</body>
</html>
```

5. In views create all pages hbs. for example home.hbs
```
{{> AppBar }}
<h4>Learning Express {{ name }}</h1>
<img src="assets/images/vpedraza.jpg" height="50" width="50" />
{{> Footer }}

```

6. In src/app/constoller. Create all controllers.
```
const login = (req, res) => {
    res.render('login',{
		  name: 'Victor Andres Pedraza'
        //Objects
    });
}

module.exports = {
    login
}
```

7. In src/app/routes. Create all routes.
```
const express = require('express');
const LoginController = require('../controller/LoginController');

const app = express();

app.get('/login', (req, res) => {
    LoginController.login(req, res);
});

module.exports = app;
```

8. In src/app/routes/index.js Register all routes
```
const express = require('express');

const app = express();

app.use(require('./LoginRotes'));

module.exports = app;
```

9. In src/server/config Create all env config
```
/** ********************* SERVER CONFIG *********************** */
/** Port */
process.env.PORT = process.env.PORT || 3000;
/*********** */
```

10. In src/server/ Create Server conf and main function
```
require('./config/config');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();

/** Middleware to parse body x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: false}));

/** Middleware to parse body json */
app.use(bodyParser.json());

/** Middleware to serve static content*/
app.use( express.static(__dirname + '/../public'));

/** hbs Partials */
hbs.registerPartials(__dirname + '/../../views/partials');

/** hbs Helpers. Call this on HBS files */
//hbs.registerHelper('getFooterDesc', require('../helpers/YearHelper'));

/** Express HBS engine */
app.set('view engine', 'hbs');

/** Routes */
app.use(require('../app/routes'));

const start = () => {
    return new Promise((resolve, reject) => {
        app.listen(process.env.PORT, (err) => {
            if(err) reject(err);

            resolve(`App listen ${process.env.PORT}`);
        } );
    });
}

const main = async () => {
    let started = await start();
    console.log(started);
}

module.exports = {
    main
}
```

11. In index.js Start server calling main function 
```
const server = require('./src/server/server');

server.main()
.catch((err) => {
    console.log(err.message);
});
```



**SIMPLE REST API**
1. Install express
2. Install body-parser
```
$ npm install --save body-parser
```
3. Create folder /server and /config
4. Create file config.js inside /config folder. This can has all properties or env variables
```
/**
 * Port
 */
process.env.PORT = process.env.PORT || 8000;
/*********** */
```
5. Create file server.js inside /server folder
```
require('../config/config'); //To use env variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/** Middleware to parse body x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: false}));

/** Middleware to parse body json */
app.use(bodyParser.json());

app.get('/user/list', (req, res) => {
    res.json({
        msg: 'Get User'
    });
});

app.get('/user/id/:id', (req, res) => {
    console.log(req.params.id);
    res.json({
        data: `${id} id del usuario`
    });
});

app.post('/user', (req, res) => {
    let body = req.body; // This thanks body-parser
    console.log(body.name); 
    res.status(201).json({
        msg: 'Post User'
    });
});

app.put('/user/:id', (req, res) => {
    console.log(req.params.id);
    res.json('Put user');
});

app.delete('/user/:id', (req, res) => {
    console.log(req.params.id);
    res.json('Delete user');
});

app.listen(process.env.PORT, () => {
    console.log("Listen port " + process.env.PORT);
});
```


**BASIC STRUCTURED REST API**
1. Packages to Install: 
``express, body-parser, mongoose, underscore, bcryptjs, jsonwebtoken``

2. Package structure
- src/app
- src/app/controller
- src/app/middleware
- src/app/routes
- src/app/routes/index.js
- src/error
- src/service
- src/dal
- src/dal/entity
- src/dal/repository
- src/domain
- src/mapper
- src/server
- src/server/config
- src/util
- src/public/assets
- index.js

3. Inside dal/entity, create all entities using Schema from Mongose.
```
//UserState.js
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userStateSchema = new Schema({
    name: {
        type: String,
        require: [true, 'The name is needed']
    }
});

module.exports = mongoose.model('UserState', userStateSchema);
```

```
//User.js
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'The name is needed']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'The email is needed']
    },
    pass: {
        type: String,
        require: [true, 'The pass is needed']
    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId("5e0a4378cbff7b3fc8e95c3b"),
        ref: 'UserState'
    }
});

module.exports = mongoose.model('User', userSchema);
```

4. Inside dal/repository, create all repository methods data access
```
//UserStateRepo.js
const UserState = require('../entity/UserState');

const find = () => {
    return new Promise((resolve, reject) => {
        UserState.find((err, states) => {
            if(err) reject(err);

            resolve(states);
        });
    });
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        UserState.findById(id, (err, state) => {
            if(err) reject(err);

            resolve(state);
        });
    });
}

const create = (userStateInput) => {
    return new Promise((resolve, reject) => {
        let userState = new UserState(userStateInput);
        userState.save((err, userStateCreated) => {
            if(err) reject(err);

            resolve(userStateCreated);
        });
    });
}

module.exports = {
    find,
    create,
    findById
}
```

```
//UserRepo.js
onst User = require('../entity/User');

const create = (userInput) => {
    return new Promise((resolve, reject) => {
        let user = new User(userInput);
        user.save((err, userDB) => {
            if(err) reject(err);

            resolve(userDB);
        });
    });
}

const count = () => {
    return new Promise((resolve, reject) => {
        User.countDocuments({}).exec((err, count) => {
            if(err) reject(err);

            resolve(count);
        });
    });
}

const find = () => {
    return new Promise((resolve, reject) => {
        User.find({})
        .populate('state')
        .exec((err, users) => {
            if(err) reject(err);

            resolve(users);
        });
    });
}

const findOne = (query) => {
    return new Promise((resolve, reject) => {
        User.findOne(query, (err, user) => {
            if(err) reject(err);

            resolve(user);
        });
    });
}

const findPaged = (page, limit) => {
    page = limit * page;
    return new Promise((resolve, reject) => {
        User.find({})
        .populate('state')
        .skip(page)
        .limit(limit)
        .sort('name')
        //.sort('-name') // sort DESC
        .exec((err, users) => {
            if(err) reject(err);

            resolve(users);
        });
    });
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, userDB) => {
            if(err) reject(err);

            resolve(userDB);
        });
    });
}

const findByIdAndUpdate = (id, userInput) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, userInput, {new:true, runValidators: true}, (err, userDB) => {
            if(err) reject(err);

            resolve(userDB);
        });
    });
}

module.exports = {
    create,
    findById,
    findByIdAndUpdate,
    find,
    findPaged,
    count,
    findOne
}
```

5. Inside error, create all Error Classes you can need
```
class ValidationHttpError extends Error{
    constructor(message,httpCode){
        super(message);
        this.httpCode = httpCode;
    }
}

module.exports = ValidationHttpError;
```


6. Inside service, create all services methods
```
//UserStateService.js
const UserStateRepo = require('../dal/repository/UserStateRepo');
const StringUtil = require('../util/StringUtil');
const ValidationHttpError = require('../error/ValidationHttpError')

const find = async () => {
    return await UserStateRepo.find();
}

const findById = async (id) => {
    return await UserStateRepo.findById(id);
}

const create = async (input) => {
    validateInput(input);
    let userState = await UserStateRepo.create(input); 
    let data = {
        msg: 'Created',
        data: userState
    }
    return data;
}

const validateInput = (input) => {
    if(StringUtil.isBlank(input.name))
        throw new ValidationHttpError('Name is Blank', 400);

}

module.exports = {
    find,
    create,
    findById
}
```

```
//UserService.js
const UserRepo = require('../dal/repository/UserRepo');
const UserStateService = require('../service/UserStateService');
const ValidationHttpError = require('../error/ValidationHttpError');
const StringUtil = require('../util/StringUtil');
const _ = require('underscore');
const PageCalcUtil = require('../util/PageCalcUtil');
const EncryptUtil = require('../util/EncryptUtil');

const create = async (userInput) => {
    validateUser(userInput);

    await buildState(userInput);

    if(StringUtil.isBlank(userInput.pass))
        throw new ValidationHttpError("Password is blank", 400);
    
    encryptPassword(userInput);

    return await UserRepo.create(userInput);
}

const findByIdAndUpdate = async (id, userInput) => {
    validateUser(userInput);
    userInput = buildUserUpdate(userInput);
    return await UserRepo.findByIdAndUpdate(id, userInput);
}

const find = async (page, limit) => {
    page = PageCalcUtil.setPage(page);
    let users = await UserRepo.findPaged(page || 0, limit);
    let total = await count();
    let data = {
        users,
        total: PageCalcUtil.totalPages(total, limit),
        page: page + 1,
    }
    return data;
}

const findByEmail = async (email) => {
    return await UserRepo.findOne({email});
}

const count = async () => {
    return await UserRepo.count();
}

const validateUser = (userInput) => {
    if(StringUtil.isBlank(userInput.name))
        throw new ValidationHttpError("Name is blank", 400);

    if(StringUtil.isBlank(userInput.email))
        throw new ValidationHttpError("Email is blank", 400);
}

const buildState = async (userInput) => {
    if(! StringUtil.isBlank(userInput.state)){
        let state = await UserStateService.findById(userInput.state);
        console.log(state);
        if(state == null)
            throw new ValidationHttpError("State not found", 404);

        delete userInput.state;
    }
}

const buildUserUpdate = (userInput) => {
    return _.pick(userInput, ["name", "email", "google"]);
}

const encryptPassword = (userInput) => {
    userInput.pass = EncryptUtil.bcryptEncryption(userInput.pass);
}

module.exports = {
    create,
    findByIdAndUpdate,
    find,
    count,
    findByEmail
}
```

```
//LoginService.js
const UserService = require('./UserService');
const ValidationHttpError = require('../error/ValidationHttpError');
const EncryptUtil = require('../util/EncryptUtil');
const StringUtil = require('../util/StringUtil');
const JWTUtil = require('../util/JWTUtil');

const login = async (credentials) => {
    validateInputs(credentials);
    let email = credentials.email;
    let user = await UserService.findByEmail(email);
    if(! user)
        throw new ValidationHttpError(`Doesn't exist user ${email}`, 404);

    validatePassword(credentials.pass, user);

    let data = {
        user,
        token: JWTUtil.generateJWT(user)
    }

    return data;
}

const validateInputs = (credentials) => {
    if(StringUtil.isBlank(credentials.email))
        throw new ValidationHttpError(`Email is blank`, 400);

    if(StringUtil.isBlank(credentials.pass))
        throw new ValidationHttpError(`Password is blank`, 400);

}

const validatePassword = (password, user) => {
    if(! EncryptUtil.bcryptCompare(password, user.pass))
        throw new ValidationHttpError(`Incorrect password`, 400);
}

module.exports = {
    login
}
```

7. Inside app/controller, create all Request Response handlers methods
using service.
```
//UserController.js
require('../../server/config/config');
const UserService = require('../../service/UserService');

const create = (req, res) => {
    let body = req.body;
    UserService.create(body)
    .then((userDB) => {
        res.status(201).json({
            ok: true,
            msg: `User created ${userDB.name}`,
            data: userDB
        });
    })
    .catch((err) =>{
        res.status(err.httpCode || 500).json({
            msg: err.message
        });
    }); 
}

const findByIdAndUpdate = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    UserService.findByIdAndUpdate(id,body)
    .then((userDB) => {
        res.status(201).json({
            msg: `User updated ${userDB.name}`,
            data: userDB
        });
    })
    .catch((err) =>{
        res.status(err.httpCode || 500).json({
            msg: err.message
        });
    }); 
}

const find = (req, res) => {
    let page = Number(req.query.page);
    let limit = Number(process.env.USERS_PAGE_LIMIT);
    UserService.find(page, limit)
    .then((data) => {
        res.status(200).json({
            msg: `Count users found ${data.users.length}`,
            data
        });
    })
    .catch((err) => {
        res.status(err.httpCode || 500).json({
            msg: err.message
        });
    });
}

module.exports = {
    create,
    findByIdAndUpdate,
    find
}
```

8. Inside util, create all Utilities you can need
```
//PageCalcUtil.js
const totalPages = (total, limit) => {
    return Math.ceil(total / limit);
}

const setPage = (page) => {
    return (page === 0 ? 1 : page) -1;
}

module.exports = {
    totalPages,
    setPage
}
```

```
//EncryptUtil.js
const bcrypt = require('bcryptjs');

const bcryptEncryption = (text) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text,salt);
}

const bcryptCompare = (plainText, hashText) => {
    return bcrypt.compareSync(plainText, hashText);
}

module.exports = {
    bcryptEncryption,
    bcryptCompare
}
```


9. Inside app/routes, create all files that has routes
```
//UserRoutes.js
const express = require('express');
const app = express();
const UserController = require('../controller/UserController');
const AuthMiddelware = require('../middleware/AuthMiddleware');

app.get('/user/list', (req, res) => {
    UserController.find(req, res);
});

app.get('/user/id/:id', [AuthMiddelware.verifyToken], (req, res) => {
    console.log(req.params.id);
    res.json({
        data: `${id} id del usuario`
    });
});

app.post('/user', (req, res) => {
    UserController.create(req,res);
});

app.put('/user/:id', [AuthMiddelware.verifyToken] ,(req, res) => {
    UserController.findByIdAndUpdate(req, res);
});

app.delete('/user/:id', (req, res) => {
    console.log(req.params.id);
    res.json('Delete user');
});

module.exports = app;
```

10. Inside app/routes/index.js, register all routes
```
//index.js
const express = require('express');
const app = express();

/** User ROUTES */
app.use(require('./UserRoute'));

/** Login ROUTES */
app.use(require('./LoginRoute'));

/** User State ROUTES */
app.use(require('./UserStateRoute'));

/** User State ROUTES */
app.use(require('./ProductRoute'));

// All other routes here
// app.use(otherRoute);

module.exports = app;
```

11. Inside server/config/config.js, Create env configuration
```
// config.js
/** ********************* SERVER CONFIG *********************** */
/** Port */
process.env.PORT = process.env.PORT || 8000;
/*********** */

/** ********************* DB CONFIG *********************** */
/** DB host */
process.env.DB_HOST = "yourhost.com";
/*********** */

/** DB port */
process.env.DB_PORT = "27017";
/*********** */

/** DB Protocol */
process.env.DB_PROTOCOL = "mongodb";
/*********** */

/** DB Name */
process.env.DB_NAME = "products";
/*********** */

/** ********************* USERS PAGEABLE CONFIG *********************** */
/** DB host */
process.env.USERS_PAGE_LIMIT = 4;
/*********** */

/** ********************* JWT CONFIG *********************** */
/** JWT secret - seed */
process.env.JWT_SECRET = "Jhysbb-wybdsop-spw";
/*********** */

/** JWT expiration time in seconds */
process.env.JWT_EXPIRES = 60 * 60 * 24 * 30
/*********** */
```

12. Inside server/config/DBConfig.js, Create DataBase configuration
**Mongoose**
```
// DBConfig.js
const mongoose = require('mongoose');
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    auth:{
        user: 'test', 
        password: 'secret'
    } 
};

const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${process.env.DB_PROTOCOL}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            options,
            (err, res) => {
            if(err) reject(err);

            resolve(`Mongo db connection stablished`);
        });
    });
}

module.exports = {
    connect
}
```

13. Inside server, create main entry and start server file. 
```
//server.js
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const DBConfig = require('./config/DBConfig');
const app = express();

/** Middleware to parse body x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: false}));

/** Middleware to parse body json */
app.use(bodyParser.json());

/** ROUTES */
app.use(require('../app/routes'));

/** Listen function */
const listen = () => {
    /** Start Server */
    return new Promise((resolve, reject) => {
        app.listen(process.env.PORT, (err) => {
            if(err) reject(err);

            resolve("Listen port " + process.env.PORT);
        });
    });
}

/** Start Function */
const main = async () => {
    let db = await DBConfig.connect();
    console.log(db);
    let server = await listen();
    console.log(server);
}

module.exports = {
    main
}
```

14. Inside index.js
```
const server = require('./src/server/server');

server.main()
.catch((err) => {
    console.log(err.message);
});
```

----------------------------------------------------------------------------------------


## Middlewares in Express

1. Create Middleware in folder
```
//MyMiddleare.js

const myFunction = (req, res, next) => {
	//CODE

	next(); //To continue
}

module.exports = {
	myFunction
}
```

2. Implemeting it in ROUTE
```
const express = require('express');
const app = express();
const MyMiddleare = require('../middleware/MyMiddleare');

app.get('/user/list', [MyMiddleare.myFunction],  (req, res) => {
    //CODE;
});

```


----------------------------------------------------------------------------------------

## Node and TypeScript

**Getting Started**

To use TypeScript in Node, you will need to compile all TypeScript files
, copy your not .ts files into dist/ folder and run app.

1. Install globally TypeScript
```
$ sudo npm install -g typescript
$ tsc -v
```

2. Execute npm init and tsc init on your main folder project
```
$ npm init
$ tsc --init
```

3. This create a package.json and tsconfig.json. In tsconfig.json, uncomment outDir referencing dist as the compile result folder
```
// ...
"outDir": "./dist",
// ...

4. If you have more files that are not .ts, you will need to copy all of this files
and folders to dist/ folder. So install copyfiles
```
$ npm install --save copyfiles
```

5. Then, to compile in one npm script, in your package.json, add scripts:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "copy-data": "copyfiles data/** dist",
    "copy-public": "copyfiles public/** public/**/** public/**/**/** dist",
	 //"copy-views": "copyfiles views/** views/**/** dist",
    "build": "tsc && npm run copy-data && npm run copy-public"
  },
```

6. After finish writting code, execute
```
$ npm run build
```

7. Run app
```
$ node dist/index
```

**With TypeScript - Structure and Init Classes Configuration for express app**

- Configure TS like Above first, then:

0. Install
``express, body-parser``

And as develop scope, @types, this for declare some types from libraries
For example types for express:
```
$ npm install --save-dev @types/express
```

1. Structure
- public
- src/app
- src/app/controller
- src/app/controller/exampleController.js
- src/app/routes
- src/app/routes/exampleRoute.js
- src/app/routes/index.js
- src/server
- src/server/Server.js
- src/server/Startup.js
- src/server/config
- src/server/config/config.js
- index.js

2. Controller ExampleController.ts
```
import {Request, Response} from 'express';

class ExampleController{

    exampleFunction(req: Request, res: Response) {
        res.status(200).send("Hello my dear!!");
        /** If you have middleware body-parser */
        /*
        res.status(200).json({
            ok:true
        });
        */
    }
}

export default ExampleController;
```

3. Route exampleRoutes.ts
```
import {Router, Request, Response} from 'express';
import ExampleController from '../controller/ExampleController';

const exampleController = new ExampleController();
const router = Router();

router.get('/',(req: Request, res: Response) => {
    exampleController.exampleFunction(req, res);
});

export default router;
```

4. Route index.ts
```
import {Router} from 'express';
import exampleRouter from './exampleRoutes';

const router = Router();

router.use(exampleRouter);

export default router;
```

5. config.ts example
```
declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
    }
}

/** ********************* SERVER CONFIG *********************** */
/** Port */
process.env.PORT = process.env.PORT || "8000";
/*********** */
```

6. Server.ts
```
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import routes from '../app/routes/index';

class Server{

    app: express.Application;

    constructor(){
        this.app = express();
    }

    buildHttpServer() {
        return http.createServer(this.getApp());
    }

    enablePublicContent() {
        this.setMiddleware(express.static(path.join(__dirname,'../../public')));
    }

    enableBodyParser() {
        this.setMiddleware(bodyParser.urlencoded({extended: false}));
        this.setMiddleware(bodyParser.json());
    }

    setRoutes() {
        this.setMiddleware(routes);
    }

    enableViewEngine(engine: string) {
        //For example if you install hbs, pass parameter 'hbs'
        this.app.set('view engine', engine);
    }

    setMiddleware(middleware: express.RequestHandler) {
        this.app.use(middleware);
    }

    getApp() {
        return this.app;
    }
}

export default Server;
```

7. Startup.ts
```
require('./config/config');
import Server from "./Server";
//Some Other Configuration imports,
//for example socket.io, DataBase ORM or View Engine HBS
//import hbs from './hbs';

class Startup{

    server: Server;

    constructor(server: Server){
        this.server = server;
    }

    /** MAIN NETRY to call in index.js main file */
    async main() {
        
        //May be call some other function Configs, 
        //for example to init socket.io, DataBase ORM or View Engine

        //hbs.registerPartials();
        //hbs.registerHelpers();

        this.configureServer();
        let start = await this.startServer(this.buildServer());
        console.log(start);
    }

    startServer(server: any) {
        let port = Number(process.env.PORT);
        return new Promise((resolve, reject) => {
            server.listen(port, (err: any) => {
                if(err) reject(err);

                resolve(`Server stated at port ${port}`);
            });
        });
    }

    configureServer() {
        this.server.enablePublicContent();
        this.server.enableBodyParser();
        //this.server.enableViewEngine('hbs');
        this.server.setRoutes();
        return this.server;
    }

    buildServer() {
        return this.server.buildHttpServer();
    }
}

export default Startup;
```

8. index.ts MAIN
```
import Server from './src/server/Server';
import Startup from './src/server/Startup';

const server = new Server();
const startup = new Startup(server);

startup.main()
.catch((err: Error) => {
    console.log(err.message);
    process.exit();
});
```

9. **If you use hbs**
```
//hbs.ts
import hbs from 'hbs';
import path from 'path';

export const registerPartials = () => {
    hbs.registerPartials(path.join(__dirname,'../../views/partials'));
}

export const registerHelpers = () => {
    hbs.registerHelper('getActualYear',require('../helpers/dateHelper').getActualYear);
}

```

----------------------------------------------------------------------------------------


## Implementing JWT

1. Create env variables
```
//config.js

/** ********************* JWT CONFIG *********************** */
/** JWT secret - seed */
process.env.JWT_SECRET = "Jhysbb-wybdsop-spw";
/*********** */

/** JWT expiration time in seconds */
process.env.JWT_EXPIRES = 60 * 60 * 24 * 30
/*********** */
```

2. Create JWT Util
```
// JWTUtil.js

require('../server/config/config');
const jwt = require('jsonwebtoken');

const generateJWT = (content) => {
    return jwt.sign({
        content
    }, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRES)});
}

const verifyToken = (token) => {
    return new Promise((resolve , reject) => {
        if(! token.startsWith('Bearer '))
            throw new Error("Invalid HEADER prefix");
        jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
            if(err) reject(err);

            resolve(decoded);
        });
    });
}

module.exports = {
    generateJWT,
    verifyToken
}
```

3. Create Middleware
```
//AuthMiddleware.js

const JWTUtil = require('../../util/JWTUtil');

const verifyToken = (req, res, next) => {

    /** Get HEADER Authorization */
    let token = req.get('Authorization');
    console.log(token);

    JWTUtil.verifyToken(token)
    .then((decoded) => {
        req.decoded = decoded; //Set Token Content in request to use it in Controller or other Middleware
        next();
    })
    .catch((err) => {
        res.status(401).json({
            ok: false,
            msg: err.message
        });
    });
}

module.exports = {
    verifyToken
}
```

4. Implementing Middleware to potect routes
```
//User Route
const express = require('express');
const app = express();
const AuthMiddleware = require('../middleware/AuthMiddleware');

app.get('/user/list', AuthMiddleware.verifyToken,  (req, res) => {
    //CODE;
});
```

----------------------------------------------------------------------------------------


## Google API sign

**Google sign Frontend Authentication with WebBrowser implementation**

1. Create a project. Calling from WebBrowser
``https://developers.google.com/identity/sign-in/web/sign-in``

2. Go to API console and in Navigation Menu, go to Credentials
``https://console.developers.google.com``

3. Click Create Client ID OAuth >> [Select Type Application] WEB >> Write Name >> Write JavaScript ORIGNS (http://localhost) >> **If you need** URIs Redirect >> (http://localhost/home)

4. Get CLIENT ID and CLIENT SECRET

5. On your client application (React, Angular, VUE, Node, Spring Boot). On login HTML:
```
...
<head>
	 ...
	 <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="<YOUR_CLIENT_ID>.apps.googleusercontent.com" />
</head>
<body>
	 <div class="g-signin2" data-onsuccess="onSignIn"></div>
	 <script>
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        		/** Send Google TOKEN to Your Backend */
            var id_token = googleUser.getAuthResponse().id_token;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/google');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                console.log('Signed in as: ' + xhr.responseText);
            };
            xhr.send('idtoken=' + id_token);
        }
    </script>
    <a href="#" onclick="signOut();">Sign out</a>
    <script>
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    </script> 
</body>
```

6. Validate Token on backend

**NodeJS**
- 
```
npm install npm install google-auth-library --save
```
- Function:
```
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  
  // ********* IMPORTANT	
  // After this, you have user data to create new user if doesn't exist
  // Generate your new JWT and send it to Frontend
  
  
  return payload;
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
verify().catch(console.error);
```

**Java**
```
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

...

GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
    // Specify the CLIENT_ID of the app that accesses the backend:
    .setAudience(Collections.singletonList(CLIENT_ID))
    // Or, if multiple clients access the backend:
    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
    .build();

// (Receive idTokenString by HTTPS POST)

GoogleIdToken idToken = verifier.verify(idTokenString);
if (idToken != null) {
  Payload payload = idToken.getPayload();

  // Print user identifier
  String userId = payload.getSubject();
  System.out.println("User ID: " + userId);

  // Get profile information from payload
  String email = payload.getEmail();
  boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
  String name = (String) payload.get("name");
  String pictureUrl = (String) payload.get("picture");
  String locale = (String) payload.get("locale");
  String familyName = (String) payload.get("family_name");
  String givenName = (String) payload.get("given_name");

  // Use or store profile information
  // ...

} else {
  System.out.println("Invalid ID token.");
}
```

7. After veirfy, make the response propoerly to frontend, send the JWT and all info
you send when user authenticate normally



----------------------------------------------------------------------------------------

## Mongoose queries

**populate to retrive relations**
```
return new Promise((resolve, reject) => {
        Product.find({})
        .skip(pageNew)
        .limit(limit)
        .populate({
            path: 'user',
            select: ['name', 'email'],
            populate: { //Because user has state
                path: 'state'
            }
        })
        .exec((err, products) => {
            if(err) reject(err);

            resolve(products);
        });
    });
```

**find() with Regex**
```
Entity.find({ attribute: new RegExp('')})
```


----------------------------------------------------------------------------------------


## Upload files Express Server API

**Using like Multipart**
https://www.npmjs.com/package/express-fileupload

1. Install 
``express, body-parser, express-fileupload``

2. Create you favorite API package structure and add 
``uploads`` folder.

3. Example wrapper
```
const uploadFile = (file, path) => {
    return new Promise((resolve, reject) => {
        file.mv(path, (err) => {
            if(err) reject(err);

            resolve(`File created ${path}`);
        });
    });
}

module.exports = {
    uploadFile
};
```

4. Controller to handle request
```
const UploadService = require('../../services/UploadService');

const uploadImage = (req, res) => {
    /** File sended is in req.files object */
    let files = req.files;
    UploadService.uploadImage(files.file)
    .then((result) => {
        res.status(201).json({
            ok: true,
            msg: 'Created',
            data: result
        });
    })
    .catch((err) => {
        res.status(err.codeHttp || 500).json({
            ok:false,
            msg: err.message
        });
    });
}


module.exports = {
    uploadImage
}
``
`

5. Render image Controller
```
const Path = require('path');

const renderImage = (req, res) => {
    let image = req.params.image;
    console.log(image); //name of image
    let path = Path.join(__dirname,'../../../public/assets',image); 
	 res.status(200)
        .sendFile(path);
}

module.exports = {
    renderImage
}
```

6. Routes
```
//UploadRoute
const express = require('express');
const expressFileUpload = require('express-fileupload');
const UploadController = require('../controller/UploadController');

const app = express();

app.use(expressFileUpload());

app.post('/upload/image', (req, res) => {
    UploadController.uploadImage(req, res);
});

module.exports = app;
```

```
///Render Route
const express = require('express');
const RenderController = require('../controller/RenderController');

const app = express();

app.get('/render/image/:image', (req, res) => {
    RenderController.renderImage(req, res);
});

module.exports = app;
```


**To handle Bytes and types**
```

```

----------------------------------------------------------------------------------------


## Sockets - socket.io

1. Install 
``express, socket.io``

2. Socket Handler class server
```
const SocketIO = require('socket.io');
/** socket.io Message IDs */
const CONN_MESSAGE_ID = 'connection';
const DISCONNECT_MESSAGE_ID = 'disconnect';

/** Custom Message IDs */
const USERS_MESSAGE_ID = 'connUsers';
const PRIVATE_MESSAGE_ID = 'privateMessage';

class Socket{
    constructor(httpServer){
        this.socket = SocketIO(httpServer);
        this.chatBusiness = require('../../service/ChatBusiness').buildClass();
    }

    connect() {
        this.socket.on(CONN_MESSAGE_ID, (client) => {
            console.log(`Client connected`);

            this.listenAndResponseSameBroadcast(client, 'conn', (data) => {
                return this.connectionHandler(client, data);
            }, USERS_MESSAGE_ID);

            this.listen(client, DISCONNECT_MESSAGE_ID, (data) => {
                console.log(`Client disconnected`);
                let dataBroadcast = this.disconnectionHandler(client, data);
                console.log(`Broadcast: ${JSON.stringify(dataBroadcast)}`);
                this.broadcast(client, USERS_MESSAGE_ID, dataBroadcast);
            });
            
            this.listenAndResponse(client, PRIVATE_MESSAGE_ID, (data) => {
                data.id = client.id;
                this.sendPrivateMessage(client, data);
                console.log(`SENDED: ${JSON.stringify(data)}`);
                return data;
            });

        });
    }

    connectionHandler(client, data) {
        let id = client.id;
        let {name} = data;
        return this.chatBusiness.addUser(id,name);
    }

    disconnectionHandler(client, data) {
        let id = client.id;
        return this.chatBusiness.removeUser(id);
    }

    sendPrivateMessage(client, data) {
        let {userID} = data;
        return this.broadcastTo(client, userID, PRIVATE_MESSAGE_ID, data);
    }

    listenAndResponseAndBroadcast(client, messageID, resCallback , messageIDBroadcast, broadcastCallback) {
        this.listenAndResponseAndAction(client, messageID, resCallback, (client, data) =>{
            this.broadcast(client, messageIDBroadcast, broadcastCallback(data));
        });
    }

    listenAndResponseSameBroadcast(client, messageID, resCallback, messageIDBroadcast) {
        this.listenAndResponseSameAction(client, messageID, resCallback, (client, res) => {
            this.broadcast(client, messageIDBroadcast, res);
        });
    }

    joinRoom(client, room) {
        client.join(room);
    }

    send(client, messageID, data) {
        return client.emit(messageID, data);
    }

    broadcast(client, messageID, data) {
        return client.broadcast.emit(messageID, data);
    }

    broadcastTo(client, clientId, messageID, data) {
        return client.broadcast.to(clientId).emit(messageID, data);
    }

    listen(client, messageID, callback) {
        client.on(messageID, (data) => {
            callback(data);
        });
    }

    listenAndResponse(client, messageID, resCallback) {
        client.on(messageID, (data, response) => {
            response(resCallback(data));
        });
    }

    listenAndResponseAndAction(client, messageID, resCallback , action) {
        client.on(messageID, (data, response) => {
            response(resCallback(data));
            action(client, data);
        });
    }

    listenAndResponseSameAction(client, messageID, resCallback , action) {
        client.on(messageID, (data, response) => {
            let res = resCallback(data);
            response(res);
            action(client, res);
        });
    }
}

const buildClass = (httpServer) => {
    return new Socket(httpServer);
}

module.exports = {buildClass};
```

3. Start socket conf on Startup

```
//CODE

	main = async () => {
        
        //May be call some other function Configs, 
        //for example to init socket.io, DataBase ORM or View Engine

        hbs.registerPartials();
        hbs.registerHelpers();

        this.configureServer();
        let httpServer = this.buildServer();
   /* HERE */require('./config/Socket').buildClass(httpServer).connect(); // -----> START SOCKET
        let start = await this.startServer(httpServer);
        console.log(start);
    }
//CODE
```

4. On front end create js/socket-io.js
```
//var socket = io(); // If socket server is the SAME http server
//var socket = io.connect('http://172.168.23.14:8000/'); // If socket server is DIFFERENT http server

function socketIOListen(messageID, callback){
    socket.on(messageID, function(data){
        callback(data);
    });
}

function socketIOSendMessage(messageID, message, callback){
    socket.emit(messageID,message, (res) => {
        callback(res);
    });
}
```

5. On forn end import script
```
<!DOCTYPE html>
<html>
    <head>
        <title>Testing local Sockets</title>
    </head>
    <body>
        Check the console
         <!-- SocketIO library -->
   	  <script src="http://[host]:[port]/socket.io/socket.io.js"></script>
			<!-- SocketIO to start -->
		  <script src="js/socket-io.js"></script>
        <!-- SocketIO custom functions to interact -->
    	  <script src="js/socket-io-custom.js"></script>
    </body>
</html>
```

----------------------------------------------------------------------------------------

## MySQL in Node

1. Install
``mysql, mysqljs/mysql``

2. Create class to handler connection
```
import mysql from 'mysql';

const connectionParams = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'secret',
    database: 'node_test'
};

export default class DataBase{

    private static _INSTANCE: mysql.Connection;

    private constructor(){}

    public static buildInstance(): void{
        if(this._INSTANCE == null){
            this._INSTANCE = mysql.createConnection(connectionParams);
            console.log('Instance builded.');
        }
    }

    public static getInstance(): mysql.Connection{
        return this._INSTANCE;
    }

    /**
     * Query method to execute query
     * 
     * If you are inserting a row into 
     * a table with an auto increment primary key, you can retrieve the insert id
     * `results.insertId`
     * 
     * You can get the number of affected rows from an insert, update or delete statement
     * `results.affectedRows`
     * 
     * You can get the number of changed rows from an update statement
     * `results.changedRows`
     * 
     * @param queryFormat Query String like 'SELECT ?? FROM ?? WHERE id = ?'
     * @param args Arguments array like [['Column1, column2'],'users', 3]
     */
    public static query(queryFormat: string, args: any): Promise<any>{
        return new Promise((resolve, reject) => {
            this.getInstance().query(queryFormat, args, (err, results, fields) => {
                if (err) reject(err);
                
                resolve(results);
            });
        });
    }

    /**
     * Method to establish connection
     */
    public static connect(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.getInstance().connect((err: mysql.MysqlError) => {
                if(err) reject(err);

                resolve(true);
            });
        });
    }

    public static disconnect(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.getInstance().end((err: mysql.MysqlError) => {
                if(err) reject(err);

                resolve(true);
            });
        });
    }

    public static destroy(): void{
        this.getInstance().destroy();
    }
}
```

3. Create repo to use DataBase Hanlder
```
import DataBase from '../../server/config/DataBase';

export default class UserRepository{

    constructor(){}

    public async findAll(){
        DataBase.buildInstance();
        //await DataBase.connect();
        let results = await DataBase.query('SELECT ?? FROM n_user',[['name', 'age']]);
        //await DataBase.disconnect(),
        console.log(`Users: ${results.length}`);
        return results;
    }
}
```


----------------------------------------------------------------------------------------

## Create LOCALLY Node modules and Installed in other Node application
https://dev.to/therealdanvega/creating-your-first-npm-package-2ehf


----------------------------------------------------------------------------------------
