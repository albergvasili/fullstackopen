import { useState } from 'react';

const Title = ({text}) => <h1>{text}</h1>;

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  )
};

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
};

const Statistics = ({clicks}) => {
  const avg = (clicks.good*1 + clicks.neutral*0 + clicks.bad*-1)/clicks.total;

  const positive = `${clicks.good/clicks.total*100} %`;

  return (
  <div>
    <StatisticLine text='good' value={clicks.good} />
    <StatisticLine text='neutral' value={clicks.neutral} />
    <StatisticLine text='bad' value={clicks.bad} />
    <StatisticLine text='total' value={clicks.total} />
    <StatisticLine text='average' value={avg} />
    <StatisticLine text='positive' value={positive} />
  </div>
  )
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, total: 0
  });

  
  const handleGoodClicks = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
      total: clicks.total + 1
    })
  };

  const handleNeutralClicks = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
      total: clicks.total + 1
    })
  };

  const handleBadClicks = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
      total: clicks.total + 1
    })
  };


  if (clicks.total === 0) {
    return (
      <div>
        <Title text='Give Feedback' />
          <Button onClick={handleGoodClicks} label='good' />
          <Button onClick={handleNeutralClicks} label='neutral' />
          <Button onClick={handleBadClicks} label='bad' />
        <Title text='Statistics' />
        <p> No feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <Title text='Give Feedback' />
        <Button onClick={handleGoodClicks} label='good' />
        <Button onClick={handleNeutralClicks} label='neutral' />
        <Button onClick={handleBadClicks} label='bad' />
      <Title text='Statistics' />
      <Statistics clicks={clicks} />
    </div>
  )
};

export default App;
