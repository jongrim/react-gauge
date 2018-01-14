import React from 'react';
import './styles.css';

const RADIUS = 100;
const SIZE = 240;
const START_POINT = {
  X: 115,
  Y: 115
};
const SEGMENTS = [
  // this should ideally be computed based on the SIZE, but hardcoded for now
  {
    start: -120,
    end: -100
  },
  {
    start: -96,
    end: -76
  },
  {
    start: -72,
    end: -52
  },
  {
    start: -48,
    end: -28
  },
  {
    start: -24,
    end: -2
  },
  {
    start: 2,
    end: 24
  },
  {
    start: 28,
    end: 48
  },
  {
    start: 52,
    end: 72
  },
  {
    start: 76,
    end: 96
  },
  {
    start: 100,
    end: 120
  }
];

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ');

  return d;
}

const ReactGauge = ({ icon, scores }) => {
  const strokeWidth = 10;
  const strokeColor = 'LightGray';

  const boxSize = 200 + 30 + strokeWidth * 2;

  const base = scores.map(score => Math.floor(score / 10) - 1);
  console.log(base);
  return (
    <div className="gaugeContainer">
      <svg
        className="gauge"
        fill="none"
        height="100%"
        width="100%"
        stroke={strokeColor}
        strokeWidth={`${strokeWidth}px`}
        viewBox={`0 0 ${boxSize} ${boxSize}`}
        xmlns="http://www.w3.org/2000/svg">
        {SEGMENTS.map((seg, i) => {
          const highlight = base.indexOf(i) >= 0;
          return (
            <path
              fill="none"
              key={`seg-${i}`}
              stroke={highlight ? 'red' : 'LightGray'}
              d={describeArc(
                START_POINT.X,
                START_POINT.Y,
                RADIUS,
                seg.start,
                seg.end
              )}
            />
          );
        })}
      </svg>
      {icon && <i className={`${icon} gaugeIcon`} />}
    </div>
  );
};

export default ReactGauge;
