import React , {useState} from 'react';
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

import { signin , authenticate , isAuthenticated } from '../ScreenApi'
import './Auth.css'

const SignIn = () => {

    const [values , setValues] = useState({
        email: 'newuser1@gmail.com',
        password: 'newuser1',
        error: '',
        loading: '',
        redirectToReferrer: false
    })
    const {email, password , loading, redirectToReferrer , error} = values

    const handleChange = name => e => {
        setValues({...values, error: false , [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values, loading: true})
        signin({email , password}).then(data => {
            if(data.error){
                setValues({...values, error: data.error , loading: false})
            } else {
                authenticate(data , () => {
                    setValues({...values , redirectToReferrer: true})
                })
            }
        })
    }

    const redirectUser = () => {
        if(redirectToReferrer){
           return <Redirect to="/" />
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    return(
        <form onSubmit={handleSubmit} className='auth-page'>
        <div className='auth-page_box'>
        <h1 className='auth-page_title mb-1'>Yummy Pizza</h1>
        <p className='auth-page_description'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        
       {redirectUser()} 
        <div className='form-group mt-4'>
        <input type='email' onChange={handleChange('email')} value={email} placeholder='enter your email address' className='form-control auth-page_input-field' />
        </div>
        <div className='form-group mt-3'>
        <input type='password' onChange={handleChange('password')} value={password} placeholder='enter your password' className='form-control auth-page_input-field' />
        </div>
        <div className='form-group mt-4'>
        <Link className='auth-page_forgot-password' to='/forgot-password'>forgot password?</Link>
        <button className='btn btn-block button_color auth-page_button'>Log In</button>
        </div>
        </div>
        </form>
    )
}

export default SignIn