import React ,{useState} from 'react'
import { Redirect} from 'react-router-dom'

import {addItem} from '../../../Screen/CartHelper'
import ShowImage from '../../../Screen/ShowImage/ShowImage'
import './ProductCard.css'
 
const Card = ({product}) => {

    const [redirect, setRedirect] = useState(false)

    const addToCart = () => {
        addItem(product, setRedirect(true))
    }
  
    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to='/order-online' />
        }
    }
    
    return(
        <div className='Product-card_box mb-5'>
        {shouldRedirect(redirect)}
        <ShowImage item={product._id} />
        <div className='Product-card_text-box'>
        <h4 className='Product-card_title'>{product.name}</h4>
        <p className='Product-card_description'>{product.description}</p>
        </div>
        <button onClick={addToCart} className='button_color Product-card_button'>
        <h6 className='Product-card_button-text'>₹ {product.price}</h6>
        <h6 className='Product-card_button-text'>Add to cart</h6>
        </button>
        </div>
    )
}

export default Card