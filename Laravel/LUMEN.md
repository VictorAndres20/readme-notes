# GET STARTED

# Install COMPOSER on ubuntu 16.04
https://clouding.io/kb/instalacion-de-composer-y-laravel-en-ubuntu-16-04/

$ sudo su 
apt-get update && apt-get upgrade 
apt-get install php-mcrypt php-gd php-mbstring hhvm phpunit
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# Create Lumen project
$ composer create-project --prefer-dist laravel/lumen projectname

# Development server
$ php -S 127.0.0.1:8000 -t public

# .env config
Be sure to create 32 bit String key for app
Configure Database Conn

# BE SOURE TO UNCOMMENT ON bootstrap/app.php
$app->withFacades();
$app->withEloquent();

# route to generate random 32 bit key for APP_KEY

$router->get('/key', function () use ($router) {
    return str_random(32);
});

# .env config
--------------
MYSQL default
--------------
APP_ENV=local
APP_DEBUG=true
APP_KEY=qELFkbP9NGx7fIePYvGtbqdKPwpbqtN5
APP_TIMEZONE=UTC

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dbname
DB_USERNAME=root
DB_PASSWORD=password

CACHE_DRIVER=file
QUEUE_DRIVER=sync

-------------
PostgreSQL
-------------
1. .env file
APP_ENV=local
APP_DEBUG=true
APP_KEY=qELFkbP9NGx7fIePYvGtbqdKPwpbqtN5
APP_TIMEZONE=UTC

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=dbname
DB_USERNAME=postgres
DB_PASSWORD=password

CACHE_DRIVER=file
QUEUE_DRIVER=sync

2. Install php-pgsql if you dont have it. Drivers on /usr/lib/php/[someFolderLikeDate]
$ sudo apt-get install php-pgsql

3. Be sure your server machine php.ini has uncomment. Path on Linux /etc/php/7.x/cli/php.ini.
extension=/usr/lib/php/[folder]/pdo_pgsql.so
extension=/usr/lib/php/[folder]/pgsql.so

###############################################################################

# ruta con prefijo api/
on routes/web.php

$router->group(['prefix' => 'api'], function () use ($router) {

	//all api routes

});

###############################################################################

# Images
You can create an storage file on public and work with that

###############################################################################

# Middleware
Documentation https://lumen.laravel.com/docs/5.7/middleware
https://www.codementor.io/chiemelachinedum/steps-to-enable-cors-on-a-lumen-api-backend-e5a0s1ecx

1. handle method for Cross origin
	public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With'
        ];

        if ($request->isMethod('OPTIONS'))
        {
            return response()->json('{"method":"OPTIONS"}', 200, $headers);
        }

        $response = $next($request);
        foreach($headers as $key => $value)
        {
            $response->header($key, $value);
        }

        return $response;
    }

2. On bootstrap/App.php

$app->middleware([
    App\Http\Middleware\CorsMiddleware::class
 ]);

###############################################################################

# use Session like Laravel

1. $ composer require illuminate/session

2. Now goto bootstrap/app.php and add this middleware

	$app->middleware([
    	\Illuminate\Session\Middleware\StartSession::class,
	]);

3. bootstrap/app.php

	$app->bind(\Illuminate\Session\SessionManager::class, function () use ($app) {
    	return new \Illuminate\Session\SessionManager($app);
	});

4. Now add config/session.php from a Laravel project

5. Add on storage/framework/sessions like a Laravel project

6. bootstrap/app.php

	$app->configure('session');
	$app->register(\Illuminate\Session\SessionServiceProvider::class);

7.	USAGE On controller

	public function getSession(Request $request)
	{
		$request->session()->get('user');

	}

	public function setSession(Request $request)
	{
		$request->session()->forget('user'); //TO FORGET SESSION IF YOU WANT
		$request->session()->put('user', $user);		
	}

###############################################################################

# Using ORM Relations OneToMany and ManyToOne

1. Models
php artisan make:model Usuario
php artisan make:model Estado

-------
Estado
-------
<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'estado';

    /**
     * Primary Key
     */
    protected $primaryKey = 'cod_estado';

    /**
     * Not timestamped
     */
    public $timestamps = false;

    /**
     * The model's fillable values.
     *
     * @var array
     */
    protected $fillable = [
        'cod_estado',
        'nombre_estado'
    ];

    /**
     * OneToMany Relationship
     * Un Estado puede pertenecer a muchos Usuarios
     * ('Modelo al que se relaciona','Foreign key del modelo con que se relaciona','Primary key del modelo actual que se relaciona')
     */
    public function usuarios()
    {
        return $this->belongsToMany('App\Usuario','cod_estado', 'cod_estado');
    }
}

-------
Usuario
-------
<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuario';

    /**
     * Primary Key
     */
    protected $primaryKey = 'cod_usuario';

    /**
     * Not timestamped
     */
    public $timestamps = false;

    /**
     * The model's fillable values.
     *
     * @var array
     */
    protected $fillable = [
        'cod_usuario',
        'nombre_usuario',
        'apellido_usuario',
        'correo_usuario',
        'cod_estado'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'clave_usuario'
    ];

    /**
     * ManyToOne Relationship
     * Un Usuario puede tener a un Estado
	 * ('Modelo al que se relaciona','Primary Key del modelo con que se relaciona','Foreign Key del modelo actual que se relaciona')
     */
    public function estado()
    {
        return $this->HasOne('App\Estado','cod_estado', 'cod_estado');
    }

}

2. Controller to manage data Usuario
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Usuario;


class UsuarioController extends Controller
{
    public function __construct()
    {
    }

    /**
     * Method PUT
     */
    public function create(Request $request)
    {
        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $usuario=new Usuario;
            $usuario->nombre_usuario=$request->nombre_usuario;
            $usuario->apellido_usuario=$request->apellido_usuario;
            $usuario->correo_usuario=$request->correo_usuario;
            $usuario->clave_usuario=md5($request->nombre_usuario);
            $usuario->cod_estado=1;
            $usuario->save();
            $res['message']='Usuario creado con éxito';
            $res['success']=true;
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method POST
     */
    public function update(Request $request)
    {
        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $usuario=Usuario::find($request->cod_usuario);
            $usuario->nombre_usuario=$request->nombre_usuario;
            $usuario->apellido_usuario=$request->apellido_usuario;
            $usuario->correo_usuario=$request->correo_usuario;
            $usuario->cod_estado=$request->cod_estado;
            $usuario->save();
            $res['message']='Usuario actualizado con éxito';
            $res['success']=true;
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method GET
     */
    public function list()
    {
        $res=['message'=>Usuario::with('estado')->get(),'success'=>true];
        return response()->json($res,200);
    }
}

###############################################################################

# Quering

# Nested query Usuario-->Rol<--rol_permiso-->Permiso
# 									 -->Departamento
$usuario=Usuario::with('estado')->with('rol.permisos')->with('rol.departamento')->find($cod_usuario);

# Nested condition Where
# If you have Reservation -> Event -> Chef
# You want to get All reservation From Chef ID,

Reservation::whereHas('event', function($query) use ($id_chef){
                                    $query->where('event.id_chef', $id_chef);
                                })->with('event')->get();

###############################################################################

# ManyToMany Relationship Example
# permission <-- rol_permission --> rol

1. Models
--------
Permission
--------
<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'permission';

    /**
     * Primary Key
     */
    protected $primaryKey = 'cod_permission';

    /**
     * Not timestamped
     */
    public $timestamps = false;

    /**
     * The model's fillable values.
     *
     * @var array
     */
    protected $fillable = [
        'cod_permission',
        'name_permission',
        'route_permission',
        'child_permission',
        'icon_permission'
    ];

    /**
     * ManyToMany Relationship
     * ('Modelo al que se relaciona','tabla muchos a muchos','Foreign de la tabla muchos a muchos del modelo actual','Foreign Key de la tabla muchos a muchos del modelo con que se relaciona')
     */
    
    public function roles()
    {
        return $this->belongsToMany('App\Rol', 'permission_rol', 'cod_permission', 'cod_rol');
    }
}

------
Rol
------
<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'rol';

    /**
     * Primary Key
     */
    protected $primaryKey = 'cod_rol';

    /**
     * Not timestamped
     */
    public $timestamps = false;

    /**
     * The model's fillable values.
     *
     * @var array
     */
    protected $fillable = [
        'cod_rol',
        'nombre_rol',
        'descripcion_rol',
        'cod_departamento',
        'valor_salario'
    ];

    /**
     * ManyToOne Relationship
     * Un Rol puede estar asociado a un Departamento
     * ('Modelo al que se relaciona','Columna del modelo con que se relaciona','Columna del modelo actual que se relaciona')
     */
    public function departamento()
    {
        return $this->HasOne('App\Departamento','cod_departamento', 'cod_departamento');
    }

    /**
     * OneToMany Relationship
     * ('Modelo al que se relaciona','Tabla muchos a muchos','Columna de tabla muchos a muchos','Columna del modelo actual que se relaciona')
     */
    public function usuarios()
    {
        return $this->belongsToMany('App\Usuario','cod_rol','cod_rol');
    }

    /**
     * ManyToMany Relationship
     * ('Modelo al que se relaciona','tabla muchos a muchos','Foreign de la tabla muchos a muchos del modelo actual','Foreign Key de la tabla muchos a muchos del modelo con que se relaciona')
     */
    public function permisos()
    {
        return $this->belongsToMany('App\Permission', 'permission_rol', 'cod_rol', 'cod_permission');
    }

}

2. Controllers
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Permission;
use App\Rol;


class PermissionController extends Controller
{
    public function __construct()
    {
    }

    /**
     * Method PUT
     */
    public function create(Request $request)
    {
        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $permission=new Permission;
            $permission->name_permission=$request->name_permission;
            $permission->route_permission=$request->route_permission;
            $permission->child_permission=$request->child_permission;
            $permission->icon_permission=$request->icon_permission;
            $permission->save();
            $res['message']='Permiso creado con éxito';
            $res['success']=true;
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method PUT
	  * Add new Data on ManyToMany Table
     */
    public function addRol(Request $request)
    {
        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $rol=Rol::find($request->cod_rol);
            Permission::find($request->cod_permission)->roles()->save($rol);
            $res['message']='Rol agregado con éxito';
            $res['success']=true;
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method POST
     */
    public function update(Request $request)
    {
        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $permission=Permission::find($request->cod_permission);
            $permission->name_permission=$request->name_permission;
            $permission->route_permission=$request->route_permission;
            $permission->child_permission=$request->child_permission;
            $permission->icon_permission=$request->icon_permission;
            $permission->save();
            $res['message']='Permiso actualizado con éxito';
            $res['success']=true;
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method GET
     */
    public function list()
    {
        $res=['message'=>Permission::with('roles')->get(),'success'=>true];
        return response()->json($res,200);
    }

    /**
     * Method GET
     */
    public function delete($cod)
    {

        $res=['message'=>'Error fatal','success'=>false];
        try
        {
            $permission = Permission::find($cod);
				$permission->delete();
            return response()->json($res,201);
        }
        catch(Exception $e)
        {
            $res['message']='FATAL ERROR: '.$e;
            return response()->json($res,500);
        }
    }

    /**
     * Method GET
     */
    public function listById($cod_permission)
    {
        $res=['message'=>Permission::with('roles')->find($cod_permission),'success'=>true];
        return response()->json($res,200);
    }
}

###############################################################################

# Composite primary keys, MayBe Works

1. composer require mpociot/laravel-composite-key

2. 
class MyModel extends Model
{
    use HasCompositeKey;

    protected $primaryKey = ['foo', 'bar'];

}

###############################################################################

# Get object saved
$t=$tipo->create($tipo->toArray());
if($t)
{
	return $t;
}

###############################################################################

###############
# JWT

# Firebase JWT authentication for Lumen 5.6
https://medium.com/tech-tajawal/jwt-authentication-for-lumen-5-6-2376fd38d454

# With no ORM firebase/php-jwt
1. add to .env file
	
	JWT_SECRET=26THT6kp7OA1XqPgvaAt6M8X2Wkli6 // str_random(30)

2. uncomment on bootstrap/app.php

	$app->withFacades();
	$app->withEloquent();

3. install dependencie

	$ composer require firebase/php-jwt

4. Create AuthController

<?php

namespace App\Http\Controllers;

use Validator;
use App\Dbmodel\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Firebase\JWT\ExpiredException;

class AuthController extends Controller
{
    /**
	* The request instance.
	*
	* @var \Illuminate\Http\Request
	*/
	private $request;

	/**
	* Create a new controller instance.
	* 
	* @param  \Illuminate\Http\Request  $request
	*
	* @return void
	*/
	public function __construct(Request $request){
		$this->request = $request;
    }
    
    /**
	* Create a new token.
	* 
	* @param  Array $user Data user to store on Token
	* @return string
	*/
	protected function jwt($user)
	{
		$payload =
		[
		    'iss' => "lumen-jwt", // Issuer of the token
		    'sub' => $user, // Subject of the token
		    'iat' => time(), // Time when JWT was issued. 
		    'exp' => time() + 60*60 // Expiration time
		];
		     
		/**
		* Return TOKEN.
		* Here we encode using JWT_SECRET, configurated on .env file.
		* This secret we use it to decode the Token too.
		*/
		return JWT::encode($payload, env('JWT_SECRET'));
    } 
    
    /**
	* Authenticate a user and return the token if the provided credentials are correct.
	* 
	* @param  \App\User $user Model to use his atributes and methods 
	* @return mixed
	*/
	public function authenticate(User $user)
	{
		$this->validate($this->request,
		[
		    //'email'     => 'required|email', // This one if you are auth with email only
		    'login'     => 'required', //Use this if you are auth with a UserName
		    'pass'  => 'required'
		]);
		/** Find the user on DB */
		//$user = User::where('email', $this->request->input('email'))->first(); //This when use ORM
		$user = User::getByLoginMail($this->request->input('login'),$this->request->input('login'));
		/** Convert user resultset into an array */
		$user=json_decode(json_encode($user),true);
		if(!$user)
		{
		    // You wil probably have some sort of helpers or whatever
		    // to make sure that you have the same response format for
		    // differents kind of responses. But let's return the 
		    // below respose for now.
		    return response()->json([
		        'id'=>-1,
		        'error' => 'Usuario no existe'
		    ], 400);
		}
		/** Verify the password using your prefer cypher method and generate the token.
		* In this example we use md5(md5) 
		* 
		*/
		else if(hash('sha256' ,md5($this->request->input('pass')))==$user[0]['pass_user'])
		{
		    return response()->json([
		        'id'=>1,
		        'token' => $this->jwt($user)
		    ], 200);
		}
		else
		{
		    /** Bad CREDENTIALS */
		    return response()->json([
		        'id'=>-1,
		        'name' => 'Usuario o Contraseña incorrectos'
		    ], 400);
		}

		/**
		* NOTE THAT ABOVE IF ELSE STATEMENTS YOU CAN MODIFY
		* TO RESPONSE SOME MORE INFO TO CLIENT
		*/
		     
	}
}


5. Route for login

	/** Authenticate route */
	$router->post('/login','AuthController@authenticate');

6. Prove with PostMan if you want

	Headres on Post
	Accept:application/json
	Content-Type:application/json

	Body on Raw
	{
		"login":"Vitolo",
		"pass":"123456"
	}

7. Create the Middleware to protect our routes

<?php
namespace App\Http\Middleware;
use Closure;
use Exception;
use App\User; // Model we are using VERY IMPORTANT TO CONFIGURE THIS IF YOU NEED
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class JwtMiddleware
{
	public function handle($request, Closure $next, $guard = null)
	{
	    /** Get Token with GET input */
	    $token = $request->get('token');
	     
	    if(!$token) {
	        /** Unauthorized, no token */
	        return response()->json([
	            'id'=>-1,
	            'error' => 'No hay Token.'
	        ], 401);
	    }
	    try {
	        /** Decode Token */
	        $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
	    } catch(ExpiredException $e) {
	        return response()->json([
	            'id'=>-1,
	            'error' => 'Token a expirado.'
	        ], 400);
	    } catch(Exception $e) {
	        return response()->json([
	            'id'=>-1,
	            'error' => 'Error docodificando Token.'
	        ], 400);
	    }
	    //$user = User::find($credentials->sub); //If you are using ORM and only store the ID on TOKEN
	    $user=$credentials->sub; //If you store whole user data on Token 
	    /** Put user data in the request so that you can grab it from there */
	    $request->auth = $user;
	    return $next($request);
	}
}

8. Add routeMiddleware on bootstrap/app.php

	$app->routeMiddleware([
    	'jwt' => App\Http\Middleware\JwtMiddleware::class,
	]);

9. Middleware group on routes to protecte them

	$router->group(['middleware' => 'jwt'],function() use ($router){
			$router->get('/users','Controller@method');
			// OTHER ROUTES
    });

10. Example using token

	http://127.0.0.1:8000/users?token=hgsgt45tdgetGTG47gj&Yh4j/ji48JY...

# Tymon JWT-AUTH
https://iwader.co.uk/post/tymon-jwt-auth-with-lumen-5-2

# With ORM tymon/jwt-auth

1. Install dependecy that aloows php artisan jwt:secret

	$ composer require tymon/jwt-auth:"^1.0.0-rc.2"

2. bootstrap/app.php add this on providers

	$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);

	and uncommnet

	$app->withFacades();
	$app->withEloquent();

	$app->routeMiddleware([
     'auth' => App\Http\Middleware\Authenticate::class,
	]);

3. Generate Token Key

	$ php artisan jwt:secret //Laravel
   
	On .env Add
   JWT_SECRET=z4FUizXj5dZ904DDUQx0mziLhDJkZGTh

4. Configure config/auth.php Lravel 
	vendor/laravel/lumen-frameworkconfig/auth.php LUMEN

	...
	'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'users'
        ],
    ],
	...
	'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model'  => \App\User::class,
        ],
    ],

5. on app/Providers/AuthServiceProviders replace $this->app['auth']->viaRequest for:

	$this->app['auth']->viaRequest('api', function ($request)
        {
            /** Search user on DB with Eloquent by any column that you are loging */
            return \App\User::where('email', $request->input('email'))->first();
        });

6. Configure User model

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The PRIMARY KEY associated with the table.
     *
     * @var string
     */
    protected $primaryKey="cod_user";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cod_user', 'login_user', 'mail_user'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'pass_user',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}


7. Create AuthController

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function login(Request $request)
    {
        /** Validate inpits */
        $this->validate($request, [
            //'email'    => 'required|email|max:255', use this if you are loggin by email
            'login' => 'required',
            'pass' => 'required',
        ]);

        try {
            /** Encrypt pass with your method */
            $pass=hash('sha256',md5($request->input('pass')));
            $data=
            [
                /** Column on DB login_user */
                "login_user"=>$request->input('login'),
                /** Column on DB pass_user */
                "pass_user"=>$pass
            ];
            //return $data;
            if (! $token = $this->jwt->attempt($data))
            {
                return response()->json(['id'=>-1,'error'=>'Credenciales incorrectas'], 404);
            }

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['id'=>-1,'error'=>'token_expired'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['id'=>-1,'error'=>'token_invalid'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['id'=>-1,'error'=>'Error fatal','token_absent' => $e->getMessage()], 500);

        }
		  $usuario=$this->jwt->user();
        return response()->json(['success'=>true,'message'=>$usuario,'token'=>$token],200);
    }

	 //*******Make Sure to use this on What you put on $request->auth, Normally toyu put Whole Token
	 public function logout(Request $request)
    {
        return response()->json(["id"=>1,"name"=>$request->auth->invalidate()],201);
        //return response()->json(["id"=>1,"data"=>""],201);
    }

    public function cleanBlacklist(Request $request)
    {
        return response()->json(["id"=>1,"data"=>$request->auth->blacklist()->clear()],200);
    }

    public function getClaims(Request $request)
    {
        return response()->json(["id"=>1,"data"=>$request->auth->payload()],200);
        //return response()->json(["id"=>1,"data"=>$request->auth->payload()->getClaims()->getByClaimName('exp')],200);
    }
}

8. Create login route

	$router->post('/auth/login', 'AuthController@login');

9. Changes on vendor/illuminate/auth/EloquentUserProvider.php pn line 133 for password encrypt and maybe column DB name

	 ...
	  public function validateCredentials(UserContract $user, array $credentials)
     {
			/** Note that 'pass_user' is the name of column on DB */
         $plain = $credentials['pass_user'];
		   /** because you encrypt pass on AuthController */
         return $plain;
         //return $this->hasher->check($plain, $user->getAuthPassword());
     }
	 ...

	/*IF YOU NEED TO RETRIVE MODEL WITH RELATIONS, YOU CAN MODIFY THIS*/
	public function retrieveByCredentials(array $credentials)
    {
	...
	...
		return $query->with('estado')->first();
	}

10. Prove it (Postman) VERY USEFULL!!!!!!!

11. Use Laravel default Middleware to protect

	configure Authenticate.php Middleware:
	
	 public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            return response(["id"=>-1,"data"=>'Unauthorized'], 401);
        }
		/** PUT Whole TOKEN on request to use it on CONTROLLERS
         * If you need User data, $this->auth->user() 
         */
		$request->auth=$this->auth;

        return $next($request);
    }

	Create route:

$router->group(['middleware' => 'auth:api'], function($router)
{
    $router->get('/test', function() {
        return response()->json([
            'message' => 'Hello World!',
        ]);
    });
});

12. Test http://127.0.0.1:8000/test send header:
	
	"Authorization: Bearer <token>"	

** ADVICE JWT time to live **
If you want to change Expired Time, by default 60mins, go to vendor/tymon/jwt-auth/config

###############################################################################

# Some usage of Tymon JWT
https://github.com/tymondesigns/jwt-auth/wiki/Creating-Tokens

###############################################################################

# Testing with phpunit
https://medium.com/@stephenjudeso/testing-lumen-api-with-phpunit-tests-555835724b96

1. Create classes like test folder

<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;
//Other Classes

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertEquals("1", "1");
    }
}

2. Run test

$ vendor/bin/phpunit 								-> test all our endponits
$ vendor/bin/phpunit --verbose tests/folder/ClassTest 				-> Run tests from specific class
$ vendor/bin/phpunit --verbose tests/folder/ClassTest --filter=testMethod	-> Run tests from specific class and specific method

**NOTES**
Class finish with ...Test
Methods start with test...

ASSERTS 
https://phpunit.de/manual/6.5/en/appendixes.assertions.html

$this->assertCount(0, ['foo']);
$this->assertEmpty(['foo']);
$this->assertNotEmpty(['foo'])
$this->assertEquals('bar', 'baz');
$this->assertFalse(true);
$this->assertLessThan(1, 2);
$this->assertLessThanOrEqual(1, 2);
$this->assertNull('foo');
$this->assertNotNull('foo');

###############################################################################

# Print on console

error_log($e->getMessage());

###############################################################################

# DEPLOYMENTS

# Configure Apache to run Laravel project with path www.domain.com/project-name
1. 
	sudo chgrp -R www-data /var/www/html/project-name
	sudo chmod -R 777 /var/www/html/project-name/
	sudo chmod -R 777 /var/www/html/project-name/storage
	sudo chmod -R 777 /var/www/html/project-name/public/storage -> for images

2. cd /etc/apache2/sites-available
	sudo nano 000-default.conf

	ADD ALL THIS

		Alias /project-name /var/www/html/project-name/public/
		<Directory "/var/www/html/project-name/public">
        AllowOverride All
		</Directory>

	sudo service apache2 restart

3. Very important! Add 'RewriteBase /project-name' on public/.htaccess
   Should look like this
	
	<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

		RewriteEngine On
		RewriteBase /project-name

		# Handle Authorization Header
		RewriteCond %{HTTP:Authorization} .
		RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

		# Redirect Trailing Slashes If Not A Folder...
		RewriteCond %{REQUEST_FILENAME} !-d
		RewriteCond %{REQUEST_URI} (.+)/$
		RewriteRule ^ %1 [L,R=301]

		# Handle Front Controller...
		RewriteCond %{REQUEST_FILENAME} !-d
		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule ^ index.php [L]
	</IfModule>


# Configure Apache to ONLY works with Laravel project
https://www.howtoforge.com/tutorial/install-laravel-on-ubuntu-for-apache/

1. sudo chgrp -R www-data /var/www/html/your-project
	sudo chmod -R 775 /var/www/html/your-project/storage

2. cd /etc/apache2/sites-available
	sudo nano laravel.conf 
		
		<VirtualHost *:80>
    		ServerName yourdomain.tld

    		ServerAdmin webmaster@localhost
    		DocumentRoot /var/www/html/your-project/public

    		<Directory /var/www/html/your-project>
        		AllowOverride All
    		</Directory>

    		ErrorLog ${APACHE_LOG_DIR}/error.log
    		CustomLog ${APACHE_LOG_DIR}/access.log combined
		</VirtualHost>

3. sudo a2dissite 000-default.conf -> Disable default file for Apache
	sudo a2ensite laravel.conf -> Enable Laravel file for Apache
	sudo a2enmod rewrite
	sudo service apache2 restart

# Configure Apache Subdomain to works with Laravel project like api.domain.com
https://askubuntu.com/questions/463618/setting-up-subdomain-on-ubuntu-server
https://www.digitalocean.com/community/tutorials/como-configurar-virtual-hosts-de-apache-en-ubuntu-16-04-es

1. Create Virtual host like project-name.conf in /etc/apache2/sites-available

	<VirtualHost *:80>
    ServerName project-name.domain.com
    DocumentRoot /var/www/html/project-name/public
    	<Directory "/var/www/html/me/public">
        	AllowOverride All
    	</Directory>
	</VirtualHost>

2. Add this on /etc/hosts file

	$ nano /ect/hosts

	<PUBLIC IP> subdomain.domain.com
	34.54.235.64 subdomain.domain.com

3. Enable Virtual host created

	$ sudo a2ensite project-name.conf

4. Restart apache

	$ sudo service apache2 restart

###############################################################################