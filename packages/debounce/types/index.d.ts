import * as React from 'react'
export declare const useDebounceCallback: <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait?: number,
  leading?: boolean
) => (...args: CallbackArgs) => void
export declare const useDebounce: <State extends unknown>(
  initialState: State | (() => State),
  wait?: number | undefined,
  leading?: boolean | undefined
) => [State, React.Dispatch<React.SetStateAction<State>>]
