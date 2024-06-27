import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '../reducers/UserContext'

import Blogs from '../pages/Blogs'
import Blog from '../pages/Blog'
import Users from '../pages/Users'
import User from '../pages/User'
import Login from '../pages/Login'

export default function AppRoutes() {
  const user = useUser()

  return (
    <Routes>
      <Route path='/' element={<Blogs />} />
      <Route
        path='/login'
        element={!user ? <Login /> : <Navigate replace to='/' />}
      />

      <Route path='/users' element={<Users />} />
      <Route path='/blogs/:id' element={<Blog />} />
      <Route path='/users/:id' element={<User />} />
    </Routes>
  )
}
