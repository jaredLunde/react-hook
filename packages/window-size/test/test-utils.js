// Simulate window resize event
const resizeEvent = document.createEvent('Event')
resizeEvent.initEvent('resize', true, true)
const orientationEvent = document.createEvent('Event')
orientationEvent.initEvent('orientationchange', true, true)

export const resizeTo = (width, height) => {
  Object.defineProperty(
    document.documentElement,
    'clientWidth',
    {value: width, configurable: true},
  )
  Object.defineProperty(
    document.documentElement,
    'clientHeight',
    {value: height, configurable: true},
  )
  window.dispatchEvent(resizeEvent)
}

export const changeOrientation = (width, height) => {
  Object.defineProperty(
    document.documentElement,
    'clientWidth',
    {value: width, configurable: true},
  )
  Object.defineProperty(
    document.documentElement,
    'clientHeight',
    {value: height, configurable: true},
  )
  window.dispatchEvent(orientationEvent)
}

export const resetSize = () => {
  resizeTo(0, 0)
}