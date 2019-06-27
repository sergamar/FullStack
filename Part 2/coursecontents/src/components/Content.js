import React from 'react'
import Part from './Part'

const Content = (props) => (
    <>
        {props.courses.map(course => <Part key={course.id} name={course.name} exercises={course.exercises} />)}
    </>
)

export default Content