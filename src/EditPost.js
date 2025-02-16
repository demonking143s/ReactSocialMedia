import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './context/DataContext.js';

const EditPost = () => {
  const {posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id )

  useEffect(()=>{
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post, setEditBody, setEditTitle])

  return (
    <main className='NewPost'>
      {editTitle && 
        <>
          <h2>Edit Post</h2>
          <form className='postForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='editTitle'>Title:</label>
            <input
              autoFocus
              id='editTitle'
              type='text'
              placeholder='Edit title'
              required
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
            />
            <label htmlFor='editBody'>Post:</label>
            <textarea
              id='editBody'
              placeholder='Body of the post'
              required
              value={editBody}
              onChange={(e)=>setEditBody(e.target.value)}
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      {!editTitle && 
        <>
          <h2>Post Not Found</h2>
          <p>please check again</p>
        </>
      }
    </main>
  )
}

export default EditPost