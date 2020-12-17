import React from 'react'

import './Inputpopup.css'

const InputPopup = ({title , icon , target ,input }) => {
    return(
        <div>
        <button
        type="button"
        className="input-popup_button"
        data-toggle="modal"
        data-target={`#${target}`}
      >
      <i className={`fas fa-${icon}`} />
       <h6 className='ml-2'>{title}</h6>
      </button> 

      <div
        class="modal fade"
        id={`${target}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title input-popup_title"
                id="exampleModalLabel"
              >
                {title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body Input-form_box">
              {input}
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default InputPopup