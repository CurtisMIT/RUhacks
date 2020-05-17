import React from 'react';
import { withAuthorization } from '../Session';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import * as ROLES from '../../constants/roles';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const info = [
    {
        id: 1,
        description: 'I need to go to the airport',
        location: 'some coordinates i guess',
        helper: 'helper1'
    },
    {
        id: 2,
        description: 'I need to go to the beach',
        location: 'some coordinates i guess',
        helper: 'helper2'
    },
    {
        id: 3,
        description: 'I need to go to the playground',
        location: 'some coordinates i guess',
        helper: 'helper3'
    },
    {
        id: 4,
        description: 'I need to go to the whitehouse',
        location: 'some coordinates i guess',
        helper: 'helper4'
    },
]


const INITIAL_STATE = {
    tickets: info,
    description: '',
    lat: 0,
    long: 0,

    error: null,
}

function TicketForm() {

    const firebase = React.useContext(FirebaseContext)

    const [
        { tickets, description, lat, long, error },
        setTicketFormState,
    ] = React.useState(INITIAL_STATE);

    const onSubmit = event => {
        firebase.createTicket(lat, long, description)
        geoLocationInit()
        console.log('clicked')
        event.preventDefault()
    }

    const geoLocationInit = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,fail);
        } 
        else {
            alert('can not get current location!');
        }
    }

    const success = position => {
        const { latitude, longitude } = position.coords
        console.log(position.coords)
        setTicketFormState(prev => ({
            ...prev,
            lat: latitude,
            long: longitude
        }))
    }

    const fail = () => console.log("failed")

    const onChange = event => {
        const { name, value } = event.target
        setTicketFormState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Ticket #</th>
                            <th>Description</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Helper</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map((data) => 
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.description}</td>
                                        <td>{data.location}</td>
                                        <td>{data.helper}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={description} onChange={onChange} placeholder="Enter description" />
                            <Form.Text className="text-muted">
                                Describe what you need help with
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        {error && <p>{error.message}</p>}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];

export default withAuthorization(condition)(TicketForm);