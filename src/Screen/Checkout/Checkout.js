import React ,{useState,useEffect} from 'react'
import { emptyCart,getCart } from '../CartHelper'
import { isAuthenticated, getBraintreeClientToken, processPayment, createOrder } from '../ScreenApi'
import {Link} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

import './Checkout.css'

const Checkout = ({setRun =f=>f, run = undefined}) => {
    const [data,setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: []
    })

    const [pizzaAddress , setAddress] = useState({
        plotNumber: '',
        streetName: '',
        town: '',
        pincode: '',
        phoneNumber: ''
    })

    const {plotNumber , streetName , town , pincode , phoneNumber} = pizzaAddress

    console.log(data);
    const [products,setProducts] = useState([])
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setData({clientToken: data.clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId,token)
        setProducts(getCart())
    },[])

    const getUpdatedTotal = () => {
        return products.reduce((currentValue, nextValue) =>{
            return currentValue + (nextValue.count * (nextValue.size + nextValue.price))
        },0)
    }

    console.log(getUpdatedTotal());

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to='/signin'>
                <button className='btn btn-primary'>Sign in to checkout</button>
            </Link>
        )
    }

    const buy = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getUpdatedTotal(products)
                };
                
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: pizzaAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run);
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    })
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                setData({ ...data, error: error.message });
            });
    };

    const handleAddressChange = name => e => {
        setAddress({...pizzaAddress, [name]: e.target.value})
    }

    const showAddress = () => (
        <form className="form-group mb-3">
        <label className="text-muted">Plot No.</label>
        <input
            onChange={handleAddressChange('plotNumber')}
            className="form-control"
            value={plotNumber}
        />
        <label className="text-muted">Street Name</label>
        <input className="form-control" onChange={handleAddressChange('streetName')} value={streetName} />
        <label className="text-muted">Town</label>
        <input className="form-control" onChange={handleAddressChange('town')} value={town} />
        <label className="text-muted">Pincode</label>
        <input className="form-control" onChange={handleAddressChange('pincode')} value={pincode} />
        <label className="text-muted">Phone Number</label>
        <input className="form-control" onChange={handleAddressChange('phoneNumber')} value={phoneNumber} />
    </form>
    )

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                            
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        error && (
            <div className="alert alert-danger">{error}</div>
        )
    )

    const showSuccess = success => (
        success ? (
            <div className="alert alert-success Checkout-success_message"><h2 className='Checkout-success_message-title'>Thank you! your payment was successful.</h2>
            <div className="Checkout-success_redirect-link">
            <p><Link to='/order-online'>Continue Shopping</Link></p>
            <p>Or</p>
            <p><Link to='/'>Go Home</Link></p>
            </div>
            </div>
        ) : (
            <div className='container Checkout-container'>
        <section id='Checkout-bill'>
        {showAddress()}

        </section>
        <section id='Checkout-payment'>
        {showLoading(data.loading)}
        {showError(data.error)}
        {showCheckout()}
        </section>
        </div>
        )
    )

    const showLoading = loading => (
        loading && (
            <div className="alert alert-info">Loading...</div>
        )
    )

    return (
        showSuccess(data.success)
    )
}

export default Checkout