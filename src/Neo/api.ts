import { retryWhen, delay, tap } from 'rxjs/operators';
import http from 'axios-observable';
import { AxiosResponse } from 'axios';
const {REACT_APP_API_KEY, REACT_APP_API_HOST} = process.env;
const NEO_FEED_URL = `${REACT_APP_API_HOST}/neo/rest/v1/feed`;
const RETRY_DELAY = 1000;
const DAY = 1000 * 60 * 60 * 24;

export const getUrl = (from=1) =>
  `${NEO_FEED_URL}/?api_key=${REACT_APP_API_KEY}&start_date=${getDate(from+1)}&end_date=${getDate(from+7)}`;

export const getDate = (offset: number) =>
  new Date(Date.now() - offset * DAY).toISOString().substr(0, 10);

export const limitLastDay = (offset: number) =>
  offset > new Date().getUTCDate() ? new Date().getUTCDate() : offset;

export const getNEO = (url: string) =>
  http.get(url).pipe(
    retryWhen((errors) =>
      errors.pipe(
          tap(err => console.error(`API Error, retrying in ${RETRY_DELAY/1000}sec`)),
          delay(RETRY_DELAY)
      )
    )
  );

export const normalize = ({data: {near_earth_objects}}: AxiosResponse<INasaNeoResponse>) =>
  near_earth_objects;

export const getStartDay = (i: number) => i? i*7: 0;
