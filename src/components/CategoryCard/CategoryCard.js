import React from 'react'
import { Link } from 'react-router-dom'

import './CategoryCard.css'

const CategoryCard = ({imageName , categoryName}) => {
    return (
        <div className='category-card'>
            <img src={require(`./Images/${imageName}`)} alt={`${imageName}`} className='category-card_image' />
            <Link to='/' className='category-card_button'>{categoryName}</Link>
        </div>
    )
}

export default CategoryCard
