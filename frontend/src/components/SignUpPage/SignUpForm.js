import React from 'react';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    isHelper: false,
    error: null,
}

function SignUpForm({ history }) {
    const firebase = React.useContext(FirebaseContext)

    const [
        { username, email, passwordOne, passwordTwo, error, isAdmin, isHelper },
        setSignUpFormState,
    ] = React.useState(INITIAL_STATE);

    const onSubmit = event => {
        const roles = {};

        if(isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        if (isHelper) {
            roles[ROLES.HELPER] = ROLES.HELPER;
        } else {
            roles[ROLES.NONHELPER] = ROLES.NONHELPER;
        }

        firebase
            .createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles,
                })
            })
            .then(() => {
                setSignUpFormState(INITIAL_STATE)
                history.push(ROUTES.HOME)
            })
            .catch(error =>
                setSignUpFormState(prev => ({ ...prev, error: error }))
            )

        event.preventDefault()
    }

    const onChange = event => {
        const { name, value } = event.target
        setSignUpFormState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const onChangeCheckbox = event => {
        const { name, checked } = event.target;
        setSignUpFormState(prev => ({
            ...prev,
            [name]: checked
        }));
    }

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === ''

    return (
        <form onSubmit={onSubmit} style={{display: "inline-block"}}>
            <div className="row mx-auto my-3">
                <input
                    name="username"
                    value={username}
                    onChange={onChange}
                    type="text"
                    placeholder="Full Name"
                />
            </div>
            <div className="row mx-auto my-3">
                <input
                    name="email"
                    value={email}
                    onChange={onChange}
                    type="text"
                    placeholder="Email Address"
                />
            </div>
            <div className="row mx-auto my-3">
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={onChange}
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div className="row mx-auto my-3">
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
            </div>
            <div className="row mx-auto my-3">
                <label className="mx-auto">
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={onChangeCheckbox}
                        className="ml-2"
                    />
                </label>
            </div>
            <div className="row mx-auto my-3">
                <label className="mx-auto">
                    Helper:
                    <input
                        name="isHelper"
                        type="checkbox"
                        checked={isHelper}
                        onChange={onChangeCheckbox}
                        className="ml-2"
                    />
                </label>
            </div>

            <button className="mx-auto my-3" type="submit" disabled={isInvalid}>
                Sign Up
            </button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default withRouter(SignUpForm)
