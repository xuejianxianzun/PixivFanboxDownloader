/******/ ;(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      })
      /******/
    }
    /******/
  }
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  }
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  }
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  }
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = ''
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(
    (__webpack_require__.s = './src/ts/content.ts')
  )
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './src/ts/content.ts':
      /*!***************************!*\
  !*** ./src/ts/content.ts ***!
  \***************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _modules_PageType__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./modules/PageType */ './src/ts/modules/PageType.ts'
          )
        /* harmony import */ var _modules_CenterPanel__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./modules/CenterPanel */ './src/ts/modules/CenterPanel.ts'
          )
        /* harmony import */ var _modules_InitPage__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./modules/InitPage */ './src/ts/modules/InitPage.ts'
          )
        /* harmony import */ var _modules_DownloadControl__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./modules/DownloadControl */ './src/ts/modules/DownloadControl.ts'
          )
        /* harmony import */ var _modules_RightIcon__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./modules/RightIcon */ './src/ts/modules/RightIcon.ts'
          )
        /* harmony import */ var _modules_Tip__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ./modules/Tip */ './src/ts/modules/Tip.ts')
        /* harmony import */ var _modules_Tip__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(
            _modules_Tip__WEBPACK_IMPORTED_MODULE_5__
          )
        /* harmony import */ var _modules_Output__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./modules/Output */ './src/ts/modules/Output.ts'
          )
        /* harmony import */ var _modules_Support__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./modules/Support */ './src/ts/modules/Support.ts'
          )
        /*
         * project: Pixiv Fanbox Downloader
         * author:  xuejianxianzun; 雪见仙尊
         * license: GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
         * Github： https://github.com/xuejianxianzun/PixivFanboxDownloader
         * Releases: https://github.com/xuejianxianzun/PixivFanboxDownloader/releases
         * Wiki:    https://github.com/xuejianxianzun/PixivFanboxDownloader/wiki
         * E-mail:  xuejianxianzun@gmail.com
         * QQ group:  853021998
         */

        /***/
      },

    /***/ './src/ts/modules/API.ts':
      /*!*******************************!*\
  !*** ./src/ts/modules/API.ts ***!
  \*******************************/
      /*! exports provided: API */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'API',
          function () {
            return API
          }
        )
        class API {
          // 检查给定的字符串解析为数字后，是否大于 0
          static checkNumberGreater0(arg) {
            let num = parseInt(arg)
            // 空值会是 NaN
            if (!isNaN(num) && num > 0) {
              // 符合条件
              return {
                result: true,
                value: num,
              }
            }
            // 不符合条件
            return {
              result: false,
              value: 0,
            }
          }
          // 从 url 中获取指定的查询字段的值
          // 注意：返回值经过 encodeURIComponent 编码！
          static getURLSearchField(url, query) {
            const result = new URL(url).searchParams.get(query)
            if (result !== null) {
              return encodeURIComponent(result)
            } else {
              return ''
            }
          }
          // 从 URL 中获取指定路径名的值，适用于符合 RESTful API 风格的路径
          // 如 https://kyomoneko.fanbox.cc/posts/904593
          // 把路径用 / 分割，查找 key 所在的位置，后面一项就是它的 value
          static getURLPathField(query) {
            const pathArr = location.pathname.split('/')
            const index = pathArr.indexOf(query)
            if (index > 0) {
              return pathArr[index + 1]
            }
            throw new Error(`getURLPathField ${query} failed!`)
          }
          // 组装 url 的查询参数。当该参数有值时，将其添加到 url 里
          static assembleURL(baseURL, args) {
            const temp = new URL(baseURL)
            for (const [key, value] of Object.entries(args)) {
              value && temp.searchParams.append(key, value.toString())
            }
            return temp.toString()
          }
          // 通用的请求流程
          // 发送 get 请求，返回 json 数据，抛出异常
          static request(url) {
            return new Promise((resolve, reject) => {
              fetch(url, {
                method: 'get',
                credentials: 'include',
              })
                .then((response) => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    // 第一种异常，请求成功但状态不对
                    reject({
                      status: response.status,
                      statusText: response.statusText,
                    })
                  }
                })
                .then((data) => {
                  resolve(data)
                })
                .catch((error) => {
                  // 第二种异常，请求失败
                  reject(error)
                })
            })
          }
          static getCreatorId(url) {
            const split = url.split('/')
            // 首先获取以 @ 开头的用户名
            for (const str of split) {
              if (str.startsWith('@')) {
                return str.split('@')[1]
              }
            }
            // 获取自定义的用户名
            for (const str of split) {
              // hostname
              if (str.endsWith('.fanbox.cc')) {
                return str.split('.')[0]
              }
            }
            throw new Error('GetCreatorId error!')
          }
          // 用 creatorId（用户名） 获取 userId
          static async getUserId(creatorId) {
            const baseURL = `https://api.fanbox.cc/creator.get?creatorId=${creatorId}`
            const res = await this.request(baseURL)
            return res.body.user.userId
          }
          static async getPostListSupporting(
            limit = 10,
            maxPublishedDatetime = '',
            maxId = ''
          ) {
            const baseURL = 'https://api.fanbox.cc/post.listSupporting'
            const url = this.assembleURL(baseURL, {
              limit,
              maxPublishedDatetime,
              maxId,
            })
            return this.request(url)
          }
          static async getPostListByUser(
            creatorId,
            limit = 10,
            maxPublishedDatetime = '',
            maxId = ''
          ) {
            const baseURL = `https://api.fanbox.cc/post.listCreator?creatorId=${creatorId}`
            const url = this.assembleURL(baseURL, {
              limit,
              maxPublishedDatetime,
              maxId,
            })
            return this.request(url)
          }
          static async getTagPostListByUser(userId, tag) {
            const url = `https://api.fanbox.cc/post.listTagged?tag=${tag}&userId=${userId}`
            return this.request(url)
          }
          static async getPost(postId) {
            const url = `https://api.fanbox.cc/post.info?postId=${postId}`
            return this.request(url)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/CenterPanel.ts':
      /*!***************************************!*\
  !*** ./src/ts/modules/CenterPanel.ts ***!
  \***************************************/
      /*! exports provided: centerPanel */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'centerPanel',
          function () {
            return centerPanel
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        // 用户界面

        // 中间面板
        class CenterPanel {
          constructor() {
            this.centerPanel = document.createElement('div') // 中间面板
            this.addCenterPanel()
            this.bindEvents()
          }
          // 添加中间面板
          addCenterPanel() {
            const centerPanelHTML = `
      <div class="centerWrap">
      <div class="centerWrap_head">
      <p class="centerWrap_title blue">Pixiv Fanbox Downloader</p>
      <div class="btns">
      <a class="has_tip centerWrap_top_btn" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl(
        '_github'
      )}" href="https://github.com/xuejianxianzun/PixivFanboxDownloader" target="_blank">
      <svg t="1574401005111" class="icon" widht="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" xmlns:xlink="http://www.w3.org/1999/xlink><defs><style type="text/css"></style></defs><path d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z" p-id="2595"></path></svg>
      </a>
      
        <div class="has_tip centerWrap_top_btn centerWrap_close" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_快捷键切换显示隐藏')}">
        <svg t="1574392276519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1123" data-spm-anchor-id="a313x.7781069.0.i0" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M521.693867 449.297067L111.4112 39.0144a51.2 51.2 0 1 0-72.430933 72.362667l410.282666 410.3168-410.282666 410.3168a51.2 51.2 0 1 0 72.3968 72.3968l410.3168-410.282667 410.3168 410.282667a51.2 51.2 0 1 0 72.3968-72.362667l-410.282667-410.350933 410.282667-410.282667a51.2 51.2 0 1 0-72.3968-72.3968l-410.282667 410.282667z" p-id="1124"></path></svg>
        </div>
      </div>
      </div>

      <div class="centerWrap_con">
      <slot data-name="form"></slot>
      </div>

      <div class="gray1 bottom_help_bar"> 
      <span class="showDownTip">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_常见问题')}</span>
      <span id="resetOption">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_重置设置')}</span>
      <a id="zanzhu" class="wiki2 patronText" href="https://afdian.net/@xuejianxianzun" target="_blank">通过“爱发电”网站支持我</a>
      <a id="patreon" class="wiki2 patronText" href="https://www.patreon.com/xuejianxianzun" target="_blank">Become a patron</a>
      <br>
      <p class="downTip tip"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_下载说明')}</p>
      </div>

      </div>
      `
            document.body.insertAdjacentHTML('beforeend', centerPanelHTML)
            this.centerPanel = document.querySelector('.centerWrap')
            const userLang = document.documentElement.lang
            if (['zh', 'zh-CN', 'zh-Hans'].includes(userLang)) {
              document.getElementById('zanzhu').style.display = 'inline-block'
            } else {
              document.getElementById('patreon').style.display = 'inline-block'
            }
          }
          // 绑定中间面板上的事件
          bindEvents() {
            // 监听点击扩展图标的消息，开关中间面板
            chrome.runtime.onMessage.addListener((msg) => {
              if (msg.msg === 'click_icon') {
                if (this.centerPanel.style.display === 'block') {
                  this.close()
                } else {
                  this.show()
                }
              }
            })
            // 关闭按钮
            document
              .querySelector('.centerWrap_close')
              .addEventListener('click', () => {
                this.close()
              })
            // 使用快捷键 Alt + x 切换中间面板显示隐藏
            window.addEventListener(
              'keydown',
              (ev) => {
                if (ev.altKey && ev.keyCode === 88) {
                  const nowDisplay = this.centerPanel.style.display
                  if (nowDisplay === 'block') {
                    this.close()
                  } else {
                    this.show()
                  }
                }
              },
              false
            )
            // 点击右侧图标时，显示
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.clickRightIcon,
              () => {
                this.show()
              }
            )
            // 开始抓取作品时，隐藏
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.crawlStart,
              () => {
                this.close()
              }
            )
            // 抓取完作品详细数据时，显示
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.crawlFinish,
              () => {
                this.show()
              }
            )
            // 显示常见问题
            document
              .querySelector('.showDownTip')
              .addEventListener('click', () =>
                _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM'].toggleEl(
                  document.querySelector('.downTip')
                )
              )
            // 重置设置
            document
              .getElementById('resetOption')
              .addEventListener('click', () => {
                const result = window.confirm(
                  _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                    '_是否重置设置'
                  )
                )
                if (result) {
                  _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].fire(
                    _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.resetOption
                  )
                }
              })
          }
          // 显示中间区域
          show() {
            this.centerPanel.style.display = 'block'
            _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.showCenterPanel
            )
          }
          // 隐藏中间区域
          close() {
            this.centerPanel.style.display = 'none'
            _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.hideCenterPanel
            )
          }
        }
        const centerPanel = new CenterPanel()

        /***/
      },

    /***/ './src/ts/modules/Colors.ts':
      /*!**********************************!*\
  !*** ./src/ts/modules/Colors.ts ***!
  \**********************************/
      /*! exports provided: Colors */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Colors',
          function () {
            return Colors
          }
        )
        // 颜色
        class Colors {}
        Colors.blue = '#0ea8ef'
        Colors.green = '#14ad27'
        Colors.red = '#f33939'
        Colors.yellow = '#e49d00'

        /***/
      },

    /***/ './src/ts/modules/DOM.ts':
      /*!*******************************!*\
  !*** ./src/ts/modules/DOM.ts ***!
  \*******************************/
      /*! exports provided: DOM */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'DOM',
          function () {
            return DOM
          }
        )
        // DOM 操作类
        // 保存公用的 DOM 操作方法，以及从 DOM 中获取数据的 API
        class DOM {
          // 切换 DOM 元素的可见性
          static toggleEl(el) {
            el.style.display = el.style.display === 'block' ? 'none' : 'block'
          }
          // 将元素插入到页面顶部
          /*
    newindex-inner 是在未登录时的用户投稿列表页面使用的
    layout-body 是在未登录时的搜索页使用的
    */
          static insertToHead(el) {
            const insertPoint = document.body.querySelector('#root')
            if (insertPoint) {
              insertPoint.insertAdjacentElement('afterbegin', el)
            }
            return el
          }
          static getUserId() {
            const Reg = /creator\/(\d*)?/
            const testString = [location.href, document.head.innerHTML]
            for (const string of testString) {
              const result = Reg.exec(string)
              if (result && result.length > 1) {
                return result[1]
              }
            }
            throw new Error('getUserId failed!')
          }
          // 动态添加 css 样式
          static addStyle(css) {
            const e = document.createElement('style')
            e.innerHTML = css
            document.body.append(e)
          }
          // 寻找 slot，本程序使用的 slot 都要有 data-name 属性
          static findSlot(name) {
            const slot = document.querySelector(`slot[data-name=${name}]`)
            if (!slot) {
              throw new Error(`No such slot: ${name}`)
            }
            return slot
          }
          // 使用指定的插槽
          static useSlot(name, element) {
            const slot = this.findSlot(name)
            if (typeof element === 'string') {
              // 插入字符串形式的元素
              const wrap = document.createElement('div')
              wrap.innerHTML = element
              const el = wrap.children[0]
              slot.appendChild(el)
              return el
            } else {
              // 插入 html 元素
              slot.appendChild(element)
              return element
            }
          }
          // 清空指定的插槽
          static clearSlot(name) {
            this.findSlot(name).innerHTML = ''
          }
          static addBtn(slot, bg = '', text = '', attr = []) {
            const e = document.createElement('button')
            e.type = 'button'
            e.style.backgroundColor = bg
            e.textContent = text
            for (const [key, value] of attr) {
              e.setAttribute(key, value)
            }
            this.useSlot(slot, e)
            return e
          }
        }

        /***/
      },

    /***/ './src/ts/modules/DateFormat.ts':
      /*!**************************************!*\
  !*** ./src/ts/modules/DateFormat.ts ***!
  \**************************************/
      /*! exports provided: DateFormat */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'DateFormat',
          function () {
            return DateFormat
          }
        )
        // 格式化日期（和时间）
        class DateFormat {
          // format 参数可以由以下格式组合：
          /*
    YYYY
    YY
    MM
    MMM
    MMMM
    DD
    hh
    mm
    ss
    */
          // 区分大小写；可以添加空格或其他符号；不要使用上面未包含的格式。
          // 参考资料：
          // https://www.w3.org/TR/NOTE-datetime
          // https://en.wikipedia.org/wiki/Date_format_by_country
          static format(date, format = 'YYYY-MM-DD') {
            // 生成年、月、日、时、分、秒
            const _date = new Date(date)
            const YYYY = _date.getFullYear().toString()
            const YY = YYYY.substring(YYYY.length - 2, YYYY.length)
            const MM = (_date.getMonth() + 1).toString().padStart(2, '0')
            const MMM = this.months[_date.getMonth()]
            const MMMM = this.Months[_date.getMonth()]
            const DD = _date.getDate().toString().padStart(2, '0')
            const hh = _date.getHours().toString().padStart(2, '0')
            const mm = _date.getMinutes().toString().padStart(2, '0')
            const ss = _date.getSeconds().toString().padStart(2, '0')
            // 对格式字符串进行替换
            let r = format
            r = r.replace('YYYY', YYYY)
            r = r.replace('YY', YY)
            r = r.replace('MMMM', MMMM)
            r = r.replace('MMM', MMM)
            r = r.replace('MM', MM)
            r = r.replace('DD', DD)
            r = r.replace('hh', hh)
            r = r.replace('mm', mm)
            r = r.replace('ss', ss)
            return r
          }
        }
        DateFormat.months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ]
        DateFormat.Months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]

        /***/
      },

    /***/ './src/ts/modules/Download.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/Download.ts ***!
  \************************************/
      /*! exports provided: Download */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Download',
          function () {
            return Download
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./TitleBar */ './src/ts/modules/TitleBar.ts')
        /* harmony import */ var _FileName__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./FileName */ './src/ts/modules/FileName.ts')
        /* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./ProgressBar */ './src/ts/modules/ProgressBar.ts'
          )
        // 下载文件，并发送给浏览器下载

        class Download {
          constructor(progressBarIndex, data) {
            this.fileName = ''
            this.stoped = false
            this.progressBarIndex = progressBarIndex
            this.arg = data
            this.download(data)
            this.listenEvents()
          }
          listenEvents() {
            ;[
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadStop,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadPause,
            ].forEach((event) => {
              window.addEventListener(event, () => {
                this.stoped = true
              })
            })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadSucccess,
              (event) => {
                const donwloadSuccessData = event.detail.data
                if (donwloadSuccessData.url === this.arg.data.url) {
                  this.setProgressBar(1024, 1024)
                }
              }
            )
          }
          // 设置进度条信息
          setProgressBar(loaded, total) {
            _ProgressBar__WEBPACK_IMPORTED_MODULE_3__[
              'progressBar'
            ].setProgress(this.progressBarIndex, {
              name: this.fileName,
              loaded: loaded,
              total: total,
            })
          }
          // 下载文件
          download(arg) {
            _TitleBar__WEBPACK_IMPORTED_MODULE_1__['titleBar'].change('↓')
            // 获取文件名
            this.fileName = _FileName__WEBPACK_IMPORTED_MODULE_2__[
              'fileName'
            ].getFileName(arg.data)
            // 重设当前下载栏的信息
            this.setProgressBar(0, 0)
            // 向浏览器发送下载任务
            this.browserDownload(
              arg.data.url,
              this.fileName,
              arg.id,
              arg.taskBatch
            )
          }
          // 向浏览器发送下载任务
          browserDownload(url, fileName, id, taskBatch) {
            // 如果任务已停止，不会向浏览器发送下载任务
            // if (this.stoped) {
            //   // 释放 bloburl
            //   url.startsWith('blob') && URL.revokeObjectURL(url)
            //   return
            // }
            const sendData = {
              msg: 'send_download',
              fileUrl: url,
              fileName: fileName,
              id,
              taskBatch,
            }
            chrome.runtime.sendMessage(sendData)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/DownloadControl.ts':
      /*!*******************************************!*\
  !*** ./src/ts/modules/DownloadControl.ts ***!
  \*******************************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        /* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./Log */ './src/ts/modules/Log.ts')
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ./TitleBar */ './src/ts/modules/TitleBar.ts')
        /* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! ./Colors */ './src/ts/modules/Colors.ts')
        /* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! ./Settings */ './src/ts/modules/Settings.ts')
        /* harmony import */ var _Download__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! ./Download */ './src/ts/modules/Download.ts')
        /* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ./ProgressBar */ './src/ts/modules/ProgressBar.ts'
          )
        // 下载控制

        class DownloadControl {
          constructor() {
            this.downloadThreadMax = 10 // 同时下载的线程数的最大值，也是默认值
            this.downloadThread = 3 // 同时下载的线程数
            this.taskBatch = 0 // 标记任务批次，每次重新下载时改变它的值，传递给后台使其知道这是一次新的下载
            this.statesList = [] // 下载状态列表，保存每个下载任务的状态
            this.taskList = {} // 下载任务列表，使用下载的文件的 id 做 key，保存下载栏编号和它在下载状态列表中的索引
            this.downloaded = 0 // 已下载的任务数量
            this.reTryTimer = 0 // 重试下载的定时器
            this.downloadArea = document.createElement('div') // 下载区域
            this.totalNumberEl = document.createElement('span')
            this.downStatusEl = document.createElement('span')
            this.downloadStop = false // 是否停止下载
            this.downloadPause = false // 是否暂停下载
            this.createDownloadArea()
            this.listenEvents()
          }
          // 返回任务停止状态。暂停和停止都视为停止下载
          get downloadStopped() {
            return this.downloadPause || this.downloadStop
          }
          listenEvents() {
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlStart,
              () => {
                this.hideDownloadArea()
                this.reset()
              }
            )
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlFinish,
              () => {
                this.showDownloadArea()
                this.beforeDownload()
              }
            )
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.skipSaveFile,
              (ev) => {
                const data = ev.detail.data
                this.downloadSuccess(data)
              }
            )
            // 监听浏览器下载文件后，返回的消息
            chrome.runtime.onMessage.addListener((msg) => {
              if (!this.taskBatch) {
                return
              }
              // 文件下载成功
              if (msg.msg === 'downloaded') {
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events
                    .downloadSucccess,
                  msg.data
                )
                this.downloadSuccess(msg.data)
              } else if (msg.msg === 'download_err') {
                // 浏览器把文件保存到本地时出错
                if (msg.err === 'SERVER_BAD_CONTENT') {
                  _Log__WEBPACK_IMPORTED_MODULE_3__['log'].error(
                    `${msg.data.url} Download error! Code: ${msg.err}. 404: file does not exist.`
                  )
                  // 404 错误不重试下载
                } else {
                  _Log__WEBPACK_IMPORTED_MODULE_3__['log'].error(
                    `${msg.data.url} Download error! Code: ${msg.err}. Will try again later.`
                  )
                  // 重新下载这个文件
                  this.downloadError(msg.data, msg.err)
                }
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadError
                )
              }
              // UUID 的情况
              if (msg.data && msg.data.uuid) {
                _Log__WEBPACK_IMPORTED_MODULE_3__['log'].error(
                  _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_uuid')
                )
              }
            })
          }
          set setDownloaded(val) {
            this.downloaded = val
            this.LogDownloadStates()
            // 设置下载进度信息
            this.totalNumberEl.textContent =
              _Store__WEBPACK_IMPORTED_MODULE_2__[
                'store'
              ].result.length.toString()
            _ProgressBar__WEBPACK_IMPORTED_MODULE_9__[
              'progressBar'
            ].setTotalProgress(this.downloaded)
            // 重置下载进度信息
            if (this.downloaded === 0) {
              this.setDownStateText(
                _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_未开始下载')
              )
            }
            // 下载完毕
            if (
              this.downloaded ===
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length
            ) {
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadComplete
              )
              this.reset()
              this.setDownStateText(
                _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_下载完毕')
              )
              _Log__WEBPACK_IMPORTED_MODULE_3__['log'].success(
                _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_下载完毕'),
                2
              )
              _TitleBar__WEBPACK_IMPORTED_MODULE_5__['titleBar'].change('√')
            }
          }
          downloadedAdd() {
            this.setDownloaded = this.downloaded + 1
          }
          // 显示或隐藏下载区域
          showDownloadArea() {
            this.downloadArea.style.display = 'block'
          }
          hideDownloadArea() {
            this.downloadArea.style.display = 'none'
          }
          // 设置下载状态文本，默认颜色为主题蓝色
          setDownStateText(str, color = '') {
            const el = document.createElement('span')
            el.textContent = str
            if (color) {
              el.style.color = color
            }
            this.downStatusEl.innerHTML = ''
            this.downStatusEl.appendChild(el)
          }
          reset() {
            this.statesList = []
            this.downloadPause = false
            this.downloadStop = false
            clearTimeout(this.reTryTimer)
          }
          createDownloadArea() {
            const html = `<div class="download_area">
    <p> ${_Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl(
      '_共抓取到n个文件',
      '<span class="fwb blue imgNum">0</span>'
    )}</p>
    
    <div class="centerWrap_btns">
    <button class="startDownload" type="button" style="background:${
      _Colors__WEBPACK_IMPORTED_MODULE_6__['Colors'].blue
    };"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl(
              '_下载按钮1'
            )}</button>
    <button class="pauseDownload" type="button" style="background:#e49d00;"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__[
      'lang'
    ].transl('_下载按钮2')}</button>
    <button class="stopDownload" type="button" style="background:${
      _Colors__WEBPACK_IMPORTED_MODULE_6__['Colors'].red
    };"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl(
              '_下载按钮3'
            )}</button>
    <button class="previewFileName" type="button" style="background:${
      _Colors__WEBPACK_IMPORTED_MODULE_6__['Colors'].green
    };"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl(
              '_预览文件名'
            )}</button>
    </div>
    <div class="centerWrap_down_tips">
    <p>
    ${_Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_当前状态')}
    <span class="down_status blue"><span>${_Lang__WEBPACK_IMPORTED_MODULE_4__[
      'lang'
    ].transl('_未开始下载')}</span></span>
    </p>
    </div>
    </div>`
            const el = _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].useSlot(
              'downloadArea',
              html
            )
            this.downloadArea = el
            this.downStatusEl = el.querySelector('.down_status ')
            this.totalNumberEl = el.querySelector('.imgNum')
            document
              .querySelector('.startDownload')
              .addEventListener('click', () => {
                this.startDownload()
              })
            document
              .querySelector('.pauseDownload')
              .addEventListener('click', () => {
                this.pauseDownload()
              })
            document
              .querySelector('.stopDownload')
              .addEventListener('click', () => {
                this.stopDownload()
              })
            document
              .querySelector('.previewFileName')
              .addEventListener('click', () => {
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events
                    .previewFileName
                )
              })
          }
          // 下载线程设置
          setDownloadThread() {
            const setThread = parseInt(
              _Settings__WEBPACK_IMPORTED_MODULE_7__['form'].downloadThread
                .value
            )
            if (
              setThread < 1 ||
              setThread > this.downloadThreadMax ||
              isNaN(setThread)
            ) {
              // 如果数值非法，则重设为默认值
              this.downloadThread = this.downloadThreadMax
            } else {
              this.downloadThread = setThread // 设置为用户输入的值
            }
            // 如果剩余任务数量少于下载线程数
            if (
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length -
                this.downloaded <
              this.downloadThread
            ) {
              this.downloadThread =
                _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length -
                this.downloaded
            }
            // 重设下载进度条
            _ProgressBar__WEBPACK_IMPORTED_MODULE_9__['progressBar'].reset(
              this.downloadThread,
              this.downloaded
            )
          }
          // 抓取完毕之后，已经可以开始下载时，根据一些状态进行处理
          beforeDownload() {
            this.setDownloaded = 0
            this.setDownloadThread()
            const autoDownload =
              _Settings__WEBPACK_IMPORTED_MODULE_7__['form'].quietDownload
                .checked
            if (
              !autoDownload &&
              !_Store__WEBPACK_IMPORTED_MODULE_2__['store'].states.quickDownload
            ) {
              _TitleBar__WEBPACK_IMPORTED_MODULE_5__['titleBar'].change('▶')
            }
            // 视情况自动开始下载
            if (
              autoDownload ||
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].states.quickDownload
            ) {
              this.startDownload()
            }
          }
          // 开始下载
          startDownload() {
            // 如果正在下载中，或无图片，则不予处理
            if (
              !_Store__WEBPACK_IMPORTED_MODULE_2__['store'].states.allowWork ||
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length === 0
            ) {
              return
            }
            // 如果之前不是暂停状态，则需要重新下载
            if (!this.downloadPause) {
              this.setDownloaded = 0
              // 初始化下载记录
              // 状态：
              // -1 未使用
              // 0 使用中
              // 1 已完成
              this.statesList = new Array(
                _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length
              ).fill(-1)
              this.taskBatch = new Date().getTime() // 修改本批下载任务的标记
            } else {
              // 继续下载
              // 把“使用中”的下载状态重置为“未使用”
              for (let index = 0; index < this.statesList.length; index++) {
                if (this.statesList[index] === 0) {
                  this.statesList[index] = -1
                }
              }
            }
            // 重置一些条件
            this.downloadPause = false
            this.downloadStop = false
            clearTimeout(this.reTryTimer)
            this.setDownloadThread()
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadStart
            )
            // 启动或继续下载，建立并发下载线程
            for (let i = 0; i < this.downloadThread; i++) {
              this.createDownload(i)
            }
            this.setDownStateText(
              _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_正在下载中')
            )
            _Log__WEBPACK_IMPORTED_MODULE_3__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_正在下载中')
            )
          }
          // 暂停下载
          pauseDownload() {
            clearTimeout(this.reTryTimer)
            if (
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length === 0
            ) {
              return
            }
            // 停止的优先级高于暂停。点击停止可以取消暂停状态，但点击暂停不能取消停止状态
            if (this.downloadStop === true) {
              return
            }
            if (this.downloadPause === false) {
              // 如果正在下载中
              if (
                !_Store__WEBPACK_IMPORTED_MODULE_2__['store'].states.allowWork
              ) {
                this.downloadPause = true // 发出暂停信号
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadPause
                )
                _TitleBar__WEBPACK_IMPORTED_MODULE_5__['titleBar'].change('║')
                this.setDownStateText(
                  _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_已暂停'),
                  '#f00'
                )
                _Log__WEBPACK_IMPORTED_MODULE_3__['log'].warning(
                  _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_已暂停'),
                  2
                )
              } else {
                // 不在下载中的话不允许启用暂停功能
                return
              }
            }
          }
          // 停止下载
          stopDownload() {
            clearTimeout(this.reTryTimer)
            if (
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length ===
                0 ||
              this.downloadStop
            ) {
              return
            }
            this.downloadStop = true
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadStop
            )
            _TitleBar__WEBPACK_IMPORTED_MODULE_5__['titleBar'].change('■')
            this.setDownStateText(
              _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_已停止'),
              '#f00'
            )
            _Log__WEBPACK_IMPORTED_MODULE_3__['log'].error(
              _Lang__WEBPACK_IMPORTED_MODULE_4__['lang'].transl('_已停止'),
              2
            )
            this.downloadPause = false
          }
          downloadError(data, err) {
            if (this.downloadPause || this.downloadStop) {
              return false
            }
            const task = this.taskList[data.id]
            // 复位这个任务的状态
            this.setDownloadedIndex(task.index, -1)
            // 建立下载任务，再次下载它
            // 如果出现了服务端错误，可能是获取原图时出现错误，改为使用缩略图进行下载
            this.createDownload(task.progressBarIndex, err === 'SERVER_FAILED')
          }
          downloadSuccess(data) {
            const task = this.taskList[data.id]
            // 更改这个任务状态为“已完成”
            this.setDownloadedIndex(task.index, 1)
            // 增加已下载数量
            this.downloadedAdd()
            // 是否继续下载
            const no = task.progressBarIndex
            if (this.checkContinueDownload()) {
              this.createDownload(no)
            }
          }
          // 设置已下载列表中的标记
          setDownloadedIndex(index, value) {
            this.statesList[index] = value
          }
          // 当一个文件下载完成后，检查是否还有后续下载任务
          checkContinueDownload() {
            // 如果没有全部下载完毕
            if (
              this.downloaded <
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length
            ) {
              // 如果任务已停止
              if (this.downloadPause || this.downloadStop) {
                return false
              }
              // 如果已完成的数量 加上 线程中未完成的数量，仍然没有达到文件总数，继续添加任务
              if (
                this.downloaded + this.downloadThread - 1 <
                _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length
              ) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
          // 在日志上显示下载进度
          LogDownloadStates() {
            let text = `${this.downloaded} / ${_Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length}`
            _Log__WEBPACK_IMPORTED_MODULE_3__['log'].log(text, 2, false)
          }
          // 查找需要进行下载的作品，建立下载
          // 可选第二个参数：使用缩略图 url 而不是原图 url 进行下载
          createDownload(progressBarIndex, useThumb = false) {
            let length = this.statesList.length
            let index
            for (let i = 0; i < length; i++) {
              if (this.statesList[i] === -1) {
                this.statesList[i] = 0
                index = i
                break
              }
            }
            if (index === undefined) {
              throw new Error('There are no data to download')
            } else {
              let result =
                _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result[index]
              if (useThumb && result.retryUrl) {
                ;[result.url, result.retryUrl] = [result.retryUrl, result.url]
              }
              const data = {
                id: result.fileId,
                data: result,
                index: index,
                progressBarIndex: progressBarIndex,
                taskBatch: this.taskBatch,
              }
              // 保存任务信息
              this.taskList[data.data.fileId] = {
                index,
                progressBarIndex: progressBarIndex,
              }
              // 建立下载
              new _Download__WEBPACK_IMPORTED_MODULE_8__['Download'](
                progressBarIndex,
                data
              )
            }
          }
        }
        new DownloadControl()

        /***/
      },

    /***/ './src/ts/modules/EVT.ts':
      /*!*******************************!*\
  !*** ./src/ts/modules/EVT.ts ***!
  \*******************************/
      /*! exports provided: EVT */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'EVT',
          function () {
            return EVT
          }
        )
        class EVT {
          static fire(type, data = '') {
            const event = new CustomEvent(type, {
              detail: { data: data },
            })
            window.dispatchEvent(event)
          }
        }
        EVT.events = {
          crawlStart: 'crawlStart',
          crawlFinish: 'crawlFinish',
          crawlEmpty: 'crawlEmpty',
          crawlError: 'crawlError',
          addResult: 'addResult',
          downloadStart: 'downloadStart',
          downloadPause: 'downloadPause',
          downloadStop: 'downloadStop',
          download: 'download',
          downloadSucccess: 'downloadSucccess',
          downloadError: 'downloadError',
          downloadComplete: 'downloadComplete',
          pageSwitch: 'pageSwitch',
          pageTypeChange: 'pageTypeChange',
          resetOption: 'resetOption',
          convertChange: 'convertChange',
          previewFileName: 'previewFileName',
          output: 'output',
          hideCenterPanel: 'hideCenterPanel',
          showCenterPanel: 'showCenterPanel',
          clearMultiple: 'clearMultiple',
          clearUgoira: 'clearUgoira',
          deleteWork: 'deleteWork',
          worksUpdate: 'worksUpdate',
          settingChange: 'settingChange',
          clickRightIcon: 'clickRightIcon',
          destroy: 'destroy',
          convertError: 'convertError',
          skipSaveFile: 'skipSaveFile',
        }

        /***/
      },

    /***/ './src/ts/modules/FileName.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/FileName.ts ***!
  \************************************/
      /*! exports provided: fileName */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'fileName',
          function () {
            return fileName
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Settings */ './src/ts/modules/Settings.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _DateFormat__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./DateFormat */ './src/ts/modules/DateFormat.ts'
          )

        class FileName {
          constructor() {
            // 用正则过滤不安全的字符，（Chrome 和 Windows 不允许做文件名的字符）
            // 不安全的字符，这里多数是控制字符，需要替换掉
            this.unsafeStr = new RegExp(
              /[\u0001-\u001f\u007f-\u009f\u00ad\u0600-\u0605\u061c\u06dd\u070f\u08e2\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u206f\ufdd0-\ufdef\ufeff\ufff9-\ufffb\ufffe\uffff]/g
            )
            // 一些需要替换成全角字符的符号，左边是正则表达式的字符
            this.fullWidthDict = [
              ['\\\\', '＼'],
              ['/', '／'],
              [':', '：'],
              ['\\?', '？'],
              ['"', '＂'],
              ['<', '＜'],
              ['>', '＞'],
              ['\\*', '＊'],
              ['\\|', '｜'],
              ['~', '～'],
            ]
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.previewFileName,
              () => {
                this.previewFileName()
              }
            )
          }
          // 把一些特殊字符替换成全角字符
          replaceUnsafeStr(str) {
            str = str.replace(this.unsafeStr, '')
            for (let index = 0; index < this.fullWidthDict.length; index++) {
              const rule = this.fullWidthDict[index]
              const reg = new RegExp(rule[0], 'g')
              str = str.replace(reg, rule[1])
            }
            return str
          }
          transDate(date) {
            // 时间原数据如 "2019-12-18T22:23:37+00:00"
            // 网页上显示的日期是转换成了本地时间的，如北京时区显示为 "2019-12-19"，不是显示原始日期 "2019-12-18"。所以这里转换成本地时区的日期，和网页上保持一致，以免用户困惑。
            const date0 = new Date(date)
            const y = date0.getFullYear()
            const M = (date0.getMonth() + 1).toString().padStart(2, '0')
            const d = date0.getDate().toString().padStart(2, '0')
            const h = date0.getHours().toString().padStart(2, '0')
            const m = date0.getMinutes().toString().padStart(2, '0')
            return `${y}-${M}-${d} ${h}-${m}`
          }
          // 生成文件名，传入参数为图片信息
          getFileName(data) {
            let result =
              _Settings__WEBPACK_IMPORTED_MODULE_1__['form'].userSetName.value
            // 为空时使用预设的命名规则
            result =
              result ||
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].defaultFileName
            // 配置所有命名标记
            const cfg = {
              '{postid}': {
                value: data.postId,
                safe: true,
              },
              '{title}': {
                value: data.title,
                safe: false,
              },
              '{name}': {
                value: data.name,
                safe: false,
              },
              '{ext}': {
                value: data.ext,
                safe: false,
              },
              '{index}': {
                value: data.index,
                safe: false,
              },
              '{tags}': {
                value: data.tags,
                safe: false,
              },
              '{date}': {
                value: _DateFormat__WEBPACK_IMPORTED_MODULE_4__[
                  'DateFormat'
                ].format(
                  data.date,
                  _Settings__WEBPACK_IMPORTED_MODULE_1__['form'].dateFormat
                    .value
                ),
                safe: false,
              },
              '{task_date}': {
                value: _DateFormat__WEBPACK_IMPORTED_MODULE_4__[
                  'DateFormat'
                ].format(
                  _Store__WEBPACK_IMPORTED_MODULE_2__['store']
                    .crawlCompleteTime,
                  _Settings__WEBPACK_IMPORTED_MODULE_1__['form'].dateFormat
                    .value
                ),
                prefix: '',
                safe: false,
              },
              '{fee}': {
                value: data.fee,
                safe: true,
              },
              '{user}': {
                value: data.user,
                safe: false,
              },
              '{uid}': {
                value: data.uid,
                safe: true,
              },
            }
            // 替换命名规则里的特殊字符
            result = this.replaceUnsafeStr(result)
            // 上一步会把斜线 / 替换成全角的斜线 ／，这里再替换回来，否则就不能建立文件夹了
            result = result.replace(/／/g, '/')
            // 把命名规则的标记替换成实际值
            for (const [key, val] of Object.entries(cfg)) {
              // 只有当标记有值时才会进行替换，所以没有值的标记会原样保留
              if (
                result.includes(key) &&
                val.value !== '' &&
                val.value !== null
              ) {
                let once = String(val.value)
                // 处理标记值中的特殊字符
                if (!val.safe) {
                  once = this.replaceUnsafeStr(once)
                }
                result = result.replace(new RegExp(key, 'g'), once) // 将标记替换成最终值，如果有重复的标记，全部替换
              }
            }
            // 处理空值，连续的 '//'。 有时候两个斜线中间的字段是空值，最后就变成两个斜线挨在一起了
            result = result.replace(/undefined/g, '').replace(/\/{2,9}/, '/')
            // 对每一层路径进行处理
            let tempArr = result.split('/')
            tempArr.forEach((str, index, arr) => {
              // 替换路径首尾的空格
              // 把每层路径头尾的 . 变成全角的．因为 Chrome 不允许头尾使用 .
              arr[index] = str
                .trim()
                .replace(/^\./g, '．')
                .replace(/\.$/g, '．')
            })
            result = tempArr.join('/')
            // 去掉头尾的 /
            if (result.startsWith('/')) {
              result = result.replace('/', '')
            }
            if (result.endsWith('/')) {
              result = result.substr(0, result.length - 1)
            }
            // 添加后缀名
            result += '.' + data.ext
            return result
          }
          // 预览文件名
          previewFileName() {
            if (
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length === 0
            ) {
              return alert(
                _Lang__WEBPACK_IMPORTED_MODULE_3__['lang'].transl(
                  '_没有数据可供使用'
                )
              )
            }
            // 使用数组储存和拼接字符串，提高性能
            const resultArr = []
            const length =
              _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result.length
            for (let i = 0; i < length; i++) {
              const data =
                _Store__WEBPACK_IMPORTED_MODULE_2__['store'].result[i]
              // 为生成的文件名添加颜色
              const fullName = this.getFileName(data)
              const part = fullName.split('/')
              const length = part.length
              for (let i = 0; i < length; i++) {
                const str = part[i]
                if (i < length - 1) {
                  // 如果不是最后一项，说明是文件夹名，添加颜色
                  part[i] = `<span class="color666">${str}</span>`
                } else {
                  // 最后一项，是文件名，添加颜色
                  part[i] = `<span class="color000">${str}</span>`
                }
              }
              const fullNameHtml = part.join('/')
              // 保存本条结果
              const nowResult = `<p class="result">${fullNameHtml}</p>`
              resultArr.push(nowResult)
            }
            // 拼接所有结果
            const result = resultArr.join('')
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.output,
              result
            )
          }
        }
        const fileName = new FileName()

        /***/
      },

    /***/ './src/ts/modules/Filter.ts':
      /*!**********************************!*\
  !*** ./src/ts/modules/Filter.ts ***!
  \**********************************/
      /*! exports provided: filter */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'filter',
          function () {
            return filter
          }
        )
        /* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Settings */ './src/ts/modules/Settings.ts')
        /* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Log */ './src/ts/modules/Log.ts')
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')

        // 审查每个文件的数据，决定是否要下载它
        class Filter {
          constructor() {
            this._postDateStart = 0
            this._postDateEnd = 0
          }
          init() {
            this.getIdRange()
            this.getDateRange()
          }
          // 获取 id 范围设置
          getIdRange() {
            if (
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].idRangeSwitch
                .checked
            ) {
              let id = parseInt(
                _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].idRangeInput
                  .value
              )
              if (isNaN(id)) {
                _EVT__WEBPACK_IMPORTED_MODULE_2__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_2__['EVT'].events.crawlError
                )
                const msg = 'id is not a number!'
                window.alert(msg)
                _Log__WEBPACK_IMPORTED_MODULE_1__['log'].error(msg)
                throw new Error(msg)
              }
            }
          }
          getDateRange() {
            if (
              !_Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDate
                .checked ||
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDateStart
                .value === '' ||
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDateEnd
                .value === ''
            ) {
              return
            }
            // 判断是否是有效的时间格式
            const postDateStart = new Date(
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDateStart.value
            )
            const postDateEnd = new Date(
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDateEnd.value
            )
            // 如果输入的时间可以被转换成有效的时间，则启用
            // 转换时间失败时，值是 Invalid Date，不能转换成数字
            if (
              isNaN(postDateStart.getTime()) ||
              isNaN(postDateEnd.getTime())
            ) {
              const msg = 'Date format error!'
              this.throwError(msg)
            } else {
              // 转换时间成功
              this._postDateStart = postDateStart.getTime()
              this._postDateEnd = postDateEnd.getTime()
            }
          }
          // 检查作品是否符合过滤器的要求
          // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
          check(option) {
            // 检查文件类型
            if (!this.checkFileType(option.ext)) {
              return false
            }
            // 检查收费还是免费
            if (!this.checkfeeType(option.fee)) {
              return false
            }
            // 检查价格范围
            if (!this.checkfeeRange(option.fee)) {
              return false
            }
            // 检查 id 范围
            if (!this.checkIdRange(option.id)) {
              return false
            }
            // 检查投稿时间
            if (!this.checkPostDate(option.date)) {
              return false
            }
            return true
          }
          checkFileType(ext) {
            // 如果没有传递 ext，则保留这个文件
            if (!ext) {
              return true
            }
            // 检查 ext 存在于哪种类型里，然后检查这个类型是否被选中
            for (const [key, value] of Object.entries(
              _Store__WEBPACK_IMPORTED_MODULE_3__['store'].fileType
            )) {
              if (value.includes(ext)) {
                return _Settings__WEBPACK_IMPORTED_MODULE_0__['form'][key]
                  .checked
                  ? true
                  : false
              }
            }
            // 如果这个 ext 不存在任何规定的类型里，则把它当作 other 类型，决定是否保留
            return _Settings__WEBPACK_IMPORTED_MODULE_0__['form']['other']
              .checked
              ? true
              : false
          }
          checkfeeType(fee) {
            if (fee === undefined) {
              return true
            }
            if (fee > 0) {
              return _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].pay.checked
            } else {
              return _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].free.checked
            }
          }
          checkfeeRange(fee) {
            if (
              fee === undefined ||
              !_Settings__WEBPACK_IMPORTED_MODULE_0__['form'].feeSwitch.checked
            ) {
              return true
            }
            return (
              fee >=
              parseInt(_Settings__WEBPACK_IMPORTED_MODULE_0__['form'].fee.value)
            )
          }
          checkIdRange(id) {
            if (
              id === undefined ||
              !_Settings__WEBPACK_IMPORTED_MODULE_0__['form'].idRangeSwitch
                .checked
            ) {
              return true
            }
            const flag = parseInt(
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].idRange.value
            )
            const nowId = parseInt(id.toString())
            const setId = parseInt(
              _Settings__WEBPACK_IMPORTED_MODULE_0__['form'].idRangeInput.value
            )
            if (flag === 1) {
              // 大于
              return nowId > setId
            } else if (flag === 2) {
              // 小于
              return nowId < setId
            } else {
              return true
            }
          }
          checkPostDate(date) {
            if (
              !_Settings__WEBPACK_IMPORTED_MODULE_0__['form'].postDate
                .checked ||
              date === undefined ||
              !this._postDateStart ||
              !this._postDateEnd
            ) {
              return true
            }
            const nowDate = new Date(date)
            return (
              nowDate.getTime() >= this._postDateStart &&
              nowDate.getTime() <= this._postDateEnd
            )
          }
          // 当需要时抛出错误
          throwError(msg) {
            _EVT__WEBPACK_IMPORTED_MODULE_2__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_2__['EVT'].events.crawlError
            )
            _Log__WEBPACK_IMPORTED_MODULE_1__['log'].error(msg, 2)
            window.alert(msg)
            throw new Error(msg)
          }
        }
        const filter = new Filter()

        /***/
      },

    /***/ './src/ts/modules/InitHomePage.ts':
      /*!****************************************!*\
  !*** ./src/ts/modules/InitHomePage.ts ***!
  \****************************************/
      /*! exports provided: InitHomePage */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'InitHomePage',
          function () {
            return InitHomePage
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Colors */ './src/ts/modules/Colors.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./InitPageBase */ './src/ts/modules/InitPageBase.ts'
          )
        /* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./API */ './src/ts/modules/API.ts')

        class InitHomePage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__[
          'InitPageBase'
        ] {
          constructor() {
            super()
            this.init()
          }
          // 添加中间按钮
          appendCenterBtns() {
            _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM']
              .addBtn(
                'crawlBtns',
                _Colors__WEBPACK_IMPORTED_MODULE_1__['Colors'].blue,
                _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                  '_抓取赞助的所有用户的投稿'
                )
              )
              .addEventListener('click', () => {
                this.readyCrawl()
              })
          }
          async FetchPostList() {
            let data
            if (this.nextUrl) {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__['API'].request(
                this.nextUrl
              )
            } else {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__[
                'API'
              ].getPostListSupporting(300)
            }
            this.afterFetchPostList(data)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/InitPage.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/InitPage.ts ***!
  \************************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./PageType */ './src/ts/modules/PageType.ts')
        /* harmony import */ var _InitHomePage__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./InitHomePage */ './src/ts/modules/InitHomePage.ts'
          )
        /* harmony import */ var _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./InitPostListPage */ './src/ts/modules/InitPostListPage.ts'
          )
        /* harmony import */ var _InitTagPage__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./InitTagPage */ './src/ts/modules/InitTagPage.ts'
          )
        /* harmony import */ var _InitPostPage__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./InitPostPage */ './src/ts/modules/InitPostPage.ts'
          )
        // 初始化页面，初始化抓取流程

        class InitPage {
          constructor() {
            this.initPage()
            // 页面类型变化时，初始化抓取流程
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.pageTypeChange,
              () => {
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.destroy
                )
                this.initPage()
              }
            )
          }
          initPage() {
            switch (
              _PageType__WEBPACK_IMPORTED_MODULE_1__['pageType'].getPageType()
            ) {
              case 0:
              case 1:
                return new _InitHomePage__WEBPACK_IMPORTED_MODULE_2__[
                  'InitHomePage'
                ]()
              case 2:
              case 3:
                return new _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__[
                  'InitPostListPage'
                ]()
              case 4:
                return new _InitPostPage__WEBPACK_IMPORTED_MODULE_5__[
                  'InitPostPage'
                ]()
              case 5:
                return new _InitTagPage__WEBPACK_IMPORTED_MODULE_4__[
                  'InitTagPage'
                ]()
              default:
                console.error('Illegal pageType')
            }
          }
        }
        new InitPage()

        /***/
      },

    /***/ './src/ts/modules/InitPageBase.ts':
      /*!****************************************!*\
  !*** ./src/ts/modules/InitPageBase.ts ***!
  \****************************************/
      /*! exports provided: InitPageBase */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'InitPageBase',
          function () {
            return InitPageBase
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Filter */ './src/ts/modules/Filter.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        /* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./Log */ './src/ts/modules/Log.ts')
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(/*! ./TitleBar */ './src/ts/modules/TitleBar.ts')
        /* harmony import */ var _SaveData__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(/*! ./SaveData */ './src/ts/modules/SaveData.ts')
        /* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(/*! ./API */ './src/ts/modules/API.ts')
        // 初始化抓取页面的流程

        class InitPageBase {
          constructor() {
            this.crawlNumber = 0 // 要抓取的个数/页数
            this.nextUrl = null
            this.getPostDataConcurrencyNumMax = 6
            this.getPostDataThreadNum = 0
            this.getPostDatafinished = 0
          }
          // 初始化
          init() {
            this.appendCenterBtns()
            this.appendElseEl()
            this.initElse()
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].events.destroy,
              () => {
                this.destroy()
              }
            )
          }
          // 各个子类私有的初始化内容
          initElse() {}
          // 销毁初始化页面时添加的元素和事件，恢复设置项等
          destroy() {
            _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].clearSlot('crawlBtns')
          }
          // 添加中间按钮
          appendCenterBtns() {}
          // 添加其他元素（如果有）
          appendElseEl() {}
          // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
          async readyCrawl() {
            if (
              !_Store__WEBPACK_IMPORTED_MODULE_3__['store'].states.allowWork
            ) {
              window.alert(
                _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                  '_当前任务尚未完成2'
                )
              )
              return
            }
            _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].events.crawlStart
            )
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].clear()
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].success(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_任务开始0')
            )
            _TitleBar__WEBPACK_IMPORTED_MODULE_6__['titleBar'].change('↑')
            _Filter__WEBPACK_IMPORTED_MODULE_2__['filter'].init()
            this.getPostDataThreadNum = 0
            this.getPostDatafinished = 0
            this.nextUrl = null
            // 进入第一个抓取方法
            this.nextStep()
          }
          // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取作品列表。如有不同，由子类具体定义
          nextStep() {
            this.FetchPostList()
          }
          afterFetchPostList(data) {
            if (data.body.items.length === 0) {
              return this.noResult()
            }
            const items = data.body.items
            this.nextUrl = data.body.nextUrl
            for (const item of items) {
              if (item.body === null) {
                continue
              }
              // 针对投稿进行检查，决定是否保留它
              const id = item.id
              const fee = item.feeRequired
              const date = item.publishedDatetime
              const check = _Filter__WEBPACK_IMPORTED_MODULE_2__[
                'filter'
              ].check({ id, fee, date })
              if (check) {
                _Store__WEBPACK_IMPORTED_MODULE_3__['store'].postIdList.push(id)
              }
            }
            if (this.nextUrl) {
              this.FetchPostList()
            } else {
              this.FetchPostListFinished()
            }
          }
          // 抓取文章列表之后，建立并发抓取线程，逐个获取文章数据
          FetchPostListFinished() {
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_列表页抓取完成'
              )
            )
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_当前作品个数',
                _Store__WEBPACK_IMPORTED_MODULE_3__[
                  'store'
                ].postIdList.length.toString()
              )
            )
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_开始获取作品信息'
              )
            )
            for (let i = 0; i < this.getPostDataConcurrencyNumMax; i++) {
              const postId =
                _Store__WEBPACK_IMPORTED_MODULE_3__['store'].postIdList.shift()
              if (postId) {
                this.getPostDataThreadNum++
                this.fetchPost(postId)
              } else {
                break
              }
            }
          }
          async fetchPost(postId) {
            const data = await _API__WEBPACK_IMPORTED_MODULE_8__['API'].getPost(
              postId
            )
            this.afterFetchPost(data)
          }
          afterFetchPost(data) {
            _SaveData__WEBPACK_IMPORTED_MODULE_7__['saveData'].receive(
              data.body
            )
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              `${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_待处理'
              )} ${
                _Store__WEBPACK_IMPORTED_MODULE_3__['store'].postIdList.length
              }`,
              1,
              false
            )
            // 当抓取完一个文章之后，如果还有等待抓取的文章就继续抓取
            // 否则当前抓取线程结束。等待所有抓取线程完成之后，文章数据就全部获取了
            const postId =
              _Store__WEBPACK_IMPORTED_MODULE_3__['store'].postIdList.shift()
            if (postId) {
              this.fetchPost(postId)
            } else {
              this.getPostDatafinished++
              if (this.getPostDatafinished == this.getPostDataThreadNum) {
                this.crawlFinished()
              }
            }
          }
          // 抓取完毕
          crawlFinished() {
            if (
              _Store__WEBPACK_IMPORTED_MODULE_3__['store'].result.length === 0
            ) {
              return this.noResult()
            }
            _Store__WEBPACK_IMPORTED_MODULE_3__['store'].crawlCompleteTime =
              new Date()
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_抓取文件数量',
                _Store__WEBPACK_IMPORTED_MODULE_3__[
                  'store'
                ].result.length.toString()
              )
            )
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].log(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_抓取完毕'),
              2
            )
            _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].events.crawlFinish
            )
          }
          // 抓取结果为 0 时输出提示
          noResult() {
            _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_5__['EVT'].events.crawlEmpty
            )
            _TitleBar__WEBPACK_IMPORTED_MODULE_6__['titleBar'].reset()
            _Log__WEBPACK_IMPORTED_MODULE_4__['log'].error(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                '_抓取结果为零'
              ),
              2
            )
            window.alert(
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_抓取结果为零')
            )
          }
        }

        /***/
      },

    /***/ './src/ts/modules/InitPostListPage.ts':
      /*!********************************************!*\
  !*** ./src/ts/modules/InitPostListPage.ts ***!
  \********************************************/
      /*! exports provided: InitPostListPage */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'InitPostListPage',
          function () {
            return InitPostListPage
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Colors */ './src/ts/modules/Colors.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./InitPageBase */ './src/ts/modules/InitPageBase.ts'
          )
        /* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./API */ './src/ts/modules/API.ts')

        class InitPostListPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__[
          'InitPageBase'
        ] {
          constructor() {
            super()
            this.init()
          }
          // 添加中间按钮
          appendCenterBtns() {
            _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM']
              .addBtn(
                'crawlBtns',
                _Colors__WEBPACK_IMPORTED_MODULE_1__['Colors'].blue,
                _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                  '_抓取该用户的投稿'
                )
              )
              .addEventListener('click', () => {
                this.readyCrawl()
              })
          }
          async FetchPostList() {
            let data
            if (this.nextUrl) {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__['API'].request(
                this.nextUrl
              )
            } else {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__[
                'API'
              ].getPostListByUser(
                _API__WEBPACK_IMPORTED_MODULE_4__['API'].getCreatorId(
                  location.href
                ),
                300
              )
            }
            this.afterFetchPostList(data)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/InitPostPage.ts':
      /*!****************************************!*\
  !*** ./src/ts/modules/InitPostPage.ts ***!
  \****************************************/
      /*! exports provided: InitPostPage */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'InitPostPage',
          function () {
            return InitPostPage
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Colors */ './src/ts/modules/Colors.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./InitPageBase */ './src/ts/modules/InitPageBase.ts'
          )
        /* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./API */ './src/ts/modules/API.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')

        class InitPostPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__[
          'InitPageBase'
        ] {
          constructor() {
            super()
            this.quickDownBtn = document.createElement('div')
            this.init()
          }
          // 添加中间按钮
          appendCenterBtns() {
            _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM']
              .addBtn(
                'crawlBtns',
                _Colors__WEBPACK_IMPORTED_MODULE_1__['Colors'].blue,
                _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                  '_抓取这篇投稿'
                )
              )
              .addEventListener('click', () => {
                this.readyCrawl()
              })
          }
          appendElseEl() {
            // 在右侧创建快速下载按钮
            this.quickDownBtn.id = 'quick_down_btn'
            this.quickDownBtn.textContent = '↓'
            this.quickDownBtn.setAttribute(
              'title',
              _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_快速下载本页')
            )
            document.body.appendChild(this.quickDownBtn)
            this.quickDownBtn.addEventListener(
              'click',
              () => {
                _Store__WEBPACK_IMPORTED_MODULE_5__[
                  'store'
                ].states.quickDownload = true
                this.readyCrawl()
              },
              false
            )
          }
          destroy() {
            _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM'].clearSlot('crawlBtns')
            // 删除快速下载按钮
            const quickBtn = document.querySelector('#quick_down_btn')
            quickBtn && quickBtn.remove()
          }
          nextStep() {
            this.getPostDataThreadNum = 1
            this.fetchPost()
          }
          async FetchPostList() {}
          async fetchPost() {
            const data = await _API__WEBPACK_IMPORTED_MODULE_4__['API'].getPost(
              _API__WEBPACK_IMPORTED_MODULE_4__['API'].getURLPathField('posts')
            )
            this.afterFetchPost(data)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/InitTagPage.ts':
      /*!***************************************!*\
  !*** ./src/ts/modules/InitTagPage.ts ***!
  \***************************************/
      /*! exports provided: InitTagPage */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'InitTagPage',
          function () {
            return InitTagPage
          }
        )
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Colors */ './src/ts/modules/Colors.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./InitPageBase */ './src/ts/modules/InitPageBase.ts'
          )
        /* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(/*! ./API */ './src/ts/modules/API.ts')

        class InitTagPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__[
          'InitPageBase'
        ] {
          constructor() {
            super()
            this.init()
          }
          // 添加中间按钮
          appendCenterBtns() {
            _DOM__WEBPACK_IMPORTED_MODULE_2__['DOM']
              .addBtn(
                'crawlBtns',
                _Colors__WEBPACK_IMPORTED_MODULE_1__['Colors'].blue,
                _Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
                  '_抓取该tag的投稿'
                )
              )
              .addEventListener('click', () => {
                this.readyCrawl()
              })
          }
          async FetchPostList() {
            let data
            if (this.nextUrl) {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__['API'].request(
                this.nextUrl
              )
            } else {
              data = await _API__WEBPACK_IMPORTED_MODULE_4__[
                'API'
              ].getTagPostListByUser(
                await _API__WEBPACK_IMPORTED_MODULE_4__['API'].getUserId(
                  _API__WEBPACK_IMPORTED_MODULE_4__['API'].getCreatorId(
                    location.href
                  )
                ),
                _API__WEBPACK_IMPORTED_MODULE_4__['API'].getURLPathField('tags')
              )
            }
            this.afterFetchPostList(data)
          }
        }

        /***/
      },

    /***/ './src/ts/modules/Lang.ts':
      /*!********************************!*\
  !*** ./src/ts/modules/Lang.ts ***!
  \********************************/
      /*! exports provided: lang */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'lang',
          function () {
            return lang
          }
        )
        /* harmony import */ var _langText__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./langText */ './src/ts/modules/langText.ts')

        // 语言类
        class Lang {
          constructor() {
            this.langType = 0
            this.getLangType()
          }
          // 设置语言类型
          getLangType() {
            const userLang = document.documentElement.lang // 获取语言标识
            switch (userLang) {
              case 'zh':
              case 'zh-CN':
              case 'zh-Hans':
                this.langType = 0 // 设置为简体中文
                break
              case 'ja':
                this.langType = 1 // 设置为日语
                break
              case 'zh-Hant':
              case 'zh-tw':
              case 'zh-TW':
                this.langType = 3 // 设置为繁体中文
                break
              default:
                this.langType = 2 // 设置为英语
                break
            }
          }
          // translate 翻译
          transl(name, ...arg) {
            let content =
              _langText__WEBPACK_IMPORTED_MODULE_0__['langText'][name][
                this.langType
              ]
            arg.forEach((val) => (content = content.replace('{}', val)))
            return content
          }
        }
        const lang = new Lang()

        /***/
      },

    /***/ './src/ts/modules/Log.ts':
      /*!*******************************!*\
  !*** ./src/ts/modules/Log.ts ***!
  \*******************************/
      /*! exports provided: log */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'log',
          function () {
            return log
          }
        )
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')

        // 日志类
        class Log {
          constructor() {
            this.logArea = document.createElement('div') // 输出日志的区域
            this.id = 'logWrap' // 日志区域元素的 id
            this.refresh = document.createElement('span') // 刷新时使用的元素
            this.colors = ['#00ca19', '#d27e00', '#f00']
            // 切换不同页面时，如果任务已经完成，则清空输出区域，避免日志一直堆积。
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_1__['EVT'].events.destroy,
              () => {
                if (
                  _Store__WEBPACK_IMPORTED_MODULE_2__['store'].states.allowWork
                ) {
                  this.clear()
                }
              }
            )
          }
          // 如果日志元素没有添加到页面上，则添加上去
          checkElement() {
            let test = document.getElementById(this.id)
            if (test === null) {
              this.logArea.id = this.id
              _DOM__WEBPACK_IMPORTED_MODULE_0__['DOM'].insertToHead(
                this.logArea
              )
            }
          }
          // 清空日志
          clear() {
            this.logArea.innerHTML = ''
          }
          // 添加日志
          /*
    str 日志文本
    level 日志等级
    br 换行标签的个数
    keepShow 追加日志的模式，默认为 true，把这一条日志添加后不再修改。false 则是刷新显示这条消息。
  
    level 日志等级：
    -1 auto 不设置颜色
    0 success 绿色
    1 warning 黄色
    2 error 红色
    */
          add(str, level, br, keepShow) {
            let span = document.createElement('span')
            if (!keepShow) {
              span = this.refresh
            }
            span.innerHTML = str
            if (level > -1) {
              span.style.color = this.colors[level]
            }
            while (br > 0) {
              span.appendChild(document.createElement('br'))
              br--
            }
            this.logArea.appendChild(span)
          }
          log(str, br = 1, keepShow = true) {
            this.checkElement()
            this.add(str, -1, br, keepShow)
          }
          success(str, br = 1, keepShow = true) {
            this.checkElement()
            this.add(str, 0, br, keepShow)
          }
          warning(str, br = 1, keepShow = true) {
            this.add(str, 1, br, keepShow)
          }
          error(str, br = 1, keepShow = true) {
            this.add(str, 2, br, keepShow)
          }
        }
        const log = new Log()

        /***/
      },

    /***/ './src/ts/modules/Output.ts':
      /*!**********************************!*\
  !*** ./src/ts/modules/Output.ts ***!
  \**********************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        // 输出传递的文本

        class Output {
          constructor() {
            this.outputPanel = document.createElement('div') // 输出面板
            this.outputContent = document.createElement('div') // 输出文本的容器元素
            this.addOutPutPanel()
            this.bindEvent()
          }
          // 添加输出面板
          addOutPutPanel() {
            const outputPanelHTML = `
    <div class="outputWrap">
    <div class="outputClose" title="${_Lang__WEBPACK_IMPORTED_MODULE_1__[
      'lang'
    ].transl('_关闭')}">X</div>
    <div class="outputTitle">${_Lang__WEBPACK_IMPORTED_MODULE_1__[
      'lang'
    ].transl('_输出信息')}</div>
    <div class="outputContent"></div>
    <div class="outputFooter">
    <div class="outputCopy" title="">${_Lang__WEBPACK_IMPORTED_MODULE_1__[
      'lang'
    ].transl('_复制')}</div>
    </div>
    </div>
    `
            document.body.insertAdjacentHTML('beforeend', outputPanelHTML)
            this.outputPanel = document.querySelector('.outputWrap')
            this.outputContent = document.querySelector('.outputContent')
          }
          close() {
            this.outputPanel.style.display = 'none'
            this.outputContent.innerHTML = ''
          }
          bindEvent() {
            // 关闭输出面板
            document
              .querySelector('.outputClose')
              .addEventListener('click', () => {
                this.close()
              })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.hideCenterPanel,
              () => {
                this.close()
              }
            )
            // 复制输出内容
            document
              .querySelector('.outputCopy')
              .addEventListener('click', () => {
                const range = document.createRange()
                range.selectNodeContents(this.outputContent)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
                document.execCommand('copy')
                // 改变提示文字
                document.querySelector('.outputCopy').textContent =
                  _Lang__WEBPACK_IMPORTED_MODULE_1__['lang'].transl(
                    '_已复制到剪贴板'
                  )
                setTimeout(() => {
                  window.getSelection().removeAllRanges()
                  document.querySelector('.outputCopy').textContent =
                    _Lang__WEBPACK_IMPORTED_MODULE_1__['lang'].transl('_复制')
                }, 1000)
              })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.output,
              (ev) => {
                this.output(ev.detail.data)
              }
            )
          }
          // 输出内容
          output(text) {
            if (text) {
              this.outputContent.innerHTML = text
              this.outputPanel.style.display = 'block'
            }
          }
        }
        new Output()

        /***/
      },

    /***/ './src/ts/modules/PageType.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/PageType.ts ***!
  \************************************/
      /*! exports provided: pageType */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'pageType',
          function () {
            return pageType
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        // 获取页面类型

        class PageType {
          constructor() {
            this.type = 0
            this.type = this.getPageType()
            // 页面切换时检查新旧页面是否不同
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.pageSwitch,
              () => {
                this.checkPageTypeIsNew()
              }
            )
          }
          // 判断页面类型
          getPageType() {
            let type
            const host = window.location.hostname
            const path = window.location.pathname
            const userPage =
              (!host.startsWith('www.') &&
                !host.startsWith('api.') &&
                !host.startsWith('downloads.')) ||
              path.startsWith('/@')
            if (host === 'www.fanbox.cc' && path === '/') {
              // https://www.fanbox.cc/
              // 自己主页
              type = 0
            } else if (path === '/home/supporting') {
              // https://www.fanbox.cc/home/supporting
              // 正在赞助
              type = 1
            } else if (
              userPage &&
              !path.includes('/posts') &&
              !path.includes('/tags/') &&
              !path.includes('/shop')
            ) {
              // https://kyomoneko.fanbox.cc/
              // https://www.fanbox.cc/@official
              // 画师主页
              type = 2
            } else if (userPage && path.endsWith('/posts')) {
              // https://kyomoneko.fanbox.cc/posts
              // https://www.fanbox.cc/@official/posts
              // 画师投稿列表页
              type = 3
            } else if (userPage && path.includes('/posts/')) {
              // https://kyomoneko.fanbox.cc/posts/904593
              // https://www.fanbox.cc/@official/posts/996286
              // 投稿内容页
              type = 4
            } else if (userPage && path.includes('/tags/')) {
              // https://eto13.fanbox.cc/tags/%E5%8B%95%E7%94%BB
              // tag 页面
              type = 5
            } else if (userPage && path.endsWith('/shop')) {
              // https://yajirushikey.fanbox.cc/shop
              // 商店页面
              type = 6
            } else {
              // 没有匹配到可用的页面类型
              throw new Error('Page type matching failed')
            }
            return type
          }
          // 检查是不是进入到了新的页面类型
          checkPageTypeIsNew() {
            let newType = this.getPageType()
            if (this.type !== newType) {
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.pageTypeChange,
                newType
              )
            }
            // 保存当前页面类型
            this.type = newType
          }
        }
        const pageType = new PageType()

        /***/
      },

    /***/ './src/ts/modules/ProgressBar.ts':
      /*!***************************************!*\
  !*** ./src/ts/modules/ProgressBar.ts ***!
  \***************************************/
      /*! exports provided: progressBar */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'progressBar',
          function () {
            return progressBar
          }
        )
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')

        // 进度条
        class ProgressBar {
          constructor() {
            this.wrapHTML = `
  <div class="progressBarWrap">
  <div class="total">
  <span class="text">${_Lang__WEBPACK_IMPORTED_MODULE_2__['lang'].transl(
    '_下载进度'
  )}</span>
  <div class="right1">
  <div class="progressBar progressBar1">
  <div class="progress progress1"></div>
  </div>
  <div class="progressTip progressTip1">
  <span class="downloaded">0</span>
  /
  <span class="imgNum totalNumber">0</span>
  </div>
  </div>
  </div>

  <ul class="progressBarList"></ul>
  </div>
  `
            this.barHTML = `<li class="downloadBar">
  <div class="progressBar progressBar2">
  <div class="progress progress2"></div>
  </div>
  <div class="progressTip progressTip2">
  <span class="fileName"></span>
  </div>
  </li>`
            this.allProgressBar = []
            this.wrap = _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].useSlot(
              'progressBar',
              this.wrapHTML
            )
            this.downloadedEl = this.wrap.querySelector('.downloaded')
            this.progressColorEl = this.wrap.querySelector('.progress1')
            this.listWrap = this.wrap.querySelector('.progressBarList')
            this.totalNumberEl = this.wrap.querySelector('.totalNumber')
          }
          // 重设所有进度
          reset(num, downloaded = 0) {
            // 重置总进度条
            this.setTotalProgress(downloaded)
            this.totalNumberEl.textContent =
              _Store__WEBPACK_IMPORTED_MODULE_0__[
                'store'
              ].result.length.toString()
            // 重置子进度条
            this.listWrap.innerHTML = this.barHTML.repeat(num)
            this.wrap.style.display = 'block'
            // 保存子进度条上需要使用到的元素
            const allProgressBar =
              this.listWrap.querySelectorAll('.downloadBar')
            this.allProgressBar = []
            for (const bar of allProgressBar) {
              const data = {
                name: bar.querySelector('.fileName'),
                progress: bar.querySelector('.progress'),
              }
              this.allProgressBar.push(data)
            }
          }
          // 设置总进度条的进度
          setTotalProgress(downloaded) {
            this.downloadedEl.textContent = downloaded.toString()
            const progress =
              (downloaded /
                _Store__WEBPACK_IMPORTED_MODULE_0__['store'].result.length) *
              100
            this.progressColorEl.style.width = progress + '%'
          }
          // 设置子进度条的进度
          setProgress(index, data) {
            const bar = this.allProgressBar[index]
            bar.name.textContent = data.name
            const progress = data.loaded / data.total || 0 // 若结果为 NaN 则设为 0
            bar.progress.style.width = progress * 100 + '%'
          }
          // 让某个子进度条显示警告色
          showErrorColor(index, show) {
            const bar = this.allProgressBar[index]
            bar.name.classList[show ? 'add' : 'remove']('downloadError')
          }
        }
        const progressBar = new ProgressBar()

        /***/
      },

    /***/ './src/ts/modules/RightIcon.ts':
      /*!*************************************!*\
  !*** ./src/ts/modules/RightIcon.ts ***!
  \*************************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')

        // 右侧的下载图标
        class RightIcon {
          constructor() {
            this.icon = document.createElement('div')
            this.addIcon()
            this.bindEvents()
          }
          // 添加右侧下载按钮
          addIcon() {
            this.icon = document.createElement('div')
            this.icon.textContent = '↓'
            this.icon.id = 'rightButton'
            document.body.appendChild(this.icon)
          }
          bindEvents() {
            this.icon.addEventListener('click', () => {
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.clickRightIcon
              )
            })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.hideCenterPanel,
              () => {
                this.show()
              }
            )
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.showCenterPanel,
              () => {
                this.hide()
              }
            )
          }
          show() {
            this.icon.style.display = 'block'
          }
          hide() {
            this.icon.style.display = 'none'
          }
        }
        new RightIcon()

        /***/
      },

    /***/ './src/ts/modules/SaveData.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/SaveData.ts ***!
  \************************************/
      /*! exports provided: saveData */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'saveData',
          function () {
            return saveData
          }
        )
        /* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Filter */ './src/ts/modules/Filter.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        /* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Settings */ './src/ts/modules/Settings.ts')

        class SaveData {
          constructor() {
            // 嵌入的文件只支持指定的网站，每个网站有固定的前缀
            this.providerDict = {
              youtube: 'https://www.youtube.com/watch?v=',
              fanbox: 'https://www.fanbox.cc/',
              gist: 'https://gist.github.com/',
              soundcloud: 'https://soundcloud.com/',
              vimeo: 'https://vimeo.com/',
              twitter: 'https://twitter.com/i/web/status/',
              google_forms: 'https://docs.google.com/forms/d/e/',
            }
            this.extractTextReg = new RegExp(/<[^<>]+>/g)
            this.matchImgSrc = new RegExp(
              /(?<=src=")https.*?(jpeg|jpg|png|gif|bmp)/g
            )
          }
          receive(data) {
            this.parsePost(data)
          }
          parsePost(data) {
            if (data.body === null) {
              return
            }
            // 针对投稿进行检查，决定是否保留它
            const id = data.id
            const fee = data.feeRequired
            const date = data.publishedDatetime
            const check = _Filter__WEBPACK_IMPORTED_MODULE_0__['filter'].check({
              id,
              fee,
              date,
            })
            if (!check) {
              return
            }
            // 如果投稿检查通过，保存投稿信息
            const result = {
              postId: data.id,
              type: data.type,
              title: data.title,
              date,
              fee,
              user: data.user.name,
              uid: data.user.userId,
              tags: data.tags.join(','),
              files: [],
              links: {
                fileId: '',
                name: 'links-' + data.id,
                ext: 'txt',
                size: null,
                index: 0,
                text: [],
                url: '',
                retryUrl: null,
              },
            }
            // 提取它的资源文件，并对每个资源进行检查，决定是否保存
            let index = 0 // 资源的序号
            // 封面图和文本资源的序号是 0，其他文件的序号自增
            // 提取投稿的封面图片
            // 封面图片的序号设置为 0，所以它里面不需要对 index 进行操作
            if (
              _Settings__WEBPACK_IMPORTED_MODULE_2__['form'].savePostCover
                .checked
            ) {
              const cover = data.coverImageUrl
              if (cover) {
                const { name, ext } = this.getUrlNameAndExt(cover)
                const r = {
                  fileId: this.createFileId(),
                  name,
                  ext,
                  size: null,
                  index,
                  url: cover,
                  retryUrl: null,
                }
                result.files.push(r)
              }
            }
            // 非 article 投稿都有 text 字段，这这里统一提取里面的链接
            // 但是因为正则没有分组，所以非 article 投稿中如果有多个链接，可能会有遗漏，待考
            // 提取文本中的链接有两种来源，一种是文章正文里的文本，一种是嵌入资源。先从正文提取链接，后提取嵌入资源的链接。这样链接保存下来的顺序比较合理。
            if (data.type !== 'article') {
              let text = ''
              if (data.type === 'entry') {
                text = data.body.html.replace(this.extractTextReg, '')
              } else {
                text = data.body.text
              }
              if (text) {
                const links = this.getTextLinks(text)
                result.links.text = result.links.text.concat(links)
                result.links.fileId = this.createFileId()
                // 保存文章正文里的文字
                if (
                  _Settings__WEBPACK_IMPORTED_MODULE_2__['form'].saveText
                    .checked
                ) {
                  result.links.text.push(text)
                }
              }
            }
            // 提取 article 投稿的资源
            if (data.type === 'article') {
              // 从正文文本里提取链接
              let linkTexts = []
              let text = '' // 正文文本
              for (const block of data.body.blocks) {
                if (block.type === 'p' && block.text) {
                  linkTexts.push(block.text)
                  if (block.links && block.links.length > 0) {
                    for (const links of block.links) {
                      linkTexts.push(links.url)
                    }
                  }
                  // 保存文章正文里的文字，每个段落后面添加换行
                  text += block.text + '\r\n\r\n'
                }
              }
              for (const link of linkTexts) {
                const links = this.getTextLinks(link)
                result.links.text = result.links.text.concat(links)
                result.links.fileId = this.createFileId()
              }
              if (
                _Settings__WEBPACK_IMPORTED_MODULE_2__['form'].saveText
                  .checked &&
                text
              ) {
                result.links.text.push(text)
              }
              // 保存图片资源
              for (const block of data.body.blocks) {
                if (block.type === 'image') {
                  const imageData = data.body.imageMap[block.imageId]
                  if (!imageData) {
                    continue
                  }
                  index++
                  const resource = this.getImageData(imageData, index)
                  resource !== null && result.files.push(resource)
                }
              }
              // 保存 file 资源
              for (const block of data.body.blocks) {
                if (block.type === 'file') {
                  const fileData = data.body.fileMap[block.fileId]
                  if (!fileData) {
                    continue
                  }
                  index++
                  const resource = this.getFileData(fileData, index)
                  resource !== null && result.files.push(resource)
                }
              }
              // 保存嵌入的资源，只能保存到文本
              const embedDataArr = []
              for (const [id, embedData] of Object.entries(
                data.body.embedMap
              )) {
                embedDataArr.push([
                  embedData.serviceProvider,
                  embedData.contentId,
                ])
              }
              const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
              result.links.text = result.links.text.concat(embedLinks)
              result.links.fileId = this.createFileId()
              // 保存嵌入的 URL，只能保存到文本
              const urlArr = []
              for (const val of Object.values(data.body.urlEmbedMap)) {
                if (val.type === 'default') {
                  urlArr.push(val.url)
                } else if (val.type === 'html') {
                  // 尝试从 html 代码中提取 url
                  const testURL = val.html.match('iframe src="(http.*)"')
                  if (testURL && testURL.length > 1) {
                    urlArr.push(testURL[1])
                  } else {
                    urlArr.push(val.html)
                  }
                }
              }
              if (urlArr.length > 0) {
                result.links.text = result.links.text.concat(
                  urlArr.join('\n\n')
                )
                result.links.fileId = this.createFileId()
              }
            }
            // 提取 image 投稿的资源
            if (data.type === 'image') {
              // 保存图片资源
              for (const imageData of data.body.images) {
                if (!imageData) {
                  continue
                }
                index++
                const resource = this.getImageData(imageData, index)
                resource !== null && result.files.push(resource)
              }
            }
            // 提取 entry 投稿的图片资源
            // 不知道此类型投稿中是否有其他类型的资源
            if (data.type === 'entry') {
              const LinkList = data.body.html.match(/<a.*?>/g)
              if (LinkList) {
                for (const a of LinkList) {
                  const matchUrl = a.match('https.*(jpeg|jpg|png|gif|bmp)')
                  if (!matchUrl) {
                    continue
                  }
                  // 组合出 imageData，添加到结果中
                  index++
                  const url = matchUrl[0]
                  const { name, ext } = this.getUrlNameAndExt(url)
                  let width = 0
                  const widthMatch = a.match(/width="(\d*?)"/)
                  if (widthMatch && widthMatch.length > 1) {
                    width = parseInt(widthMatch[1])
                  }
                  let height = 0
                  const heightMatch = a.match(/height="(\d*?)"/)
                  if (heightMatch && heightMatch.length > 1) {
                    height = parseInt(heightMatch[1])
                  }
                  const imageData = {
                    id: name,
                    extension: ext,
                    originalUrl: url,
                    thumbnailUrl: url,
                    width: width,
                    height: height,
                  }
                  const resource = this.getImageData(imageData, index)
                  resource !== null && result.files.push(resource)
                }
              }
            }
            // 提取 file 投稿的资源
            if (data.type === 'file') {
              // 保存 file 资源
              for (const fileData of data.body.files) {
                if (!fileData) {
                  continue
                }
                index++
                const resource = this.getFileData(fileData, index)
                resource !== null && result.files.push(resource)
              }
            }
            // 提取 video 投稿的资源
            // video 数据保存到文本
            if (data.type === 'video') {
              const video = data.body.video
              const embedDataArr = [[video.serviceProvider, video.videoId]]
              const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
              result.links.text = result.links.text.concat(embedLinks)
              result.links.fileId = this.createFileId()
            }
            _Store__WEBPACK_IMPORTED_MODULE_1__['store'].addResult(result)
          }
          getImageData(imageData, index) {
            if (
              _Filter__WEBPACK_IMPORTED_MODULE_0__['filter'].check({
                ext: imageData.extension,
              })
            ) {
              return {
                fileId: imageData.id,
                name: imageData.id,
                ext: imageData.extension,
                size: null,
                index,
                url: imageData.originalUrl,
                retryUrl: imageData.thumbnailUrl,
              }
            }
            return null
          }
          getFileData(fileData, index) {
            if (
              _Filter__WEBPACK_IMPORTED_MODULE_0__['filter'].check({
                ext: fileData.extension,
              })
            ) {
              return {
                fileId: fileData.id,
                name: fileData.name,
                ext: fileData.extension,
                size: fileData.size,
                index,
                url: fileData.url,
                retryUrl: null,
              }
            }
            return null
          }
          // 从文本里提取链接
          getTextLinks(text) {
            const links = []
            if (
              !_Settings__WEBPACK_IMPORTED_MODULE_2__['form'].saveLink.checked
            ) {
              return links
            }
            // 一个段落里可能包含多个链接（啊好麻烦），所以用换行符来尝试分割一下
            const textArray = text.split('\n')
            const Reg = /http[s]*:\/\/[\w=\?\.\/&\-\#\!\%]+/g
            for (const str of textArray) {
              const match = Reg.exec(str)
              Reg.lastIndex = 0
              if (match && match.length > 0) {
                for (const link of match) {
                  links.push(link)
                }
              }
            }
            return links
          }
          // 从嵌入的资源里，获取资源的原网址
          getEmbedLinks(dataArr, postId) {
            const links = []
            if (
              !_Settings__WEBPACK_IMPORTED_MODULE_2__['form'].saveLink.checked
            ) {
              return links
            }
            for (const data of dataArr) {
              const [serviceProvider, contentId] = data
              let link = this.providerDict[serviceProvider] + contentId
              // 谷歌表单需要在链接后面添加特定后缀
              if (serviceProvider === 'google_forms') {
                link = link + '/viewform'
              }
              links.push(link)
            }
            return links
          }
          // 下载器自己生成的 txt 文件没有 id，所以这里需要自己给它生成一个 id
          // 使用时间戳并不保险，因为有时候代码执行太快，会生成重复的时间戳。所以后面加上随机字符
          createFileId() {
            return (
              new Date().getTime().toString() +
              Math.random().toString(16).replace('.', '')
            )
          }
          // 传入文件 url，提取文件名和扩展名
          getUrlNameAndExt(url) {
            const split = url.split('/')
            const fileName = split[split.length - 1]
            const name = fileName.split('.')[0]
            const ext = fileName.split('.')[1]
            return {
              name,
              ext,
            }
          }
        }
        const saveData = new SaveData()

        /***/
      },

    /***/ './src/ts/modules/SaveSettings.ts':
      /*!****************************************!*\
  !*** ./src/ts/modules/SaveSettings.ts ***!
  \****************************************/
      /*! exports provided: SaveSettings */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'SaveSettings',
          function () {
            return SaveSettings
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')
        // 保存和初始化设置项
        // 只有部分设置会被保存

        class SaveSettings {
          constructor(form) {
            // 本地存储中使用的 name
            this.storeName = 'fanboxSetting'
            // 需要持久化保存的设置的默认值
            this.optionDefault = {
              image: true,
              music: true,
              video: true,
              compressed: true,
              ps: true,
              other: true,
              free: true,
              pay: true,
              feeSwitch: false,
              fee: 500,
              idRangeSwitch: false,
              idRangeInput: 0,
              postDate: false,
              postDateStart: '',
              postDateEnd: '',
              saveLink: true,
              saveText: false,
              userSetName:
                _Store__WEBPACK_IMPORTED_MODULE_1__['store'].defaultFileName,
              quietDownload: true,
              downloadThread: 3,
              dateFormat: 'YYYY-MM-DD hh-mm',
              savePostCover: false,
            }
            // 需要持久化保存的设置
            this.options = Object.assign({}, this.optionDefault)
            this.form = form
            this.bindOptionEvent()
            // 设置发生改变时，保存设置到本地存储
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.settingChange,
              (event) => {
                const data = event.detail.data
                if (Reflect.has(this.optionDefault, data.name)) {
                  if (this.options[data.name] !== data.value) {
                    this.options[data.name] = data.value
                    localStorage.setItem(
                      this.storeName,
                      JSON.stringify(this.options)
                    )
                  }
                }
              }
            )
            this.restoreOption()
          }
          // 恢复值是 Boolean 的设置项
          // 给复选框使用
          restoreBoolean(name) {
            // 优先使用用户设置的值
            if (typeof this.options[name] === 'boolean') {
              this.form[name].checked = Boolean(this.options[name])
            } else {
              // 否则使用默认值
              this.form[name].checked = Boolean(this.optionDefault[name])
            }
            // 这里不能简单的使用 || 符号来处理，考虑如下情况：
            // this.options[name] || this.optionDefault[name]
            // 用户设置为 false，默认值为 true，使用 || 的话就恒为 true 了
          }
          // 恢复值是 string 的设置项
          // 给单选按钮和文本框使用
          restoreString(name) {
            // 优先使用用户设置的值
            if (this.options[name] !== undefined) {
              this.form[name].value = this.options[name].toString()
            } else {
              // 否则使用默认值
              this.form[name].value = this.optionDefault[name].toString()
            }
          }
          // 从持久化设置，缺省使用默认值，恢复下载区域的设置
          restoreOption() {
            const savedOption = localStorage.getItem(this.storeName)
            // 读取保存的设置
            if (savedOption) {
              Object.assign(this.options, JSON.parse(savedOption))
            } else {
              // 如果没有保存过，则不做处理
              return
            }
            this.restoreString('fee')
            this.restoreString('idRangeInput')
            this.restoreString('postDateStart')
            this.restoreString('postDateEnd')
            this.restoreString('userSetName')
            this.restoreString('downloadThread')
            this.restoreBoolean('image')
            this.restoreBoolean('music')
            this.restoreBoolean('video')
            this.restoreBoolean('compressed')
            this.restoreBoolean('ps')
            this.restoreBoolean('other')
            this.restoreBoolean('free')
            this.restoreBoolean('pay')
            this.restoreBoolean('feeSwitch')
            this.restoreBoolean('idRangeSwitch')
            this.restoreBoolean('postDate')
            this.restoreBoolean('saveLink')
            this.restoreBoolean('saveText')
            this.restoreBoolean('quietDownload')
            this.restoreString('dateFormat')
            this.restoreBoolean('savePostCover')
          }
          // 处理输入框： change 时直接保存 value
          saveTextInput(name) {
            const el = this.form[name]
            el.addEventListener('change', () => {
              this.emitChange(name, el.value)
            })
          }
          // 处理复选框： click 时直接保存 checked
          saveCheckBox(name) {
            const el = this.form[name]
            el.addEventListener('click', () => {
              this.emitChange(name, el.checked)
            })
          }
          // 处理单选框： click 时直接保存 value
          saveRadio(name) {
            const radios = this.form[name]
            for (const radio of radios) {
              radio.addEventListener('click', () => {
                this.emitChange(name, radio.value)
              })
            }
          }
          // 绑定所有选项的事件，当选项变动触发 settingChange 事件
          // 只可执行一次，否则事件会重复绑定
          bindOptionEvent() {
            this.saveTextInput('fee')
            this.saveTextInput('idRangeInput')
            this.saveTextInput('postDateStart')
            this.saveTextInput('postDateEnd')
            this.saveTextInput('downloadThread')
            this.saveCheckBox('image')
            this.saveCheckBox('music')
            this.saveCheckBox('video')
            this.saveCheckBox('compressed')
            this.saveCheckBox('ps')
            this.saveCheckBox('other')
            this.saveCheckBox('free')
            this.saveCheckBox('pay')
            this.saveCheckBox('feeSwitch')
            this.saveCheckBox('idRangeSwitch')
            this.saveRadio('idRange')
            this.saveCheckBox('postDate')
            this.saveCheckBox('saveLink')
            this.saveCheckBox('saveText')
            this.saveCheckBox('quietDownload')
            this.saveTextInput('dateFormat')
            this.saveCheckBox('savePostCover')
            // 保存命名规则
            const userSetNameInput = this.form.userSetName
            ;['change', 'focus'].forEach((ev) => {
              userSetNameInput.addEventListener(ev, () => {
                this.emitChange('userSetName', userSetNameInput.value)
              })
            })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.resetOption,
              () => {
                this.form.reset()
                this.reset()
              }
            )
          }
          emitChange(name, value) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.settingChange,
              { name: name, value: value }
            )
          }
          // 重设选项
          reset() {
            // 将保存的选项恢复为默认值
            Object.assign(this.options, this.optionDefault)
            // 覆写本地存储里的设置为默认值
            localStorage.setItem(this.storeName, JSON.stringify(this.options))
            // 重设选项
            this.restoreOption()
            // 触发设置改变事件
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.settingChange
            )
          }
        }

        /***/
      },

    /***/ './src/ts/modules/SettingHTML.ts':
      /*!***************************************!*\
  !*** ./src/ts/modules/SettingHTML.ts ***!
  \***************************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Lang */ './src/ts/modules/Lang.ts')
        /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Store */ './src/ts/modules/Store.ts')

        const formHtml = `<form class="settingForm">
      <p class="option" data-no="2">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_文件类型')}</span>

      <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType1" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.image.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_图片')}&nbsp;</label>
      
      <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType2" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.music.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_音乐')}&nbsp;</label>

      <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType3" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.video.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_视频')}&nbsp;</label>
      
      <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType4" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.compressed.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_压缩文件')}&nbsp;</label>
      
      <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType5" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.ps.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_PS文件')}&nbsp;</label>

      <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType6" class="has_tip" data-tip="${_Store__WEBPACK_IMPORTED_MODULE_1__[
        'store'
      ].fileType.other.join(',')}"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_其他')}&nbsp;</label>
      </p>

      <p class="option" data-no="21">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_投稿类型')}</span>

      <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType1"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_免费投稿')}&nbsp;</label>

      <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType2"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_付费投稿')}&nbsp;</label>
      </p>

      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_设置价格范围')}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="feeSwitch">
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_最小值')}
      <input type="text" name="fee" class="setinput_style1 w100 blue" value="500"> ¥
      </span>
      </p>
      
      <p class="option" data-no="9">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_设置id范围提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_设置id范围')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="idRangeSwitch">
      <input type="radio" name="idRange" id="idRange2" class="need_beautify radio" value="2" checked>
      <span class="beautify_radio"></span>
      <label for="idRange2">  ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_小于')}&nbsp; </label>
      <input type="radio" name="idRange" id="idRange1" class="need_beautify radio" value="1">
      <span class="beautify_radio"></span>
      <label for="idRange1">  ${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_大于')}&nbsp; </label>
      <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
      </span>
      </p>

      <p class="option" data-no="10">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_设置投稿时间提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_设置投稿时间')} <span class="gray1"> ? </span></span>

      <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="postDate">
      <input type="datetime-local" name="postDateStart" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      &nbsp;-&nbsp;
      <input type="datetime-local" name="postDateEnd" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      </span>
      </p>

      <p class="option" data-no="19">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_保存投稿中的外部链接')}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <p class="option" data-no="22">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_保存投稿中的封面图片')}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="savePostCover" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>

      <p class="option" data-no="20">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_保存投稿中的文字')}&nbsp;&nbsp; 
      </span>
      <input type="checkbox" name="saveText" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      </p>

    <p class="option" data-no="13">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_设置文件夹名的提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_设置文件名')}<span class="gray1"> ? </span></span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value=${
        _Store__WEBPACK_IMPORTED_MODULE_1__['store'].defaultFileName
      }>
      &nbsp;
      <select name="fileNameSelect">
        <option value="default">…</option>
        <option value="{user}">{user}</option>
        <option value="{uid}">{uid}</option>
        <option value="{title}">{title}</option>
        <option value="{postid}">{postid}</option>
        <option value="{date}">{date}</option>
        <option value="{task_date}">{task_date}</option>
        <option value="{index}">{index}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{fee}">{fee}</option>
        <option value="{tags}">{tags}</option>
        </select>
      &nbsp;&nbsp;
      <span class="showFileNameTip">？</span>
      </p>
      <p class="fileNameTip tip">
      <strong>${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang']
        .transl('_设置文件夹名的提示')
        .replace('<br>', '. ')}</strong>
      <br>
      <span class="blue">{user}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记user')}
      <br>
      <span class="blue">{uid}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记uid')}
      <br>
      <span class="blue">{title}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记title')}
      <br>
      <span class="blue">{postid}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记postid')}
      <br>
      <span class="blue">{date}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记date')}
      <br>
      <span class="blue">{task_date}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记taskDate')}
      <br>
      <span class="blue">{index}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记index')}
      <br>
      <span class="blue">{name}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记name')}
      <br>
      <span class="blue">{ext}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记ext')}
      <br>
      <span class="blue">{fee}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记fee')}
      <br>
      <span class="blue">{tags}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记tags')}
      <br>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl('_命名标记提醒')}
      </p>

      <p class="option" data-no="31">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_日期格式')}</span>
      <input type="text" name="dateFormat" class="setinput_style1 blue" style="width:250px;" value="YYYY-MM-DD">
      <button type="button" class="gray1 textButton showDateTip">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_提示')}</button>
      </p>
      <p class="dateFormatTip tip" style="display:none">
      <span>${_Lang__WEBPACK_IMPORTED_MODULE_0__['lang'].transl(
        '_日期格式提示'
      )}</span>
      <br>
      <span class="blue">YYYY</span> <span>2021</span>
      <br>
      <span class="blue">YY</span> <span>21</span>
      <br>
      <span class="blue">MM</span> <span>04</span>
      <br>
      <span class="blue">MMM</span> <span>Apr</span>
      <br>
      <span class="blue">MMMM</span> <span>April</span>
      <br>
      <span class="blue">DD</span> <span>30</span>
      <br>
      <span class="blue">hh</span> <span>06</span>
      <br>
      <span class="blue">mm</span> <span>40</span>
      <br>
      <span class="blue">ss</span> <span>08</span>
      <br>
      </p>
      
      <p class="option" data-no="16">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_线程数字')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_设置下载线程')}<span class="gray1"> ? </span></span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>

      <p class="option" data-no="17">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__[
        'lang'
      ].transl('_自动下载的提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__[
          'lang'
        ].transl('_自动开始下载')}<span class="gray1"> ? </span></span>
      <input type="checkbox" name="quietDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <slot data-name="crawlBtns" class="centerWrap_btns crawlBtns"></slot>
      <slot data-name="downloadArea"></slot>
      <slot data-name="progressBar"></slot>
</form>`
        /* harmony default export */ __webpack_exports__['default'] = formHtml

        /***/
      },

    /***/ './src/ts/modules/Settings.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/Settings.ts ***!
  \************************************/
      /*! exports provided: form */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'form',
          function () {
            return form
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        /* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./DOM */ './src/ts/modules/DOM.ts')
        /* harmony import */ var _SaveSettings__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./SaveSettings */ './src/ts/modules/SaveSettings.ts'
          )
        /* harmony import */ var _SettingHTML__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./SettingHTML */ './src/ts/modules/SettingHTML.ts'
          )

        // 设置表单
        class Settings {
          constructor() {
            this.activeClass = 'active'
            this.chooseKeys = ['Enter', 'NumpadEnter'] // 让回车键可以控制复选框（浏览器默认只支持空格键）
            this.form = _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].useSlot(
              'form',
              _SettingHTML__WEBPACK_IMPORTED_MODULE_3__['default']
            )
            this.allCheckBox = this.form.querySelectorAll(
              'input[type="checkbox"]'
            )
            this.allRadio = this.form.querySelectorAll('input[type="radio"]')
            this.allSwitch = this.form.querySelectorAll('.checkbox_switch')
            this.allLabel = this.form.querySelectorAll('label')
            this.bindEvents()
            new _SaveSettings__WEBPACK_IMPORTED_MODULE_2__['SaveSettings'](
              this.form
            )
            // new SaveSettings 会初始化选项，但可能会有一些选项的值在初始化过程中没有发生改变，也就不会被监听到变化。所以这里需要直接初始化以下状态。
            this.initFormBueatiful()
          }
          // 设置表单上美化元素的状态
          initFormBueatiful() {
            // 设置改变时，重设 label 激活状态
            this.resetLabelActive()
            // 重设该选项的子选项的显示/隐藏
            this.resetSubOptionDisplay()
          }
          bindEvents() {
            // 给美化的复选框绑定功能
            for (const checkbox of this.allCheckBox) {
              this.bindCheckboxEvent(checkbox)
            }
            // 给美化的单选按钮绑定功能
            for (const radio of this.allRadio) {
              this.bindRadioEvent(radio)
            }
            // 处理 label 状态
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.settingChange,
              () => {
                this.initFormBueatiful()
              }
            )
            // 显示命名字段提示
            this.form
              .querySelector('.showFileNameTip')
              .addEventListener('click', () =>
                _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].toggleEl(
                  document.querySelector('.fileNameTip')
                )
              )
            // 显示日期格式提示
            this.form
              .querySelector('.showDateTip')
              .addEventListener('click', () =>
                _DOM__WEBPACK_IMPORTED_MODULE_1__['DOM'].toggleEl(
                  document.querySelector('.dateFormatTip')
                )
              )
            // 输入框获得焦点时自动选择文本（文件名输入框例外）
            const centerInputs = this.form.querySelectorAll('input[type=text]')
            for (const el of centerInputs) {
              if (el.name !== 'userSetName') {
                el.addEventListener('focus', function () {
                  this.select()
                })
              }
            }
            // 把下拉框的选择项插入到文本框里
            this.insertValueToInput(
              this.form.fileNameSelect,
              this.form.userSetName
            )
          }
          // 把下拉框的选择项插入到文本框里
          insertValueToInput(from, to) {
            from.addEventListener('change', () => {
              if (from.value !== 'default') {
                // 把选择项插入到光标位置,并设置新的光标位置
                const position = to.selectionStart
                to.value =
                  to.value.substr(0, position) +
                  from.value +
                  to.value.substr(position, to.value.length)
                to.selectionStart = position + from.value.length
                to.selectionEnd = position + from.value.length
                to.focus()
              }
            })
          }
          // 设置复选框的事件
          bindCheckboxEvent(el) {
            // 让复选框支持用回车键选择
            el.addEventListener('keydown', (event) => {
              if (this.chooseKeys.includes(event.code)) {
                el.checked = !el.checked
                this.emitChange(el.name, el.checked)
              }
            })
            // 点击美化按钮，反转复选框的值
            el.nextElementSibling.addEventListener('click', () => {
              el.checked = !el.checked
              this.emitChange(el.name, el.checked)
            })
            // 点击它的 label 时，传递它的值
            const label = this.form.querySelector(`label[for="${el.id}"]`)
            if (label) {
              label.addEventListener('click', () => {
                // 点击复选框的 label 不要手动修改 checked ，因为浏览器会自动处理
                this.emitChange(el.name, el.checked)
              })
            }
          }
          // 设置单选控件的事件
          bindRadioEvent(el) {
            // 点击美化按钮，选择当前单选控件
            el.nextElementSibling.addEventListener('click', () => {
              el.checked = true
              // 对于单选按钮，它的值是 value，不是 checked
              this.emitChange(el.name, this.form[el.name].value)
            })
            // 点击它的 label 时，传递它的值
            const label = this.form.querySelector(`label[for="${el.id}"]`)
            if (label) {
              label.addEventListener('click', () => {
                this.emitChange(el.name, this.form[el.name].value)
              })
            }
          }
          // 当选项的值被改变时，触发 settingChange 事件
          emitChange(name, value) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.settingChange,
              { name: name, value: value }
            )
          }
          // 重设 label 的激活状态
          resetLabelActive() {
            // 设置复选框的 label 的激活状态
            for (const checkbox of this.allCheckBox) {
              this.setLabelActive(checkbox)
            }
            // 设置单选按钮的 label 的激活状态
            for (const radio of this.allRadio) {
              this.setLabelActive(radio)
            }
          }
          // 设置 input 元素对应的 label 的激活状态
          setLabelActive(input) {
            const label = this.form.querySelector(`label[for="${input.id}"]`)
            if (label) {
              const method = input.checked ? 'add' : 'remove'
              label.classList[method]('active')
            }
          }
          // 重设子选项的显示/隐藏
          resetSubOptionDisplay() {
            for (const _switch of this.allSwitch) {
              const subOption = this.form.querySelector(
                `.subOptionWrap[data-show="${_switch.name}"]`
              )
              if (subOption) {
                subOption.style.display = _switch.checked ? 'inline' : 'none'
              }
            }
          }
        }
        const settings = new Settings()
        const form = settings.form

        /***/
      },

    /***/ './src/ts/modules/Store.ts':
      /*!*********************************!*\
  !*** ./src/ts/modules/Store.ts ***!
  \*********************************/
      /*! exports provided: store */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'store',
          function () {
            return store
          }
        )
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')
        // 仓库

        // 存储抓取结果和状态
        class Store {
          constructor() {
            this.postIdList = []
            this.resultMeta = [] // 储存抓取结果的元数据
            this.result = [] // 储存抓取结果
            this.defaultFileName = '{user}/{title}/{index}'
            this.crawlCompleteTime = new Date()
            // 文件类型。fanbox 允许直接上传在投稿里的文件类型只有这些
            this.fileType = {
              image: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
              music: ['wav', 'mp3', 'flac'],
              video: ['mp4', 'mov', 'avi'],
              compressed: ['zip'],
              ps: ['psd', 'clip'],
              other: ['txt', 'pdf'],
            }
            // 储存和下载有关的状态
            this.states = {
              allowWork: true,
              quickDownload: false,
            }
            this.bindEvents()
          }
          bindEvents() {
            const allowWorkTrue = [
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlFinish,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlEmpty,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlError,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadPause,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadStop,
            ]
            allowWorkTrue.forEach((type) => {
              window.addEventListener(type, () => {
                this.states.allowWork = true
              })
            })
            const allowWorkFalse = [
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlStart,
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadStart,
            ]
            allowWorkFalse.forEach((type) => {
              window.addEventListener(type, () => {
                this.states.allowWork = false
              })
            })
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.crawlStart,
              () => {
                this.resetResult()
              }
            )
            window.addEventListener(
              _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.downloadComplete,
              () => {
                this.resetStates()
              }
            )
          }
          getCommonData(data) {
            return {
              postId: data.postId,
              type: data.type,
              title: data.title,
              date: data.date,
              fee: data.fee,
              user: data.user,
              uid: data.uid,
              tags: data.tags,
            }
          }
          // 添加每个作品的信息。只需要传递有值的属性
          addResult(data) {
            this.resultMeta.push(data)
            // 因为文本的体积小，所以首先生成文本数据，它会被最早下载。这样不用等待大文件下载完了才下载文本文件
            // 为投稿里的所有的 文本内容 生成一份数据
            if (data.links.text.length > 0) {
              const text = data.links.text.join('\r\n')
              const blob = new Blob([text], {
                type: 'text/plain',
              })
              data.links.url = URL.createObjectURL(blob)
              data.links.size = blob.size
              const result = Object.assign(this.getCommonData(data), data.links)
              this.result.push(result)
            }
            // 为投稿里的每个 files 生成一份数据
            const files = data.files
            for (const fileData of files) {
              const result = Object.assign(this.getCommonData(data), fileData)
              this.result.push(result)
            }
          }
          resetResult() {
            this.postIdList = []
            this.resultMeta = []
            this.result = []
          }
          resetStates() {
            this.states.allowWork = true
            this.states.quickDownload = false
          }
        }
        const store = new Store()

        /***/
      },

    /***/ './src/ts/modules/Support.ts':
      /*!***********************************!*\
  !*** ./src/ts/modules/Support.ts ***!
  \***********************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./EVT */ './src/ts/modules/EVT.ts')

        // 辅助功能
        class Support {
          constructor() {
            this.supportListenHistory()
            this.listenPageSwitch()
          }
          // 使用无刷新加载的页面需要监听 url 的改变，这里为这些事件添加监听支持
          supportListenHistory() {
            const element = document.createElement('script')
            element.setAttribute('type', 'text/javascript')
            element.innerHTML = `
    let _wr = function (type) {
      let orig = history[type];
      return function () {
        let rv = orig.apply(this, arguments);
        let e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    `
            document.head.appendChild(element)
          }
          // 监听页面的无刷新切换。某些页面可以无刷新切换，这时需要进行一些处理
          listenPageSwitch() {
            // 绑定无刷新切换页面的事件，只绑定一次
            ;['pushState', 'popstate', 'replaceState'].forEach((item) => {
              window.addEventListener(item, () => {
                _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].fire(
                  _EVT__WEBPACK_IMPORTED_MODULE_0__['EVT'].events.pageSwitch
                )
              })
            })
          }
        }
        new Support()

        /***/
      },

    /***/ './src/ts/modules/Tip.ts':
      /*!*******************************!*\
  !*** ./src/ts/modules/Tip.ts ***!
  \*******************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        // 显示自定义的提示
        class Tip {
          constructor() {
            this.tipEl = document.createElement('div') // tip 元素
            this.addTipEl()
          }
          // 显示提示
          addTipEl() {
            const tipHTML = `<div id="tip"></div>`
            document.body.insertAdjacentHTML('beforeend', tipHTML)
            this.tipEl = document.getElementById('tip')
            const tips = document.querySelectorAll('.has_tip')
            for (const el of tips) {
              for (const ev of ['mouseenter', 'mouseleave']) {
                el.addEventListener(ev, (event) => {
                  const e = event || window.event
                  const text = el.dataset.tip
                  this.showTip(text, {
                    type: ev === 'mouseenter' ? 1 : 0,
                    x: e.clientX,
                    y: e.clientY,
                  })
                })
              }
            }
          }
          // 显示中间面板上的提示。参数 arg 指示鼠标是移入还是移出，并包含鼠标位置
          showTip(text, arg) {
            if (!text) {
              throw new Error('No tip text.')
            }
            if (arg.type === 1) {
              this.tipEl.innerHTML = text
              this.tipEl.style.left = arg.x + 30 + 'px'
              this.tipEl.style.top = arg.y - 30 + 'px'
              this.tipEl.style.display = 'block'
            } else if (arg.type === 0) {
              this.tipEl.style.display = 'none'
            }
          }
        }
        new Tip()

        /***/
      },

    /***/ './src/ts/modules/TitleBar.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/TitleBar.ts ***!
  \************************************/
      /*! exports provided: titleBar */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'titleBar',
          function () {
            return titleBar
          }
        )
        /* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./PageType */ './src/ts/modules/PageType.ts')
        // 在标题栏上显示下载器工作状态

        class TitleBar {
          constructor() {
            /*
        本程序的状态会以 [string] 形式添加到 title 最前面，并闪烁提醒
        string 和含义列表如下：
        ↑ 抓取中
        → 等待下一步操作（搜索页）
        ▶ 可以开始下载
        ↓ 下载中
        ║ 下载暂停
        ■ 下载停止
        √ 下载完毕
          空格，当需要闪烁标题时使用
        */
            this.status = ['↑', '→', '▶', '↓', '║', '■', '√', ' ']
            this.timer = 0 // 修改 title 的定时器
          }
          // 检查标题里有没有本程序定义的状态字符
          haveStatus(status = '') {
            if (!status) {
              // 没有传递 status，则检查所有标记
              for (const status of this.status) {
                const str = `[${status}]`
                if (document.title.includes(str)) {
                  return true
                }
              }
            } else {
              // 检查指定标记
              const str = `[${status}]`
              return document.title.includes(str)
            }
            return false
          }
          // 重设 title
          reset() {
            const type =
              _PageType__WEBPACK_IMPORTED_MODULE_0__['pageType'].getPageType()
            clearInterval(this.timer)
            // 储存标题的 mete 元素。在某些页面不存在，有时也与实际上的标题不一致。
            const ogTitle = document.querySelector('meta[property="og:title"]')
            // 无刷新自动加载的页面里，og:title 标签是最早更新标题的，内容也一致。
            if (ogTitle && (type == 1 || type === 2)) {
              document.title = ogTitle.content
            } else {
              // 如果当前 title 里有状态提醒，则设置为状态后面的文字
              if (this.haveStatus()) {
                const index = document.title.indexOf(']')
                document.title = document.title.substr(
                  index + 1,
                  document.title.length
                )
              }
            }
          }
          // 修改title
          change(string) {
            const state = `[${string}]`
            // 如果 title 里没有状态，就添加状态
            if (!this.haveStatus()) {
              document.title = `${state} ${document.title}`
            } else {
              // 如果已经有状态了，则替换为新当前传入的状态
              document.title = document.title.replace(/\[.?\]/, state)
            }
            // 闪烁提醒，其实是把 [▶] 或 [→] 与空白 [ ] 来回切换
            if (string === '▶' || string === '→') {
              this.timer = window.setInterval(() => {
                if (this.haveStatus(string)) {
                  // 如果含有状态，就替换成空白
                  document.title = document.title.replace(state, '[ ]')
                } else {
                  if (this.haveStatus(' ')) {
                    // 如果含有空白，就替换成状态
                    document.title = document.title.replace('[ ]', state)
                  } else {
                    // 如果都没有，一般是页面切换了，标题被重置了，取消执行闪烁（此时也根本无法形成闪烁效果了）
                    clearInterval(this.timer)
                  }
                }
              }, 500)
            } else {
              clearInterval(this.timer)
            }
          }
        }
        const titleBar = new TitleBar()

        /***/
      },

    /***/ './src/ts/modules/langText.ts':
      /*!************************************!*\
  !*** ./src/ts/modules/langText.ts ***!
  \************************************/
      /*! exports provided: langText */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'langText',
          function () {
            return langText
          }
        )
        const langText = {
          _或者: [' 或者 ', ' または ', ' or ', ' 或是 '],
          _并且: [' 并且 ', ' かつ ', ' and ', ' 並且 '],
          _任务开始0: ['任务开始', 'タスクの開始', 'Task starts', '工作開始'],
          _抓取结果为零: [
            '抓取完毕，但没有找到符合筛选条件的文件。',
            'フィルタ条件で検索しましたが、該当するファイルは見つかりませんでした。',
            'Crawl finished but did not find files that match the filter criteria.',
            '擷取完畢，但沒有找到符合篩選條件的檔案。',
          ],
          _当前任务尚未完成2: [
            '当前任务尚未完成，请等待完成后再下载。',
            '現在のタスクはまだ完了していません。完了するまでお待ちください。',
            'The current task has not yet been completed',
            '目前工作尚未完成，請等待完成後再下載。',
          ],
          _关闭: ['关闭', '閉じる', 'close', '關閉'],
          _输出信息: ['输出信息', '出力情報', 'Output information', '輸出資訊'],
          _复制: ['复制', 'コピー', 'Copy', '複製'],
          _已复制到剪贴板: [
            '已复制到剪贴板，可直接粘贴',
            'クリップボードにコピーしました。',
            'Has been copied to the clipboard',
            '已複製至剪貼簿，可直接貼上',
          ],
          _下载设置: [
            '下载设置',
            'ダウンロード設定',
            'Download settings',
            '下載設定',
          ],
          _收起展开设置项: [
            '收起/展开设置项',
            '設定の折りたたみ/展開',
            'Collapse/expand settings',
            '摺疊/展開設定項目',
          ],
          _github: [
            'Github 页面，欢迎 star',
            'Github のページ、star をクリックしてください。',
            'Github page, if you like, please star it',
            'Github 頁面，歡迎 star',
          ],
          _wiki: ['使用手册', 'マニュアル', 'Wiki', 'Wiki'],
          _抓取: ['抓取', '保存', 'Crawl', '擷取'],
          _下载: ['下载', 'ダウンロード', 'Download', '下載'],
          _其他: ['其他', 'その他', 'Other', '其他'],
          _快捷键切换显示隐藏: [
            '使用 Alt + X，可以显示和隐藏下载面板',
            'Alt + X でダウンロードパネルを表示/非表示にできます。',
            'Use Alt + X to show and hide the download panel',
            '使用 Alt + X，可以顯示和隱藏下載面板',
          ],
          _共抓取到n个文件: [
            '共抓取到 {} 个文件',
            '合計 {} 個のファイルを取得しました。',
            'Crawl a total of {} files',
            '共擷取到 {} 個檔案',
          ],
          _设置文件名: [
            '设置命名规则',
            '命名規則の設定',
            'Set naming rules',
            '設定命名規則',
          ],
          _设置文件夹名的提示: [
            `可以使用 '/' 建立文件夹<br>示例：{user}/{title}/{index}`,
            `フォルダーは '/' で作成できます。<br>例：{user}/{title}/{index}`,
            `You can create a directory with '/'<br>Example：{user}/{title}/{index}`,
            `可以使用 '/' 建立資料夾<br>範例：{user}/{title}/{index}`,
          ],
          _命名标记user: ['画师名字', 'ユーザー名', 'Artist name', '畫師名稱'],
          _命名标记uid: ['画师 id', 'ユーザーID', 'Artist id', '畫師 id'],
          _预览文件名: [
            '预览文件名',
            'ファイル名のプレビュー',
            'Preview file name',
            '預覽檔案名稱',
          ],
          _设置下载线程: [
            '设置下载线程',
            '同時ダウンロード数の設定',
            'Set the download thread',
            '設定下載執行緒',
          ],
          _线程数字: [
            '可以输入 1-10 之间的数字，设置同时下载的数量',
            '同時にダウンロードするファイルの数を 1-10 で設定します。',
            'You can type a number between 1-10 to set the number of concurrent downloads',
            '可以輸入 1-10 之間的數字，設定同時下載的數量',
          ],
          _下载按钮1: [
            '开始下载',
            'ダウンロードを開始',
            'start download',
            '開始下載',
          ],
          _下载按钮2: [
            '暂停下载',
            'ダウンロードを一時停止',
            'pause download',
            '暫停下載',
          ],
          _下载按钮3: [
            '停止下载',
            'ダウンロードを停止',
            'stop download',
            '停止下載',
          ],
          _下载按钮4: ['复制 url', 'URLをコピー', 'copy urls', '複製url'],
          _当前状态: ['当前状态 ', '現在の状態 ', 'Now state ', '目前狀態 '],
          _未开始下载: [
            '未开始下载',
            'まだダウンロードを開始していません。',
            'Not yet started downloading',
            '未開始下載',
          ],
          _下载进度: [
            '下载进度：',
            'ダウンロードの進行状況：',
            'Download progress: ',
            '下載進度：',
          ],
          _下载线程: ['下载线程：', 'スレッド：', 'Thread: ', '下載執行緒：'],
          _常见问题: [
            '常见问题',
            'よくある質問',
            'Common problems',
            '常見問題',
          ],
          _uuid: [
            '如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。',
            'ダウンロード後のファイル名が異常な場合、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。',
            'If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.',
            '如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。',
          ],
          _下载说明: [
            "下载的文件保存在浏览器的下载目录里。<br>请不要在浏览器的下载选项里选中'总是询问每个文件的保存位置'。<br><b>如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。</b><br>QQ群：853021998",
            'ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><b>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。</b>',
            'The downloaded file is saved in the browser`s download directory. <br><b>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.</b>',
            '下載的檔案儲存在瀏覽器的下載目錄裡。<br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><b>如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。</b><br>QQ群：853021998',
          ],
          _正在下载中: [
            '正在下载中',
            'ダウンロード中',
            'Downloading',
            '正在下載',
          ],
          _下载完毕: [
            '√ 下载完毕!',
            '√ ダウンロードが完了しました！',
            '√ Download finished',
            '√ 下載完畢!',
          ],
          _已暂停: [
            '下载已暂停',
            'ダウンロードを一時停止中です。',
            'Download is paused',
            '下載已暫停',
          ],
          _已停止: [
            '下载已停止',
            'ダウンロードを停止しました。',
            'Download stopped',
            '下載已停止',
          ],
          _已下载: ['已下载', 'downloaded', 'downloaded', '已下載'],
          _抓取完毕: [
            '抓取完毕！',
            'ダウンロードが完了しました！',
            'Crawl finished!',
            '擷取完畢！',
          ],
          _快速下载本页: [
            '快速下载',
            'この作品をすばやくダウンロードする',
            '快速下載',
            'Download quickly',
          ],
          _自动开始下载: [
            '自动开始下载',
            'ダウンロードを自動で開始',
            'Download starts automatically',
            '自動開始下載',
          ],
          _自动下载的提示: [
            '当“开始下载”状态可用时，自动开始下载，不需要点击下载按钮。',
            '「ダウンロードを開始する」ステータスが有効になると、ダウンロードが自動的に開始され、ダウンロードボタンをクリックする必要がなくなります。',
            'When the &quot;Start Downloa&quot; status is available, the download starts automatically and no need to click the download button.',
            '當可下載時自動開始下載，不需要點選下載按鈕。',
          ],
          _文件下载失败: [
            '文件 {} 下载失败',
            'ファイル {} のダウンロードに失敗しました。',
            'File {} download failed',
            '檔案 {} 下載失败',
          ],
          _重置设置: ['重置设置', '設定リセット', 'Reset Settings', '重設設定'],
          _是否重置设置: [
            '是否重置设置？',
            '設定をリセットしますか？',
            'Do you want to reset the settings?',
            '是否重設設定？',
          ],
          _设置id范围: [
            '设置 id 范围',
            '投稿IDの範囲を設定',
            'Set id range',
            '設定 id 範圍',
          ],
          _设置id范围提示: [
            '您可以输入一个投稿 id，抓取比它新或者比它旧的投稿',
            '1つの投稿IDを入力することで、それより新しいあるいは古い投稿をまとめてダウンロードすることができます。',
            'You can enter a work id and crawl articles that are newer or older than it',
            '您可以輸入一個投稿 id，擷取比它新或者比它舊的投稿。',
          ],
          _大于: ['大于', 'より新しい', 'Bigger than', '大於'],
          _小于: ['小于', 'より古い', 'Less than', '小於'],
          _设置投稿时间: [
            '设置投稿时间',
            '投稿日時の設定',
            'Set posting date',
            '設定投稿時間',
          ],
          _设置投稿时间提示: [
            '您可以下载指定时间内发布的投稿',
            '指定期間内の投稿をまとめてダウンロードできます。',
            'You can download articles published within a specified time',
            '您可以下載指定時間内發佈的投稿',
          ],
          _没有数据可供使用: [
            '没有数据可供使用',
            '該当するデータはありません。',
            'No data is available.',
            '沒有資料可供使用',
          ],
          _命名规则: ['命名规则', '命名規則', 'Naming rule', '命名規則'],
          _最小值: ['最小值', '最小値', 'Minimum value', '最小值'],
          _最大值: ['最大值', '最大値', 'maximum value', '最大值'],
          _文件类型: ['文件类型', 'ファイルタイプ', 'File type', '檔案類型'],
          _图片: ['图片', '画像', 'Image', '圖片'],
          _视频: ['视频', '映像', 'Video', '影片'],
          _音乐: ['音频', '音声', 'Audio', '音訊'],
          _压缩文件: ['压缩文件', '圧縮ファイル', 'Compressed file', '壓縮檔'],
          _PS文件: ['源文件', 'ソースファイル', 'Source File', '原始檔'],
          _投稿类型: ['投稿类型', '投稿タイプ', 'Article type', '投稿類型'],
          _免费投稿: ['免费投稿', '無料投稿', 'Free article', '免費投稿'],
          _付费投稿: ['付费投稿', '有償投稿', 'Paid article', '付費投稿'],
          _设置价格范围: [
            '设置价格范围',
            '価格帯を設定',
            'Set price range',
            '設定價格範圍',
          ],
          _保存投稿中的外部链接: [
            '保存投稿中的外部链接',
            '本文中の外部リンクを保存',
            'Save external links in the articles',
            '儲存投稿中的外部連結',
          ],
          _保存投稿中的文字: [
            '保存投稿中的文字',
            '投稿の本文を保存',
            'Save the text in the articles',
            '儲存投稿中的文字',
          ],
          _抓取文件数量: [
            '已获取 {} 个文件',
            '{} 個のファイルを取得',
            '{} Files acquired',
            '已取得 {} 個檔案',
          ],
          _早于: ['早于', 'より前', 'Earlier than', '早於'],
          _晚于: ['晚于', 'より後', 'Later than', '晚於'],
          _抓取赞助的所有用户的投稿: [
            '抓取赞助的所有用户的投稿',
            '支援中のユーザーの投稿をまとめて保存',
            'Crawl all sponsored articles',
            '擷取所有贊助用戶的投稿',
          ],
          _抓取该用户的投稿: [
            '抓取该用户的投稿',
            'このユーザーの投稿をまとめて保存',
            "Crawl this user's articles",
            '擷取該用戶的投稿',
          ],
          _抓取该tag的投稿: [
            '抓取该 tag 的投稿',
            'このタグの投稿をまとめて保存',
            'Crawl articles with this tag',
            '擷取該 tag 的投稿',
          ],
          _抓取这篇投稿: [
            '抓取这篇投稿',
            'この投稿を保存',
            'Crawl this article',
            '擷取這篇投稿',
          ],
          _抓取商品的封面图: [
            '抓取商品的封面图',
            '投稿の表紙画像を保存',
            'Crawl the cover image of the product',
            '擷取商品的封面圖',
          ],
          _命名标记postid: ['投稿 id', '投稿ID', 'Article id', '投稿 id'],
          _命名标记title: [
            '投稿标题',
            '投稿のタイトル',
            'Article title',
            '投稿標題',
          ],
          _命名标记tags: [
            '投稿的 tag 列表（可能为空）',
            '投稿のタグリスト（空の場合があります）',
            "Article's tag list (may be empty)",
            '投稿的 tag 列表（可能為空）',
          ],
          _命名标记date: [
            '投稿的发布日期，如 2019-08-29 12-30',
            '投稿日など，例 2019-08-29 12-30',
            'The publication date of the article, such as 2019-08-29 12-30',
            '投稿的發布日期，如 2019-08-29 12-30',
          ],
          _命名标记fee: ['投稿的价格', '支援額', 'Article price', '投稿的價格'],
          _命名标记index: [
            '文件在它所属的投稿里的序号',
            '投稿内のファイルの連番',
            'The serial number of the file in the article it belongs to',
            '檔案在它所屬的投稿裡的序號',
          ],
          _命名标记name: [
            '文件在投稿里的文件名',
            '投稿内のファイル名',
            'File name in the article',
            '檔案在投稿裡的名稱',
          ],
          _命名标记ext: [
            '文件的扩展名',
            'ファイルの拡張子',
            'File extension',
            '檔案的副檔名',
          ],
          _命名标记提醒: [
            '您可以使用多个标记；建议在不同标记之间添加分割用的字符。示例：{title}-{postid}<br>建议在命名规则中包含 {postid} 和 {index}，防止文件名重复。',
            '複数のタグを使用できます。異なるタグを区切るために文字を追加することを推奨します。 例：{title}-{postid} <br>ファイル名の重複を防ぐために、命名規則に{postid}と{index}を含めることを推奨します。',
            'You can use multiple tags; it is recommended to add characters to separate between different tags. Example: {title}-{postid} <br> It is recommended to include {postid} and {index} in the naming rules to prevent duplicate file names.',
            '您可以使用多個標記；建議在不同標記之間加入分隔用的字元。範例：{title}-{postid}<br>建議在命名規則中包含 {postid} 和 {index}，防止檔名重複。',
          ],
          _日期格式: [
            '日期和时间格式',
            '日時の書式',
            'Date and time format',
            '日期和時間格式',
          ],
          _日期格式提示: [
            '你可以使用以下标记来设置日期和时间格式。这会影响命名规则里的 {date} 和 {task_date}。<br>对于时间如 2021-04-30T06:40:08',
            '以下のタグを使用して日時の書式を設定できます。 これは命名規則の {date} と {task_date} に影響します。 <br> 例：2021-04-30T06:40:08',
            'You can use the following notation to set the date and time format. This will affect {date} and {task_date} in the naming rules. <br>For time such as 2021-04-30T06:40:08',
            '你可以使用以下標記來設定日期和時間格式。這會影響命名規則裡的 {date} 和 {task_date}。<br>對於資料如：2021-04-30T06:40:08。',
          ],
          _命名标记taskDate: [
            '本次任务抓取完成时的时间。例如：2020-10-21',
            'タスクを完了した日時です。 例：2020-10-21',
            'The time when the task was crawl completed. For example: 2020-10-21',
            '本次工作擷取完成時的時間。例如：2020-10-21。',
          ],
          _提示: ['提示', 'ヒント', 'tip', '提示'],
          _保存投稿中的封面图片: [
            '保存投稿中的封面图片',
            '投稿の表紙画像を保存',
            'Save the cover image in the articles',
            '儲存投稿中的封面圖片',
          ],
          _列表页抓取完成: [
            '列表页面抓取完成',
            'リストページがクロールされ',
            'The list page is crawled',
            '清單頁面擷取完成',
          ],
          _当前作品个数: [
            '当前有 {} 个投稿 ',
            '今は　{}　枚の投稿があります ',
            'There are now {} posts',
            '目前有 {} 個投稿 ',
          ],
          _开始获取作品信息: [
            '开始获取投稿信息',
            '投稿情報の取得を開始します',
            'Start getting post data',
            '開始取得投稿資訊',
          ],
          _待处理: ['待处理', '処理待ち', 'Pending', '待處理'],
          _共抓取到n个作品: [
            '共抓取到 {} 个投稿',
            '合計 {} つの投稿があります',
            'Crawl a total of {} posts',
            '共擷取到 {} 個投稿',
          ],
          _最近更新: ['最近更新', '最近更新する', 'What`s new', '最近更新'],
          _我知道了: ['我知道了', '分かりました', 'OK', '我知道了'],
        }

        /***/
      },

    /******/
  }
)
//# sourceMappingURL=content.js.map
