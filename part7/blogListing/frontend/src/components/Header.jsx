import { Link } from 'react-router-dom'

// import { Link } from 'react-router-dom'
import { useUserDispatch, useUser, logoutUser } from '../reducers/UserContext'
import SmallButton from './SmallButton'

export default function Headers() {
  const user = useUser()

  const handleLogout = () => {
    logoutUser(dispatch)
  }
  const dispatch = useUserDispatch()

  return (
    <header className='bg-white'>
      <nav
        className='flex items-center justify-between py-8'
        aria-label='Global'
      >
        <div className='flex gap-x-12'>
          <Link
            to='/'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Blogs
          </Link>
          <Link
            to='/users'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Users
          </Link>
        </div>
        {user ? (
          <div className='flex flex-1 justify-end items-center gap-2'>
            <p className='text-sm font-semibold leading-6 text-gray-900'>
              👤 Logged as <span className='text-indigo-600'>{user.name}</span>
            </p>
            <SmallButton onClick={handleLogout}>Log Out</SmallButton>
          </div>
        ) : (
          <div className='flex flex-1 justify-end'>
            <Link
              to='/login'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              <SmallButton onClick={handleLogout} primary>
                Log In <span aria-hidden='true'>&rarr;</span>
              </SmallButton>
              {/* Log In <span aria-hidden='true'>&rarr;</span> */}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
