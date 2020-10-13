import React ,{useState , useEffect} from 'react';
import './App.css';
import Header from './header.js'
import "./header.css"
import Posts from './Posts.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import  { db, auth} from './firebase';
import { Avatar, Button, TextField } from '@material-ui/core';
import ImageUpload from './ImageUpload.js';
import InstagramEmbed from "react-instagram-embed";

// Transition modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


// import firebase from firebase;
function App() {

  const [posts,setPosts] = useState([]);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn,setOpenSignIn] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleCloseSignIn = () => {setOpenSignIn(false)};

  useEffect (()=>
            {
              const unsubscribe = auth.onAuthStateChanged
                (
                        (authUser) => 
                          {
                            if(authUser)
                              {
                                  // If user has logged in
                                  console.log(authUser);
                                  setUser(authUser);
                              }
                            else
                              {
                                // User has logged out
                                setUser(null);
                              }
                          }
              
                )
                return() =>
                {
                  // Perform some clean up functions
                  unsubscribe();
                
                }
            }, [user,username]);

  useEffect(() =>{
                  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => 
                                                                {
                                                                  setPosts(snapshot.docs.map(doc => (
                                                                                                      {
                                                                                                        id:doc.id,
                                                                                                        post:doc.data(),
                                                                                                      }
                                                                                                    )
                                                                                            )
                                                                          );
                                                                }
                                                    )
                                                         
                }, []);
        
const signUp = (event => {
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser)=> 
  {
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=> alert(error.message))

  setOpen(false);
})

const signIn = (event) => 
                          {
                            event.preventDefault();
                            auth.signInWithEmailAndPassword(email,password)
                            .catch((error) => alert(error.message))  
                            setOpenSignIn(false);
                          }

  return (
    <div className="App">
      {/* REGISTER MODAL */}
                 <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <form className = "app__signup">
                  <div className={classes.paper}>
                  <center><br/>
                    <img
                          className = "app__header__image"
                          src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                          alt = "Instagram logo">            
                      </img><br/><br/>
                      <center>
                        <h4 className = "text__colour" >
                        Sign up to see photos and videos <br/>from your friends.
                        </h4></center><br/> <hr/>
                        <br/>
                      
                        {/* Username */}
                        <TextField
                      variant="filled"
                      placeholder="Username"
                      type = "text"
                      value ={username}
                      onChange = {(event) => setUsername(event.target.value)}>
                    </TextField><br/><br/>
                  {/* Email Field */}
                    <TextField
                      variant="filled"
                      placeholder="Email"
                      type = "text"
                      value ={email}
                      onChange = {(event) => setEmail(event.target.value)}>
                    </TextField><br/><br/>
                    
                  {/* Password Field */}
                  <TextField
                    id="filled-password-input"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value = {password}
                    onChange = {(event) => setPassword(event.target.value)}
                  /><br/><br/>
                    <Button onClick = {signUp} type ="submit" variant="contained" color="primary" disabled = {!password && !username}>
                      Sign up
                    </Button><br/><br/>
                    <small><p className = "Bottom__text">By signing up, you agree to our <strong>Terms,<br/> Data Policy</strong> and <strong>Cookies Policy.</strong></p></small>
                    <img
                          className = "app__header__image__google"
                          src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                          alt='Get it on Google Play'>  
                     </img>
                     <img
                          className = "app__header__image__apple"
                          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-US?&amp;releaseDate=1286323200&h=18f79cd4c60f3a0a079c6b8b1ee6f670"
                          alt="Download on the App Store">  
                     </img>
                  </center>
                  </div>
                  </form>
                </Fade>
              </Modal>
     {/* SIGN IN MODAL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open = {openSignIn}
        onClose={handleCloseSignIn}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSignIn}>
          <form className = "app__signup">
          <div className={classes.paper}>
           <center><br/>
            <img
                  className = "app__header__image"
                  src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt = "Instagram logo">            
              </img><br/><br/>
              <center>
                <h4 className = "text__colour" >
                Login to see photos and videos <br/>from your friends.
                </h4></center><br/> <hr/>
                <br/>
               
                {/* Username */}
                {/* <TextField
              variant="filled"
              placeholder="Username"
              type = "text"
              value ={username}
              onChange = {(event) => setUsername(event.target.value)}>
            </TextField><br/><br/> */}
          {/* Email Field */}
            <TextField
              variant="filled"
              placeholder="Email"
              type = "text"
              value ={email}
              onChange = {(event) => setEmail(event.target.value)}>
             </TextField><br/><br/>
            
          {/* Password Field */}
          <TextField
            id="filled"
            placeholder ="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            value = {password}
            onChange = {(event) => setPassword(event.target.value)}
           /><br/><br/>
            <Button  onClick = {signIn} type ="submit" variant="contained" color="primary" disabled = {!password}>
              Sign In
            </Button><br/><br/>
            <small><p className = "Bottom__text">By signing up, you agree to our <strong>Terms,<br/> Data Policy</strong> and <strong>Cookies Policy.</strong></p></small>
            <br/><br/>
            <img
                          className = "app__header__image__google"
                          src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                          alt='Get it on Google Play'>  
          </img>
          <img
                          className = "app__header__image__apple"
                          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-US?&amp;releaseDate=1286323200&h=18f79cd4c60f3a0a079c6b8b1ee6f670"
                          alt="Download on the App Store">  
          </img>
           </center>
          </div>
          </form>
        </Fade>
      </Modal>

     {/* Header */}
     {/* < Header /> */}

     <div className = "header">
                <div className ="app__header">
                    <img
                        className = "app__header__image"
                        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt = "Instagram logo">            
                    </img>
                      {
                          // Conditional Statement
                
                        user ? 
                          (
                            // If you have alredy signed in
                            <Button onClick = {()=>auth.signOut()}>Log Out</Button>
                          )
                      :
                          (
                            <div className = "app__loginContainer">
                                <Button onClick={ () => setOpenSignIn(true) }>Sign In</Button>
                                <Button onClick={ () => setOpen(true) }>Register</Button>
                          </div>
                            // If you still haven't signed in
                            // <Button onClick={() => setOpen(true)}>Register</Button>
                          )
                      
                      }
              </div>
      </div>
     {/* Posts */}
     {/* Looping through the posts components*/}
 <div className = "app__posts">
        {/* Posts from the uploads  */}
      <div className = "app__posts__left">
        {
            posts.map(({id,post})=> (
              <Posts key = {id}  postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
        }
        </div>
        {/* My Instagram post */}
        <div className = "app__posts__right">    
          <h4><i>The developers Instagram Account</i><strong>⬇⬇</strong><i>Follow me on Instagram</i>😁😁</h4><br/>
            <InstagramEmbed
                  url='https://www.instagram.com/p/Bzvxf1KBvrS/?utm_source=ig_web_copy_link'
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
            />
        </div>
    </div>
  
        {/* If statement to chekc whether user has logged in  */}

        {user ?. displayName ?
            (
              <ImageUpload username = {user.displayName} />
            ):
              (<h3>Sorry You Need to Login to upload</h3>)}
    </div>
  );
}

export default App;
