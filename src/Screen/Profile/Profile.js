import React , {useState , useEffect} from 'react';
import {Link , Redirect} from 'react-router-dom';
import {read ,isAuthenticated, update , updateUser} from '../ScreenApi';

import './Profile.css'

const Profile = ({ match }) => {
    const [values , setValues] = useState({
        name: '',
        email: '',
        password: '', 
        error: false,
        success: false,
        loggedIn: false 
    }) 

    const {token} = isAuthenticated();
    const {name , email, password , error, success , loading} = values;

    const init = userId => {
        read(userId , token).then(data => {
            if(data.error){
                setValues({...values , error: true});
            }else{
            setValues({...values,name: data.name , email: data.email})          }
        })
    }

    useEffect(() => {
        init(match.params.userId);
    },[])

    const handleChange = name => e => {
        setValues({...values , error: false , [name]: e.target.value})
    }

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId , token , {name , email , password}).then(data => {
            if(data.error){
                alert(data.error)
            }else{
                updateUser(data , () => {
                    setValues({
                        ...values , name: data.name, email: data.email , success: true
                    })
                    alert('your profile has been updated!')
                })
            }
        })
    }

    const redirectUser = success => {
        if(success){
            return <Redirect to='/' />
        }
    }

    const profileUpdate = (name , email, password) => (
        <form className='profile-update_form' onSubmit={clickSubmit}>
            <div className='form-group'>
                <input type='text' onChange={handleChange('name')} className='form-control profile-update_input-size
' value={name} />
                </div>
                <div className='form-group'>
                <input type='text' onChange={handleChange('email')} className='form-control profile-update_input-size
' value={email} />
                </div>
                <div className='form-group'>
                <input type='password' placeholder='change password' className='form-control profile-'onChange={handleChange('password')} className='form-control profile-update_input-size
' value={password} />
                </div>
                <button className='btn button_color profile-button'>Update Profile</button>
        </form>
    )

    return(
        <div className='profile-update_page'>
            <h1 className='profile-update_title'>Update your profile</h1>
            {profileUpdate(name , email, password)}
        </div>
    )
}

export default Profile