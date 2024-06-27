import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// 5.16: Blog List Tests, step 4
// Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.
test('Event handler receives the right details when a new blog is created.', async () => {
  const user = userEvent.setup()

  const newBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Hank Helsinki',
    url: 'https://www.google.com',
  }

  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByTestId('url')
  const submitButton = screen.getByTestId('submit')

  await user.type(inputTitle, newBlog.title)
  await user.type(inputAuthor, newBlog.author)
  await user.type(inputUrl, newBlog.url)
  await user.click(submitButton)

  //   console.log('Mock calls', mockCreateBlog.mock.calls)

  // Check if the object has the required properties

  const mockCall = mockCreateBlog.mock.calls[0][0]
  expect(mockCall).toHaveProperty('title')
  expect(mockCall).toHaveProperty('author')
  expect(mockCall).toHaveProperty('url')
})
