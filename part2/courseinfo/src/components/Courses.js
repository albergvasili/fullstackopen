/* Courses component and subcomponents. */

const Courses = ({ courseList }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courseList.map(elem => <Course key={elem.id} course={elem} />)}
    </>
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

const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
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

const Part = ({ part }) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
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

export default Courses;
