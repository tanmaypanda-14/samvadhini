import React from 'react'
import "./altresponse.css";

function Altresponse(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
<<<<<<< HEAD
            <button className='close-btn' onClick={() => props.setTrigger(false)}><i class="fa fa-times" style={{color:"black"}}></i></button>
=======
            <button className='close-btn' onClick={() => props.setTrigger(false)}><i class="fa fa-times" style={{color:"white"}}></i></button>
>>>>>>> newone2
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Altresponse;