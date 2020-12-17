import React ,{useState, useEffect} from 'react'
import {resetPassword} from '../ScreenApi'


const ResetPassword = ({ match }) => {

    const [values , setValues] = useState({
        name: '',
        password: '',
        reEnterPassword: '',
        error: '',
        message: '',
        showForm: true
    })

    let passwordToken = match.params.passwordId
    console.log(passwordToken);

    const {name, password , reEnterPassword , error , showForm , message} = values

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            resetPasswordLink: passwordToken , newPassword: password
        }).then(data => {
            if (data.error){
                setValues({...values , error : data.error , showForm : false , password: ''})

            }else{
                setValues({...values , message: data.message , showForm : false , password: '' , error: ''})
            }
        })
    }

    const passwordResetForm = () => (
        <form className="form-group" onSubmit={handleSubmit}>
            <input type="password" className="form-control auth-page_input-field" value={password} required onChange={e => setValues({...values, password: e.target.value})} placeholder="enter your new password" />
            <input type="password" className="mt-3 mb-3 form-control auth-page_input-field" value={reEnterPassword} required onChange={e => setValues({...values, reEnterPassword: e.target.value})} placeholder="re-enter your new password" />
            {password === reEnterPassword ? (<button className="btn button_color reset-password_button">Reset password</button>) : (<button className="btn button_color reset-password_button" disabled>Reset password</button>)}
        </form>
    ) 

    const showError = () => (error ? <div className='message-font alert alert-danger'>Something went wrong. please try again.</div> : '')
    const showMessage = () => (message ? <div className='message-font alert alert-success'>{message}</div> : '')

    return (
        <div className='reset-password_page'>
            <h1 className='forgot-password_page-title'>Reset Password</h1>
            {showError()}
            {showMessage()}
            {passwordResetForm()}
        </div>
    )
}

export default ResetPassword
