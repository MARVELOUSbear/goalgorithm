import React, { useEffect, useState } from 'react';

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
    </div>
  );
}

export default TestConnection;
