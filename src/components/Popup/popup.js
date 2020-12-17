import React, {useEffect} from "react"

import "./popup.css"

const Message = props => {

    const handleChange = () => {
        const back = document.querySelector(".message-backdrop");
    const cut = document.querySelector(".x");
    cut.addEventListener("click", () => {
      back.classList.toggle("message-Deactive");
    });
    }

    useEffect(() => {
        handleChange()
    } , [])

    return(

        <div className='message-backdrop'>
        <div className={`alert message-header ${props.styles}`} >
        <div className='x'><i className="fas fa-2x fa-times-circle"></i></div>
        {props.name}
        </div>
        </div>

    )
}

export default Message