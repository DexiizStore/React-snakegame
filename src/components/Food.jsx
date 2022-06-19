import React from "react";
import apple from '../assets/apple.png'

export default (props) =>{
    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return(
        <img src={apple} alt='apple' className="snake-food" style={style} />
    )
    }