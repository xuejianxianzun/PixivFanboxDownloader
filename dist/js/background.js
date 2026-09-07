/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.12.0 - Tue May 14 2024 18:01:29 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
    throw new Error("This script should only be loaded in a browser extension.");
  }
  if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };
      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }
        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }
          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };
      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };
      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },
          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }
            if (!(prop in target)) {
              return undefined;
            }
            let value = target[prop];
            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });
              return value;
            }
            cache[prop] = value;
            return value;
          },
          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },
          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },
          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },
        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },
        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });
      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */
        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {} /* wrappers */, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }
          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }
              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });
      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };
      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }
        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }
        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };
      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ }),

/***/ "./src/ts/Config.ts":
/*!**************************!*\
  !*** ./src/ts/Config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Config: () => (/* binding */ Config)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

// 储存一些配置
// 用户不可以修改这里的配置
class Config {
    /**使用输出面板显示内容时，如果文件数量大于这个值，就不再显示内容，而是保存到 txt 文件 */
    static outputMax = 5000;
    /**同时下载的文件数量的最大值 */
    static downloadThreadMax = 3;
    /**下载某个文件时，允许的累计失败次数。达到此上限后，跳过该文件 */
    static retryMax = 3;
    /**程序名 */
    static appName = 'Pixiv Fanbox Downloader';
    /**下载器设置在 localStorage 里储存时的 name */
    static settingStoreName = 'fanboxSetting';
    /**文件类型。fanbox 允许直接上传在投稿里的文件类型只有这些。现在没有 bmp 格式了，不过以前文章里上传的文件还会保留，所以这里也不要删除 */
    static fileType = {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
        music: ['wav', 'mp3', 'flac'],
        video: ['mp4', 'mov', 'avi'],
        compressed: ['zip'],
        ps: ['psd', 'clip'],
        other: ['txt', 'pdf'],
    };
    /**默认的命名规则 */
    static defaultNameRule = '{user}/{date}-{title}/{index}';
    static defaultNameRuleForNonImages = '{user}/{date}-{title}/{name}';
    /**浏览器是否处于移动端模式 */
    static mobile = navigator.userAgent.includes('Mobile');
    /**检测 Firefox 浏览器 */
    static isFirefox = navigator.userAgent.includes('Firefox');
    /** Firefox Android 上不支持 downloads API（调用 downloads.download 等方法会抛出 "Not implemented" 错误），此时需要使用 a 标签来下载文件 */
    static downloadsAPIDisabled = this.isFirefox && this.mobile;
    /** 下载下载器动态生成的文件（如保存的正文文件、HTML 文件等）时，Firefox 里无法在后台使用前台生成的 blob URL。
     * 所以发送消息时需要携带 Blob 对象，由后台脚本生成 blob URL 来下载 */
    static sendBlob = this.isFirefox;
    /** 在 Chrome 的隐私窗口里下载下载器动态生成的文件时，需要把 blob 对象转换为 dataURL 发送给后台。
     * 不能直接传递 blob，因为隐私窗口里前台传递给后台的数据会被 Chrome 做 JSON 序列化处理，
     * 而 Blob 无法被序列化，后台接收到的 blob 会变成空对象，无法使用。
     * 前台生成的 blob URL 也无法使用，因为后台脚本（spanning 模式）与隐私窗口位于不同的环境里。
     * dataURL 是纯字符串，在所有情况下都可以传递。由于转换为 dataURL 有额外的性能消耗，
     * 所以只有在其他方式都不可用时才使用它
     */
    static sendDataURL = !this.isFirefox &&
        // 这个检测只在页面（content script）里有效；在后台脚本里 browser.extension
        // 可能不存在（例如 Chrome MV3 的 Service Worker），此时为 undefined，不影响使用
        (webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().extension)?.inIncognitoContext;
    static whatIsNewFlagDefault = 'xuejian&saber';
}



/***/ }),

/***/ "./src/ts/TotalDownload.ts":
/*!*********************************!*\
  !*** ./src/ts/TotalDownload.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   totalDownload: () => (/* binding */ totalDownload)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class TotalDownload {
    /** 记录每天的下载总体积。key 是当天的 date，value 是当天的下载总量（字节数） */
    data = {};
    constructor() {
        this.init();
    }
    init() {
        // 初始化存储
        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onInstalled.addListener(async (details) => {
            if (details.reason === 'install') {
                try {
                    await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.set({ totalDownload: {} });
                    console.log('totalDownload 初始化成功');
                }
                catch (error) {
                    console.error('初始化存储失败:', error);
                }
            }
        });
        // 监听消息，返回数据。
        // 注意：监听器本身不能是 async 函数。因为 async 函数总是返回 Promise，
        // 会被当作对消息的异步响应。如果监听器对与本模块无关的消息也返回 Promise，
        // 就会抢先返回一个 undefined 响应，导致真正处理该消息的其他监听器无法返回数据。
        // 所以这里在监听器里同步判断消息类型，只对本模块处理的消息返回异步处理结果。
        // 对于其他消息，监听器同步结束（返回 undefined），不会产生响应。
        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener((request) => {
            if (request.msg === 'getTotalDownload') {
                return this.getTodayData();
            }
            else if (request.msg === 'getTotalDownloadHistory30') {
                return this.getHistory30Day();
            }
        });
        // 加载 totalDownload
        setTimeout(() => {
            this.restore();
        }, 0);
    }
    async restore() {
        const result = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.get(['totalDownload']);
        this.data = result.totalDownload || {};
    }
    // 返回今天的数据（供消息监听器使用）
    async getTodayData() {
        return { total: this.data[this.getDate()] };
    }
    // 返回最近 30 天的数据（供消息监听器使用）。虽然可以返回所有数据，
    // 但是天数太多的话，前台不好展示
    async getHistory30Day() {
        const history = await this.getLast30DaysData();
        return { history };
    }
    /** 生成 YYYY-MM-DD 格式的当前日期 */
    getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // 添加下载量
    addDownload(bytes) {
        const date = this.getDate();
        this.data[date] = (this.data[date] || 0) + bytes;
        // 写入存储失败不影响内存中的数据，忽略错误
        webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage.local.set({ totalDownload: this.data }).catch(() => { });
    }
    /**
     * 获取最近 30 天的数据（包括今天），以数组形式返回
     */
    async getLast30DaysData() {
        // 如果是空对象，可能尚未从 local storage 里加载数据，尝试重新加载一次
        // 例如后台脚本被回收了，前台却要查看数据, 于是后台脚本被再次执行，此时可能还是默认值
        if (Object.keys(this.data).length === 0) {
            await this.restore();
        }
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 29);
        const result = Object.entries(this.data)
            .filter(([dateStr]) => {
            // 添加 T00:00:00 使日期初始化为本地时间 0 点
            // 如果不带 T 部分，JavaScript 会假设时间为 UTC 时间的 00:00:00
            // 然后，Date 对象会将这个 UTC 时间转换为本地时区（如香港标准时间为 GMT+0800）
            // 如果带 T，且不带时区标识符（如 Z 或 +08:00）时，JavaScript 会假定它是本地时间
            // 也就是 GMT+0000
            // 由于下载器在储存记录时，是使用 new Date() 来获取年月日的，这是本地时间
            // 所以这里对比时间时，也要初始化为本地时间，即指明 T00:00:00
            const date = new Date(dateStr + 'T00:00:00');
            return !isNaN(date.getTime()) && date >= thirtyDaysAgo && date <= today;
        })
            .map(([date, bytes]) => ({ date, bytes }));
        return result;
    }
}
const totalDownload = new TotalDownload();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/ts/background.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TotalDownload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TotalDownload */ "./src/ts/TotalDownload.ts");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");



// 当点击扩展图标时，显示/隐藏下载面板
webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().action.onClicked.addListener(function (tab) {
    // 在本程序没有权限的页面上点击扩展图标时，url 始终是 undefined，此时不发送消息
    if (!tab.url) {
        return;
    }
    // 页面里可能没有内容脚本，sendMessage 会失败，忽略错误即可
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().tabs
        .sendMessage(tab.id, {
        msg: 'click_icon',
    })
        .catch(() => { });
});
// 当扩展被安装、被更新、或者浏览器升级时，初始化数据
webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.onInstalled.addListener((details) => {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.set({ dlData: {}, batchNo: {} });
});
/**存储每个下载任务的数据。
 *
 * 因为下载完成的顺序和前台发送的顺序可能不一致，所以需要把数据保存起来以供查询 */
let dlData = {};
/**使用每个页面的 tabId 作为索引，储存当前下载任务的批次编号（在该页面里）。用来判断不同批次的下载 */
let batchNo = {};
const fileNameList = new Map();
// 接收下载请求
// 注意：监听器本身不能是 async 函数。因为 async 函数总是返回 Promise，
// 在 webextension-polyfill（Chrome 中）和 Firefox 中，监听器返回的 Promise 都会被当作
// 对该消息的异步响应。如果监听器对与本模块无关的消息（例如查询下载量的消息）也返回
// Promise，就会抢先返回一个 undefined 响应，导致真正处理该消息的其他监听器无法返回数据。
// 所以这里在监听器里同步判断消息类型，只对本模块处理的消息返回异步处理结果。
// 对于其他消息，监听器同步结束（返回 undefined），不会产生响应。
webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.onMessage.addListener(function (msg, sender) {
    if (msg.msg === 'send_download') {
        return downloadFile(msg, sender);
    }
    else if (msg.msg === 'save_file_no_replay') {
        return saveFileNoReplay(msg);
    }
    else if (msg.msg === 'save_work_file_a_download') {
        // 使用 a 标签下载文件后，下载不会经过 downloads API，也不会触发下面的 onChanged 事件。
        // 所以这里模拟一个下载成功的消息返回给前台，使下载流程得以继续
        return simulateDownloaded(msg, sender);
    }
});
// 解析实际用于下载的 URL 或数据。
// 下载器要下载的文件分两种：
// 1. 原始 URL（fanbox 上的文件），直接交给浏览器下载即可，在所有浏览器里都没有问题。
// 2. 下载器动态生成的文件（blob URL，如保存的正文文件、HTML 文件、粉丝卡等）。
//    前台生成的 blob URL 在 Firefox 里无法在后台使用；在 Chrome 的隐私窗口（spanning）里也无法使用。
//    所以发送这种文件的下载消息时，会附带 blob（Firefox）或 dataURL（Chrome 隐私窗口），按下面的优先级使用
async function getFileURL(msg) {
    // 在 Chrome 的隐私窗口里，使用 dataURL 下载
    if (msg.dataURL) {
        return msg.dataURL;
    }
    // 在 Firefox 里，根据前台传递的 blob 生成 blob URL 来下载
    if (_Config__WEBPACK_IMPORTED_MODULE_2__.Config.isFirefox && msg.blob) {
        return URL.createObjectURL(msg.blob);
    }
    // 其他情况：原始 URL，或 Chrome 的正常窗口里前台生成的 blob URL
    return msg.fileUrl;
}
// 模拟一个下载成功的消息返回给前台。
// 用于在 Firefox Android（不支持 downloads API，见 Config.downloadsAPIDisabled）里
// 使用 a 标签下载文件后的场景
async function simulateDownloaded(msg, sender) {
    const tabId = sender.tab.id;
    // 与 downloads API 下载完成时回传的消息格式保持一致
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().tabs
        .sendMessage(tabId, {
        msg: 'downloaded',
        data: {
            // url 必须与前台该下载任务的 url（msg.fileUrl）一致，前台才能匹配到下载任务
            url: msg.fileUrl,
            id: msg.id,
            filename: msg.fileName,
            tabId: tabId,
            uuid: false,
            size: -1,
        },
        err: '',
    })
        .catch(() => { });
}
// 接收下载任务，通过浏览器开始下载
async function downloadFile(msg, sender) {
    // 当处于初始状态时，或者变量被回收了，就从存储中读取数据储存在变量中
    // 之后每当要使用这两个数据时，从变量读取，而不是从存储中获得。这样就解决了数据不同步的问题，而且性能更高
    if (Object.keys(batchNo).length === 0) {
        const data = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.get(['batchNo', 'dlData']);
        batchNo = data.batchNo || {};
        dlData = data.dlData || {};
    }
    const tabId = sender.tab.id;
    // 如果开始了新一批的下载，重设批次编号，清空下载索引
    if (batchNo[tabId] !== msg.taskBatch) {
        batchNo[tabId] = msg.taskBatch;
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.set({ batchNo });
    }
    fileNameList.set(msg.fileUrl, msg.fileName);
    // 获取实际用于下载的 URL 或数据（在 Firefox / Chrome 隐私窗口里下载 blob 文件时，
    // 实际下载的 URL 可能与前台传递的 fileUrl 不同，详见 getFileURL）
    const downloadUrl = await getFileURL(msg);
    // 开始下载。downloads.download 失败时（例如文件名非法）会抛出错误，
    // 需要捕获，避免异步监听器抛错，导致发送方收到未处理的 Promise 拒绝
    try {
        // id 是浏览器新建立的下载任务的 id
        const id = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().downloads.download({
            url: downloadUrl,
            filename: msg.fileName,
            conflictAction: msg.conflictAction || 'uniquify',
            saveAs: false,
        });
        dlData[id] = {
            url: msg.fileUrl,
            id: msg.id,
            filename: msg.fileName,
            tabId: tabId,
            uuid: false,
            size: -1,
            // 如果实际下载的 URL 是后台根据 blob 生成的（Firefox 场景），记录它，
            // 下载完成后吊销。注意：前台生成的 blob URL（msg.fileUrl）不会被吊销，
            // 因为前台可能复用同一个 blob URL（例如下载失败后重试）
            blobURLBack: downloadUrl.startsWith('blob:') && downloadUrl !== msg.fileUrl
                ? downloadUrl
                : undefined,
        };
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.set({ dlData });
    }
    catch (error) {
        console.error('下载失败:', error);
    }
}
// 保存不需要返回下载状态的文件
async function saveFileNoReplay(msg) {
    try {
        // 获取实际用于下载的 URL 或数据，详见 getFileURL
        const downloadUrl = await getFileURL(msg);
        await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().downloads.download({
            url: downloadUrl,
            filename: msg.fileName,
            // 冲突处理方式由前台消息指定（即用户设置的 conflictAction）。
            conflictAction: msg.conflictAction || 'uniquify',
            saveAs: false,
        });
        // 说明：如果 downloadUrl 是这里根据 blob 生成的（Firefox 场景），不会吊销它。
        // 这种文件（错误记录 txt、粉丝卡）的下载不注册到 dlData 里，无法得知下载完成时机；
        // 且它们都是小文件、低频出现，内存影响可以忽略
    }
    catch (error) {
        console.error('保存文件失败:', error);
    }
}
// 判断文件名是否变成了 UUID 格式。因为文件名处于整个绝对路径的中间，所以没加首尾标记 ^ $
const UUIDRegexp = /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/;
// 监听下载事件
// 每个下载会触发两次 onChanged 事件
// Firefox Android 不支持 downloads API（注册监听器时会抛出 "Not implemented" 错误），所以不注册该监听器
if (!_Config__WEBPACK_IMPORTED_MODULE_2__.Config.downloadsAPIDisabled) {
    webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().downloads.onChanged.addListener(async function (detail) {
        // 根据 detail.id 取出保存的数据
        // 如果有数据，就是本扩展建立的下载，所以不会监听到非本扩展建立的下载
        let data = dlData[detail.id];
        if (!data) {
            const getData = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.get(['dlData']);
            dlData = getData.dlData || {};
            data = dlData[detail.id];
        }
        if (data) {
            let msg = '';
            let err = '';
            // 判断当前文件名是否正常。下载时必定会有一次 detail.filename.current 有值
            if (detail.filename && detail.filename.current) {
                const changedName = detail.filename.current;
                // 检查文件名是否是 UUID 格式
                if (changedName.match(UUIDRegexp) !== null) {
                    data.uuid = true;
                }
                // 另一种情况：Fanbox 下载器的多数文件是直接把原 URL 发送给浏览器下载的，因此很多时候即使受到其他扩展程序的影响，也不会是 UUID，而是原文件名，例如：
                // https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/10264356/cover/cvfFotXy5Cbc2I0uakDXHG0s.jpeg
                // 受到影响时，上面的图片保存后是原文件名：
                // cvfFotXy5Cbc2I0uakDXHG0s.jpeg
                // 此时的 detail 示例：
                // const detailExample = {
                //   "filename": {
                //      current 在 windows 上可能是这样的：
                //     "current": "C:\\download\\cvfFotXy5Cbc2I0uakDXHG0s (6).jpeg",
                //      current 在 Linux 上可能是这样的：
                //     "current": "/home/username/Downloads/cvfFotXy5Cbc2I0uakDXHG0s (6).jpeg",
                //     "previous": ""
                //   },
                //   "id": 1347
                // }
                // 注意：以前的版本里，会判断实际文件名是否符合预期（即是否与下载器生成的文件名保持一致）。但现在不判断了，原因是：
                // 现在当文件名冲突时，用户可以选择手动处理。在这种情况下，用户可能手动修改文件名，导致实际文件名与预期不一致，但这并不意味着文件名异常，所以不再判断实际文件名是否符合预期
                // 下面是以前的判断逻辑，保留在这里作为注释
                // fileNameList 里储存的预期的文件名示例：
                // fanbox/omutatsu／おむたつ/2025-07-22-🔞7月22日🔞/0.jpeg
                // const expectedName = fileNameList.get(data.url)
                // if (expectedName) {
                //   // 取出预期的文件名的最后一部分，上面的文件名的结果是 "0"
                //   const name = expectedName.split('/').pop()?.split('.')[0] || ''
                //   // 取出实际的文件名的最后一部分（注意，即使是与预期一致的文件名，实际上也可能有序号）
                //   let name2 = ''
                //   if (changedName.includes('\\')) {
                //     name2 = changedName.split('\\').pop()?.split('.')[0] || ''
                //   } else {
                //     name2 = changedName.split('/').pop()?.split('.')[0] || ''
                //   }
                //   // 如果实际文件名不是以预期的文件名开头，则说明文件名异常
                //   if (name2 && name2.startsWith(name) === false) {
                //     data.uuid = true
                //   }
                // }
            }
            if (detail.state && detail.state.current === 'complete') {
                msg = 'downloaded';
                // 下载完成后，查询下载项的体积
                // 查询花费的时间：在下载记录不是很多的情况下，查询耗时多为 2 - 5 ms
                const results = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().downloads.search({ id: detail.id });
                if (results && results.length > 0) {
                    const downloadItem = results[0];
                    const fileSize = downloadItem.fileSize; // 文件大小（字节）
                    if (fileSize !== -1) {
                        data.size = fileSize;
                        _TotalDownload__WEBPACK_IMPORTED_MODULE_0__.totalDownload.addDownload(fileSize);
                        // console.log(`文件下载完成，大小: ${fileSize} 字节`)
                    }
                    else {
                        // console.log("文件下载完成，但大小未知")
                    }
                }
                else {
                    // console.error("未找到下载项")
                }
            }
            if (detail.error && detail.error.current) {
                // 下载被取消或者失败时，这里是能捕获到错误的，detail.error.current 包含错误类型：
                // 取消 USER_CANCELED
                // 失败 NETWORK_FAILED
                msg = 'download_err';
                err = detail.error.current;
            }
            // 返回信息
            if (msg) {
                // 页面可能已经关闭，sendMessage 可能会失败，忽略错误即可
                webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().tabs.sendMessage(data.tabId, { msg, data, err }).catch(() => { });
                // 下载结束（完成或出错）后，吊销后台生成的 blob URL（如果有）
                if (data.blobURLBack) {
                    URL.revokeObjectURL(data.blobURLBack);
                }
                // 清除这个任务的数据
                dlData[detail.id] = null;
                await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().storage.local.set({ dlData });
            }
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=background.js.map