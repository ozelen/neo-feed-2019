import { getUrl, getOffset, getPayload } from './api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import fixture from './fixture.json';

it('should provide URL based on today', () => {
  const factory = getUrl(new Date('2019-09-24'));
  expect(factory(1)).toEqual('_URL_/neo/rest/v1/feed/?api_key=_API_KEY_&start_date=2019-09-22&end_date=2019-09-16');
  expect(factory(7)).toEqual('_URL_/neo/rest/v1/feed/?api_key=_API_KEY_&start_date=2019-09-16&end_date=2019-09-10');
});

it('should get date with offset', () => {
  expect(getOffset(new Date('2019-09-24'), 10)).toEqual('2019-09-14');
});

it('should deserialize payload from response properly', () => {
  // https://api.nasa.gov/neo/rest/v1/feed/?api_key=SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl&start_date=2019-09-02&end_date=2019-08-27
  const response: AxiosResponse = {
    data: fixture,
    status: 200,
    statusText: 'ok',
    headers: {},
    config: {} as AxiosRequestConfig,
  }
  expect(Object.keys(getPayload(response))).toEqual(['2019-08-27', '2019-08-28', '2019-08-29']);
});
