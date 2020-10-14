import React ,{useState , useEffect} from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';

function Posts({postId ,user, username, caption ,imageUrl})
 {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    useEffect(() => 
                    {
                        let unsubscribe;
                            if(postId)
                                {
                                    unsubscribe= db
                                                .collection('posts')
                                                .doc(postId)
                                                .collection("comments")
                                                .orderBy('timestamp','desc')
                                                .onSnapshot((snapshot) => 
                                                                            {
                                                                                setComments(snapshot.docs.map((doc) => doc.data()));
                                                                            }
                                                            );
                                }
                                return() => 
                                            {
                                                unsubscribe();
                                            };
                    },[postId]);

        const postComment = (event) =>
        {
                event.preventDefault();

                db.collection("posts").doc(postId).collection("comments").add(
                                                                                {
                                                                                text:comment,
                                                                                username:user.displayName,
                                                                                timestamp:firebase.firestore.FieldValue.serverTimestamp()
                                                                                }
                                                                            );
                                                                            setComment('');
        };
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
            <img src = {imageUrl} className = "post__image"></img>
             {/* Username + Caption*/}
            <h4 className = "post__text"> <strong>{username}</strong>:{caption}</h4> 

            {/* Already Posted Comments */}
             <div className="post__comments">
            <small>
                {comments.map((comment) =>
                (
                    <p>
                        <strong>{comment.username}</strong>&nbsp;
                         says&nbsp;{comment.text}<br/>
                    </p>
                ))}
            </small>
             </div>   
             { user && 
             (
                 <form className = "post__commentBox">
                 <input 
                     className = "post__input"
                     type ="text"
                     placeholder="Add a Comment..."
                     value = {comment}
                     onChange = {(event) => setComment(event.target.value)} />

                <button
                    className = "post__button"
                    disabled={!comment}
                    type="submit"
                    onClick ={postComment}>
                    Post
                </button>
             </form>
             )}

            
        </div>
    )
}
export default Posts
