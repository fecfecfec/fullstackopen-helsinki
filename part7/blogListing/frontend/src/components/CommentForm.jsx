import { useState } from 'react'

import { useBlogQueries } from '../hooks/useBlogQueries'

const CommentForm = ({ blogId }) => {
  const [content, setComment] = useState('')
  const { addComment } = useBlogQueries()

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment.mutate({ id: blogId, content })
    setComment('')
  }

  const buttonClasses =
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white items-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  const labelClasses = 'block text-sm font-medium leading-6 text-gray-900'
  const inputClasses =
    'mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

  return (
    <div className='flex min-h-full flex-col justify-center p-6 mt-6 border-indigo-100 border rounded-lg lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm'>
      <h3 className='text-lg font-bold mb-4'>Add new blog</h3>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='comment' className={labelClasses}>
              Comment:
            </label>
          </div>
          <input
            id='comment'
            data-testid='comment'
            value={content}
            onChange={(e) => setComment(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <button
            type='submit'
            className={buttonClasses}
            disabled={addComment.isLoading}
          >
            Add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
