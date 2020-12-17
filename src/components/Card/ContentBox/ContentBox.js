import React from 'react'

import './ContentBox.css'

const ContentBox = (props) => {
    return(
        <div className="ContentBox">
        <h2 className='ContentBox-count mt-2'>
        {props.count}
        </h2>
        <h6 className='ContentBox-title'>
        {props.title}
        </h6>
        </div>
    )
}

export default ContentBox