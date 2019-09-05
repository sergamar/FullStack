import App from '../App'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { 
  render, waitForElement 
} from '@testing-library/react'
jest.mock('../services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
        () => component.getByText('Login')
    ) 
    
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
    expect(component.container).toHaveTextContent('Login')
  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
        username: 'test',
        blogs: [],
        name: 'test',
        passwordHash: 'dlasfjlsdjlfjalsd'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
        <App />
      )
      component.rerender(<App />)
      
      await waitForElement(
          () => component.container.querySelector('.blog')
      )
      const blogs = component.container.querySelectorAll('.blog')
      expect(blogs.length).toBe(2)
  })
})