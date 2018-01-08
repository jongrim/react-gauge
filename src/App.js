import React, { Component } from 'react';
import ReactGauge from './ReactGauge';
import './App.css';

const baseTrack = {
  size: 240,
  strokeColor: 'LightGray'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: {
        ...baseTrack
      }
    };
  }
  render() {
    const segments = [
      {
        radius: this.state.base.radius,
        style: {
          opactity: 0.5
        },
        score: 0,
        stroke: '#446688',
        strokeLinecap: 'round',
        strokeWidth: 10
      },
      {
        radius: this.state.base.radius,
        score: 100,
        stroke: '#333',
        strokeLinecap: 'round',
        strokeWidth: 10
      },
      {
        radius: this.state.base.radius,
        score: 38,
        stroke: '#888',
        strokeWidth: 10
      }
    ];
    return (
      <div className="App">
        <ReactGauge
          baseTrackSettings={this.state.base}
          icon="fa fa-user"
          segments={segments}
        />
      </div>
    );
  }
}

export default App;
