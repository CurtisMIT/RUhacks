import React from 'react';

function Landing() {
    return (
        <div className="container jumbotron text-center my-3">
            <h1 className="display-1 mx-auto mb-3">Helpify</h1>
            <p className="lead my-5">
                We noticed that during COVID-19 many people face many difficulties due to personal accessibility needs. In order to ensure that everyone is taken care of during these harsh times, we designed a web application that will connect volunteers to people in thier community who need help.
            </p>
            <hr class="my-4"></hr>
            <p className="lead my-5">
                With Helpify, users who are unable to go out and obtain the essentials will be able to connect with those in their community who are able to lend a helping hand. 
            </p>
            
            <a href="signup" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Sign up!</a>

        </div>
    )
}

export default Landing;