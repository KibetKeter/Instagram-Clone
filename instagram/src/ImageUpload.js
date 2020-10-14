import { Button, Icon, IconButton, Input, makeStyles, TextField } from '@material-ui/core'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import React, {useState} from 'react'
import  { db, auth,storage} from './firebase';
import firebase from 'firebase';
import "./imageUpload.css"


function ImageUpload({username}) {

    // States are written within the main function
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState('');
    const [image, setImage] = useState('');
    // const [caption, setCaption] = useState('');

//  Variable to strore function 

    const handleChange = (event) => 
                                    {
                                        if(event.target.files[0])
                                        {
                                            setImage(event.target.files[0]);
                                        }
                                    }; 

    const handleUpload = () =>
                                {
                                    const uploadtask = storage.ref(`images/${image.name}`).put(image);
                                    // Progress bar function
                                    uploadtask.on(
                                                    "state_changed",
                                                        (snapshot) => 
                                                            {
                                                                // Progress bar logic
                                                                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                                                                setProgress(progress);                                               
                                                            },
                                                            // Error functions
                                                        (error) => 
                                                            {   
                                                                console.log(error);
                                                                alert(error.message);
                                                            }, 
                                                        () => 
                                                            {
                                                                // Complete function 
                                                                storage
                                                                .ref("images")
                                                                .child(image.name)
                                                                .getDownloadURL()
                                                                .then(url => 
                                                                            {
                                                                                // Post images in the Database 
                                                                                db.collection('posts').add({
                                                                                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                                                                                    caption:caption,
                                                                                    imageUrl:url,
                                                                                    username:username
                                                                                });

                                                                            // Resetting progress bar after complete upload
                                                                                setProgress(0);
                                                                                setCaption("");
                                                                                setImage("");
                                                                            }
                                                                    )
                                                            }
                                                )
                                            };
// Icon Pack

const useStyles = makeStyles((theme) => ({
    root: {
        '& > span': {
        margin: theme.spacing(2),
        },
    },
    }));
    
const classes = useStyles();
    return (
        <div className = "image__upload">
            {/* I want to have a Caption input , File picker, Post Button */}
            <progress className = "imageupload__progress" value ={progress} max = "100"/><br/>

            <TextField id="outlined-basic"  variant="outlined"type = "text" onChange = {event => setCaption(event.target.value)} value={caption}placeholder = "Enter a Caption ..."/><br/>
                <div className = "upload">
                        <BackupOutlinedIcon/>&nbsp;
                        <input onChange = {handleChange} type = "file"/>
                </div>
                    <Button color="primary" onClick = {handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
