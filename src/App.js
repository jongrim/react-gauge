import React from 'react';
import ReactGauge from './ReactGauge';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <ReactGauge icon="fa fa-user" scores={[33, 76]} />
    </div>
  );
};

export default App;
