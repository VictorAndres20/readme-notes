# Intalation commands
link -> https://github.com/facebook/create-react-app

# Quick over view
```
$ sudo npx create-react-app my-app **OR** $ sudo yarn create react-app my-app 
$ cd my-app
$ npm start **OR** $ yarn start
```

Then open http://localhost:3000/ to see your app on development server.



-------------------------------------------------------------------------------------------------------------------------------

# Multiple setState
```
this.setState(
	{times:[
   	{nom_time:'7:00'},
      {nom_time:'12:00'},
      {nom_time:'14:00'},
      {nom_time:'17:00'}
   ],loadedTimes:true},()=>
   {
   	this.setState({time:this.state.times[0].nom_time});
   }
);
```




-------------------------------------------------------------------------------------------------------------------------------

# React Router Dom
Yarn
```
$ sudo yarn add react-router-dom
```
npm
```
$ npm install --save react-router-dom
```

# USAGE React Router Dom

Router.js FILE
```
...

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ErrorPage from '../ErrorPage/ErrorPage.js';
.. ALL COMPONENTS

class Router extends React.Component
{
    render()
    {
        return(
            <BrowserRouter basename="/YOUR_APP_NAME" >
                <Switch>
                    {/** Ruta por default */}
                    <Route exact path='/user/' render={(props)=> <Inicio user={this.props.user}/>}/>
                    {/** Rutas especificas */}
                    <Route path='/user/inicio' render={(props)=> <Inicio user={this.props.user}/>}/>
                    <Route path='/user/cuidadores' render={(props)=> <Cares user={this.props.user}/>}/>
                    <Route path='/user/mascotas' render={(props)=> <Pets user={this.props.user}/>}/>
                    <Route path='/user/configuracion' render={(props)=> <Config user={this.props.user}/>}/>
						  <Route path='/user/care/:id' render={({match})=> <CareProfile match={match} user={this.props.user}/>}/>
							{/** Usar parametro pasado por URL this.props.match.params.id */}
                    {/** Ruta no especificada */}
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
```

Implement.js
```
...
href=/YOUR_APP_NAME/ruta
```



-------------------------------------------------------------------------------------------------------------------------------

# Example of componentUpdate() method usage
```
	...
	componentDidUpdate(prevProps, prevState)
   {
       if(prevProps.user!==this.props.user)
       {
           if(this.props.user[0].cod_user!==0)
           {
               this.loadShops();
           }            
       } 
   }
	...
```



-------------------------------------------------------------------------------------------------------------------------------

# React-images-upload
```
$ sudo yarn add react-images-upload
```


## USAGE OF React-images-upload
```
import React from 'react';
import ImageUploader from 'react-images-upload';

class Example extends React.Component
{ 

    constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
    }

    state = 
    { 
        image:[],
        base64:null
    }

    onDrop(picture)
    {
        this.setState({image:this.state.image.concat(picture)});
    }
    
    load=()=>
    {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.image[this.state.image.length - 1]);
        reader.onload = function () {
            this.setState({base64:reader.result});
        }.bind(this);
        reader.onerror = function (error) {
            console.log("Error:",error);
        }; 
    }

    render()
    {
        return(
            <div className="row">
                <div className="col-sm-12">                       
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        singleImage="true"
                    />
                    <button class="btn blue-gradient" onClick={this.load}>Load</button>
                    <img src={this.state.base64} alt="img" width="100px" />
                </div>
            </div>
        );
    }
}
```




-------------------------------------------------------------------------------------------------------------------------------

# react-notification-alert
https://github.com/creativetimofficial/react-notification-alert
https://www.npmjs.com/package/react-notification-alert
```
$ sudo yarn add reactstrap
$ sudo yarn add react-notification-alert
```


## USAGE react-notification-alert
```
import NotificationAlert from 'react-notification-alert';

var options = {};
options = {
    place: 'tl',
    message: (
        <div>
            <div>
                Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for every web developer.
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 7,
	 closeButton:false
}

class App extends Component {
    myFunc(){
        this.refs.notify.notificationAlert(options);
    }
  render() {
    return (
      <div>
          <NotificationAlert ref="notify" />
        <button onClick={() => this.myFunc()}>Hey</button>
      </div>
    );
  }
}

export default App;
```

PLACES
```
    tl - notification will be rendered in the top-left corner of the screen
    tc - notification will be rendered in the top-center corner of the screen
    tr - notification will be rendered in the top-right corner of the screen
    bl - notification will be rendered in the bottom-left corner of the screen
    bc - notification will be rendered in the bottom-center corner of the screen
    br - notification will be rendered in the bottom-right corner of the screen
```
TYPES
```
    primary
    secondary
    success
    danger
    warning
    info
    light
    dark
```



-------------------------------------------------------------------------------------------------------------------------------

# React Google Charts
https://react-google-charts.com/

1. 
```
$ sudo yarn add react-google-charts
```
2. import Chart from 'react-google-charts';
3. Use charts
https://react-google-charts.com/





-------------------------------------------------------------------------------------------------------------------------------


# Material Design Bootstrap
Yarn
```
$ sudo yarn add mdbreact
```

npm
```
$ sudo npm install mdbreact --save
```




-------------------------------------------------------------------------------------------------------------------------------

# DEPLOYMENTS

## Apache 2 - ubuntu 16.04

1. Config Apache for .htaccess

- 1. Mod rewrite ON
    ```
	$ sudo a2enmod rewrite
    ```
- 2. /etc/apache2/sites-enabled/000-default.conf
```
<VirtualHost *:80>
	# The ServerName directive sets therequest scheme, hostname and port that
	# the server uses to identify itself.This is used when creating
	# redirection URLs. In the context ofvirtual hosts, the ServerName
	# specifies what hostname must appear inthe request's Host: header to
	# match this virtual host. For thedefault virtual host (this file) this
	# value is not decisive as it is used asa last resort host regardless.
	# However, you must set it for anyfurther virtual host explicitly.
	#ServerName www.example.com
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	<Directory "/var/www/html">     |
		 AllowOverride All           | ---->THIS
  	</Directory>                    |
	# Available loglevels: trace8, ...,trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure theloglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.logcombined
	# For most configuration files fromconf-available/, which are
	# enabled or disabled at a global level,it is possible to
	# include a line for only one particularvirtual host. For example the
	# following line enables the CGIconfiguration for this host only
	# after it has been globally disabledwith "a2disconf".
	#Include conf-availableserve-cgi-bin.conf
</VirtualHost>
		# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```
- 3. headers ->
```
		$ sudo cd /etc/apache2/mods-enabled/
		$ sudo ln -s ../mods-available/headers.load headers.load
		$ sudo service apache2 restart
```
2. React app config -> https://facebook.github.io/create-react-app/docs/deployment
	
- 1. .htaccess on /public folder
```	
		Options -MultiViews
		RewriteEngine On
		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule ^ index.html [QSA,L]
```
- 2. /public/manifest.json
```
		"start_url": ".",
```
- 3. package.json -> This if you want to use yout project name for root URL like http://host.com/project/
```
		"homepage": "http://mywebsite.com/YOUR_APP_NAME",
```

## Deploy on Tomcat

0. Create structure
```
/project_folder
	/WEB-INF
	    /classes
	    /src
```
1. /main_folder/WEB-INF/web.xml
```
<web-app xmlns="http://java.sun.com/xml/ns/j2ee"
	      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	      xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee
	      http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
	      version="2.4">

  <display-name>create-react-app-servlet</display-name>

  <error-page>
    <error-code>404</error-code>
    <location>/index.html</location>
  </error-page>

</web-app>
```

2. Put on /project_folder all files and folders inside build folder when react app build 

# If you want to deploy on main URL rename or use project_folder to ROOT



-------------------------------------------------------------------------------------------------------------------------------

## React Redux app

0. Package structure

1. Install
``redux, react-redux``

2. 
-------------------------------------------------------------------------------------------------------------------------------