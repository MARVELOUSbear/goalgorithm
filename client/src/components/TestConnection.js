import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Navigation from './Navigation';
function TestConnection() {
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const resRaw = await fetch('./testConnection');

      const res = await resRaw.json();

      setData(res.msg);
    };
    fetchData();
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      setCurrentUser(token);
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      <Navigation />
      <h2>hello</h2>
      <h1>{data}</h1>
      <h1>{currentUser}</h1>
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default TestConnection;
