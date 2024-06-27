// Components
import Message from './components/Message'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'

import './index.css'

const App = () => {
  return (
    <div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 max-w-7xl w-11/12 mx-auto lg:w-10/12'>
      <Message />
      <Header />
      <AppRoutes />
      {/* {user === null ? <LoginForm /> : <BlogList />} */}
      <footer className='bottom-0 mt-8 w-full text-center text-gray-500 text-xs'>
        No copy rights reserved. Go ahead and steal this code.
      </footer>
    </div>
  )
}

export default App
