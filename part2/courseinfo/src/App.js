const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
};

const Part = ({ part }) => {
  return (
      <p>
        {part.name} {part.exercises}
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
      <strong>
        Number of exercises {sum}
      </strong>
    </p>
  )
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <br />
    </>
  )
};

const Courses = ({ courseList }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courseList.map(element => <Course course={element} />)}
    </>
  )
};

const App = () => {
  const courses = [
    {
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
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return <Courses courseList={courses} />
}

export default App
