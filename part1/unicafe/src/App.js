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
  
  const handleGoodClick = () => {
    setGood(good + 1)
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  };

  const handleBadClick = () => {
    setBad(bad + 1)
  };

  return (
    <div>
      <Title text='Give Feedback' />
        <Button onClick={handleGoodClick} label='good' />
        <Button onClick={handleNeutralClick} label='neutral' />
        <Button onClick={handleBadClick} label='bad' />
      <Title text='Statistics' />
        <Statistic text='good' counter={good} />
        <Statistic text='neutral' counter={neutral} />
        <Statistic text='bad' counter={bad} />

    </div>
  )
}

export default App;
