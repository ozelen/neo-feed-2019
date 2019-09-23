import React, {Fragment} from 'react';
import { descBy } from '../utils';

interface Props {
  neos: NeoStoreState;
}

interface SummaryProps extends IDayAggregatedData {
  isDangerous: boolean;
}

const NeoDaySummary = (props: SummaryProps) => (
  <React.Fragment>
    <tr className={props.isDangerous ? 'danger' : 'none'}>
      <td>{props.date.toLocaleDateString("en-US")}</td>
      <td>{props.maxEstimatedDiameterKm}</td>
      <td>{props.potentiallyHazardous}</td>
      <td>{props.closest}</td>
      <td>{props.fastest}</td>
    </tr>
  </React.Fragment>
);

const isDangerous =(cur: IDayAggregatedData, neos: IDayAggregatedData[]): boolean =>
  !!neos
    .slice()
    .filter(({potentiallyHazardous}) => potentiallyHazardous)
    .sort(descBy('potentiallyHazardous'))
    .slice(0, 2)
    .find(e => e.date === cur.date);

export default ({neos}: {neos: IDayAggregatedData[]}) => (
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
        {neos.map((day, i) => (
          <NeoDaySummary isDangerous={isDangerous(day, neos)}
            {...day}
            key={String(day) + i} />
        ))}
      </tbody>
    </table>
  </Fragment>
);
