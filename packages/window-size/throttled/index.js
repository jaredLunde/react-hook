'use strict'

exports.__esModule = true
exports.default = exports.useWindowWidth = exports.useWindowHeight = exports.useWindowSize = void 0

var _react = _interopRequireDefault(require('react'))

var _throttle = _interopRequireDefault(require('@react-hook/throttle'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const {useEffect} = _react.default
const emptyArr = []
const emptyObj = {}

const useWindowSize = (initialWidth, initialHeight, options = emptyObj) => {
  const {fps, leading} = options
  const [size, setThrottledSize] = (0, _throttle.default)(
    /* istanbul ignore next */
    typeof document === 'undefined'
      ? [initialWidth, initialHeight]
      : [
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ],
    fps,
    leading
  )

  function _ref() {
    return setThrottledSize([
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
    ])
  }

  useEffect(() => {
    const setSize = _ref
    window.addEventListener('resize', setSize)
    window.addEventListener('orientationchange', setSize)
    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('orientationchange', setSize)
    }
  }, emptyArr)
  return size
}

exports.useWindowSize = useWindowSize

const useWindowHeight = (initialValue = 0, options) =>
  useWindowSize(0, initialValue, options)[1]

exports.useWindowHeight = useWindowHeight

const useWindowWidth = (initialValue = 0, options) =>
  useWindowSize(initialValue, 0, options)[0]

exports.useWindowWidth = useWindowWidth
var _default = useWindowSize
exports.default = _default
