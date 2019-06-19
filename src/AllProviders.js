import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const AllProviders = ({ children }) => {
  return <Router>{children}</Router>;
};

export default AllProviders;
