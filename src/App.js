import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Route, Routes } from 'react-router-dom'
import {DataProvider} from './context/DataContext.js'

const App = () => {
  
  return (
    <div className='App'>
      <DataProvider>
        <Header title="social media" />
        <Nav />
        <Routes>
          <Route path="/" element={
            <Home />
          }/>
          <Route path="/postpage">
            <Route index element={<NewPost />}/>
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditPost />}/>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<Missing />}/>
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  )
}

export default App