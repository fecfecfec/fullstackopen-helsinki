import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { useUserQueries } from '../hooks/useUserQueries'

import Heading from '../components/Heading'
import BlogItem from '../components/BlogItem'

// Components

export default function Users() {
  const { id } = useParams()

  const { getUsers } = useUserQueries() // Initialize hooks
  const { data: users, isLoading, isError } = getUsers

  const user = users?.find((user) => user.id === id)

  if (isLoading) return <Heading>Loading...</Heading>
  if (isError) return <Heading>Error loading user data</Heading>
  if (!user) return <Heading>User not found</Heading>

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold mb-4'>{user.name}</h1>
      <div
        key={user.id}
        className='border border-slate-300 rounded-lg overflow-hidden'
      >
        <div className='bg-indigo-100 rounded-lg overflow-hidden border border-indigo-100'>
          {user.blogs && user.blogs.length > 0 ? (
            <>
              <div className='grid grid-cols-2 text-indigo-600 font-semibold p-4 border-b last:border-0 border-indigo-100'>
                <div>Added blogs</div>
              </div>
              {user.blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <BlogItem key={blog.id} blog={blog} />
                ))}
            </>
          ) : (
            <div className='grid grid-cols-2 text-indigo-600 font-semibold p-4 border-b last:border-0 border-indigo-100'>
              <div>No blogs posted yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
