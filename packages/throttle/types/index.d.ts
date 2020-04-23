import {Dispatch, SetStateAction} from 'react'
export declare const useThrottleCallback: <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => any,
  fps?: number,
  leading?: boolean
) => (...args: CallbackArgs) => void
export declare const useThrottle: <State>(
  initialState: State | (() => State),
  fps?: number | undefined,
  leading?: boolean | undefined
) => [State, Dispatch<SetStateAction<State>>]
export default useThrottle
