import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// This is the test from Notes.test.jsx

describe('Blog rendering and viewing hidden elements', () => {
  let blog
  let loggedUser
  let mockAddLike

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Hank Helsinki',
      url: 'https://www.google.com',
      likes: 34,
      user: { name: 'Mr Vitest', username: 'vitest' },
    }

    loggedUser = {
      name: 'Mr Vitest',
      username: 'vitest',
    }

    mockAddLike = vi.fn()

    render(<Blog blog={blog} sumLike={mockAddLike} user={loggedUser}></Blog>)
  })

  // Check that the component renders correctly the main info.
  // 5.13: Blog List Tests, step 1
  test('Renders content correctly', () => {
    // Check main info is visible
    expect(screen.getByTestId('blog')).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )
    // Check if toggable is hidden
    expect(screen.getByTestId('togglable-content')).toHaveStyle('display: none')

    // Check if details are not visible
    expect(screen.getByTestId('blog-url')).not.toBeVisible()
    expect(screen.getByTestId('blog-likes')).not.toBeVisible()
  })

  // 5.14: Blog List Tests, step 2
  test('After clicking the button, children elements are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    const url = screen.getByTestId('blog-url')
    const likes = screen.getByTestId('blog-likes')

    await user.click(button)
    const div = screen.getByTestId('togglable-content')

    expect(div).not.toHaveStyle('display: none')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  // 5.15: Blog List Tests, step 3
  // Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
  test('Check if likes are correctly counted', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByTestId('blog-likes-button')
    await user.click(likeButton)
    await user.click(likeButton)

    // console.log('Mock calls', mockAddLike.mock.calls)
    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})
