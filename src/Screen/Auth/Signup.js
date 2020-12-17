import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import { preSignup } from '../ScreenApi'
import './Auth.css'

const SignUp = () => {

    const [values , setValues] = useState({
        name : '',
        email : '',
        password: '',
        loading: false,
        error: false,
        success: false
    })

    const {name , email , password , loading , error , success} = values

    const handleChange = name => e => {
        setValues({...values, error: false , [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values , loading: true})
        preSignup({name , email , password}).then(data => {
            if(data.error){
                setValues({...values, error:data.error , loading: false})
            }else {
                setValues({...values, loading: false , success: true})
            }
        })
    }

    const showError = () => (
        error ? <div>error</div> : ''
    )

    const showLoading = () => (
        loading ? <div>loading...</div> : ''
    )

    const showSuccess = () => (
        success ? <div>success</div> : ''
    )

    return(
        <form onSubmit={handleSubmit} className='auth-page'>
        <div className='auth-page_box auth_sign_up-box'>
        <h1 className='auth-page_title mb-1'>Yummy Pizza</h1>
        <p className='auth-page_description'>Already have an account? <Link to='/signin'>Sign In</Link></p>
        <div className='form-group'>
        <input type='text' value={name} onChange={handleChange('name')} placeholder='enter your name' className='form-control auth-page_input-field' />
        </div>
        <div className='form-group'>
        <input type='email' value={email} onChange={handleChange('email')} placeholder='enter your email address' className='form-control auth-page_input-field' />
        </div>
        <div className='form-group mt-3'>
        <input type='password' value={password} onChange={handleChange('password')} placeholder='enter your password' className='form-control auth-page_input-field' />
        </div>
        <div className='form-group mt-4'>
        <button className='btn btn-block auth-page_button button_color Auth-input_size'>Sign up</button>
        </div>
        </div>
        </form>
    )
}

export default SignUp