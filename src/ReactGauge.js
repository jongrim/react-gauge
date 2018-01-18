import React from 'react';
import './styles.css';

const RADIUS = 100;
const SIZE = 240;
const SEGMENT_COUNT = 10;
const SEGMENT_SIZE = 23;
const START_POINT = {
  X: 115,
  Y: 115
};

function makeSegments(size, segmentCount, segmentSize) {
  let startPoint = - (size / 2);
  const arcSpace = segmentCount * segmentSize;
  const emptySpace = size - arcSpace;
  const emptySegSize = emptySpace / (segmentCount - 1);

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    segments.push({ start: startPoint, end: startPoint + segmentSize });
    startPoint = startPoint + segmentSize + emptySegSize;
  }

  return segments;
}

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

const ReactGauge = ({ icon, label, scores }) => {
  const strokeWidth = 10;
  const strokeColor = 'LightGray';
  const base = scores.map(score => Math.floor(score / 10) - 1);

  const segments = makeSegments(SIZE, SEGMENT_COUNT, SEGMENT_SIZE);

  return (
    <div className="gauge-container">
      <svg
        className="gauge"
        fill="none"
        height="100%"
        width="100%"
        stroke={strokeColor}
        strokeWidth={`${strokeWidth}px`}
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg">
        {segments.map((seg, i) => {
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
      {icon && (
        <div className="gauge-icon">
          <i className={`${icon}`} />
          <p>{label}</p>
        </div>
      )}
    </div>
  );
};

export default ReactGauge;
