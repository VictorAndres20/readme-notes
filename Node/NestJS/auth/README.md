# Auth module Implementation
- Copy Paste Auth folder in Api folder
- Generate JWT
- Protect Routes
- Login in UserService

**UserService**
```
    constructor(
        @InjectRepository(User)
        protected repo: Repository<User>,
        private authService: AuthService,
    ) {super();}

    async login(userDTO: UserDTO): Promise<AuthDTO>{
        let user = await this.findByLogin(userDTO.login);
        if(! user){
          throw new Error("Error credentials");
        }
    
        if(! isSameCrypted(userDTO.password, user.password)){
          throw new Error("Error credentials");
        }

        if(user.active !== 1) throw new Error(`Usuario no está activo`);
        let auth = new AuthDTO();
        auth.uuid = user.uuid;
        auth.login = user.login;
        auth.full_name = user.full_name;
        auth.root = user.root;
        auth.active = user.active
        auth.token = this.authService.generateAccessToken(user.uuid);
        return auth;
    }
```

UserController
```
    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: UserDTO): Promise<HttpResponse<AuthDTO>> {
        try{
            let data = await this.service.login(dto);
            return new HttpResponse<AuthDTO>().setData(data).build(true);
        } catch(err){
            return new HttpResponse<AuthDTO>().setError(err.message).build(false);
        }
    }
```

Protect Routes
```
    @Get('id/:id')
    @UseGuards(AuthGuard('jwt')) //===============> THIS
    async findById(
            @Param('id') uuid: string,
        ): Promise<HttpResponse<Client>> {
        try{
            let list = await this.service.findByUUID(uuid);
            return new HttpResponse<Client>().setData(list).build(true);
        } catch(err){
            throw new HttpException(new HttpResponse<Client>().setError(err.message).build(false), 500);
        }
    }

```