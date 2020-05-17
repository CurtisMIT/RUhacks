import React from 'react';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function TicketForm() {
    return (
        <Form>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" />
                <Form.Text className="text-muted">
                    Describe what you need help with
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];

export default withAuthorization(condition)(TicketForm);