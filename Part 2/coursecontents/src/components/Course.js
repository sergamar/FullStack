import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = (props) => {
    const total = props.course.parts.reduce( (s, p) => {
        return s + p.exercises
      }, 0)
    return (
        <>
        <Header title={props.course.name} />
        <Content courses={props.course.parts} />
        <p><b>Total of {total} exercises.</b></p>
        </>
)
}
export default Course