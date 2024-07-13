import { Link } from 'react-router-dom'

export default function Headers({ token, onLogout }) {
  const sections = [
    { title: 'Authors', url: '/', authenticated: false },
    { title: 'Books', url: '/books', authenticated: false },
    { title: 'Recommended', url: '/recommended', authenticated: true },
    { title: 'Edit Author', url: '/editauthor', authenticated: true },
    { title: 'Add Book', url: '/addbook', authenticated: true },
  ]

  function NavLink() {
    return (
      <div className='flex gap-x-2'>
        {sections
          .filter((section) => !section.authenticated)
          .map((section) => (
            <Link key={section.title} to={section.url} className='nav-link'>
              {section.title}
            </Link>
          ))}
        {
          // If the user is logged in we mapped through the autenticated sections
          token &&
            sections
              .filter((section) => section.authenticated)
              .map((section) => (
                <Link key={section.title} to={section.url} className='nav-link'>
                  {section.title}
                </Link>
              ))
        }
        {!token ? (
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        ) : (
          <button onClick={onLogout} className='nav-link'>
            Logout
          </button>
        )}
      </div>
    )
  }

  return (
    <header className='bg-white'>
      <nav
        className='flex items-center border border-blue-100 p-2 rounded-lg justify-center container max-w-min mx-auto'
        aria-label='Global'
      >
        <NavLink />
      </nav>
    </header>
  )
}
