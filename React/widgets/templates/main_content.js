import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function MainContent({ children }){

    return(
        <Container fluid>
            <Row>
                <Col lg={12}>
                    { children }
                </Col>
            </Row>
        </Container>
    );
}

export default MainContent;