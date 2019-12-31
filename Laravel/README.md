# Official DOCUMENTATION IS SO GOOD
# GET STARTED

# Install COMPOSER on ubuntu 16.04
https://clouding.io/kb/instalacion-de-composer-y-laravel-en-ubuntu-16-04/

$ sudo su 
apt-get update && apt-get upgrade 
apt-get install php-mcrypt php-gd php-mbstring hhvm phpunit
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# Create Laravel project
https://laravel.com/docs

Be sure your server has:


    PHP >= 7.1.3
    OpenSSL PHP Extension
    PDO PHP Extension
    Mbstring PHP Extension
    Tokenizer PHP Extension
    XML PHP Extension
    Ctype PHP Extension
    JSON PHP Extension
    BCMath PHP Extension

INSTALL LARAVEL

$ composer create-project --prefer-dist laravel/laravel project-name

# Development server
$ cd project-name
$ php artisan serve

# .env config
Be sure to create 32 bit String key for app
Configure Database Conn

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

2. config/Database.php

‘default’ => env(‘DB_CONNECTION’, ‘pgsql’),

3. Be sure your server machine php.ini has uncomment. Path on Linux /etc/php/7.x/php.ini
extension=pdo_pgsql.so
extension=pgsql.so

###############################################################################

# Integrate Boostrap localy or any other library

1. Add libraris files on public/ folder

2. On header use href="{{asset('path/to/file/bootstrap.min.css')}}"

###############################################################################

# Config database

1. config/database.php
2. .env 

IF THERE IS AN ERROR ON -> SQLSTATE[HY000] [1045] Access denied for user 'homestead'@'localhost'
https://stackoverflow.com/questions/29756194/access-denied-for-user-homesteadlocalhost-using-password-yes

3. php artisan migrate --env=local

###############################################################################

# Images, Files etc...

# Use Storage directory
On storage/app/public is whre you store your public images, files, etc...
To use them, link this public dir

1. php artisan storage:link -> This create public/storage linked simbolic folder
2. Usage href="{{asset('/storage/images/picture.png')}}" href="{{asset('/storage/files/file.pdf')}}"

# Error link path
If you move your project to other foler, unlink and re link it.

1. sudo unlink public/storage
2. php artisan storage:link

###############################################################################

# Create models

1. php artisan make:model Folder/Model
2. use them

	use App\Folder\User;

###############################################################################
# ****************API*******************

# CORS HANDLER and request Headers handler on API

1. $ php artisan make:middleware Cors
2. Add the following code to app/Http/Middleware/Cors.php:

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

3. Add at app/Http/Kernel.php these:

	1. $middleware
	   ...
	   \App\Http\Middleware\Cors::class,

	2. $middlewareGroups
	   'api' => [
        ...
        \App\Http\Middleware\Cors::class,
      ],

	3. $routeMiddleware
	   ...
	   'cors' => \App\Http\Middleware\Cors::class, 

4. routes/api.php

	Route::group(['middleware' => 'cors'], function(){
		 Route::get('/getallstates','Api\StateController@getAll');
		 Route::get('/getallusers','Api\UserController@getAll');
		 Route::get('/getbyiduser/{id}/','Api\UserController@getById');
		 Route::get('/getbyloginmail/{login}/{mail}/','Api\UserController@getByLoginMail');
		 Route::post('/insertuser','Api\UserController@insert');
	});

###############################################################################

# Working with session

1. If you are ON API first do this
   ADD on APP/Http/Kernel.php
	
	$middlewareGroups=[
	   ...
      'api' => [
	      ...
   		\Illuminate\Session\Middleware\StartSession::class,

2. USAGE On controller

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

# DEPLOYMENTS

# Configure Apache to run Laravel project with path www.domain.com/project-name
1. 
```
$ sudo chgrp -R www-data /var/www/htmlproject-name
$ sudo chmod -R 777 /var/www/htmlproject-name/
$ sudo chmod -R 777 /var/www/htmlproject-name/storage
$ sudo chmod -R 777 /var/www/htmlproject-name/public/storage -> for images
```

2. cd /etc/apache2/sites-available
```
$ sudo nano 000-default.conf
```
	ADD ALL THIS
```
		Alias /project-name /var/www/html/project-name/public/
		<Directory "/var/www/html/project-name/public">
        AllowOverride All
		</Directory>
```
```
$ sudo service apache2 restart
```
3. Very important! Add 'RewriteBase /project-name' on public/.htaccess
   Should look like this
```
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
```

# Configure Apache to ONLY works with Laravel project
https://www.howtoforge.com/tutorial/install-laravel-on-ubuntu-for-apache/

1.
``` 
$ sudo chgrp -R www-data /var/www/html/your-project
$ sudo chmod -R 775 /var/www/html/your-project/storage
```

2. cd /etc/apache2/sites-available
```
$ sudo nano laravel.conf 
```
```		
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
```

3.
``` 
$ sudo a2dissite 000-default.conf -> Disable default file for Apache
$ sudo a2ensite laravel.conf -> Enable Laravel file for Apache
$ sudo a2enmod rewrite
$ sudo service apache2 restart
```

###############################################################################