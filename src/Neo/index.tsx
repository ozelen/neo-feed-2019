import React, { Fragment } from 'react';
import { useNeoEffects } from './effects';
import NeoDaySummary from './NeoDaySummary';
import styles from './Neo.css';

const Neo = () => {
  const { display } = useNeoEffects();
  return (
    <Fragment>
      <h1>
        NEO
      </h1>
      <h1>Per-day Summary</h1>
        <table className={styles.neoTable}>
          <thead>
          <tr>
            <th>Date</th>
            <th>Max Estimated Diameter</th>
            <th>Potentially Hazardous</th>
            <th>Closest</th>
            <th>Fastest</th>
          </tr>
          </thead>
          <tbody>
            {display.map((day, i) => (
              <NeoDaySummary
                key={String(day) + i}
                {...day}
              />
            ))}
          </tbody>
        </table>
    </Fragment>
  );
};

export default Neo;
