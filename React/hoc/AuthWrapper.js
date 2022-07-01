import React from 'react';
import {getToken, getRol} from '../../utils/storage_handler';
import {validate_route_rol} from '../../routes/protectedRoutes';
import { Result, Button } from 'antd';

/*
To use it
called like

import AuthWrapper from './hoc/auth_wrapper';
const AuthComponent = AuthWrapper(MainRouter);

Like this create a new Component that is wrapped by AuthWarpper

*/

const AuthWrapper = (AuthComponent) => (
    class extends React.Component{
        render(){
            if(validateSession()){
                let route = document.location.pathname.replace("/content/", "");
                if(! validate_route_rol(route, getRol())){
                    return(
                        <Result
                            status="error"
                            title="No estas autorizado"
                            subTitle="¡Tus permisos de usuario no te permiten realizar esta acción!"
                            extra={[
                            <Button onClick={() => window.location.href = '/'} type="primary" key="console">
                                Ir a login
                            </Button>
                            ]}
                        />
                    );
                }
                return(<AuthComponent {...this.props} />);
            } else {
                return(
                    <Result
                        status="error"
                        title="No estas autorizado"
                        subTitle="Para ingresar debes hacer login"
                        extra={[
                        <Button onClick={() => window.location.href = '/'} type="primary" key="console">
                            Ir a login
                        </Button>
                        ]}
                    />
                );
            }
        }
    }
);

const validateSession = () => {
    let token = getToken();
    if(token == null){
        return false;
    }
    return true;
}

export default AuthWrapper;