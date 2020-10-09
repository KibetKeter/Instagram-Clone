import React  from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';



function posts({username, caption ,imageUrl}) {
    return (

        <div className = "post__container">
            <div className = "post__header">
                <div className = "avatar__style">
                    <Avatar 
                        alt= {username}
                        src="/static/images/avatar/1.jpg"
                    />
                </div>
            <h3>{username}</h3>
        </div>
            {/* Header -> Avatar + username*/}

            {/* Image */}
            <img
            src = {imageUrl}
            className = "post__image">   
            </img>

             {/* Username + Caption*/}
            <h4 className = "post__text"> <strong>{username}</strong>:{caption}</h4>
        </div>
    )
}

export default posts
