import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import * as ROLES from '../constants/roles'
import { useAuthUser } from './Session'
import SignOut from './SignOut'

const HeaderAuth = ({ authUser }) => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand>Wtever the name is</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to={ROUTES.ACCOUNT}>Account</Link>
                    </Nav.Link>
                    {
                        !!authUser.roles[ROLES.ADMIN] && (
                            <Nav.Link>
                                <Link to={ROUTES.ADMIN}>Admin</Link>
                            </Nav.Link>
                        )
                    }
                </Nav>
                <SignOut />
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const HeaderNonAuth = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Wtever the name is</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse>
                <Button variant="outline-primary" className="mr-2">
                    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </Button>
                <Button variant="outline-primary">
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </Button>
            </Navbar>
        </div>
    )
}

const Header = () => {
    const authUser = useAuthUser();
    return <div>{authUser ? <HeaderAuth authUser={authUser} /> : <HeaderNonAuth />}</div>
}

export default withRouter(Header)