import {Dispatch, SetStateAction} from 'react'
export declare const useThrottleCallback: <CallbackArguments extends any[]>(
  callback: (...args: CallbackArguments) => void,
  fps?: number,
  leading?: boolean
) => (...args: CallbackArguments) => void
export declare const useThrottle: <State>(
  initialState: State | (() => State),
  fps?: number | undefined,
  leading?: boolean | undefined
) => [State, Dispatch<SetStateAction<State>>]
export default useThrottle
