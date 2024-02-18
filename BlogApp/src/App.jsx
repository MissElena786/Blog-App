import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import BlogDescription from './components/BlogDescription'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast'
import Likes from './components/Likes'
import EditBlog from './components/EditBlog'
import MyBlogs from './components/MyBlogs'
import About from './components/About'

function App() {

  return (
      <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/update-blog/:id' element={<EditBlog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/likes' element={<Likes/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/my-blogs' element={<MyBlogs/>}/>
        <Route path='/blog-description/:id' element={<BlogDescription/>}/>
      </Routes>
      </BrowserRouter>
  )

}

export default App
