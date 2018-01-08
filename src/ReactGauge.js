import React from 'react';
import './styles.css';

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

function translateScoreToAngle(score, size) {
  const angPerPoint = size / 100;
  let startAngle = score * angPerPoint - size / 2;
  startAngle = startAngle < size / 2 - 30 ? startAngle : size / 2 - 30;
  return startAngle;
}

const ReactGauge = ({ baseTrackSettings, icon, segments }) => {
  const {
    size,
    strokeWidth = 10,
    strokeColor = 'LightGray'
  } = baseTrackSettings;
  const boxSize = 200 + 30 + strokeWidth * 2;
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
        <path
          fill="none"
          stroke="LightGray"
          strokeLinecap="round"
          d={describeArc(115, 115, 100, -(size / 2), size / 2)}
        />
        {segments.map(({ score, ...other }, i) => {
          const startAngle = translateScoreToAngle(score, size);
          const endAngle = startAngle + 30;

          console.log(startAngle, endAngle);
          return (
            <path
              key={`seg-${i}`}
              fill="none"
              {...other}
              d={describeArc(115, 115, 100, startAngle, endAngle)}
            />
          );
        })}
      </svg>
      {icon && <i className={`${icon} gaugeIcon`} />}
    </div>
  );
};

export default ReactGauge;
