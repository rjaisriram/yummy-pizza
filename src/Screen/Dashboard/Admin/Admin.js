import React,{useState , useEffect} from 'react'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

import {isAuthenticated} from '../../ScreenApi'
import CreateProduct from './Create/Product'
import CreateCategory from './Create/Category'

import {listOrder, getStatus, updateOrderStatus,pageNo, getPageNo} from '../ApiDashboard'
import './Admin.css'

const AdminDashboard = () => {

    const [orders , setOrders] = useState([])
    const [status, setStatus] = useState([])
    const {user , token} = isAuthenticated();

    let pageNumber = getPageNo()
    const loadOrders = () => {
        listOrder(user._id , token , pageNumber).then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                setOrders(data)
            }
        })
    }

    const loadStatus = () => {
        getStatus(user._id , token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                setStatus(data)
            }
        })
    }
    useEffect(() => {
        loadOrders()
        loadStatus()
    },[])

    const handlePageNumber = (pageNum) => {
        pageNo(pageNum)
        window.location.reload()
    }
 
    const handleStatusChange = (e , orderId) => {
        updateOrderStatus(user._id , token , orderId , e.target.value).then(
            data => {
                if(data.error){
                    console.log('status update failed');
                }else {
                    loadOrders()
                    window.location.reload()
                }
            }
        )
    }

    const showOrderStatus = o => (
        <div className="form-group Admin-orders_status">
            <select className="form-control" value={o.status} onChange={e => handleStatusChange(e, o._id)}>
            <option>Update status</option>
            {status.map((status , index) => (
                <option value={status} key={index}>
                    {status}
                </option>
            ))}
            </select>
        </div>
    )

    const showOrders = () => (
        <>
       <Table bordered  hover >
           <thead className='Admin-table_head'>
               <tr>
                   <th>User</th>
                   <th>Order ID</th>
                   <th>Pizza Name</th>
                   <th>Total Price</th>
                   <th>Transaction ID</th>
                   <th>Date</th>
                   <th>Order Status</th>
                   <th>Address</th>
               </tr>
           </thead>
           {orders.map((o , i)=> {
              return(<tbody key={i}>
                   <tr className='Admin-table_content'>
                       <td>{o.user.name}</td>
                       <td>{o._id}</td>
                       <td>
                           {o.products.map((p)=>(
                                   <div style={{padding: '5px 0'}}>{p.name} ({p.count})({p.size === 0 ? 'S' : p.size === 50 ? 'M' : 'L'})</div>
                           ))}
                       </td>
                       <td>₹ {o.amount}</td>
                       <td>{o.transaction_id}</td>
                       <td>{moment(o.createdAt).format("DD MMM YYYY")}</td>
                       <td>{showOrderStatus(o)}</td>
                       <td className='Admin-orders_address'><div>
                        <p>{o.address.plotNumber}</p>
                        <p>{o.address.streetName}</p>
                        <p>{o.address.town}</p>
                        <p>{o.address.pincode}</p>
                        <p>{o.address.phoneNumber}</p>
                        </div></td>
                   </tr>
               </tbody>)
           })}
       </Table>
       <div className="admin-orders_pagination">
       {pageNumber > 1 ? (<button onClick={() => handlePageNumber(pageNumber - 1)} className="btn btn-dark">Prev</button>) : ''}
       {orders.length === 5 ? (<button onClick={() => handlePageNumber(pageNumber + 1)} className="btn btn-dark">Next</button>) : '' }
       </div>
       </>
           )

    return (
        <div className="Admin">
        <section id='Admin-sidebar'>
        <div>
            <h2 className="Admin-title">ecom</h2>
        </div>
        <div className="mt-5">
        <div className="mt-4 Admin-sidebar_menu admin-order-highlight">
            <i className="fas fa-archive" />
            <h6 className="ml-2">Pizza Orders</h6>
        </div>
        <div className="mt-4 Admin-sidebar_menu">
            <CreateProduct />
        </div>
        <Link className="mt-4 Admin-sidebar_menu" style={{color: '#fff' , textDecoration: 'none'}} to='/manage-product'>
            <i className="fas fa-pen" />
            <h6 className="ml-2">Manage Product</h6>
        </Link>
        <div className="mt-4 Admin-sidebar_menu">
            <CreateCategory />
        </div>
        <Link to={`profile-update/${user._id}`} style={{color: '#fff' , textDecoration: 'none'}} className="mt-4 Admin-sidebar_menu">
            <i className="fas fa-user" />
            <h6 className="ml-2">Edit Profile</h6>
        </Link>
        <Link to="/" className="mt-4 Admin-sidebar_menu Admin-go-home">
            <i className="fas fa-home" />
            <h6 className="ml-2">Go Home</h6>
        </Link>
        </div>
        </section>
        <section id='Admin-orders'>
        {showOrders()}
        </section>
        </div>
    )
}

export default AdminDashboard