import 'whatwg-fetch';

;(function(window) {

  function defaults(target, obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        target[prop] = target[prop] || obj[prop];
      }
    }
  }

  function getQuery(queryParams) {
    var params = '';
    if (typeof queryParams === 'number' || typeof queryParams === 'string') {
      params = '/' + queryParams;
    } else if (typeof queryParams === 'object') {
      params = [];
      for (var prop in queryParams) {
        if (queryParams.hasOwnProperty(prop)) {
          params.push(prop + '=' + queryParams[prop]);
        }
      }
      params = '?' + params.join('&');
    }
    return params;
  }

  function _fetch(method, url, opts, data, queryParams) {
    opts.method = method;
    opts.headers = opts.headers || {};
    opts.credentials = opts.credentials || 'include';
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

    return redrover.fetch(url, opts).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				if(opts.responseAs=='response') {
					return response;
				}
				if (response.status == 204) {
					return null;
				}
				return response[opts.responseAs]();
			}
			// An `Error` is thrown to invoke the .catch() method. Because only text can be passed to
			// `new Error('some error message')`, attch the response (probably JSON) to error.body
			return  response[opts.responseAs]().catch((parseErr) => {
				console.error(`Expected response type ${opts.responseAs}, but received: ${response.headers.get("content-type")}`);
//				var error = new Error(response.statusText);
//				error.response = response;
//				error.body = parseErr;
				throw parseErr;
			}).then((payload) => {
//				var error = new Error(response.statusText);
//				error.response = response;
//				error.body = payload;
				throw payload;
			});

		});
  }

  function redrover(url, opts) {
    opts = opts || {};

    var _ = function(u, o) {
      // Extend parameters with previous ones
      u = url + '/' + u;
      o = o || {};
      defaults(o, opts);
      return redrover(u, o);
    };

    _.get = function(queryParams) {
      return _fetch('GET', url, opts, null, queryParams);
    };

    _.post = function(data, queryParams) {
      return _fetch('POST', url, opts, data, queryParams);
    };

    _.put = function(data, queryParams) {
      return _fetch('PUT', url, opts, data, queryParams);
    };

    _.patch = function(data) {
      return _fetch('PATCH', url, opts, data);
    };

    _.delete = function() {
      return _fetch('DELETE', url, opts);
    };

    return _;
  }

  // Expose fetch so that other polyfills can be used
  // Bind fetch to window to avoid TypeError: Illegal invocation
  redrover.fetch = typeof fetch !== 'undefined' ? fetch.bind(window) : null;

  // Support CommonJS, AMD & browser
  if (typeof exports === 'object') {
    module.exports = redrover;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return redrover; });
  } else {
    window.redrover = redrover;
  }

})(typeof window != 'undefined' ? window : undefined);
