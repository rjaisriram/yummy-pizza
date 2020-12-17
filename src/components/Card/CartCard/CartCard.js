import React,{ useState} from 'react'

import {API} from '../../../config'
import { removeItem, updateItem ,updateSize , updatePrice} from '../../../Screen/CartHelper'
import './CartCard.css'

const CartCard = ({product , setRun = f => f, run = undefined}) => {
    const [setCount] = useState('')
    const [setSize] = useState('')
 
    const handleCartUpdate = productId => e => {
        setRun(!run)
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if(e.target.value >= 1){
            updateItem(productId, e.target.value)
            window.location.reload()
        }
    } 

    const showCartUpdateOptions = () => (
                    <select className='Cart-select' value={product.count} onChange={handleCartUpdate(product._id)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
    )

    const handleSizeUpdate = productId => e => {
        let pizzaSize = e.target.value
        let pizzaPrice = product.price
        setRun(!run)
        setSize(e.target.value )
            updateSize(productId, parseInt(pizzaSize))
            updatePrice(productId , parseInt(pizzaSize) , parseInt(pizzaPrice))
            window.location.reload()
    }

    const showSize = () => (
        <select className='ml-3 Cart-size mt-3' value={product.size} onChange={handleSizeUpdate(product._id)}>
            <option value='0'>small</option>
            <option value='50'>medium</option>
            <option value='100'>large</option>
        </select>
    )
    
    const showRemoveOption = () => (
                <div onClick={() => {
                    removeItem(product._id)
                    setRun(!run)
                    window.location.reload()
                }}
                className='mt-3 ml-5 Cart-remove_button' >
                    <i class="far fa-1x fa-times-circle"></i>
                </div>
    )

    let updatePizzaPrice = (product.price + product.size)
                console.log(updatePizzaPrice);
    return(
        <div className='Cart-card_box'>
        <img className='Cart-card_image' src={`${API}/product/photo/${product._id}`} alt={product.name} />
        <div className='Cart-card_pizza-details'>
        <div>
        <h4 className='Cart-card_title'>{product.name}({updatePizzaPrice})</h4>
        {showCartUpdateOptions()}
        {showSize()}
        </div>
        {showRemoveOption()}
        </div>
        </div>
    )
}

export default CartCard