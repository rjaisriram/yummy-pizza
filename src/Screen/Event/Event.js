import React,{useState} from 'react'

import { eventBooking } from '../ScreenApi'
import './Event.css'

const EventBookings = () => {

    const [values , setValues] = useState({
        name: '',
        email: '',
        number: '',
        event: '',
        date: '',
        loading: false,
        error: false,
        success: false
    })

    console.log(values);

    const {name , email, number, event, date, loading , error, success} = values

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values , loading: true})
        eventBooking({name , email, number, event, date}).then(data =>{
            if(data.error){
                setValues({...values , error: data.error , loading: false})
            }else{
                setValues({...values , success: true , loading: false})
            }
        })
    }

    const handleChange = name => e => {
        setValues({...values , [name]: e.target.value , error: false , success: false})
    }

    const showError = () => (
        error ? <div className="alert alert-danger">{error}</div> : ''
    )

    const showSuccess = () => (
        success ? <div className='alert alert-success' >Your booking has been comfirmed, we will contact you soon.</div> : ''
    )

    const showLoading = () => (
        loading ? <div className="alert alert-info">Loading...</div> : ''
    )

    return (
        <div className='event-booking-page'>
        {showLoading()}
        {showError()}
        {showSuccess()}
            <form onSubmit={handleSubmit} className='form-group'>
                <h1 className='event-booking_title'>Book our Restaurant for special events.</h1>
                <p className='event-booking_info'>(We will contact within 2 working days after submission.)</p>
                <div className='form-group'>
                    <input type='text' className=' event-booking_input-size form-control' placeholder='please enter your name' onChange={handleChange('name')} required value={name} />
                </div>
                
            <div className='form-group'>
                    <input type='email' className=' event-booking_input-size form-control' placeholder='please enter your email' onChange={handleChange('email')} required value={email} />
                </div>
                
            <div className='form-group'>
                    <input type='number' className=' event-booking_input-size form-control' placeholder='please enter your mobile number' onChange={handleChange('number')} required value={number} />
                </div>

            
                <div className='form-group'>
                <select className='form-control event-booking_input-size ' onChange={handleChange('event')} required value={event} placeholder='please a event'>
                    <option value='please select a event'>please select a event</option>
                    <option value='birthday'>birthday</option>
                    <option value='catering'>catering</option>
                </select>
                </div>

                <div class="form-group">
                <input class="form-control event-booking_input-size " type="datetime-local" value={date} onChange={handleChange('date')} id="example-datetime-local-input" />
                </div>

                <button class="btn button_color event-booking_button">Book now</button>

            </form>

        </div>
    )
}

export default EventBookings
