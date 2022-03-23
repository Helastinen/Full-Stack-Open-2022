const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}     
  </>

const Total = ({ sum }) => <p><b>Total number of exercises: {sum}</b></p>

const Course = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => 
    sum + part.exercises, 0
  )
  
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course