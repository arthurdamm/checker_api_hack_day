/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","214183f5cbee9aed2c9df6289ca898bd"],["assets/css/bootstrap.min.css","2a2264a93775e8933f10a2f8ef00ce5e"],["assets/css/demo.css","e10d0b7a8606e2b8b257345e0e903626"],["assets/css/paper-bootstrap-wizard.css","f1de18b671e68d189c598ab6ec51145b"],["assets/css/themify-icons-demo.css","3d87c3626c4d893cb22f78890a202ba9"],["assets/css/themify-icons.css","ddb9af08983864a8a83286f50eee944d"],["assets/fonts/themify.eot","2c454669bdf3aebf32a1bd8ac1e0d2d6"],["assets/fonts/themify.svg","9c8e96ecc7fa01e6ebcd196495ed2db5"],["assets/fonts/themify.ttf","e23a7dcaefbde4e74e263247aa42ecd7"],["assets/fonts/themify.woff","a1ecc3b826d01251edddf29c3e4e1e97"],["assets/img/apple-icon.png","82afbfaa2a64cebfd0077f73abe15659"],["assets/img/default-avatar.jpg","83f3f36de004091a153b25f8013516e7"],["assets/img/favicon.png","996d8248f580f8e26e6c45c67da9b5a6"],["assets/img/flow.jpg","74ea62cd9dc5bbf19e287804570e425e"],["assets/img/new_logo.png","f575a04ebbb31b5798a4c54783e745a2"],["assets/img/paper-1.jpeg","5b2b7ab573f0807d43b045d9adc68aab"],["assets/img/paper-2.jpeg","a3e8b0981dbd1e5dd5684501f6547181"],["assets/img/paper-3.jpeg","f0041033c9139dcf83c9a14d9447b4c3"],["assets/img/tim_80x80.png","44bf13a71a4db6e15913fe8af9296711"],["assets/img/unicorn.jpg","63cbd405cd3cf0b1c114ab1bfbe7e216"],["assets/img/wizard-create-profile.png","c0aa00cafe19e6d55b98ebe9d96f86fc"],["assets/img/wizard-find-desk.png","7045ede9ee780d9d650938f3b578dbb8"],["assets/img/wizard-list-place.png","32c6a395b4de680c039606dc419528d6"],["assets/js/bootstrap.min.js","4becdc9104623e891fbb9d38bba01be4"],["assets/js/jquery-2.2.4.min.js","2f6b11a7e914718e0290410e85366fe9"],["assets/js/jquery.bootstrap.wizard.js","23a034575eebef1a7e5916143bc5ce29"],["assets/js/jquery.validate.min.js","3b00d60f87e893caf2649eff0d48813a"],["assets/js/paper-bootstrap-wizard.js","01ec61dd479206a93bde620abef855b1"],["assets/scss/paper-bootstrap-wizard.scss","0cbc0337582eb5785e62bdb811a3c7e4"],["assets/scss/paper-bootstrap-wizard/_buttons.scss","77a6987f889f7545211efe78a1ce31d9"],["assets/scss/paper-bootstrap-wizard/_card.scss","a93abb9d91b8cf12be6a26dee5ea222b"],["assets/scss/paper-bootstrap-wizard/_footers.scss","b854f4054d205e0589a84da9f6e50343"],["assets/scss/paper-bootstrap-wizard/_inputs.scss","956472c6b5a848abec1b24ae37d17333"],["assets/scss/paper-bootstrap-wizard/_labels-progress-bar.scss","52725324f51890ea34e957340dfeef29"],["assets/scss/paper-bootstrap-wizard/_misc.scss","569f634ff17976d9bece7cdf56dce8ef"],["assets/scss/paper-bootstrap-wizard/_mixins.scss","45560a0292c0f0f34341b1c6adda574d"],["assets/scss/paper-bootstrap-wizard/_navs-pagination.scss","7d514e1a0d6d417fa871a2da25560a41"],["assets/scss/paper-bootstrap-wizard/_responsive.scss","844e88ea6a4e9ccf6b11afbc3564fa46"],["assets/scss/paper-bootstrap-wizard/_tooltips.scss","2011fe33667973a10a050789329afd9f"],["assets/scss/paper-bootstrap-wizard/_typography.scss","bc18d9bbb1941f0466970ec05235066b"],["assets/scss/paper-bootstrap-wizard/_variables.scss","adfc0b2ba0e46a4b5e0fc5c7afe671f9"],["assets/scss/paper-bootstrap-wizard/_wizard-card.scss","902f3c7efcd50cf582bf7998be702543"],["assets/scss/paper-bootstrap-wizard/mixins/_buttons.scss","197b7019900d90a4b6c3a30f225de481"],["assets/scss/paper-bootstrap-wizard/mixins/_inputs.scss","ec4cced8f9876444d4c7680282325ac3"],["assets/scss/paper-bootstrap-wizard/mixins/_labels.scss","bd0e11ead3c6fe266b45bb42ebed6642"],["assets/scss/paper-bootstrap-wizard/mixins/_transparency.scss","96c695ec4e2e69707b29572e7aa558d5"],["assets/scss/paper-bootstrap-wizard/mixins/_vendor-prefixes.scss","a2c4354449f2b0cf3cad976e88e39f1f"],["composer.json","8a80554c91d9fca8acb82f023de02f11"],["index.html","9c6424629e6a06dfee4b5fb3bd1022df"],["index.php","5c4fe72da4f7bd8312e412303578c2c6"],["js/main.html","12e114f0a1c42da17efff2e05914e8f5"],["js/main.js","1770afffc621eb4664ce778f7731da00"],["js/message.js","4e948496ab3cc3249a609ed78d90d651"],["manifest.json","709a6aae9ac32bdd11b2f0105dea4b98"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







