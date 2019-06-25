import React from 'react'
import ReactDOM from 'react-dom'
//Basic header
/*
const Header = (props) => {
    return(
        <>
            <h1>
                {props.course}
            </h1>
        </>
    )
}*/

//Step 1 Content
/*const Content = (props) => {
    return(
        <div>
       <p>
        {props.part1} {props.exercises1}
       </p>
       <p>
        {props.part2} {props.exercises2}
       </p>
       <p>
        {props.part3} {props.exercises3}
       </p>
        </div>
    )
}*/ 


//Content and Total with several props
/*const Content = (props) => {
    return(
        <div>
            <Part part={props.part1} exercises={props.exercises1} />
            <Part part={props.part2} exercises={props.exercises2} />
            <Part part={props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Total = (props) => {
    return(
        <>
        <p>Number of exersices {props.exercises1 + props.exercises2 + props.exercises3}</p>
        </>
    )
}*/

//Content and Total with parts
/*const Content = (props) => {
    return(
        <p>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
        </p>
    )
}

const Total = (props) => {
    return(
        <p>
            Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
        </p>
    )
}*/

const Header = (props) => {
    return(
        <>
            <h1>
                {props.course.name}
            </h1>
        </>
    )
}

const Part = (props) => {
    return(
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    return(
        <>
            <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
            <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
            <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
        </>
    )
}

const Total = (props) => {
    return(
        <p>
            Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
        </p>
    )
}
//App step 2
/*const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
  
    return (
      <div>
        <Header course={course} />
        <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
        <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      </div>
    )
  }
*/
//App step 3
/*const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }
  
    return (
      <div>
        <Header course={course} />
        <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
        <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
      </div>
    )
  }*/
//App step 4
/*const App = () => {
   const course = 'Half Stack application development'
   const parts = [
     {
       name: 'Fundamentals of React',
       exercises: 10
     },
     {
       name: 'Using props to pass data',
       exercises: 7
     },
     {
       name: 'State of a component',
       exercises: 14
     }
   ]
  
    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }
*/

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
ReactDOM.render(<App />, document.getElementById('root'))




