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

# Link to navigate in HTML


# Use History to push('/some/url'), goBack(), replace('/some/url')

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
        <Router history={HistoryHelper}>
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

export const AppRoute = () => {
    return(
        <Router history={HistoryHelper}>
            <Switch>
                <Route exact path = "/" component = {LoginModule} />
                <Route exact path = "/test" component = {TestModule} />
                <Route path = "/users" component = {WrapAuthComponent(UserModule)} />

                <Route component = {NotFoundModule} />
            </Switch>
        </Router>
    );
}
```


-------------------------------------------------------------------------------------------------------------------------------