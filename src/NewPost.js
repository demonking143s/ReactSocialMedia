import React from 'react'
import { useContext } from 'react';
import DataContext from './context/DataContext.js';

const NewPost = () => {
  const {postTitle, setPostTitle, postBody, setPostBody, handleSubmit} = useContext(DataContext)
  return (
    <main className='NewPost'>
      <h2>newpost</h2>
      <form className='postForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          autoFocus
          id='postTitle'
          type='text'
          placeholder='Post tile'
          required
          value={postTitle}
          onChange={(e)=>setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
          id='postBody'
          placeholder='Body of the post'
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost