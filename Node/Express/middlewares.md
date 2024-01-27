# Express Middleware

```
import express, { Request, Response, NextFunction } from 'express';

let app = express();

function myMiddleware(req: Request, res: Response, next: NextFunction){
	// Do something before
    next(); // Function to continue
}

function myMiddlewareValidation(req: Request, res: Response, next: NextFunction){
	if(! validation(req)){
        res.status(401);
        res.send("Unauthorized");
    } else {
        next(); // Function to continue
    }
}

app.use(myMiddleware);
// Or specify path
app.use('/users', myMiddlewareValidation);
```

------------------------------------------------------------------------------------------------

# Cors Middleware

```
// npm install cors
// npm install -D @types/cors
import cors from 'cors';
import { Express } from 'express';

export const registerCors = (app: Express) => {
    app.use(cors({
        origin: '*'
    }));
}
```
------------------------------------------------------------------------------------------------