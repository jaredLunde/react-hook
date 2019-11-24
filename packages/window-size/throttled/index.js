'use strict'

exports.__esModule = true
exports.default = exports.useWindowSize = exports.useWindowWidth = exports.useWindowHeight = void 0

var _react = require('react')

var _throttle = _interopRequireDefault(require('@react-hook/throttle'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const emptyArr = []
const emptyObj = {}

const useSizeHook = (dim, initialValue, options = emptyObj) => {
  const {fps, leading} = options
  const [size, setThrottledSize] = (0, _throttle.default)(
    typeof document === 'undefined'
      ? initialValue
      : document.documentElement[dim],
    fps,
    leading
  )

  function _ref() {
    return setThrottledSize(document.documentElement[dim])
  }

  ;(0, _react.useEffect)(() => {
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

const useWindowHeight = (initialValue = 0, options) =>
  useSizeHook('clientHeight', initialValue, options)

exports.useWindowHeight = useWindowHeight

const useWindowWidth = (initialValue = 0, options) =>
  useSizeHook('clientWidth', initialValue, options)

exports.useWindowWidth = useWindowWidth

const useWindowSize = (initialWidth, initialHeight, options) => [
  useWindowWidth(initialWidth, options),
  useWindowHeight(initialHeight, options),
]

exports.useWindowSize = useWindowSize
var _default = useWindowSize
exports.default = _default
