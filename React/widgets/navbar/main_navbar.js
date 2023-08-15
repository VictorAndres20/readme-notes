import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { path_modules } from "../../pages/app_modules";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { cleanValues } from "../../_utils/storage_handler";

function MainNavbar(){

    let navigate = useNavigate();

    const logout = () => {
        cleanValues();
        navigate("/");
    }

    return(

        <Navbar expand="lg" style={{ background: 'linear-gradient(to right, #074C00, #42A341, #B8E2A3)', marginBottom: '20px'}}>
            <Container fluid>
                <Navbar.Brand>
                    <div className="flex-row flex-center" style={{ margin: '-15px 0px' }}>
                    <img style={{ width: 10, height: 9, margin: '0px 10px' }} src={require("../../_assets/imgs/logo_dot.png")} alt="ueb"/>
                    <img width={60} src={require("../../_assets/imgs/logo_icon.png")} alt="ueb"/>
                    <img style={{ width: 10, height: 9, margin: '0px 10px' }} src={require("../../_assets/imgs/logo_dot.png")} alt="ueb"/>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {
                        Object.entries(path_modules.content.children).map((module, key) => {
                            if(module[1].children){
                                return(
                                    <NavDropdown key={`nav_key_${module[1].path}_${key}`} title={module[1].label} id="nav-dropdown" >
                                        {
                                            Object.entries(module[1].children).map((m, key) => (
                                                <NavDropdown.ItemText key={`nav_key_${m[1].path}_${key}`} style={{ fontSize: '0.8em' }}>
                                                    <Link to={`${m[1].fullPath}`} style={{ textDecoration: 'none' }}>
                                                        {m[1].label}
                                                    </Link>
                                                </NavDropdown.ItemText>
                                            ))
                                        }                                        
                                    </NavDropdown>
                                );
                            }
                            return(
                                <Nav.Item key={`nav_key_${module[1].path}_${key}`}>
                                    <Link to={`${module[1].fullPath}`} style={{ color: '#fff' }}>
                                        {module[1].label}
                                    </Link>
                                </Nav.Item>
                            );
                        })
                    }               
                </Nav>
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }} >
                    <Nav.Link onClick={logout} style={{ padding: '2px 9px' }}>
                    <svg fill="#fa1900" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-46.2 -46.2 477.37 477.37" stroke="#fa1900" strokeWidth="33.877448"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Sign_Out"> <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path> <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                    </Nav.Link>
                </div>   
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;