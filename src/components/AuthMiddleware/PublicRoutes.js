import React ,{Component} from 'react'
import {Route , Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../Screen/ScreenApi'

const PublicRoute = ({component: Component , ...rest}) => (
    <Route
    render = {props => 
    isAuthenticated() ? (
        <Component {...props}/>
    ) : (
        <Redirect
        to={{
            pathname: '/signin',
            state: {from : props.location}
        }}
         />
    )
    }
     />
)

export default PublicRoute;