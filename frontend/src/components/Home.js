import React from 'react';
import { withAuthorization } from './Session';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { useAuthUser } from './Session'
import * as ROLES from '../constants/roles'
import Helper from './Helper'
import NonHelper from './Nonhelper/Nonhelper'

function HomeAuth({ authUser }){
    return (
        <div className="text-center">
            {
                !!authUser.roles[ROLES.HELPER] && (
                    <Helper />
                )
            }
            {
                !!authUser.roles[ROLES.NONHELPER] && (
                    <NonHelper />
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
