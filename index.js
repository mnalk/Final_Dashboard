import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { BubbleMap } from './BubbleMap/index.js';
import { DateHistogram } from './DateHistogram/index.js';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = d => d['year'];

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent
    ? data.filter(d => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg width={width} height={height}>
      <BubbleMap
        data={data}
        filteredData={filteredData}
        worldAtlas={worldAtlas}
      />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          width={width}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

tippy('#btn-html', {
    content: '<span class="tooltip-span">Features of this tooltip:</span><ul><li>I have a list inside</li><li>I am on the right</li></ul>',
  theme: 'custom',
  arrow: false,
  placement: 'top',
});