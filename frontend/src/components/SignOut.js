import React from 'react'
import Button from 'react-bootstrap/Button'
import { FirebaseContext } from '../firebase';

function SignOut() {
    const firebase = React.useContext(FirebaseContext);

    return (
        <Button variant="outline-primary" type="button" onClick={firebase.signOut}>
            Sign Out
        </Button>
    )
}

export default SignOut;
