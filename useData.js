import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/mnalk/de3ec62d24de80c7b11232f1a4d1312d/raw/13fcdc85531212e095d30e977f9e24d9f497dd8c/final_nov.csv';

const row = d => {
  d.coords = d['Location_Coordinates'].split(',').map(d => +d).reverse();
  d['suicides_no'] = + d['suicides_no'];
  d['year'] = new Date(d['year']);
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row, data => setData(data));
  }, []);

  return data;
};
