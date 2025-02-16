import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import api from "../api/posts.js"
import useWindowSize from '../hooks/useWindowSize.js'
import useAxiosFetch from '../hooks/useAxiosFetch.js'

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts,setPosts] = useState([
      {
        id:1,
        title: "beatrix",
        datetime: "July 01, 2025 11:23:35 AM",
        body: "beatrix new skin is arrive"
      },
      {
        id: 2,
        title: "community",
        datetime: "July 01, 2025 11:23:35 AM",
        body: "students community is launch in world wide"
      },
      {
        id: 3,
        title: "demonking143s",
        datetime: "July 01, 2025 11:23:35 AM",
        body: "demonking is back to the world"
      },
      {
        id: 4,
        title: "hello world2",
        datetime: "February 16, 2025 1:03:41 PM",
        body: "new empire is begin"
      },
      {
        id: 41,
        title: "welcome",
        datetime: "February 16, 2025 3:45:02 PM",
        body: "welcome to new world"
      }
    ])

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const {width} = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:5500/posts');

  useEffect(()=>{
    setPosts(data);
  },[data])
  

  useEffect(()=> {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || 
      ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResult(filteredResults.reverse());
  },[posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody}
    try{
      const res = await api.post('/posts', newPost)
      const allPosts = [...posts, res.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      if(error.res) {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      } else {
        console.log(`ERROR: ${error.message}`)
      }
    }
    
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = {id, title: editTitle, datetime, body: editBody}
    try {
      const res = await api.put(`/posts/${id}`,updatePost)
      setPosts(posts.map(post => post.id === id ? {...res.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      
    }
  }

  const handleDelete = async (id) => {
    try{
      const res = await api.delete(`/posts/${id}`)
      console.log(res)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList)
      navigate('/')
    } catch (error) {
      if(error.res) {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      } else {
        console.log(`ERROR: ${error.message}`)
      }
    }
  }


    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResult, fetchError, isLoading, postTitle, setPostTitle, postBody, setPostBody, handleSubmit, posts, handleDelete, editTitle,setEditTitle,editBody,setEditBody,handleEdit
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;