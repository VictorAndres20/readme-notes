# Intalation commands
link -> https://github.com/facebook/create-react-app

# Quick over view
```
$ sudo npx create-react-app my-app **OR** $ sudo yarn create react-app my-app
$ sudo chown -R user:group my-app
$ cd my-app
$ npm start **OR** $ yarn start
```

Then open http://localhost:3000/ to see your app on development server.

# Errors

## System limit for number of file watchers reached, 
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```



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

# Nested Routes with template (using Outlet) in React Router Dom v6.10
**Overview**
App.js
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Outlet,
  Link
} from "react-router-dom";
import { main_modules } from './_config/main_modules';

function TemplateApp(){
  console.log("RENDER Template js");

  return(
    <>
    <nav>
    <ul>
      <li>
        <Link to={`/route/route1`}>ruta 1</Link>
      </li>
      <li>
        <Link to={`/route/route2`}>ruta 2</Link>
      </li>
    </ul>
    </nav>

    { /** Render child components */ }
    <Outlet />
    </>
  );
}

function App() {
  console.log("RENDER App js");
  return (
    <Router>
        <Switch>
          <Route exact path={`login`} element={<>Login</>} />
          { /** Nested route with template */}
          <Route exact path={`route`} element={<TemplateApp />}>
            <Route exact path={`route1`} element={<>Ruta 1</>} />
            <Route exact path={`route2`} element={<>Ruta 2</>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found MAIN</>
  );
}

export default App;
```

-------------------------

**IMPLEMETATION Nested Routes with template in React Router Dom v6.10**
**App modules to centralize paths**
src/modules/app_modules.js
```
import LoginModule from './login';

/** Template */
import FactorabotTemplate from './factutabot/factutabot_template.js';

/** Template sub modules */
import InfoModule from "./factutabot/info";
import MainModule from "./factutabot/main";

const loginPath = '';
const facturabotPath = 'facturabot';

export const path_modules = {
    login: {
        label: 'Login',
        path: `${loginPath}`,
        fullPath: `/${loginPath}`,
    },
    facturabot: {
        label: 'Facturabot',
        path: `${facturabotPath}`,
        fullPath: `/${facturabotPath}`,
        children: {
            main: { 
                label: 'Home',
                path: '',
                fullPath: `/${facturabotPath}/`,
            },
            info: { 
                label: 'Information',
                path: 'info',
                fullPath: `/${facturabotPath}/info`,
            }
        }
    },
};

export const router_modules = [
    {
        path: `${path_modules.login.path}`,
        component: LoginModule,
    },
    {
        path: `${path_modules.facturabot.path}`,
        component: AppTemplate,
        children: [
            {                
                path: `${path_modules.facturabot.children.main.path}`,
                component: MainModule,
            },
            {                
                path: `${path_modules.facturabot.children.info.path}`,
                component: InfoModule,
            },
        ],
    },
];

//export { router_modules, path_modules };
```

**Template for nest route inside Facturabot**
src/facturabot/factutabot_template.js
```
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { path_modules } from "./app_modules";

const AppTemplate = () => {

    return(
        <>
            <ul>
            {
                Object.entries(path_modules.facturabot.children).map((module, key) => {
                    if(module[1].children){
                        return(
                            <div key={`nav_key_${module[1].path}_${key}`} >
                                {module[1].label}
                                <ul>
                                    {
                                        Object.entries(module[1].children).map((m, key) => (
                                            <li key={`nav_key_${m[1].path}_${key}`} >
                                                <Link to={`${m[1].fullPath}`}>
                                                    {m[1].label}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        );
                    }
                    return(
                        <li key={`nav_key_${module[1].path}_${key}`} >
                            <Link to={`${module[1].fullPath}`}>
                                {module[1].label}
                            </Link>
                        </li>
                    );
                })
            }
            </ul>
            <Outlet />
        </>
    );
};

export default AppTemplate;
```

**App js for main BrowserRouter regiter all modules in app_modules file**
src/App.js
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { router_modules } from './modules/app_modules';

function App() {

  const renderRoutes = (modules) => {
    return modules.map((module, key) =>{
      if(module.children){
        return(
          <Route exact path={`${module.path}`} element={<module.component />} key={`route_${module.path}_${key}`}>
            {
              renderRoutes(module.children)
            }
          </Route>
        );
      }
      return(
        <Route exact path={`${module.path}`} element={<module.component />} key={`route_${module.path}_${key}`} />
      );
    });
  }

  return (
    <Router>
        <Switch>
          {
            renderRoutes(router_modules)
          }
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found</>
  );
}

export default App;
```

-------------------------------------------------------------------------------------------------------------------------------

# modules and menu_modules implementation for register routing with React Router Dom v6 and Nested routes
**src/modules/content/content_modules.js**
```
import PrincipalModule from "./principal";
import RokoModule from "./roko";
import RpaSolutionsModule from "./rpa_solutions";
import ProfileModule from "./profile";

const parent_path = '/content';

/** register modules to encapsule paths cross application and register in router */
/** if router is component that use useParams hook, be carefull with key and path 
    
    1) key equals to path
        For example
        {
            login: { ... , path: '/login', ... }
        }
    2) if key has '_' then in the path use '-'
        For example 
        {
           order_box: { ... , path: '/order-box', ... }
        }

 * */
const modules = {
    main: { label: 'Principal', path: `${parent_path}/main`, component: PrincipalModule, },
    roko: { label: 'Roko RPA', path: `${parent_path}/roko`, component: RokoModule, },
    solutions: { label: 'Soluciones a la medida', path: `${parent_path}/solutions`, component: RpaSolutionsModule, },
    profile: { label: 'Perfil', path: `${parent_path}/profile`, component: ProfileModule, },
};

const menu_modules = [
    {
        ...modules.main
    },
    {
        label: `Automatización`,
        children: [
            {
                ...modules.roko
            },
            {
                ...modules.solutions
            },
        ]
    },
    {
        ...modules.profile
    },
];

export { modules, menu_modules };
```

**src/modules/content/content_router.js**
Nested Router
```
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { modules, menu_modules } from './content_modules';

const ContentRouter = () => {

    let { module } = useParams();

    const renderModule = () => {
        if(module in modules){
            const ModuleComponent = modules[module].component;
            return <ModuleComponent />;
        } else {
            return <NotFound />
        }
    };

    return (
        <>
            <nav>
                <ul>
                    {
                        menu_modules.map((m, key) => {
                            if(m.children){
                                return(
                                    <div>
                                        {m.label}
                                        <nav>
                                            <ul>
                                                {
                                                    m.children.map((m, key) => {
                                                        return(
                                                            <li key={`main_submenu_${key}`}>
                                                                <Link to={`${m.path === '/' ? "/main" : m.path}`}>{m.label}</Link>
                                                            </li>
                                                        );
                                                    }) 
                                                }
                                            </ul>
                                        </nav>
                                    </div>
                                );
                            } else {
                                return(
                                    <li key={`main_menu_${key}`}>
                                        <Link to={`${m.path === '/' ? "/main" : m.path}`}>{m.label}</Link>
                                    </li>
                                );
                            }
                            
                        })
                    }
                </ul>
            </nav>
            {renderModule()}
        </>
    );
}

export default ContentRouter;
```

**src/modules/main_modules.js**
```
import Login from "./login";
import ContentRouter from "./content/content_router";

const modules = {
    login: { label: 'Login', path: `/`, component: Login, },
    content: { label: 'Content', path: `/content`, component: ContentRouter, },
};

const menu_modules = [
    {
        ...modules.login
    },
    {
        ...modules.content
    },
];

export { modules, menu_modules };
```

App.js
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { modules } from './modules/main_modules';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={`${modules.login.path}`} element={<modules.login.component />} />
          <Route exact path={`${modules.content.path}/:module`} element={<modules.content.component />} />
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found MAIN</>
  );
}

export default App;
```

-------------------------------------------------------------------------------------------------------------------------------

# React Router Dom V6
Yarn
```
$ sudo yarn add react-router-dom
```
npm
```
$ npm install --save react-router-dom
```

**App.js**
```
import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import {MAIN_ROUTES} from './_config/routes';

import Login from './modules/login';
import AppModules from './modules/app_modules';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={MAIN_ROUTES.login} element={<Login />} />
          <Route exact path={`${MAIN_ROUTES.app_modules}/:module`} element={<AppModules />} />
          {
            ['/', '/info'].map((path, key) =>(
              <Route exact path={`${path}`} element={<RemoteLandpage />} key={`route_${key}`} />
            ))
          }
          <Route path='*' element={<NotFound />} />
        </Switch>
    </Router>
  );
}

function NotFound() {
  return(
    <>Not found</>
  );
}

export default App;
```

**AppModules**
Nested routes. 
To change pages inside a Module
```
import React, {Fragment} from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import {
    MAIN_ROUTES, 
    APP_ROUTES
} from '../../_config/routes';

import Orders from './orders';
import Departures from './departures';

const MODULES = {
    "orders": <Orders />,
    "departures": <Departures />,
    [APP_ROUTES.list_sample.path.replace("/", "")]: <SampleInboxModule />, //to use properties values like routes
}

const AppModules = () => {
    let { module } = useParams();
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`${MAIN_ROUTES.app_modules}${APP_ROUTES.orders}`}>Pedidos</Link>
                    </li>
                    <li>
                        <Link to={`${MAIN_ROUTES.app_modules}${APP_ROUTES.departures}`}>Despachos</Link>
                    </li>
                </ul>
            </nav>
            {renderModule(module)}
        </>
    );
}

const renderModule = (module) => {
    if(module in MODULES){
        return MODULES[module];
    } else {
        return <NotFound />
    }
}

function NotFound() {
    return(
      <>Not found</>
    );
  }
  
export default AppModules;
```
-------------------------------------------------------------------------------------------------------------------------------

# React Router Dom V6 with History

https://stackoverflow.com/questions/70646421/how-to-listen-for-route-change-in-react-router-dom-v6

```
const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
```

```
const history = createBrowserHistory();
export default history;
```

```
import CustomRouter from '../CustomRouter';
import history from '../myHistory';
```

```
<CustomRouter history={history}>
  ....
</CustomRouter>
```


-------------------------------------------------------------------------------------------------------------------------------

# Import comparations with Node
```
export default Button              -> import Button from './button'
                                      const Button = require('./button').default
         
export const Button                -> import { Button } from './button'
                                      const { Button } = require('./button')
         
export { Button }                  -> import { Button } from './button'
                                      const { Button } = require('./button')
         
module.exports.Button              -> import { Button } from './button'
                                      const { Button } = require('./button')

module.exports.Button = Button     -> import { Button } from './button'
                                      const { Button } = require('./button')

module.exports = Button            -> import * as Button from './button'
                                      const Button = require('./button')
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

# React Router Dom V6
**You need to change 'Switch' to Routes**
**You need to change Route property 'component' to 'element'**
**Declare component in element property with tags '<MyComp />'**

# USAGE React Router Dom

1. Router.js FILE
```
...

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import ErrorPage from '../ErrorPage/ErrorPage.js';
.. ALL COMPONENTS

class Router extends React.Component
{
    render()
    {
        return(
            <BrowserRouter basename="/YOUR_APP_NAME" >
                <Switch>
				<Route exact path={['/','/user']} render={(props)=> <Inicio user={this.props.user}/>}/>
                    <Route exact path='/user' render={(props)=> <Inicio user={this.props.user}/>}/>
                    <Route exact path='/user/inicio' render={(props)=> <Inicio user={this.props.user}/>}/>
                    <Route exact path='/user/cuidadores' render={(props)=> <Cares user={this.props.user}/>}/>
                    <Route exact path='/user/mascotas' render={(props)=> <Pets user={this.props.user}/>}/>
                    <Route exact path='/user/configuracion' render={(props)=> <Config user={this.props.user}/>}/>
						  <Route path='/user/care/nuevo' render={(props) => <CareNew user={this.props.user}/>}/>
						  <Route path='/user/care/edit/:id' render={({match})=> <CareProfile match={match} user={this.props.user}/>}/>
							{/** Usar parametro pasado por URL this.props.match.params.id */}
                    
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
```

2. Implement.js
```
...
href=/YOUR_APP_NAME/ruta
```

------------------------------------------------------

# Link to navigate in HTML


# Use History to push('/some/url'), goBack(), replace('/some/url')
0. Install history package.
```
yarn add history
```

1. Create HistoryHelper
```
import { createBrowserHistory } from 'history';

export default createBrowserHistory();
```

2. Pass History from BrowserRouter to components
```
import HistoryHelper from '../../_helpers/HistoryHelper';

export const AppRoute = () => {
    return(
            <BrowserRouter history={HistoryHandler} basename="/" >
                <Switch>
                    {/** Ruta por default */}
                    <Route exact path='/' component={LoginModule} />}/>
                    {/** Rutas especificas */}
                    <Route path='/login' component={LoginModule} />}/>
                    <Route path={SELECT_SHOP} component={ this.SelectShop} />}/>
                    {/** Ruta no especificada */}
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
```

3. Use it on any component that has prop.history or action
```
import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

const NavBar = (props) => {
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/users/">React-Redux-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/users/">Home</Nav.Link>
                <NavDropdown title="Actions" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users/create">Create</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#!" onClick = { () => {props.exit(() => {
                            
                            
                            props.history.replace('/'); // or any
                        
                        
                        })}}>
                        Logut
                    </NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
```

------------------------------------------------------

# Nested routes
1. AppRouter
```
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HistoryHandler from '../../_helpers/HistoryHandler';

/** Routes */
import {SELECT_SHOP, HOME_SHOP, CREATE_SHOP, SHOP, SHOP_PRODUCTS, SHOP_ORDERS} from '../../config/Routes/shopRoutes';
import {LOGIN} from '../../config/Routes/loginRoutes';
import {REGISTER} from '../../config/Routes/registerRoutes';

import ErrorPage from '../ErrorPage/ErrorPage.js';

import WrapAuthComponent from '../Containers/Auth/WrapAuthComponent';

/** Modules */
import WelcomeModule from './Welcome';
import LoginModule from './Login';
import RegisterModule from './Register';
import HomeModule from './Home';
import SelectShopModule from './SelectShop';
import CreateShopModule from './CreateShop';
import ShopModule from './Shop';

export default class RouterApp extends React.Component {

    SelectShop = WrapAuthComponent(SelectShopModule);
    Home = WrapAuthComponent(HomeModule);
    CreateShop = WrapAuthComponent(CreateShopModule);
    ShopModuleProtected = WrapAuthComponent(ShopModule);

    render()
    {
        return(
            <BrowserRouter history={HistoryHandler} basename="/" >
                <Switch>
                    {/** Ruta por default */}
                    <Route exact path='/' component={WelcomeModule} />}/>
                    {/** Rutas especificas */}
                    <Route path={LOGIN} component={LoginModule} />}/>
                    <Route path={REGISTER} component={RegisterModule} />}/>
                    <Route path={HOME_SHOP} component={ this.Home} />}/>
                    <Route path={SELECT_SHOP} component={ this.SelectShop} />}/>
                    <Route path={CREATE_SHOP} component={ this.CreateShop} />}/>
                    <Route path={`${SHOP}/:shopRoute`} component={this.ShopModuleProtected} />
                    {/** Ruta no especificada */}
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
```

2. Handle route with match porp in ShopModule
```
import React from 'react'
import { connect } from 'react-redux';
import {options} from './shopOptions';

import ShopNavbar from '../../Containers/NavBars/ShopNavbar';
import ShopSidebar from '../../Containers/SideBars/ShopSidebar';
import ShopRouter from './ShopRouter';
import FooterMain from '../../Containers/Footers/FooterMain';


class ShopModule extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("\n\n\n\n\n\n\nMOUNTED" + new Date() + "\n\n\n\n\n\n\n");
    }

    render(){
        return(
            <div>
				{/* NavBar with Link as a tag*/}
                <ShopNavbar
                    options={options}
                    shopRoute={this.props.match.params.shopRoute}
                />
                <ShopRouter 
                    shopRoute={this.props.match.params.shopRoute}                
                />
                <FooterMain />
            </div>
        );
    }
}

export default ShopModule;

```

3. And ShopRouter is like
```
import React from 'react';

import ErrorPage from '../../ErrorPage/ErrorPage';

import {SHOP_ORDERS, SHOP_PRODUCTS, SHOP_SERVICES, SHOP_STATS} from '../../../config/Routes/shopRoutes';

import OrdersModule from './Orders';
import ProductsModule from './Products';
import ServiceModule from './Services';
import StatsModule from './Stats';

export default class ShopRouter extends React.Component{

    render(){
        if(`/${this.props.shopRoute}` === SHOP_ORDERS)
            return(<OrdersModule childOption={this.props.childOption} />);
        else if(`/${this.props.shopRoute}` === SHOP_PRODUCTS)
            return(<ProductsModule childOption={this.props.childOption} />);
        else if(`/${this.props.shopRoute}` === SHOP_SERVICES)
            return(<ServiceModule childOption={this.props.childOption} />);
        else if(`/${this.props.shopRoute}` === SHOP_STATS)
            return(<StatsModule childOption={this.props.childOption} />);
        else
            return(<ErrorPage />);
    }

}
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

## Deploy on IIS

0. In React App, create 'web.config' file in 'public folder'
```
<?xml version="1.0"?>
<configuration>
 <system.webServer>
 <rewrite>
 <rules>
 <rule name="React Routes" stopProcessing="true">
 <match url=".*" />
 <conditions logicalGrouping="MatchAll">
 <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
 <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
 <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
 </conditions>
 <action type="Rewrite" url="/" />
 </rule>
 </rules>
 </rewrite>
 </system.webServer>
</configuration>
```

1. Install URL Rewrite module
https://www.iis.net/downloads/microsoft/url-rewrite

2. Create App in IIS
Enter IIS on Windows with 
```
Windows + R
inetmgr
```

-------------------------------------------------------------------------------------------------------------------------------

## React Redux app

0. Package structure
- src/_services
- src/actions/index.js
- src/actions/[setActionExample].js
- src/components/modules
- src/components/containers
- src/config
- src/reducers/index.js
- src/reducers/[stateExample].js
- src/store/index.js
- App.js
- index.js

1. Install
``redux, react-redux, redux-thunk``

2. src/_services
Here you can write all your API calls and return promises if you need

```
// Base service example baseService.js
import SessionStorage from '../_helpers/SessionStorage';
import {PARAM_TYPE, QUERY_TYPE} from '../config/API/urlParamTypes';

const AUTH_TOKEN_PREFIX = 'Bearer';

const setMethod = (apiResource, options) => {
    options.method = apiResource.method;
    return options;
}

const setHeaders = (options) => {
    options.headers = {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
    return options;
}

const setAuth = (options) => {
    options.headers.Authorization = `${AUTH_TOKEN_PREFIX} ${SessionStorage.getSessionToken()}`;
    return options;
}

const buildBody = (options, body) => {
    options.body = JSON.stringify(body);
    return options;
}

const buildOptions = (apiResource, body) => {
    let options = {};
    options = setMethod(apiResource, options);
    options = setHeaders(options);

    if(apiResource.auth) options = setAuth(options);
    if(apiResource.body) options = buildBody(options, body);

    return options;
}

const buildQueries = (paramsArray) => {
    let res = '?';
    paramsArray.map((query, key) => {
        res = `${res}${query.key}=${query.value}`;
        if(key !== paramsArray.length - 1) res = `${res}&`;
    });
    return res;
}

const buildParams = (paramsArray) => {
    let res = '/';
    paramsArray.map((param, key) => {
        res = `${res}${param}`;
        if(key !== paramsArray.length - 1) res = `${res}/`;
    });
    return res;
}

const buildUrlParams = (paramType, paramArray) => {
    if(paramType === null) return '';

    switch(paramType){
        case PARAM_TYPE:
            return buildParams(paramArray);
        
        case QUERY_TYPE:
            return buildQueries(paramArray);

        default:
            return '';
    }
}

const sendFetch = (api, apiResource, paramArray, body) => {
    let options = buildOptions(apiResource, body);
    return new Promise((resolve, reject) => {
        fetch(`${api.api_url}${apiResource.path}${buildUrlParams(apiResource.params, paramArray)}`,options)
        .then(res => {
            console.log("RESPUESTA" + res);
            return res.json();
        })
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
}

export default {sendFetch};
```

```
// Service example loginService.js
import API from '../config/API/api';
import loginApi from '../config/API/loginApi';
import userApi from '../config/API/userApi';
import baseFetch from './baseFetch';
import ServiceError from '../errors/ServiceError';
import SessionStorage from '../_helpers/SessionStorage';

export const validateInputs = (body) => {
    if (body.login == null || body.login === '')
        throw new ServiceError('Email vacío');
    else if (body.pass == null || body.pass === '')
        throw new ServiceError('Contraseña vacía');
    else
        return true;
}

export const validateInputsRegister = (body) => {
    if (body.name == null || body.name === '')
        throw new ServiceError('Nombre vacío');
    else if (body.username == null || body.username === '')
        throw new ServiceError('Username vacío');
    else if (body.mail == null || body.mail === '')
        throw new ServiceError('Email vacío');
    else if (body.pass == null || body.pass === '')
        throw new ServiceError('Contraseña vacía');
    else if (body.address == null || body.address === '')
        throw new ServiceError('Dirección vacío');
    else if (body.phone == null || body.phone === '')
        throw new ServiceError('Teléfono vacío');
    else
        return true;
}

export const login = async (input) => {
    let data = await baseFetch.sendFetch(API, loginApi.login, [], input);
    if (data.status.ok){
        SessionStorage.setSessionToken(data.data.token);
        SessionStorage.setUserId(data.data.user._id);
    }
    return data;
}

export const register = async (input) => {
    let data = await baseFetch.sendFetch(API, userApi.create, [], input);
    if (data.status.ok){
        SessionStorage.setSessionToken(data.data.token);
        SessionStorage.setUserId(data.data.user._id);
    }
    return data;
}

export const tokenUser = async () => {
    let data = await baseFetch.sendFetch(API, userApi.findByToken, [SessionStorage.getSessionToken()], null);
    //if (data.status.ok) SessionStorage.setSessionToken(data.data.token);
    return data;
}
```


3. actions/[setActionExample].js
In actions folder you create all actions, for example setSession, setUsers, 
createUser, setProducts, etc...
```
import {loginService, validateLogin} from '../_services/LoginService';
import {batch} from 'react-redux';

export const SET_SESSION_ACTION = 'SET_SESSION';

export const login = (payload, navigate) => {
    return dispatch => {
        // You can call more actions here before execute fetch.
        // dispatch(someAction(payload));

        // Use batch from react-redux to call two or more actions
        /*
        batch(() => {
            dispatch(someAction1(payload));
            dispatch(someAction2(payload));
        })
        */
        
        
        dispatch(setSession({ok: false, loaded: false}));
        loginService(payload.body)
        .then(data => {
            if(validateLogin(data)){
                dispatch(setSession({
                    ok: true, 
                    loaded: true,
                    msg: data.content.message, 
                    token: data.content.token
                }));
                if(typeof navigate === 'function') navigate();
            } else
                dispatch(setSession({                    
                    loaded: true, 
                    msg: (data.content == null ? data.message : data.content.message)
                }));
        })
        .catch(err => dispatch(setSession({loaded: true, msg: err.message})));

        return;
    };
};

export const setSession = (payload) => ({
    type: SET_SESSION_ACTION,
    payload
});
```

4. actions/index.js
Here you import and export all actions
```
import {login, setSession} from './session.actions';
//All more actions

export {
    login,
    setSession,
	 //All more actions
}
```

5. reducers/[stateExample].js
Here you create reducers. This are states that you can use
```
import {SET_SESSION_ACTION} from '../actions/session.actions';

const defaultState = {
    ok: false, 
    loaded: true,
    msg: '', 
    token: ''
};

const buildState = (state, {ok, loaded, msg, token}) => {
    return {...state, ok, loaded, msg, token};
};

const session = (state = defaultState, action) => {
    switch(action.type){
        case SET_SESSION_ACTION:{
            return buildState(state, action.payload);    
        }             
        default: 
            return state;
    }
}

export default session;
```

6. reducers/index.js
Here you combine all reducers
```
import {combineReducers} from 'redux';
import session from './session';
//More reducers

export default combineReducers({
    session,
	 //More reducers
});
```

7. store/index.js
Create store to store application states, reducers
```
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import storeRoot from '../reducers';

//const initialState = {};

export const store = createStore(storeRoot, applyMiddleware(thunk));
```

8. index.js
Wrap application with the store using provider
```
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; //This
import {store} from './store'; //This
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Wrap
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

9. componets/containers
Here you create all components that can be use in many modules, 
example NavBar, Footer, Header, etc.

10. componets/module/login/index.js
In modules you create index.js, This will be the ClassComponent MAIN.
In index.js you connect you app with Redux
Then you create all functional components to use in module.
```
import React from 'react';
import {connect} from 'react-redux';
import {login} from '../../../actions';
import { Container, Row, Col} from 'antd';
import Login from './Login';

class LoginModule extends React.Component{

    send = () => {
        let body = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        this.props.login({body}, () => {
            alert("Go to home");
        });
    }

    render() {
        console.log(this.props.session);
        return (
            <Container>
		          <Row>
		              <Col sm={4}></Col>
		              <Col sm={4}>
		                  <Login login={this.send} />
		              </Col>
		              <Col sm={4}></Col>
		          </Row>
		      </Container>
          );
    }
}

const mapStateToProps = (state) => ({
    session: state.session
});

const mapDispatchToProps = dispatch => ({
    login: (body, navigate) => dispatch(login(body, navigate))
});

/* mapDispatchToProps could be better
const mapDispatchToProps = {
    login
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
```


**Redux Forms**

1. Install redux-form

2. Add reducer redux-form in combineReducers
```
// reducers/index.js
import {combineReducers} from 'redux';
import testOne from './testOne';
import session from './session';
import user from './user';

/** Redux Form */
import {reducer as reduxForm} from 'redux-form';

export default combineReducers({
    testOne,
    session,
    user,
    
    /** Redux form MUST be 'form' */
    form: reduxForm
});
```

3. Create HOC to wrap component with initial props in src/hoc folder
```
// wrapComponentHoc.js

import React from 'react';

export const setPropsAsInitial = WrappedComponent => (
    class extends React.Component{
        render(){
            return <WrappedComponent 
                {...this.props} 
                initialValues = {this.props}
                //enableReinitialize //This if you want to reset values before submit success            
            />
        }
    }
)
```

4. Maybe create some validations helper
```
export const isRequired = value => {
    if(!value)
        return 'This field is required';
}
```


5. Create FormComponent in components/containers/forms
```
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {setPropsAsInitial} from '../../../_hoc/wrapComponentHoc';
import { Form, Icon, Input, Button} from 'antd';
import {isRequired} from '../../../_helpers/redux-form-valiations';

const LoginForm = (props) => {
    /** Must be hanldeSubmit */
    let {handleSubmit} = props;
    return(
        <Form onSubmit = {handleSubmit} className="login-form">
        <Form.Item>                
            <Field 
                name="username"
                component = {TextField}
                type = 'text'
                validate = {[isRequired]}
            />
        </Form.Item>
                        
        <Field 
            name="password"
            component = {TextPassword}
            validate = {[isRequired]}
        />
        
        <Form.Item>
            {displayButton(props)}
        </Form.Item>
        </Form>
    );
}

const TextField = ({input, meta}) => (
    <div>
        <Input {...input}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
        />
        {meta.error && <span>{meta.error}</span>}
    </div>
);

const TextPassword = ({input, meta}) => (
    <Form.Item validateStatus={meta.error ? "error" : ""}>
        <Input.Password {...input}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            allowClear
            placeholder="Password"
            />
        {meta.error && <span>{meta.error}</span>}
    </Form.Item>
);

const displayButton = (props) => {
    console.log(props);
    if(! props.loaded){
        return(
        <div>Loading...</div>
        );
    } else {
        return(
        <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
        );
    }
}

const LoginReduxForm = reduxForm({form: 'LoginForm'})(LoginForm);

export default setPropsAsInitial(LoginReduxForm);
```

6. Use it on connected component
```
import React from 'react';
import { connect } from 'react-redux';
import {login} from '../../../actions/session.actions';
import {Container, Row, Col} from 'react-bootstrap';
import LoginReduxForm from '../../containers/forms/loginForm';

class LoginModule extends React.Component {

    send = (values) => {
        let {username, password} = values;
        let body = {
            username,
            password
        }
        this.props.login({body}, () => {
            this.props.history.push('/users/');
        });
    }
    
    render(){
        console.log(this.props.session);
        return(
            <Container style={{marginTop: 30 + 'px'}}>
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <LoginReduxForm 
                            /** Custome props */
                            loaded={this.props.session.loaded} 
                            
                            /** Redux Form props */
                            // Default values in form.
                            // props must be equals as 'name' attribute
                            //username={"myDefaultUsername"}
                            //If you have a complete object from reducer,
                            //use copy props to use all atributes
                            //{...this.props.customer}
                            //To handle submit, must be onSubmit
                            onSubmit={this.send} />
                    </Col>
                    <Col sm={4}></Col>
                </Row>
            </Container>
            
        );
    }
}

const mapStateToProps = (state) => ({
    session: state.session
});

const mapDispatchToProps = dispatch => ({
    login: (body, navigate) => dispatch(login(body, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
```




-------------------------------------------------------------------------------------------------------------------------------

# HOC to protect auth module compoents

1. HOC
```
import React from 'react';
import {validateSession} from '../_helpers/sessionHelper';

const WrapAuthComponent = (AuthComponent) => (
    class extends React.Component{
        render(){
            if(validateSession()){
                return(<AuthComponent {...this.props} />);
            } else {
                return(
                    <>
                        Unauthorized
                    </>
                );
            }
        }
    }
);

export default WrapAuthComponent;
```

2. Use it on Module you want to protect
```
// CODE

const AuthComponent = WrapAuthComponent(UserModule);

export const AppRoute = () => {
    return(
        <Router history={HistoryHelper}>
            <Switch>
                <Route exact path = "/" component = {LoginModule} />
                <Route exact path = "/test" component = {TestModule} />
                <Route path = "/users" component = {AuthComponent} />

                <Route component = {NotFoundModule} />
            </Switch>
        </Router>
    );
}
```


-------------------------------------------------------------------------------------------------------------------------------

## i18n

https://github.com/i18next/react-i18next

-------------------------------------------------------------------------------------------------------------------------------