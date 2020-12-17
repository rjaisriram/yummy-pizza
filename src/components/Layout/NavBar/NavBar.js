import React,{useEffect} from 'react';
import {Link , withRouter} from 'react-router-dom'

import { itemTotal } from '../../../Screen/CartHelper'
import {signout, isAuthenticated } from '../../../Screen/ScreenApi'
import './NavBar.css'
import NavLinks from './NavLinks';

const NavBar = ({history}) => { 
    const navSlide = () =>{
        const burger = document.querySelector('.Nav-mobile_ham-burger')
        const close = document.querySelector('.Nav-close')
        const nav = document.querySelector('.side-bar')
        const backDrop = document.querySelector('.Layout-Backdrop')

        burger.addEventListener('click', () => {
            nav.classList.toggle('Nav-active')
            backDrop.classList.toggle('backdrop-deactive')
        })
        close.addEventListener('click', () => {
            nav.classList.toggle('Nav-active')
            backDrop.classList.toggle('backdrop-deactive')
        })
    }
 
    // const user = isAuthenticated().user.name

    useEffect(() => {
        navSlide()
    },[])

    return(
    <nav className="Nav-box">
    <div className="Nav-bar_left">
    <Link to="/"><h6 className="Nav-title"><span>Yummy</span> Pizza</h6></Link>
    <div>
    <NavLinks />
    </div>
    </div>
    <ul className="Nav-right">

        <li className="nav-link Nav-right-web">
            <Link to="/order-online">
                Order Online
            </Link>
        </li>
        <li className="nav-link Nav-cart">
        <Link to="/cart"><i className="fas fa-shopping-bag"></i>
        <small className="button_color Nav-cart_count">{itemTotal()}</small>
        </Link>
        </li>
        <li className="nav-link Nav-right-web">
            <Link to="/contact">
                Contact us
            </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-link Nav-right-web">
            <Link to="/order-history">
                your orders
            </Link>
        </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-link Nav-right-web">
            <Link to="/admin">
                Dashboard
            </Link>
        </li>
        )}

        {!isAuthenticated() && (
            <li className="nav-link Nav-right-web">
                <Link style={{color: '#f4f4f4'}} className="button_color Nav-auth_btn" to='/signin'>
                Sign In
                </Link>
            </li>
        )}

        {!isAuthenticated() && (
            <li className="nav-link Nav-right-web">
                <Link style={{color: '#f4f4f4'}} className="button_color Nav-auth_btn" to='/signup'>
                    Sign Up
                </Link>
            </li>
        )}

        {isAuthenticated() && (
            <li className="nav-link Nav-right-web">
                <Link style={{color: '#f4f4f4'}} className="button_color Nav-auth_btn" 
                onClick={() => signout(() => {
                    history.push('/signin')
                })}
                to='/signin'
                >
                    Sign Out
                </Link>
            </li>
        )}
        <div className="Nav-mobile_ham-burger">
        <div className="Line" />
        <div className="Line" />
        <div className="Line" />
        </div>
    </ul>
    </nav>
    )
}

export default withRouter(NavBar);