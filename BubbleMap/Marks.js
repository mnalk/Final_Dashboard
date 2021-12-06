import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule,
  scaleOrdinal,
  schemeCategory10,
} from 'd3';
import { useMemo, useContext } from 'react';

import 'styles.css';
import React from 'react';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css' // optional
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/perspective.css'



const StringContent = () => (
  <Tippy content="Hello">
    <button>My button</button>
  </Tippy>
);









const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const colorScale = scaleOrdinal(schemeCategory10);



export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue
}) => (
  <g className="marks">
    {useMemo(
      () => (
        <>
          <path className="sphere" d={path({ type: 'Sphere' })} />
          <path className="graticules" d={path(graticule())} />
          {land.features.map(feature => (
            <path className="land" d={path(feature)} />
          ))}
          <path className="interiors" d={path(interiors)} />
        </>
      ),
      [path, graticule, land, interiors]
    )}
    {data.map(d => {
      const [x, y] = projection(d.coords);
        return (
      <Tippy theme= 'suicide'
        animation='perspective'
        placement='bottom'
          content={
            <span>
              <strong>
                {
                  // '<span class="tooltip-span">info:</span><ul>
                  // 	<li>('Country:')+(d.country)</li>+ 
                  //   <li>('Gdp per capita:')+(d.gdp_per_capita)</li>+ 
                  //   <li>('Gdp for year:')+(d.gdp_for_year)</li></ul>',
                   
                  ('Country:')+(d.country)+' '+(',')+
                  ('Gdp per capita:')+(d.gdp_per_capita)+' '+','+
                  ('Gdp for year:')+(d.gdp_for_year)+' '+','+
                  ('Suicides pop:')+(d.suicides_pop)+' '+','+
                  ('Population:')+(d.population)+'.'   
                }
              </strong>
            </span>
          }
      
        >
          <g>
            {' '}
            <circle
              cx={x}
              cy={y}
              fill={colorScale(d.suicides_no)}
              r={sizeScale(sizeValue(d))}
              title={d.country + ' ' + d.suicides_no}
              
            />
          </g>
        </Tippy>
      );
    })}
  </g>
);

