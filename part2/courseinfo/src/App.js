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

const Content = (props) => {
  return (
    <div id="content">
      <Part part = {props.parts[0]} />
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
    </div>
  )
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} 
    
    </p>
  )
};

const Course = ({ course }) => {
  return (
    <>
    <Header title={course.name} />
    <Content parts={course.parts} />
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
