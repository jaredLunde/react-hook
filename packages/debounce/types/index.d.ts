import {Dispatch, SetStateAction} from 'react'
export declare const useDebounceCallback: <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait?: number,
  leading?: boolean
) => (...args: CallbackArgs) => void
export declare const useDebounce: <State>(
  initialState: State | (() => State),
  wait?: number | undefined,
  leading?: boolean | undefined
) => [State, Dispatch<SetStateAction<State>>]
export default useDebounce
