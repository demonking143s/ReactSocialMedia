import React from 'react'
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './context/DataContext.js';

const Home = () => {
  const {searchResult, fetchError, isLoading} = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className="statusMsg">Loading Posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length ? (<Feed posts={searchResult}/>) : (<p>No posts</p>))}
    </main>
  )
}

export default Home