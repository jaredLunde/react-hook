"use strict";

exports.__esModule = true;
exports.default = exports.useWindowSize = exports.useWindowWidth = exports.useWindowHeight = void 0;

var _react = require("react");

var _array = _interopRequireDefault(require("empty/array"));

var _object = _interopRequireDefault(require("empty/object"));

var _throttle = _interopRequireDefault(require("@react-hook/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useSizeHook = (dim, initialValue, opt) => {
  const {
    fps,
    leading
  } = opt;
  const [size, setThrottledSize] = (0, _throttle.default)(typeof document === 'undefined' ? initialValue : document.documentElement[dim], fps, leading);

  function _ref() {
    return setThrottledSize(document.documentElement[dim]);
  }

  (0, _react.useEffect)(() => {
    const setSize = _ref;
    window.addEventListener('resize', setSize);
    window.addEventListener('orientationchange', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('orientationchange', setSize);
    };
  }, _array.default);
  return size;
};

const useWindowHeight = (initialValue = 0, opt = _object.default) => {
  return useSizeHook('clientHeight', initialValue, opt);
};

exports.useWindowHeight = useWindowHeight;

const useWindowWidth = (initialValue = 0, opt = _object.default) => {
  return useSizeHook('clientWidth', initialValue, opt);
};

exports.useWindowWidth = useWindowWidth;

const useWindowSize = (initialWidth, initialHeight, opt) => [useWindowWidth(initialWidth, opt), useWindowHeight(initialHeight, opt)];

exports.useWindowSize = useWindowSize;
var _default = useWindowSize;
exports.default = _default;
