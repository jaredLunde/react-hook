/**
 * A hook that sets a `timedOut` boolean flag to true after `ms` have passed and the timeout has
 * been started.
 *
 * @param ms The amount of time to wait before setting `timedOut` to `true`
 * @returns The first element is a `timedOut` boolean that is `true` when
 *  the timeout `ms` have been exceeded and `false` otherwise. The second element is a `start` method for
 *  starting the timeout. The third element is a `reset` method for clearing the timeout.
 *
 * @example
 *  const [timedOut, start, reset] = useTimeout(300)
 *  // starts the timeout
 *  start()
 *  // clears the timeout
 *  reset()
 *  // logs the timedOut state
 *  console.log(timedOut)
 */
export declare const useTimeout: (
  ms?: number
) => [boolean, () => void, () => void]
/**
 * A hook that executes a callback after a timeout is reached and the clock has
 * been started.
 *
 * @param callback The callback you want invoked when the timeout is exceeded
 * @param ms The amount of time to wait before firing the callback after `start()` is invoked.
 *  When this is `0` the callback will never fire.
 * @param dependencies Dependencies array for your callback. Anytime your dependencies change,
 *  the timeout will be reset to an  idle state and any pending timeouts will not invoke.
 * @returns The first element is a `start` method for starting the timeout. The
 *  second element is a `reset` method for clearing the timeout.
 *
 * @example
 *  const [start, reset] = useTimeoutCallback(() => setState('copied'), 0, [text])
 *  // starts the timeout
 *  start()
 *  // clears the timeout
 *  reset()
 */
export declare const useTimeoutCallback: (
  callback: (...args: any[]) => any,
  ms?: number
) => [() => void, () => void]
