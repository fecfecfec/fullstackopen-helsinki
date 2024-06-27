import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

import { useNotificationDispatch } from '../reducers/NotificationContext'

export const useBlogQueries = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const getBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (data) => {
      return data
    },
  })

  const createBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog, variables, context) => {
      queryClient.setQueryData(['blogs'], (oldBlogs = []) => [
        ...oldBlogs,
        newBlog,
      ])
    },
  })

  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )
    },
  })

  const deleteBlog = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, blogId) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.filter((blog) => blog.id !== blogId)
      )
      dispatch({
        type: 'CREATE',
        payload: {
          message: 'You\u2019ve removed the article from your reading list.',
        },
        dispatch,
      })
    },
    onError: (error) => {
      console.error('Error creating blog:', error.response.data.error)
      dispatch({
        type: 'ERROR',
        payload: {
          message: 'Sorry, there was a problem deleting the blog.',
          reason: error.response?.data?.error ?? 'An unknown error occurred',
        },
        dispatch,
      })
    },
  })

  const addComment = useMutation({
    mutationFn: ({ id, content }) => blogService.addComment(id, content),
    onSuccess: (newComment, { id }) => {
      queryClient.setQueryData(['blogs'], (oldBlogs = []) =>
        oldBlogs.map((blog) =>
          blog.id === id
            ? { ...blog, content: [...(blog.content || []), newComment] }
            : blog
        )
      )
      queryClient.invalidateQueries(['blogs', id])
    },
  })

  return {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment,
  }
}
