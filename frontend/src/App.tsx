import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Poll {
  question: string;
  options: string[];
  votes: { [key: string]: number };
}

interface PollAppProps {
  // Add props if needed
}

const App: React.FC<PollAppProps> = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const registerUser = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setUser(data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setUser(data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const getPolls = async () => {
    try {
      const response = await fetch(`${API_URL}/api/polls`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user}` },
      });
      const data: Poll[] = await response.json();
      setPolls(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPoll = async () => {
    try {
      const response = await fetch(`${API_URL}/api/polls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ question, options }),
      });
      const data: Poll = await response.json();
      setPolls([...polls, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getPollById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user}` },
      });
      const data: Poll = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePoll = async (id: string, updatedPoll: Poll) => {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(updatedPoll),
      });
      const data: Poll = await response.json();
      setPolls(polls.map((poll) => (poll.question === data.question ? data : poll)));
    } catch (error) {
      console.error(error);
    }
  };

  const deletePoll = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user}` },
      });
      setPolls(polls.filter((poll) => poll.question !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const voteInPoll = async (id: string, option: string) => {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ option }),
      });
      const data: Poll = await response.json();
      setPolls(polls.map((poll) => (poll.question === data.question ? data : poll)));
    } catch (error) {
      console.error(error);
    }
  };

  const getPollResults = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}/results`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user}` },
      });
      const data: { [key: string]: number } = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Poll App</h1>
      <button onClick={() => registerUser('username', 'password')}>Register</button>
      <button onClick={() => loginUser('username', 'password')}>Login</button>
      <button onClick={getPolls}>Get Polls</button>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <input
        type="text"
        value={options.join(', ')}
        onChange={(e) => setOptions(e.target.value.split(', '))}
      />
      <button onClick={createPoll}>Create Poll</button>
      {polls.map((poll) => (
        <div key={poll.question}>
          <h2>{poll.question}</h2>
          <ul>
            {poll.options.map((option) => (
              <li key={option}>
                {option}
                <button onClick={() => voteInPoll(poll.question, option)}>Vote</button>
              </li>
            ))}
          </ul>
          <button onClick={() => getPollResults(poll.question)}>Get Results</button>
          <button onClick={() => getPollById(poll.question)}>Get Poll</button>
          <button onClick={() => updatePoll(poll.question, poll)}>Update Poll</button>
          <button onClick={() => deletePoll(poll.question)}>Delete Poll</button>
        </div>
      ))}
    </div>
  );
};

export default App;