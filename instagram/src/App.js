import React ,{useState , useEffect} from 'react';
import './App.css';
import Header from './header.js'
import Posts from './Posts.js';
import  { db } from './firebase';

// import firebase from firebase;

function App() {

  const [posts,setPosts] = useState([]);

  useEffect(() =>{
                  db.collection('posts').onSnapshot(snapshot => 
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

  return (
    <div className="App">
     
     {/* Header */}
     < Header />
     {/* Posts */}
     {/* Looping through the posts components*/}
      {
        posts.map(({id,post})=> (
          <Posts key = {id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
