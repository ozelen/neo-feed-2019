import { handleActions } from 'redux-actions';
import { aggregate } from './aggregate';
import { by, descBy } from '../utils';
import { createAction } from 'redux-actions';

export const UPDATE_NEO = 'UPDATE_NEO';
export const updateNeo = createAction<INeoLog>(UPDATE_NEO);

export const SHOW_NEXT_NEO = 'SHOW_NEXT_NEO';
export const showNextNeoDay = createAction<number>(SHOW_NEXT_NEO);

export const initialState: NeoStoreState = {
  log : {},
  aggregated: [],
  display: [],
  counter: 0
};

export const isDangerous = (list: IDayAggregatedData[], cur: IDayAggregatedData): boolean =>
  !!list
    .slice()
    .filter(({potentiallyHazardous}) => potentiallyHazardous)
    .sort(descBy('potentiallyHazardous'))
    .slice(0, 2)
    .find(e => e.date === cur.date);

export const neoReducer = (initialState: NeoStoreState) =>
  handleActions<NeoStoreState, any>({
    [UPDATE_NEO]: (state, {payload}) => ({
      ...state,
      log: {...state.log, ...payload},
      aggregated: [
        ...state.aggregated,
        ...aggregate(payload).sort(by('date'))
      ]
    }),
    [SHOW_NEXT_NEO]: (state, {payload}) => ({
      ...state,
      counter: payload,
      display: state.aggregated
        .filter((_, i) =>
          i >= 0 &&
          i >= loop(payload, state.aggregated.length) - 5 &&
          i <= loop(payload, state.aggregated.length)
        )
        .map((day, _, list) => ({...day, isDangerous: isDangerous(list, day)}))
    })
}, initialState);

const loop = (x: number, l: number) =>
  x <= l ? x : x % l;
