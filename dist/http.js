'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export a plain axios reference to use in any non-api call.
 */
exports.default = _axios2.default;

/**
 * Create a preconfigured axios instance to use in all api calls.
 */

var api = exports.api = _axios2.default.create({
  baseURL: process.env.TIMELY_API_HOST
});

/**
 * Update the api axios instance with the latest access token.
 *
 * @param  {string?} token
 * @param  {string}  [type='Bearer']
 * @return {void}
 */
api.updateAccessToken = function (token) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Bearer';

  if (token) {
    api.defaults.headers.common.Authorization = type + ' ' + token;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};