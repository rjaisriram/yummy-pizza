import React,{useState , useEffect} from 'react'
import {forgotPassword} from '../ScreenApi'

import './Auth.css'

const ForgotPassword = () => {

    const [values , setValues] = useState({
        email: '',
        message: '',
        error: false,
        loading: false,
        showForm: true
    })

    const {email, message , error, loading , showForm} = values

    const handleChange = name => e =>{
        setValues({...values, message: '' , error: false , [name] : e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values, message: '' , error: false, loading: true})
        forgotPassword({email}).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }else{
                setValues({...values, message: data.message , error: false , loading: false , showForm: false})
            }
        })
    }

    const showLoading = () => (loading ? <div className="message-font alert alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className='message-font alert alert-danger'>Something went wrong. please try again.</div> : '')
    const showMessage = () => (message ? <div className='message-font alert alert-success'>{message}</div> : '')

    const passwordForgotForm = () =>( 
        <form className='form-group' onSubmit={handleSubmit}>
            <input type='email' onChange={handleChange('email')} className='form-control auth-page_input-field' value={email} placeholder='please enter your email address' required />
            <button className='btn button_color forgot-password_button'>Send password reset link</button>
        </form>
    )

    return (
        <div className='forgot-password_page'>
            <h1 className='forgot-password_page-title'>Forgot Password</h1>
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && passwordForgotForm()}
        </div>
    )
}

export default ForgotPassword
