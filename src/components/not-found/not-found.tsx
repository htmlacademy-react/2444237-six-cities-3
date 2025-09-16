import { Link } from 'react-router-dom';
import Header from '../header/header';
import React from 'react';

const NotFound = () : JSX.Element => (
  <React.Fragment>
    <Header/>
    <h1 style={{textAlign: 'center', fontSize: '70px', marginTop: '80px'}}>404</h1>
    <p style={{textAlign: 'center', fontSize: '20px', marginBottom: '30px'}}>Page not found</p>
    <button style={{display: 'block', margin: '0 auto', width: '200px', height: '50px', fontSize: '18px'}}>
      <Link to="/">Go to main page</Link>
    </button>
  </React.Fragment>
);

export default NotFound;
