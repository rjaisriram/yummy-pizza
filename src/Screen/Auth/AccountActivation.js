import React,{useEffect , useState} from 'react'
import jwt from 'jsonwebtoken'
import { withRouter } from 'react-router-dom'
import { signup } from '../ScreenApi'

const AccountActivation = ({ match }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    })

    const {name ,email , password ,  error , loading , success, showButton} = values

    let token = match.params.tokenId;

    useEffect(() => {
        if (token) {
            const {name , email , password} = jwt.decode(token)
            setValues({...values, name , email , password})
        }
    },[])

    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, loading: true , error: false})
        signup({name , email , password}).then(data =>{
            if (data.error) {
                setValues({...values, error: data.error , loading: false , showButton: false})
            }else{
                setValues({...values, loading:false , showButton: false ,success: true})
            }
        })
    }

    const showSuccess = () => (success ? <h4>Your Account has been Activated.</h4> : '') 
    const showError = () => (error ? <h4>This Link is expired</h4> : '')
    const showLoading = () => (loading ? <h4>loading...</h4> : '')

    return (
        <div className='account-activation_page'>
        <div className='account-activation_box'>
            <h1 className='account-activation_title'>hi {name} , please click the button below to activate your Account.</h1>
            {showLoading()}
            {showError()}
            {showSuccess()}
            {showButton && (<button onClick={clickSubmit} className='mt-3 btn button_color account-activation_button'>Activate Account</button>)}
        </div>
        </div>
    )
}

export default AccountActivation
