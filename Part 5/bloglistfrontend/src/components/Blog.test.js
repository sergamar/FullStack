import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('only title and author are showed initially', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Graham',
    likes: 7,
    url: 'http://test.com',
    user: {
        nickname: 'test'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Test Blog'
  )
  expect(component.container).toHaveTextContent(
    'Test Graham'
  )
  expect(component.container).not.toHaveTextContent(
    '7'
  )
  expect(component.container).not.toHaveTextContent(
    'http://test.com'
  )
})

test('all info is showed when title is clicked', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Graham',
        likes: 7,
        url: 'http://test.com',
        user: {
            nickname: 'test'
        }
      }

    const title = 'Test Blog'

    const mockUser = {
        nickname: 'null'
    }

    const component = render(
        <Blog blog={blog} selectedTitle={title} user={mockUser}/>)

        expect(component.container).toHaveTextContent(
            'Test Blog'
          )
          expect(component.container).toHaveTextContent(
            'Test Graham'
          )
          expect(component.container).toHaveTextContent(
            '7'
          )
          expect(component.container).toHaveTextContent(
            'http://test.com'
          )
})