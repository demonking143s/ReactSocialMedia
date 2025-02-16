import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './context/DataContext.js';

const Nav = () => {
  const {search,setSearch} = useContext(DataContext);
  return (
    <nav className='Nav'>
      <form className='searchForm'>
        <label htmlFor='search'>search posts</label>
        <input
          autoFocus
          id='search'
          placeholder='search posts'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
      <ul>
          <li><Link to="/" className='Link'>Home</Link></li>
          <li><Link to="/about" className='Link'>About</Link></li>
          <li><Link to="/postpage" className='Link'>PostPage</Link></li>
       </ul>
    </nav>
  )
}

export default Nav