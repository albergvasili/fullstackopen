import { useState } from 'react';

const Title = ({text}) => <h1>{text}</h1>;

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  )
};

const Statistic = (props) => {
  return (
    <p>{props.text} {props.counter}</p>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  return (
    <div>
      <Title text='Give Feedback' />
        <Button label='good' />
        <Button label='neutral' />
        <Button label='bad' />
      <Title text='Statistics' />
        <Statistic text='good' />
        <Statistic text='neutral' />
        <Statistic text='bad' />

    </div>
  )
}

export default App;
