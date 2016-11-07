;(function (window) {

  function defaults (target, obj) {
    for (var prop in obj) target[prop] = target[prop] || obj[prop];
  }

  function getQuery (queryParams) {
    var params = '';
    if (typeof queryParams === "number" || typeof queryParams === "string") {
      params = '/' + queryParams;
    } else if (typeof queryParams === "object") {
      params = [];
      for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          params.push(key + '=' + queryParams[key]);
        }
      }
      params = '?' + params.join('&');
    }
    return params;
  }

  function _fetch (method, url, opts, data, queryParams) {
    opts.method = method;
    opts.headers = opts.headers || {};
    opts.credentials = opts.credentials || 'same-origin';
    opts.responseAs = (opts.responseAs && ['json', 'text', 'response'].indexOf(opts.responseAs) >= 0) ? opts.responseAs : 'json';

    defaults(opts.headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    if (queryParams) {
      url += getQuery(queryParams);
    }

    if (data) {
        opts.body = JSON.stringify(data);
    } else {
        delete opts.body;
    }

    return fetcher.fetch(url, opts)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          if(opts.responseAs=='response') {
            return response;
          }
          if (response.status == 204) {
            return null;
          }
          return response[opts.responseAs]();
        }
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
      });
  }

  function fetcher (url, opts) {
    opts = opts || {};

    var _ = function (u, o) {
      // Extend parameters with previous ones
      u = url + '/' + u;
      o = o || {};
      defaults(o, opts);
      return fetcher(u, o);
    };

    _.get = function (queryParams) {
      return _fetch('GET', url, opts, null, queryParams);
    };

    _.post = function (data) {
      return _fetch('POST', url, opts, data);
    };

    _.put = function (data) {
      return _fetch('PUT', url, opts, data);
    };

    _.patch = function (data) {
      return _fetch('PATCH', url, opts, data);
    };

    _.delete = function () {
      return _fetch('DELETE', url, opts);
    };

    return _;
  }

  // Expose fetch so that other polyfills can be used
  // Bind fetch to window to avoid TypeError: Illegal invocation
  fetcher.fetch = typeof fetch !== 'undefined' ? fetch.bind(window) : null;

  // Support CommonJS, AMD & browser
  if (typeof exports === 'object') {
    module.exports = fetcher;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return fetcher; });
  } else {
    window.fetcher = fetcher;
  }

})(typeof window != 'undefined' ? window : undefined);
