import React from 'react'
import Course from './Course'

const Program = (props) => (
    props.courses.map( (n) => <Course key={n.id} course={n} />
    )
)
export default Program