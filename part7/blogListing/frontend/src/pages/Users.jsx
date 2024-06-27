import React, { useEffect, useState } from 'react'

import { useUserQueries } from '../hooks/useUserQueries'

// Components
import Heading from '../components/Heading'
import SmallButton from '../components/SmallButton'

export default function Users() {
  const { getUsers } = useUserQueries() // Initialize hooks
  const { data: users, isLoading, isError } = getUsers

  if (isLoading) return <Heading>Loading...</Heading>
  if (isError) return <Heading>Error loading users data</Heading>

  return (
    <div className='space-y-4'>
      <Heading>Users and Their Blogs</Heading>
      <div className='bg-indigo-50 rounded-lg border border-indigo-100 overflow-hidden'>
        <div className='grid grid-cols-2 text-indigo-600 font-semibold p-4 border-b border-indigo-100'>
          <div>User</div>
          <div>Blogs Created</div>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className='grid grid-cols-2 items-center p-4 border-b last:border-0 bg-white border-indigo-100 hover:bg-indigo-100 transition-colors'
          >
            <a className='text-indigo-600' href={`/users/${user.id}`}>
              {user.name}
            </a>
            <div className='flex justify-between items-center'>
              <span>
                {user.blogs && user.blogs.length > 0
                  ? user.blogs.length
                  : 'No blogs posted yet'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
