import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Graham',
    likes: 7
  }

  const dummy = () => {
      return
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={dummy} />
  )

  expect(component.container).toHaveTextContent(
    'Test Blog'
  )
  expect(component.container).toHaveTextContent(
    'Test Graham'
  )
  expect(component.container).toHaveTextContent(
    '7'
  )
})

test('like handler executes twice if two clicks', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Graham',
        likes: 7
      }
    
    const mockHandler = jest.fn()
    
    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})