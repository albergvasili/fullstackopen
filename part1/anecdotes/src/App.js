import {useState } from 'react';

const App = () => {
  const anecdotes = [
    "Every now and then the other one suffers.",
    "Always do it better.",
    "We must learn the hard way. Stop teaching!",
    "There is no better training than fighting for survive.",
    "If you don't eat, you don't work.",
    "By doing nothing, everything begins to happen.",
    "In the end, everything is just furniture."
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
};

export default App;
