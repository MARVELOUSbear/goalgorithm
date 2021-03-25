import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function TestConnection() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const resRaw = await fetch('./testConnection');

      const res = await resRaw.json();

      setData(res.msg);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>hello</h2>
      <h1>{data}</h1>
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default TestConnection;
