// src/components/Course.jsx

// Component for rendering the main header of a course
const Header = ({ name }) => {
  return <h2>{name}</h2>
}

// Component for rendering a single part of a course
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// Component for rendering all parts of a course
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// Component for calculating and rendering the total number of exercises
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <h4>total of {total} exercises</h4>
}

// Main component that assembles a single course
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// Make the Course component available for other files to import
export default Course