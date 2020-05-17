import React from 'react'

import { SignUpLink } from '../SignUpPage'
import SignInForm from './SignInForm';

const SignInPage = () => (
    <div className="container text-center">
        <h1 className="display-2">SignIn</h1>
        <div className="container">
            <SignInForm />
        </div>
        <SignUpLink />
    </div>
)

export default SignInPage

export { SignInForm }
