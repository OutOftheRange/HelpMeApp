import React from "react";
import { Container, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import routingUrl from "../../constants/routingUrl";
import "bootstrap/dist/css/bootstrap.css";
import { checkToken } from "../../services/authorizationServices";
import AuthorizedHeaderBlock from "./AuthorizedHeaderBlock";
import UnauthorizedHeaderBlock from "./UnauthorizedHeaderBlock";

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href={routingUrl.pathToHomePage}>
                    Projekt
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title> Projekt</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link
                                href={routingUrl.pathToGiveHelpBoard + "/1"}
                            >
                                Buy something
                            </Nav.Link>
                            <Nav.Link
                                href={routingUrl.pathToGetHelpBoard + "/1"}
                            >
                                Sell something
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {checkToken()
                                ? (
                                    <AuthorizedHeaderBlock />
                                )
                                : (
                                    <UnauthorizedHeaderBlock />
                                )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
