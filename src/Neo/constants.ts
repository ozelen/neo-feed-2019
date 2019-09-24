const { REACT_APP_POLLING_INTERVAL, REACT_APP_SHOW_NEXT_INTERVAL, REACT_APP_DATE_RANGE_INTERVAL } = process.env;
export const POLLING_INTERVAL = +(REACT_APP_POLLING_INTERVAL || 1000);
export const SHOW_NEXT_INTERVAL = +(REACT_APP_SHOW_NEXT_INTERVAL || 5000);
export const DATE_RANGE_INTERVAL = +(REACT_APP_DATE_RANGE_INTERVAL || 7);
