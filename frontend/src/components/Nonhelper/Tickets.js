import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { withAuthorization } from '../Session';
import { useAuthUser } from './Session'
import { FirebaseContext } from '../firebase';
import * as ROLES from '../../constants/roles';

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

function TicketsPage() {
    const authUser = useAuthUser()
    const firebase = React.useContext(FirebaseContext)

    const [
        { tickets, helper , nonhelper, err },
        setTicketsPageState,
    ] = React.useState(INITIAL_STATE)

    const getData = () => {
        return info
    }
    return (
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
    )
}

const condition = authUser => authUser && !!authUser.roles[ROLES.NONHELPER];

export default withAuthorization(condition)(TicketsPage);