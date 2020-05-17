import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { withAuthorization } from './Session';
import { useAuthUser } from './Session'
import { FirebaseContext } from '../firebase';
import * as ROLES from '../constants/roles';
import Button from 'react-bootstrap/Button'

const info = [
    {
        id: 1,
        description: 'I need to go to the airport',
        lat: 34,
        long: 75,
        helper: '',
        nonhelper: 'Ryan'
    },
    {
        id: 2,
        description: 'I need to go to the beach',
        lat: 34,
        long: 75,
        helper: '',
        nonhelper: 'Anne'
    },
    {
        id: 3,
        description: 'I need to go to the playground',
        lat: 34,
        long: 75,
        helper: '',
        nonhelper: 'Mark'
    },
    {
        id: 4,
        description: 'I need to go to the whitehouse',
        lat: 34,
        long: 75,
        helper: '',
        nonhelper: 'Rachel'
    },
]

const INITIAL_STATE = {
    tickets: info,
    helper: '',
    nonhelper: '',
    error: null,
}

function TicketsPage() {
    const authUser = useAuthUser()
    const firebase = React.useContext(FirebaseContext)


    const [
        { tickets, helper , nonhelper, err },
        setTicketsPageState,
    ] = React.useState(INITIAL_STATE)

    const onClick = event => {
        firebase.updateTicket(event.target.name, authUser.username)

        updateHelperInTickets(event.target.name, authUser.username)
        console.log(event.target)
    }

    const updateHelperInTickets = (nonhelper, helper) => {
        for (let i = 0; i < tickets.length; i++) {
            let ticket = tickets[i]
            if (ticket.nonhelper === nonhelper) {
                ticket.helper = helper
                setTicketsPageState(prev => ({
                    ...prev,
                    tickets: tickets,
                    helper: authUser.username,
                }))
            }
        }
    }

    return (
        <Table responsive>
            <thead>
                <tr>
                <th>Ticket #</th>
                <th>Description</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Nonhelper</th>
                <th>Helper</th>
                </tr>
            </thead>
            <tbody>
                {
                    tickets.map((data) => 
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.description}</td>
                            <td>{data.lat}</td>
                            <td>{data.long}</td>
                            <td>{data.nonhelper}</td>
                            <td>{data.helper}</td>
                            <td>
                                <Button variant="primary" name={data.nonhelper} onClick={onClick}>

                                </Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

// const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];
const condition = authUser => !!authUser;


export default withAuthorization(condition)(TicketsPage);