import { Routes, Route } from 'react-router-dom'

import Authors from '../components/Authors'
import Books from '../components/Books'
import Recommended from '../components/Recommended'
import NewBook from '../components/NewBook'
import EditAuthor from '../components/EditAuthor'
import LoginForm from '../components/LoginForm'

export default function AppRoutes({ token, setToken, onLogin }) {
  return (
    <Routes>
      <Route path='/' element={<Authors />} />
      <Route path='/books' element={<Books />} />
      <Route path='/recommended' element={<Recommended token={token} />} />
      <Route path='/addbook' element={<NewBook />} />
      <Route path='/editauthor' element={<EditAuthor />} />
      <Route path='/login' element={<LoginForm setToken={setToken} />} />
    </Routes>
  )
}
