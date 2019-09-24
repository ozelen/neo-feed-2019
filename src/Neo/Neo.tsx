import React, {Fragment} from 'react';
import NeoDaySummary from './NeoDaySummary';

interface Props {
  neos: IDayAggregatedData[];
}

export default ({neos}: Props) => (
  <Fragment>
    <h1>Per-day Summary</h1>
    <table>
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
        {neos.map((day, i) =>
          <NeoDaySummary {...day} key={String(day) + i} />
        )}
      </tbody>
    </table>
  </Fragment>
);
