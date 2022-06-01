import React from "react";
import "../css/popup.css";

//popup that contains the job description triggered from hitting elipse in jop post box
function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                {props.children}
            </div>


        </div>
    ) : "";
}

export default Popup;