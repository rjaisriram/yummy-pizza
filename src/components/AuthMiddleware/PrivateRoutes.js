import React from 'react';
import {Route} from 'react-router-dom'
import NavBar from '../Layout/NavBar/NavBar'
import Footer from '../Layout/Footer/Footer'

export const PrivateRoute = ({component: Component , ...rest}) => {
    return(
        <Route {...rest} component={(props) => (
            <div>
                <NavBar />
                <Component {...props} />
                <Footer />
            </div>
        )}
        />
    )
}