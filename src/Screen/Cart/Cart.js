import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {getCart} from '../CartHelper'
import CartCard from '../../components/Card/CartCard/CartCard'

import {isAuthenticated} from '../ScreenApi'
import {getPurchaseHistory} from '../Dashboard/ApiDashboard'
import './Cart.css'

const Cart = () => {
    const [items,setItems] = useState([])
    const [run,setRun] = useState(false)
    const [history , setHistory] = useState([])
    useEffect(() => {
        setItems(getCart())
        init(_id , token)
    },[run])

    const {
        user: { _id }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId , token) => {
        getPurchaseHistory(userId , token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setHistory(data)
            }
        })
    }

    const showItems = items => {
        return(
            <div>
            <h2 className='Cart-page_title'>your cart has {`${items.length}`} pizza's</h2>
            {items.map((product, i) => (
                <CartCard 
                    key={i} 
                    product={product}
                    />
            ))}
            </div>
        )
    }

    const getTotal = () => {
        return items.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const getUpdatedTotal = () => {
        return items.reduce((currentValue, nextValue) =>{
            return currentValue + (nextValue.count * (nextValue.size + nextValue.price))
        },0)
    }
 
    const TotalAmount = () => (
        <>
        {items.updatedPrice = 0 ? getTotal() : getUpdatedTotal()}
        </>
    )

    return(
        <div>
            {items.length > 0 ? (
                <div className="Cart-page">
        <section id='Cart-product_list-box'>
        {showItems(items)}
        </section>
        <section id='Cart-product_checkout-box'>
        <h2 className="Cart-page_price">Total: ₹{TotalAmount()}</h2>
        <Link to='/checkout'>
        <button className='button_color Cart-checkout'>Procceed to checkout</button>
        </Link>
        </section>
        </div> 
            ): (
                <div className='cart-empty'>
                    <h2 className='mr-4'>Your cart is Empty! <Link to='order-online'>Continue Shopping</Link></h2>
                </div>
            )}
        </div>
    )
}

export default Cart