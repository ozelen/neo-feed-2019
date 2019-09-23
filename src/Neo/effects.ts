import { useEffect, useReducer } from 'react';
import { tap, map, takeWhile, flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { getNEO, getUrl, getStartDay, normalize } from './api';
import { POLLING_INTERVAL, SHOW_NEXT_INTERVAL } from './constants';
import { initialState, neoReducer, updateNeo, showNextNeoDay } from './reducer';

export const useNeoEffects = () => {
  const [state, dispatch] = useReducer(neoReducer(initialState), initialState);

  useEffect(() => {
    const stream = interval(POLLING_INTERVAL).pipe(
      map(getStartDay),
      takeWhile(day => day <= new Date().getDate()),
      map(getUrl),
      tap(console.log),
      flatMap(getNEO),
      map(normalize),
      tap(res => dispatch(updateNeo(res)))
    ).subscribe();
    return () => stream.unsubscribe();
  }, []);

  useEffect(() => {
    const stream = interval(SHOW_NEXT_INTERVAL).pipe(
      tap(console.log),
      map(counter => dispatch(showNextNeoDay(counter))),
    ).subscribe();
    return () => stream.unsubscribe();
  }, []);

  return state;
}
