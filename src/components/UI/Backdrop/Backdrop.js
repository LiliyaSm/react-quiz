import React from 'react';
import  "./Backdrop.css";

const Backdrop = props => {
    return (<div className = "Backdrop" 
    onClick = {props.onClick}></div>)
}

export default Backdrop;