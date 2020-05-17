import React from 'react';
import { withAuthorization } from '../Session';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import * as ROLES from '../../constants/roles';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const INITIAL_STATE = {
    description: '',
    lat: 0,
    long: 0,

    error: null,
}

function TicketForm() {

    const firebase = React.useContext(FirebaseContext)

    const [
        { description, lat, long, error },
        setTicketFormState,
    ] = React.useState(INITIAL_STATE);

    const onSubmit = event => {
        // firebase.createTicketWithDescriptionAndLatLong(description, lat, long)
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
        console.log(position)
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
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];

export default withAuthorization(condition)(TicketForm);