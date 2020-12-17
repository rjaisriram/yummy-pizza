import React,{useState , useEffect} from 'react'
import {isAuthenticated} from '../../ScreenApi'
import {Link} from 'react-router-dom'
import {getPurchaseHistory,getStatus, updateOrderStatus} from '../ApiDashboard'
import moment from 'moment'
import {API} from '../../../config'

import './ClientDashboard.css'

const ClientDashboard = () => {
 
    const [history , setHistory] = useState([]);
    const [status , setStatus] = useState([]);
    const {
        user: {_id , name , email, role}
    } = isAuthenticated();

    const token = isAuthenticated().token

    const loadStatus = () => {
        getStatus(_id , token).then(data => {
            if(data.error){
                console.error(data.error)
            }else{
                setStatus(data) 
            }
        })
    }

    const handleCancelOrders = (e, orderId) => {
        updateOrderStatus(_id , token , orderId , e).then(data => {
            if(data.error){
                alert('your Cancel request failed! Pls try again.')
            }else{
                alert('Your Order has been canceled!')
                window.location.reload()
            }
        }) 
    }

    const init = (userId , token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error){
                console.error(data.error)
            }else{
                setHistory(data)
            }
        })
    }


    useEffect(() => {
        init(_id , token)
        loadStatus()
    },[])


    const sideButtons = (h) => (
        <div className="side-buttons_box">
        <i class="fas fa-ellipsis-v side-buttons_dropdown"></i>
        <div className='side-buttons_dropdown-content'>
            <h6>{h.status}</h6>
            <hr />
            <h6>{moment(h.createdAt).format('l')}</h6>
            {h.status === 'Cancelled' ? '' : (
            <>
            <hr/>
            <h6 style={{color: 'red' , cursor: 'pointer'}} onClick={e => handleCancelOrders('Cancelled', h._id)} >Cancel</h6>
            </>
            )}
        </div>

        </div>
    )

    return (
        <div className='client-dashboard_page'>
        {history.length > 0 ? (<><h1 className='client-dashboard_page-title'>{name} your orders has been listed below.</h1>
            {history.map((h , i) => (
                <div key={i} className='client-dashboard_history-box'>
                    <div>
                    {h.products.map((p , k) => (
                        <div key={k} className='order-history_product-box'>
                        <img className='order-history_product-image' src={`${API}/product/photo/${p._id}`} alt={p._id} />
                        <div className='order-history_product-name'>
                        <h6>
                        {p.name}
                        </h6>
                        <h6>
                        ₹{p.price}
                        </h6>
                        </div>
                        
                        </div>
                    ))}
                    </div>
                    <h6 className='order-history_web-view' >{h.status}</h6>
                    <h6 className='order-history_web-view' >{moment(h.createdAt).format('l')}</h6>
                    {h.status === 'Cancelled' ? '' : <i  onClick={e => handleCancelOrders('Cancelled', h._id)} className="order-history_web-view far fa-times-circle client-dashboard_history-cancel"></i>}
                    {sideButtons(h)}
                </div>
            ))}</>) : (<h2 className="client-dashboard_empty" >you havn't ordered anything yet.</h2>)}
        </div>
    )
}

export default ClientDashboard
