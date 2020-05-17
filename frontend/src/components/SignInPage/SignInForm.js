import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import { FirebaseContext } from '../../firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

function SignInForm({ history }) {
    const [{ email, password, error }, setSignInFormState] = React.useState(INITIAL_STATE);
    const firebase = React.useContext(FirebaseContext);

    const isInvalid = password === '' || email === ''

    const onChange = event => {
        const { name, value } = event.target;
        setSignInFormState(prev => ({...prev, [name]: value}));
    }

    const onSubmit = event => {
        firebase
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setSignInFormState(INITIAL_STATE);
                history.push(ROUTES.HOME)
            })
            .catch(error => {
                setSignInFormState(prev => ({ ...prev, error: error }));
            });

        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit} style={{display: "inline-block"}}>
            <div className="row my-3 mx-auto">
                <input
                    name="email"
                    value={email}
                    onChange={onChange}
                    type="text"
                    placeholder="Email Address"
                />
            </div>
            
            <div className="row my-3 mx-auto">
                <input
                    name="password"
                    value={password}
                    onChange={onChange}
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div className="row my3- mx-auto">
                <button disabled={isInvalid} className="row my-3 mx-auto" type="submit">
                    Sign In
                </button>
            </div>

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default withRouter(SignInForm);