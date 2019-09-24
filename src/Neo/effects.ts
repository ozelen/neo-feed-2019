import { useEffect, useReducer } from 'react';
import { tap, map, takeWhile, flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { fetchAPI, getUrl, getPayload } from './api';
import { POLLING_INTERVAL, SHOW_NEXT_INTERVAL, DATE_RANGE_INTERVAL } from './constants';
import { initialState, neoReducer, updateNeo, showNextNeoDay } from './reducer';

export const useNeoEffects = () => {
  const [state, dispatch] = useReducer(neoReducer(initialState), initialState);
  useEffect(() => { // polling effect
    const today = new Date();
    const untilToday = (day: number) => day <= today.getDate();
    const stream = interval(POLLING_INTERVAL).pipe(
      map(i => i * DATE_RANGE_INTERVAL),
      takeWhile(untilToday),
      map(getUrl(today)),
      flatMap(fetchAPI),
      map(getPayload),
      tap(res => dispatch(updateNeo(res))) // update state
    ).subscribe();
    return () => stream.unsubscribe();
  }, []);

  // showing next tick effect
  useEffect(() => {
    const stream = interval(SHOW_NEXT_INTERVAL).pipe(
      map(counter => dispatch(showNextNeoDay(counter))),
    ).subscribe();
    return () => stream.unsubscribe();
  }, []);

  return state;
}
