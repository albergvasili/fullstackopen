const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
};

const Part = (props) => {
  return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
  )
};

const Content = ({ parts }) => {
  return (
    <div id="content">
      {parts.map(
        coursePart => <Part key={coursePart.id} part={coursePart} />
      )}
    </div>
  )
};

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (total, amount) => {
      total += amount.exercises
      return total
  }, 0);

  return (
    <p>
      Number of exercises {sum}
    </p>
  )
};

const Course = ({ course }) => {
  return (
    <>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return <Course course={course} />
}

export default App
