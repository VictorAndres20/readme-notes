# Nest JS - Node JS Framework for server-side applications
https://docs.nestjs.com/

## Installation and init
```
npm i -g @nestjs/cli
```
```
nest new project-name
```

## Start server
```
npm run start
```

## Basics
https://docs.nestjs.com/first-steps

---------------------------------------------------------------------------------------------------------------------------------------

### DB connections with TypeORM
https://docs.nestjs.com/techniques/database
https://typeorm.io/#/

**Core imports**
```
npm install --save @nestjs/typeorm typeorm
```

MySQL
```
npm install --save mysql2
```

PostgreSQL
```
npm install --save pg
```

Oracle
```
npm install --save oracledb
```

**Configuration**
Main app.module.ts
```
import { Module } from '@nestjs/common';
...
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //'postgres'
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      //schema: 'ks',
      entities: [],
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
```

---------------------------------------------------------------------------------------------------------------------------------------


## Full structure API app

#### imports
´´´
npm install --save @nestjs/typeorm typeorm
npm install --save reflect-metadata
´´´
**Install db provider**

#### Structure
- src

- src/commons
- src/commons/responses
- src/commons/response/http_response.ts
- src/commons/middlewares
https://docs.nestjs.com/middleware

- src/api
- src/api/api.module.ts

- src/api/module_name
- src/api/module_name/entity
- src/api/module_name/entity/module_name_entity.builder.ts
- src/api/module_name/entity/module_name.dto.ts
- src/api/module_name/entity/module_name.entity.ts
- src/api/module_name/service
- src/api/module_name/service/module_name.service.ts
- src/api/module_name/controller
- src/api/module_name/controller/module_name.controller.ts
- src/api/module_name/module_name.module.ts
**Like this with all modules in API**

- src/utils

- src/app.module.ts
- src/main.ts

#### Example of files
**Create Commons**
- src/commons/response/http_response.ts
´´´
export class HttpResponse<T>{

    private ok: boolean;
    private msg: string;
    private error: string;
    private data: T;
    private list: T[];

    setError(error: string): HttpResponse<T>{
        this.error = error;
        return this;
    }

    setMessage(msg: string): HttpResponse<T>{
        this.msg = msg;
        return this;
    }

    setData(data: T): HttpResponse<T>{
        this.data = data;
        return this;
    }

    setList(list: T[]): HttpResponse<T>{
        this.list = list;
        return this;
    }

    build(status: boolean){
        this.ok = status;
        return this;
    }

}
´´´


**Example of API Module**
- src/api/user/entity/user.entity.ts
´´´
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { UserState } from '../../user_state/entity/user_state.entity';

@Entity({name: "users"})
export class User {
  @PrimaryColumn() 
  uuid: string

  @Column()
  full_name: string

  @Column()
  username: string
  
  @Exclude()
  password: string
  
  @ManyToOne(() => UserState, userState => userState.users, {
    onDelete: "CASCADE",
    eager: true
  })
  @JoinColumn({ name: "state" })
  state: UserState
}
´´´
Relation class UserState looks like
´´´
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({name: "user_state"})
export class UserState {
  @PrimaryColumn() 
  cod: string

  @Column()
  name: string

  @OneToMany(() => User, user => user.state)
  users: User[];

}
´´´

- src/api/user/entity/user.dto.ts
´´´
export class UserDTO {

    readonly full_name: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly state: string;

}
´´´

- src/api/user/entity/user_entity.builder.ts
´´´
// Base entity
import { User } from './user.entity';

//Relations
import { UserState } from '../../user_state/entity/user_state.entity';

//DTOs
import  { UserDTO } from './user.dto';

const default_state = 'FREE';

export const build_base_creation = (userDTO: UserDTO): User => {
    let entity = new User()
    entity.full_name = userDTO.full_name;
    entity.email = userDTO.email;
    entity.password = userDTO.password;
    entity.username = userDTO.username;
    entity.state = build_init_state(userDTO.state);
    return entity;
}

export const build_init_state = (stateCod: string = default_state): UserState => {
    let entity = new UserState()
    entity.cod = stateCod;
    return entity;
}
´´´

- src/api/user/service/user.service.ts
´´´
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { build_base_creation } from '../entity/user_entity.builders';
import { UserDTO } from '../entity/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  createOne(userDTO: UserDTO): Promise<User>{
    try{
      let user = build_base_creation(userDTO);
      let data = this.repo.save(user);
      return data;
    } catch(err){
      throw new Error(err.message);
    }
  }
}
´´´

- src/api/user/controller/user.controller.ts
´´´
import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UserDTO } from '../entity/user.dto';
import { HttpResponse } from '../../../commons/responses/http_response';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Get('all')
    async findAll(): Promise<HttpResponse<User>> {
        try{
            let list = await this.service.findAll();
            return new HttpResponse<User>().setList(list).build(true);
        } catch(err){
            throw new HttpException(new HttpResponse<User>().setError(err.message).build(false), 500);
        }
    }

    @Post('create')
    async createOne(@Body() userDTO: UserDTO): Promise<HttpResponse<User>> {
        try{
            let data = await this.service.createOne(userDTO);
            return new HttpResponse<User>().setData(data).build(true);
        } catch(err){
            throw new HttpException(new HttpResponse<User>().setError(err.message).build(false), 500);
        }
    }
}
´´´

- src/api/user/user.module.ts
This file is really important. 
Make sure to register all injectable imports like repos.
Make sure to register all providers (services) and controllers.
If you need to export your service, you can register it in exports array
´´´
import { Module } from '@nestjs/common';

// Imports (TypeORM to register Module Entity, Other api modules, imports that needs IoC)
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

// Providers (Module Service)
import { UserService } from './service/user.service';

// Controllers (Module controller)
import { UserController } from './controller/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
  })
  export class UserModule {}
´´´

**API Module to organize all Api Modules**

- src/api/api.module.ts
´´´
import { Module } from '@nestjs/common';
// Imports
import { UserModule } from './user/user.module';

// Providers

// Controllers

@Module({
    imports: [
        UserModule,
        // All Modules
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class ApiModule {}
´´´

**App Module and Main**

- src/app.module.ts
´´´
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Middlewares

//API Module
import { ApiModule } from './api/api.module';

//You can use dotenv
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'db_name',
      //schema: 'ks',
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
´´´

- src/main.ts
´´´
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "*",
    "methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders":"Content-Type,Authorization,Accept",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  await app.listen(9000);
}
bootstrap();

´´´

---------------------------------------------------------------------------------------------------------------------------------------

# Example of mapping with Many to One and Many to Many entities
UserState -----=> User
Exercise ------=> exercise_user <=-------- User

**UserState Entity**
```
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({name: "user_state"})
export class UserState {
  @PrimaryColumn() 
  cod: string

  @Column()
  name: string

  @OneToMany(() => User, user => user.state)
  users: User[];

}
```

**Exercise Entity**
```
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({name: "exercise"})
export class Exercise {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string

  @Column()
  video_path: string
  
  @Column()
  image_path: string
  
  @Column()
  type: string
  
  @Column()
  description: string

  @ManyToMany(() => User, user => user.exercises)
  @JoinTable({
    // Many to many TABLE name
    name: 'user_exercise',
    // Column in many to many TABLE and Actual Primary Key key reference
    joinColumn: {name: 'exercise', referencedColumnName: 'uuid'},
    // Connection with other entity Column in many to many TABLE and Other Entity Primary Key key reference
    inverseJoinColumn: { name: 'user_uuid', referencedColumnName: 'uuid'}
  })
  users: User[]
}
``` 

**User Entity**
```
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserState } from '../../user_state/entity/user_state.entity';
import { Exercise } from '../../exercise/entity/exercise.entity';

@Entity({name: "users"})
export class User {
  @PrimaryColumn() 
  uuid: string

  @Column()
  full_name: string

  @Column()
  username: string
  
  @Column({ select: false })
  password: string

  @Column()
  email: string

  @Column()
  identification: string

  @Column()
  telephone: string

  @ManyToOne(() => UserState, userState => userState.users, {
    onDelete: "CASCADE",
    eager: true
  })
  @JoinColumn({ name: "state" })
  state: UserState

  @Column()
  image_path: string

  @Column()
  subscription: string

  @Column()
  subscription_date_creation: Date
  
  @Column()
  subscription_date_due: Date

  @ManyToMany(() => Exercise, exercise => exercise.users,{ 
    eager: true, 
    cascade: true 
  })
  @JoinTable({
    // Many to many TABLE name
    name: 'user_exercise',
    // Column in many to many TABLE and Primary Key key reference
    joinColumn: {name: 'user_uuid', referencedColumnName: 'uuid'},
    // Connection with other entity Column in many to many TABLE and Primary Key other entity reference
    inverseJoinColumn: { name: 'exercise', referencedColumnName: 'uuid'}
  })
  exercises: Exercise[]
}

``` 

---------------------------------------------------------------------------------------------------------------------------------------

# JWT implementation 
https://dev.to/raguilera82/autenticacion-con-jwt-en-nestjs-147a

Need install
```
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```


**Generate token**
1. Create AuthModule package
- src/api/auth
- src/api/auth/entity
- src/api/auth/entity/auth.dto.ts
- src/api/auth/service
- src/api/auth/service/auth.service.ts
- src/api/auth/service/jwt.payload.ts
- src/api/auth/auth.module.ts

JWTPayload
```
export interface JWTPayload {
    userId: string;
}
```

AuthService
```
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  generateAccessToken(id: string): string {
    const payload: JWTPayload = { userId: id };
    return this.jwtService.sign(payload);
  }
}
```

AuthModule
```
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

Now you can import AuthModule in other modules, for example UserModule, and use AuthService in Services with IoC



**Protect routes**

---------------------------------------------------------------------------------------------------------------------------------------
