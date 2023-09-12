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


**FIND options TypeORM**
https://github.com/typeorm/typeorm/blob/master/docs/find-options.md

---------------------------------------------------------------------------------------------------------------------------------------

# Use createQueryBuilder TypeORM to complex queries
Finds many to one relations
```
    findByCodWithAnswersByOrganization(cod: string, organization: string): Promise<IMQuestion>{
        try{
            return this.repo.createQueryBuilder('im_question')
            .where('im_question.cod = :cod', {cod})
            .orderBy('hych')
            .innerJoinAndSelect('im_question.im_answers', 'answers')
            .innerJoinAndSelect('answers.innovation_management', 'many')
            .andWhere('many.organization = :organization', { organization })
            .getOne();
        } catch(err){
            throw new Error(err.message);
        }
    }

    findAllByOrganization(organization: string): Promise<IMQuestion[]>{
        try{
            return this.repo.createQueryBuilder('im_question')
            .orderBy('im_question.hych', 'ASC')
            .innerJoinAndSelect('im_question.im_answers', 'answers')
            .innerJoinAndSelect('answers.innovation_management', 'many')
            .andWhere('many.organization = :organization', { organization })
            .getMany();
        } catch(err){
            throw new Error(err.message);
        }
    }
```

Group By
```
    findContGroupedByDateExecuted(): Promise<RokoExecution[]>{
        try{
            return this.repo.createQueryBuilder('roko')
            .select("SPLIT_PART(CAST(DATE_TRUNC('month', roko.date_executed) AS TEXT), '-', 2) as month")
            .addSelect('COUNT(roko.uuid)', 'count')
            .where(`roko.date_executed > '${year}-01-01 00:00:01'`)
            .groupBy('month')
            //.groupBy('DATE_TRUNC('month', roko.date_executed)')
            .getRawMany();
        } catch(err){
            throw new Error(err.message);
        }
    }
```

Many
```
  async updateManyStates(dto: OrderDTO, state: string): Promise<void>{
    this.repo.createQueryBuilder()
    .update(EntityClass)
    .set({ state: build_state(state) })
    .where("uuid IN (:...uuids)", { uuids: dto.toAproveUUID })
    .execute();
  }
```
One
```
  async updateManyStates(dto: OrderDTO, state: string): Promise<void>{
    this.repo.createQueryBuilder()
    .update(EntityClass)
    .set({ state: build_state(state) })
    .where("uuid IN (:uuid)", { uuid: dto.uuid })
    .execute();
  }
```

---------------------------------------------------------------------------------------------------------------------------------------

# Repository class in NestJS
Repo Class
```
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneWithPosts(id: number): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.id = :id', { id })
      .getOne();
  }
}
```

Inject in Service
```
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneWithPosts(id: number) {
    return this.userRepository.findOneWithPosts(id);
  }
}
```


## Full structure API app

#### imports
´´´
npm install --save @nestjs/typeorm typeorm
npm install --save reflect-metadata
npm install --save dotenv
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
- .env

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
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserState } from '../../user_state/entity/user_state.entity';

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  uuid: string

  @Column()
  full_name: string

  @Column()
  username: string
  
  @Column({ select: false })
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
import 'dotenv/config';

// Middlewares

//API Module
import { ApiModule } from './api/api.module';

//You can use dotenv
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // change for db you need
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      //schema: process.env.DB_SCHEMA,
      synchronize: false,
      logging: true, // TODO in production put it false
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
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "*",
    "methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders":"Content-Type,Authorization,Accept",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();

´´´

- .env
```
SERVER_PORT=8001
JWT_SECRET=4425c016ba2b445cb29af8f1465b121c533572c687c21db90fcd7b04a5e8be13
JWT_LICENSE=4425g016ba2b445cb29af8p1465b121c533522c687c21db90fcd8b04a5e8be27

# ------------------------- DEVELOP ----------------------------------------
# ------------ Database variables ------------
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=calabaza
DB_NAME=my_db
DB_SCHEMA=ks

# ------------------------- PRODUCTION ----------------------------------------
# ------------ Database variables ------------
#DB_HOST=234.235.236.237
#DB_PORT=5433
#DB_USER=postgres
#DB_PASS=secret
#DB_NAME=my_db
#DB_SCHEMA=ks
```

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
  @PrimaryGeneratedColumn()
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
  @PrimaryGeneratedColumn() 
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

# When use @Column({ select: false }) and need to retrive that column in some where
```
  @Column({ select: false })
  password: string
```

Use select option in repo
```
  findByLogin(login: string): Promise<User> {
    return this.repo.findOne({ select: ['uuid', 'login', 'password', 'rol', 'company'] , where: { login: login } });
  }
```


# Many to Many with extra fields is another entity

```
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => UserGroup, userGroup => userGroup.user)
    userGroups: UserGroup[];
}
@Entity()
export class UserGroup {
    @Column()
    isActive: boolean;
    @ManyToOne(() => User, user => user.userGroups, { primary: true })
    user: User;
    @ManyToOne(() => Group, group => group.userGroups, {
    primary: true,
    onDelete: "CASCADE",
    eager: true
    })
    @JoinColumn({ name: "group_id" })
    group: Group;
}
@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    userGroups: UserGroup[];
}
``` 

---------------------------------------------------------------------------------------------------------------------------------------

# Maybe ManyToOne is referenced to a column UNIQUE that is not PK

You can set referenceColumnName in JoinColumn
```
@ManyToOne(type => Category)
@JoinColumn({ name: "cat_id", referencedColumnName: "cod_unique" })
category: Category;
```

---------------------------------------------------------------------------------------------------------------------------------------

# Pagination

```
async findAllPagedByCompany(company: string, page: number = 0, limit: number = 8): Promise<[PocketBalance[], number]> {
    return await this.repo.findAndCount({ where: { company }, skip: page * limit, take: limit});
}
```

---------------------------------------------------------------------------------------------------------------------------------------

# Timezones
May be when you find data from database, NestJS add one day.
This is because the time zone of your NestJS application is different from the time zone of your database
so.

####### Option 1
**Set it when start nest**
package.json
```
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "TZ=UTC nest build", // ===================================> THIS
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "TZ=UTC nest start", // ===================================> THIS
```

####### Option 2
**install third party library**
```
npm i set-tz @types/set-tz

```
main.ts
```
import setTZ from 'set-tz';
setTZ('America/New_York');

```

---------------------------------------------------------------------------------------------------------------------------------------

# Transactions with query runner

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entity/order.entity';
import { build_base_creation, build_details, build_edition, build_state } from '../entity/order.builders';
import { OrderDTO } from '../entity/order.dto';
import { OrderDetail } from 'src/api/order_detail/entity/order_detail.entity';
import { GenerateFileServiceService } from '../../generate_file/service/generate_file.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
    private connection: DataSource,
    private gfService: GenerateFileServiceService
  ) {}

  async createOrder(dto: OrderDTO): Promise<Order>{
    let order = build_base_creation(dto);
    let details = build_details(dto.items);
    return this.createOrderAndDetails(order, details);
  }

  async editOrder(dto: OrderDTO): Promise<Order>{
    let order = await this.findByUUID(dto.uuid);
    return this.editOne(dto, order);
  }

  async aproveOrder(dto: OrderDTO): Promise<OrderDTO>{
    // Generate file bytes 64
    let base64 = this.gfService.generateFileBase64(dto.toAproveJSON);
    await this.updateManyStates(dto, 'APPR');
    let res = new OrderDTO();
    res.toAproveJSON = base64;
    return res;
  }

  async buildPDFOrder(dto: OrderDTO): Promise<OrderDTO>{
    // Generate file bytes 64
    let base64 = await this.gfService.generateOrdersPDFBase64(dto);
    let res = new OrderDTO();
    res.toAproveJSON = base64;
    return res;
  }

  // Update many with query builder
  async updateManyStates(dto: OrderDTO, state: string): Promise<void>{
    this.repo.createQueryBuilder()
    .update(Order)
    .set({ state: build_state(state) })
    .where("uuid IN (:...uuids)", { uuids: dto.toAproveUUID })
    .execute();
  }

  // Find with One To Many deep condition in last where
  findAllByCompanyAndSeller(company: string, seller: string): Promise<Order[]> {
    return this.repo.createQueryBuilder('order')
    .where('company = :company', { company })
    .innerJoinAndSelect('order.ordersDetail', 'details') // Inner because Array in Order One to Many relation
    .leftJoinAndSelect('details.productPrice', 'product') // Left because Order Many To One relation
    .leftJoinAndSelect('product.client', 'client')
    .leftJoinAndSelect('client.seller', 'seller')
    .where("seller.uuid = :seller", { seller })
    .getMany();
  }

  findByUUID(uuid: string): Promise<Order> {
    return this.repo.findOne({ where: { uuid: uuid } });
  }

  findAllByCompanyAndState(company: string, state: string): Promise<Order[]> {
    return this.repo.find({ where: { company: company, state: state }, order: { id: 'ASC'} });
  }

  async findAll(): Promise<Order[]> {
    return await this.repo.find();
  }

  async createOrderAndDetails(order: Order, details: OrderDetail[]): Promise<Order> {
    let newOrder = order;
    const queryRunner = this.connection.createQueryRunner();
  
    // await queryRunner.connect(); // Not neccesary since Connection change to DataSource
    await queryRunner.startTransaction();
    try {
      let orderCreated = await queryRunner.manager.save(order);
      newOrder = orderCreated;
      for(let i = 0; i < details.length; i++){
        let element = details[i];        
        element.order = orderCreated;
        await queryRunner.manager.save(element);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      newOrder.uuid = null;
    } finally {
      await queryRunner.release();
      return newOrder;
    }
  }

  createOne(dto: OrderDTO): Promise<Order>{
    try{
      let order = build_base_creation(dto);
      let data = this.repo.save(order);
      return data;
    } catch(err){
      throw new Error(err.message);
    }
  }

  async editOne(dto: OrderDTO, order: Order): Promise<Order>{
    try{
      order = build_edition(dto, order);
      let data = this.repo.save(order);
      return data;
    } catch(err){
      throw new Error(err.message);
    }
  }
}
```

---------------------------------------------------------------------------------------------------------------------------------------

# JWT implementation 
https://dev.to/raguilera82/autenticacion-con-jwt-en-nestjs-147a

Need install
```
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
npm install bcrypt
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
- src/api/auth/service/jwt.strategy.ts

1. Create JWT Strategy jwt.strategy.ts
```
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/api/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const user = await this.userRepo.findOne({ where: { uuid: payload.userId }});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

2. Import UserRepo with TypeORM and Register JWT Strategy as a provider in auth.module.ts
```
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './service/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

3. 1 Use in UserService to login 
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDTO } from '../entity/user.dto';
import { AuthService } from '../../auth/service/auth.service'; //==============> THIS
import { AuthDTO } from '../../auth/entity/auth.dto'; //==============> THIS
import { isSameCrypted } from '../../../_utils/bcrypt.util'; //==============> THIS

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private authService: AuthService //==============> THIS
  ) {}

  async login(userDTO: UserDTO): Promise<AuthDTO>{ //==============> THIS
    let user = await this.findByLogin(userDTO.login);
    if(! user){
      throw new Error("Error credentials");
    }

    if(! isSameCrypted(userDTO.password, user.password)){
      throw new Error("Error credentials");
    }
    let auth = new AuthDTO();
    auth.uuid = user.uuid;
    auth.login = user.login;
    auth.rol = user.rol.cod;
    auth.company = user.company.uuid;
    auth.full_name = user.full_name;
    auth.token = this.authService.generateAccessToken(user.uuid);
    return auth;
  }
```

3. 2 Import AuthModule in UserModule
```
@Module({
    imports:[TypeOrmModule.forFeature([User]), AuthModule],
```

3. Protect end points in Controllers with @UseGuards(AuthGuard('jwt')) decorator on each methods, 
for example, to protect findById user
```
import { Controller, Get, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UserDTO } from '../entity/user.dto';
import { AuthDTO } from '../../auth/entity/auth.dto';
import { HttpResponse } from '../../../commons/responses/http_response';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Get('id/:id')
    @UseGuards(AuthGuard('jwt')) // End point protected
    async findById(
            @Param('id') uuid: string,
        ): Promise<HttpResponse<User>> {
        try{
            let list = await this.service.findByUUID(uuid);
            return new HttpResponse<User>().setData(list).build(true);
        } catch(err){
            throw new HttpException(new HttpResponse<User>().setError(err.message).build(false), 500);
        }
    }

    @Post('login')
    async login(@Body() userDTO: UserDTO): Promise<HttpResponse<AuthDTO>> {
        try{
            let data = await this.service.login(userDTO);
            return new HttpResponse<AuthDTO>().setData(data).build(true);
        } catch(err){
            throw new HttpException(new HttpResponse<AuthDTO>().setError(err.message).build(false), 500);
        }
    }
}
```

---------------------------------------------------------------------------------------------------------------------------------------

# Serve static files in public folder like images, files, etc

in main.ts
Create app for NestExpressApplication
and add app.useStaticAssets method
```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /** Cors Middleware */
  app.enableCors({
    "origin": "*",
    "methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders":"Content-Type,Authorization,accept",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });

  /** Serve public dir for static files like images, files, videos, etc */
  app.useStaticAssets(join(__dirname, '..', 'public/imgs'), { prefix: '/public-imgs/' });
  app.useStaticAssets(join(__dirname, '..', 'public/files'), { prefix: '/public-files/' });


  await app.listen(9001);
}
bootstrap();

```

Now you can see your images like
http://localhost:9001/public-imgs/img.png
http://localhost:9001/public-imgs/subfolder/img.png
http://localhost:9001/public-imgs/subfolder/subfolder/img.png


---------------------------------------------------------------------------------------------------------------------------------------

# Simple Queue system in Nest JS
https://www.learmoreseekmore.com/2021/04/guide-on-nestjs-queues.html

1. In server install redis docker container
```
docker run [--restart always] [--network app_net] [--ip 172.124.10.9] --name redis_nest_queue -p 5003:6379 -e REDIS_PASSWORD=passwd -d redis /bin/sh -c 'redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}'
docker exec -it redis_nest_queue redis-cli
KEYS *
AUTH passwd
KEYS *
```

2. In Nest JS App, install Bull Pachage
```
npm install --save @nestjs/bull bull
npm install --save-dev @types/bull
```

3. In app.module.ts Register BullModule and Setup Redis Connection src/app.module.ts
´´´
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
//import 'dotenv/config';
//process.env.KEY_NAME in .env file

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
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
´´´

4. Create A Producer To Push Jobs Into Queue, for example in src/api/orders module need to create a queue to prevent multi orders at same time
- src/api/orders/queue/order_message_producer.service.ts
```
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
 
@Injectable()
export class OrdersMessageProducerService {
  constructor(@InjectQueue('orders-queue') private queue: Queue) {}
 
  async sendMessage(message: string){
    await this.queue.add('message-job',{
        text: message
    });
  }

  async sendCreateOrder(order: Order, details: OrderDetail[]): Promise<Order>{
    let job = await this.queue.add('create-order-job',{
        order, details
    }, {
      removeOnComplete: true
    });
    let res = await job.finished();
    let orderCreated = new Order;
    Object.assign(orderCreated, res);
    return orderCreated;
  }
}
```

5. Create a consumer to execute Jobs in queue, for example in src/api/orders module need to execute job stored in queue to create orders one by one 
- src/api/orders/queue/order_message_consumer.service.ts
```
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { OrderDetail } from "src/api/order_detail/entity/order_detail.entity";
import { Order } from "../entity/order.entity";
import { OrderService } from "../service/order.service";
 
@Processor('orders-queue')
export class OrdersMessageConsumerService {

    constructor(private service: OrderService) {}
 
    @Process('message-job')
    readMessageJob(job: Job<unknown>){
        console.log(job.data);
    }

    @Process({
        name: 'create-order-job',
        concurrency: 0 // Put 0 to dequeue jobs one by one, awaiting each job to start until previous job have finished. To dequeue one by one with out await other job put 1.  
    })
    async readCreateOrderJob(job: Job<unknown>){
        let order = new Order;
        Object.assign(order, job.data['order']);
        let details = [];
        job.data['details'].map((d: any) => {
            let detail = new OrderDetail();
            Object.assign(detail, d);
            details.push(detail);
        });
        return await this.service.createOrderAndDetails(order, details);
    }
}
```

6. Register a queue and Register producers and consumers in orders.module.ts in providers and exports array
```
// ...
import { BullModule } from '@nestjs/bull';

@Module({
    imports:[TypeOrmModule.forFeature([Order]), GenerateFileModule, 
      BullModule.registerQueue({
        name:'orders-queue'
      })
    ],
    controllers:[OrderController],
    providers:[OrderService, OrdersMessageConsumerService, OrdersMessageProducerService],
    exports:[OrderService, OrdersMessageConsumerService, OrdersMessageProducerService]
})
export class OrderModule{}
```

7. Use it in Order service to call producer when create called by controller


---------------------------------------------------------------------------------------------------------------------------------------

# Deploy docker container
https://dev.to/erezhod/setting-up-a-nestjs-project-with-docker-for-back-end-development-30lg

1. Dockerfile in root project dir
```
FROM node:16.14.2-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.14.2-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
```

2. Tar project with some excludes
```
tar -cvf api-project.tar --exclude='api-project/db' --exclude='api-project/node_modules' --exclude='api-project/.git' --exclude='api-project/scripts' api-project/
```

3. Upload in server and create image

```
docker build api-project/ -t image_name:x.x
```

4. Create container
```
docker run --restart always [--network network-name] [--ip 172.124.0.5] --name nest_project -p 9001:9001 -d image_name:x.x
```

---------------------------------------------------------------------------------------------------------------------------------------

# Generate Excel
https://spin.atomicobject.com/2018/11/28/nodejs-excel-file-generation/


---------------------------------------------------------------------------------------------------------------------------------------