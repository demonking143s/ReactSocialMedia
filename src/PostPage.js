import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './context/DataContext.js';

const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id )
  return (
    <main className='PostPage'>
      <article>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
            <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>please check again</p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage