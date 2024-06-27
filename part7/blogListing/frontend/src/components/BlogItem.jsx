import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import SmallButton from './SmallButton'

export default function BlogItem({ blog }) {
  return (
    <>
      <div
        key={blog.id}
        className='grid grid-cols-8 grid-cols- bg-indigo-5 bg-white items-center p-4 border-b border-indigo-100 hover:bg-indigo-100 transition-colors'
      >
        <a className='text-indigo-600 col-span-7' href={`/blogs/${blog.id}`}>
          {blog.title} by <i>{blog.author}</i>
        </a>
        <Link to={`/blogs/${blog.id}`}>
          <SmallButton>Details</SmallButton>
        </Link>
      </div>
    </>
  )
}

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
}
