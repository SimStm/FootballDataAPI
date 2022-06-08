'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_KEY = ''; // Do not use querystring from NodeJs since it will
// convert { a: 1, b: [2, 3, 4] } to '?a=1&b=2&b=3&b=4'
// but we want the result to be '?a=1&b=2,3,4'

var toQueryString = function toQueryString(params) {
  var keys = Object.keys(params);

  if (keys.length === 0) {
    return '';
  }

  var queryString = '?';
  keys.forEach(function (key, index) {
    var value = params[key].toString();

    if (index === keys.length - 1) {
      queryString += "".concat(key, "=").concat(value);
    } else {
      queryString += "".concat(key, "=").concat(value, "&");
    }
  });
  return queryString;
};

var FootballData =
/*#__PURE__*/
function () {
  function FootballData(apiKey) {
    _classCallCheck(this, FootballData);

    API_KEY = apiKey;
    this.baseUrl = 'https://api.football-data.org/v2/';
  }

  _createClass(FootballData, [{
    key: "_request",
    value: function _request(endpoint, params, headerData) {
      var url = this._fillUrlParams(endpoint, params);

      return (0, _nodeFetch["default"])(url, {
        headers: {
          'X-Auth-Token': API_KEY
        }
      }).then(function (data) {
        return Promise.all([data, data.json()]);
      }).then(function (result) {
        var _result = _slicedToArray(result, 2),
            data = _result[0],
            json = _result[1];

        if (headerData) {
          json.api = {
            version: data.headers.get('X-API-Version'),
            client: data.headers.get('X-Authenticated-Client'),
            secLeftUntilReset: Number(data.headers.get('X-RequestCounter-Reset')),
            remainingRequests: Number(data.headers.get('X-Requests-Available-Minute'))
          };
        }

        return json;
      });
    }
  }, {
    key: "_fillUrlParams",
    value: function _fillUrlParams(url, params) {
      var wrapped = url.match(/\{(.*?)\}/g);

      if (wrapped) {
        var unwrapped = function unwrapped(wrapped) {
          return wrapped.replace('{', '').replace('}', '');
        };

        for (var w in wrapped) {
          var k = unwrapped(wrapped[w]);
          url = url.replace(wrapped[w], params[k]);
          delete params[k];
        }
      }

      var query = toQueryString(params);
      return query ? "".concat(url).concat(query) : url;
    }
  }, {
    key: "getCompetitions",
    value: function getCompetitions(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getCompetition",
    value: function getCompetition(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/{id}/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getTeamsFromCompetition",
    value: function getTeamsFromCompetition(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/{competitionId}/teams/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getStandingsFromCompetition",
    value: function getStandingsFromCompetition(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/{competitionId}/standings/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getMatchesFromCompetition",
    value: function getMatchesFromCompetition(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/{competitionId}/matches/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getScorersFromCompetition",
    value: function getScorersFromCompetition(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'competitions/{competitionId}/scorers/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getMatches",
    value: function getMatches(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'matches/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getMatch",
    value: function getMatch(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'matches/{id}/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getMatchesFromTeam",
    value: function getMatchesFromTeam(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'teams/{teamId}/matches/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getTeam",
    value: function getTeam(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'teams/{id}/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getAreas",
    value: function getAreas() {
      var headerData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var endpoint = this.baseUrl + 'areas/';
      return this._request(endpoint, {}, headerData);
    }
  }, {
    key: "getArea",
    value: function getArea(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'areas/{id}/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getPlayer",
    value: function getPlayer(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'players/{id}/';
      return this._request(endpoint, params, headerData);
    }
  }, {
    key: "getMatchesFromPlayer",
    value: function getMatchesFromPlayer(params) {
      var headerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var endpoint = this.baseUrl + 'players/{playerId}/matches/';
      return this._request(endpoint, params, headerData);
    }
  }]);

  return FootballData;
}();

var _default = FootballData;
exports["default"] = _default;