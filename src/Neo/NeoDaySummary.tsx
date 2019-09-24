import React, {Fragment} from 'react';

const danger = {background: 'red', color: '#fff'};

const NeoDaySummary = (props: IDayAggregatedData) => (
  <Fragment>
    <tr style={props.isDangerous ? danger : {}}>
      <td>{props.date.toLocaleDateString("en-US")}</td>
      <td>{props.maxEstimatedDiameterKm}</td>
      <td>{props.potentiallyHazardous}</td>
      <td>{props.closest}</td>
      <td>{props.fastest}</td>
    </tr>
  </Fragment>
);

export default NeoDaySummary;
