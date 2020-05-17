import React, { Component } from 'react';
import { withAuthorization } from './Session';
import * as ROLES from '../constants/roles';
import Tickets from './Tickets'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function NonhelperPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Tickets />
                </Col>
            </Row>
        </Container>
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];

export default withAuthorization(condition)(NonhelperPage);