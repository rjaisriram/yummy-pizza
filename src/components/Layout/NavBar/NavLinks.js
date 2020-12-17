import React from 'react'
import {Link , withRouter} from 'react-router-dom'

import {signout , isAuthenticated} from '../../../Screen/ScreenApi'
import './NavBar.css'

const NavLinks = ({history}) => {
    return (
        <ul className='side-bar'>
            <li className='nav-link Nav-side-bar Nav-close'>
            close
            </li>
            <li className='nav-link Nav-side-bar'>
                <Link to='/order-online'>
                Order Online
                </Link>
            </li>
 
            <li className='nav-link Nav-side-bar'>
                <Link to='/'>
                Contact us
                </Link>
            </li>

            <li className='nav-link Nav-side-bar'>
                <Link to='/admin'>
                Dashboard
                </Link>
            </li>

            {!isAuthenticated() && (
            <li className="nav-link Nav-side_btn">
                <Link style={{color: '#f4f4f4'}} className="Nav-auth_btn" to='/signin'>
                Sign In
                </Link>
            </li>
        )}

        {!isAuthenticated() && (
            <li className="nav-link Nav-side_btn">
                <Link style={{color: '#f4f4f4'}} className="Nav-auth_btn" to='/signup'>
                    Sign Up
                </Link>
            </li>
        )}

        {isAuthenticated() && (
            <li className="nav-link Nav-side_btn">
                <Link style={{color: '#f4f4f4'}} className="Nav-auth_btn" 
                 onClick={() => signout(() => {
                    history.push('/signin')
                })}
                >
                    Sign Out
                </Link>
            </li>
        )}
        </ul>
    )
}

export default withRouter(NavLinks)