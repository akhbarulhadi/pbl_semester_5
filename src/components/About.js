// import React, { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

function About() {
    // const [backendData, setBackendData] = useState([{}])

    // useEffect(() => {
    //   fetch("/api/about").then(
    //     response => response.json()
    //   ).then(
    //     data => {
    //       setBackendData(data)
    //     }
    //   )
    // }, [])
  return (
    <div>
    <Link to="/">
        <button>Go to Product Page</button>
    </Link>
      <h1>About Page</h1>
    </div>
  );
}

export default About;
