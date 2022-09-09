import {useState } from 'react';

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
};

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
};

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

  const voteList = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(voteList);

  const random = () => Math.floor(Math.random() * anecdotes.length);

  const addVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1
    setVotes(copyVotes)
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={addVote} text="vote" />
      <Button onClick={() => setSelected(random)} text="Next anecdote" />
      <Header text="Anecdote with most votes" />
    </div>
  )
};

export default App;
