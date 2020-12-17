import React from 'react'

import {API} from '../../config'
import './ShowImage.css'

const ShowImage = ({item}) => {

    return(
        <div>
        <img className='Product-image' src={`${API}/product/photo/${item}`} alt={`${item}`} />
        </div>
    ) 
}

export default ShowImage