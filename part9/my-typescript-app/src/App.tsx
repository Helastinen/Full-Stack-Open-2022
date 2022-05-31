import React from 'react';
import { CoursePart } from "./types";
import { courseParts } from './data/courseParts';

const Header = ({ courseName }: { courseName: string }) => {
  return (
    <h1>{courseName}</h1>
  )
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  let content: JSX.Element = <></>;

  switch (part.type) {
    case "normal":
      return (content =
        <ul>
          <b>{part.name}{" "}{part.exerciseCount}</b>
          <li>Description: <i>{part.description}</i></li>
          <li>Type: {part.type}</li>
        </ul>
      )
    case "groupProject":
      return (content =
        <ul>
          <b>{part.name}{" "}{part.exerciseCount}</b>
          <li>Group project count: {part.groupProjectCount}</li>
          <li>Type: {part.type}</li>
        </ul>
      )
    case "submission":
      return (content =
        <ul>
          <b>{part.name}{" "}{part.exerciseCount}</b>
          <li>Description: <i>{part.description}</i></li>
          <li>Submission link: {part.exerciseSubmissionLink}</li>
          <li>Type: {part.type}</li>
        </ul>
      )
      case "special":
      return (content =
        <ul>
          <b>{part.name}{" "}{part.exerciseCount}</b>
          <li>Description: <i>{part.description}</i></li>
          <li>Requirements: {part.requirements.join(", ")}</li>
          <li>Type: {part.type}</li>
        </ul>
      )
    default:
      assertNever(part);
  }

  return (
     <div>
      {content}
     </div>
  )
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part: CoursePart) => 
        <Part key={part.name} part={part} />
      )}
    </>
  )
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry: number, part: CoursePart) => 
        carry + part.exerciseCount, 0
      )}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;