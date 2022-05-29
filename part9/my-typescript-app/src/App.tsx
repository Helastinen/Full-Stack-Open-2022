import React from 'react';

interface CourseParts {
  name: string,
  exerciseCount: number
}

const Header = ({ courseName }: { courseName: string }) => {
  return (
  <h1>{courseName}</h1>
  )
};

const Content = ({ courseParts }: { courseParts: Array<CourseParts> }) => {
  return (
    <>
      {courseParts.map((course) => 
        <p>{course.name} {course.exerciseCount}</p>
      )}
    </>
  )
};

const Total = ({ courseParts }: { courseParts: Array<CourseParts> }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry: number, part: CourseParts) => 
        carry + part.exerciseCount, 0
      )}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;