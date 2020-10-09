import React from 'react'
import "./header.css"

function header() {
    return (
        <div className = "header">
        <div className ="app__header">
            <img
                className = "app__header__image"
                src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt = "Instagram logo">            
            </img>
            
        </div>
        </div>
    )
}

export default header
