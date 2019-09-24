import { retryWhen, delay, tap } from 'rxjs/operators';
import http from 'axios-observable';
import { AxiosResponse } from 'axios';
const {REACT_APP_API_KEY, REACT_APP_API_HOST} = process.env;
const NEO_FEED_URL = `${REACT_APP_API_HOST}/neo/rest/v1/feed/?api_key=${REACT_APP_API_KEY}`;
const RETRY_DELAY = 1000;
const DAY = 1000 * 60 * 60 * 24;

export const getUrl = (baseDate: Date) => (daysOffset: number) =>
  `${NEO_FEED_URL}&start_date=${getOffset(baseDate, daysOffset+1)}&end_date=${getOffset(baseDate, daysOffset+7)}`;

export const getOffset = (baseDate: Date, daysOffset: number) =>
  new Date(+baseDate - daysOffset * DAY).toISOString().substr(0, 10);

export const getPayload = ({data: {near_earth_objects}}: AxiosResponse<INasaNeoResponse>) =>
  near_earth_objects;

export const fetchAPI = (url: string) =>
  http.get(url).pipe(
    retryWhen((errors) =>
      errors.pipe(
          tap(err => console.error(`API Error, retrying in ${RETRY_DELAY/1000}sec`)),
          delay(RETRY_DELAY)
      )
    )
  );

