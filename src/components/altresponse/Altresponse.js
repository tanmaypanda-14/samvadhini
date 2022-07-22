import React from 'react'
import "./altresponse.css";

function Altresponse(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}><i class="fa fa-times" style={{color:"black"}}></i></button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Altresponse;