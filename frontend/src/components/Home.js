import React from 'react';
import { withAuthorization } from './Session';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { useAuthUser } from './Session'
import * as ROLES from '../constants/roles'
import Helper from './Helper'
import TicketForm from './Nonhelper/TicketForm'
import TicketPage from './Tickets'


function HomeAuth({ authUser }){
    return (
        <div className="text-center">
            {
                !!authUser.roles[ROLES.HELPER] && (
                    <div>
                        <Helper />
                        <TicketPage />
                    </div>    
                )
            }
            {
                !!authUser.roles[ROLES.NONHELPER] && (
                    <TicketForm />
                )
            }
        </div>
    );
}

const Home = () => {
    const authUser = useAuthUser();
    return <div>{authUser ? <HomeAuth authUser={authUser} /> : <div></div>}</div>
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
