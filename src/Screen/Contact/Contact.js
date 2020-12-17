import React,{useState} from 'react'

import { contact } from '../ScreenApi'
import Message from '../../components/Popup/popup'

import './Contact.css'

const Contact = () => {

    const [values , setValues] = useState({
        name : '',
        email : '',
        message : '',
        loading : false,
        success: false,
        error: false
    })
 
    const {name , email , message , loading , error , success} = values

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values , loading: true})
        contact({name , email , message}).then(data => {
            if(data.error){
                setValues({...values , error: data.error})
            } else {
                setValues({...values , success: data.message , loading: false , name: '' , email: '' , message: ''})
            }
        })
    }

    const handleChange = name => e => {
        setValues({...values , [name]: e.target.value , error: false , success: false})
    }

    const showError = () => (
        error ? <Message styles="error" name={error}/> : ''
    )

    const showResults = () => (
        success ? <Message styles="success" name={success} /> : ''
    )

    const showLoading = () => (
        loading ? <Message styles="loading" name="Loading..." /> : ''
    )

    return(
        <React.Fragment>
        {showResults()}
        {showLoading()}
        {showError()}
        <form  onSubmit={handleSubmit} className='form-page'>
        <h1 className='form-page_title'>Contact Us</h1>
        <div className='form-input_group mb-3'>
        <div className='form-group'>
            <input type='text' placeholder='enter your name' onChange={handleChange('name')} required value={name} className='form-control form-input_size' />
        </div>

        <div className='form-group'>
            <input type='email' placeholder='enter your email' onChange={handleChange('email')} required value={email} className='form-control form-input_size' />
        </div>

        </div>

        <div className='form-group'>
            <textarea rows='6' type='text' placeholder='enter your message' onChange={handleChange('message')} required value={message} className='form-control form-textarea' />
        </div>

        <div className='form-group'>
        <button type='submit' className='button_color Contact_button'>Submit</button>
        </div>
        </form>
        </React.Fragment>
    )
}

export default Contact