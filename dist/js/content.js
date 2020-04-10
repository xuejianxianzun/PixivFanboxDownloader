/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/content.ts":
/*!***************************!*\
  !*** ./src/ts/content.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_PageType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/PageType */ "./src/ts/modules/PageType.ts");
/* harmony import */ var _modules_CenterPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/CenterPanel */ "./src/ts/modules/CenterPanel.ts");
/* harmony import */ var _modules_InitPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/InitPage */ "./src/ts/modules/InitPage.ts");
/* harmony import */ var _modules_DownloadControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/DownloadControl */ "./src/ts/modules/DownloadControl.ts");
/* harmony import */ var _modules_RightIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/RightIcon */ "./src/ts/modules/RightIcon.ts");
/* harmony import */ var _modules_Tip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/Tip */ "./src/ts/modules/Tip.ts");
/* harmony import */ var _modules_Tip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_Tip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_Output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/Output */ "./src/ts/modules/Output.ts");
/*
 * project: Pixiv Fanbox Downloader
 * author:  xuejianxianzun; 雪见仙尊
 * license: GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
 * Github： https://github.com/xuejianxianzun/PixivFanboxDownloader
 * Releases: https://github.com/xuejianxianzun/PixivFanboxDownloader/releases
 * Wiki:    https://github.com/xuejianxianzun/PixivFanboxDownloader/wiki
 * Website: https://pixiv.download/
 * E-mail:  xuejianxianzun@gmail.com
 * QQ group:  853021998
 */







// import './modules/Support'


/***/ }),

/***/ "./src/ts/modules/API.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/API.ts ***!
  \*******************************/
/*! exports provided: API */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });
class API {
    // 检查给定的字符串解析为数字后，是否大于 0
    static checkNumberGreater0(arg) {
        let num = parseInt(arg);
        // 空值会是 NaN
        if (!isNaN(num) && num > 0) {
            // 符合条件
            return {
                result: true,
                value: num,
            };
        }
        // 不符合条件
        return {
            result: false,
            value: 0,
        };
    }
    // 从 url 中获取指定的查询字段的值
    // 注意：返回值经过 encodeURIComponent 编码！
    static getURLSearchField(url, query) {
        const result = new URL(url).searchParams.get(query);
        if (result !== null) {
            return encodeURIComponent(result);
        }
        else {
            return '';
        }
    }
    // 从 URL 中获取指定路径名的值，适用于符合 RESTful API 风格的路径
    // 如 https://www.pixiv.net/fanbox/creator/1499614/post/867418
    // 把路径用 / 分割，查找 key 所在的位置，后面一项就是它的 value
    static getURLPathField(query) {
        const pathArr = location.pathname.split('/');
        const index = pathArr.indexOf(query);
        if (index > 0) {
            return pathArr[index + 1];
        }
        throw new Error(`getURLPathField ${query} failed!`);
    }
    // 组装 url 的查询参数。当该参数有值时，将其添加到 url 里
    static assembleURL(baseURL, args) {
        const temp = new URL(baseURL);
        for (const [key, value] of Object.entries(args)) {
            value && temp.searchParams.append(key, value.toString());
        }
        return temp.toString();
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
                    return response.json();
                }
                else {
                    // 第一种异常，请求成功但状态不对
                    reject({
                        status: response.status,
                        statusText: response.statusText,
                    });
                }
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                // 第二种异常，请求失败
                reject(error);
            });
        });
    }
    static async getPostListSupporting(limit = 10, maxPublishedDatetime = '', maxId = '') {
        const baseURL = 'https://fanbox.pixiv.net/api/post.listSupporting';
        const url = this.assembleURL(baseURL, {
            limit,
            maxPublishedDatetime,
            maxId,
        });
        return this.request(url);
    }
    static async getPostListByUser(userId, limit = 10, maxPublishedDatetime = '', maxId = '') {
        const baseURL = `https://fanbox.pixiv.net/api/post.listCreator?userId=${userId}`;
        const url = this.assembleURL(baseURL, {
            limit,
            maxPublishedDatetime,
            maxId,
        });
        return this.request(url);
    }
    static async getTagPostListByUser(userId, tag) {
        const url = `https://fanbox.pixiv.net/api/post.listTagged?tag=${tag}&userId=${userId}`;
        return this.request(url);
    }
    static async getPost(postId) {
        const url = `https://fanbox.pixiv.net/api/post.info?postId=${postId}`;
        return this.request(url);
    }
}



/***/ }),

/***/ "./src/ts/modules/CenterPanel.ts":
/*!***************************************!*\
  !*** ./src/ts/modules/CenterPanel.ts ***!
  \***************************************/
/*! exports provided: centerPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centerPanel", function() { return centerPanel; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");
// 用户界面




// 中间面板
class CenterPanel {
    constructor() {
        this.centerPanel = document.createElement('div'); // 中间面板
        this.addCenterPanel();
        this.bindEvents();
    }
    // 添加中间面板
    addCenterPanel() {
        const centerPanelHTML = `
      <div class="centerWrap">
      <div class="centerWrap_head">
      <p class="centerWrap_title blue">Pixiv Fanbox Downloader</p>
      <div class="btns">
      <a class="has_tip centerWrap_top_btn update" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_newver')}" href="" target="_blank">
      <svg t="1574401457339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4736" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs><style type="text/css"></style></defs><path d="M894.72 795.477333l-85.418667-85.418667c0.128-0.170667 0.170667-0.341333 0.298667-0.512l-158.890667-158.890667c0.042667-0.597333 37.248-37.248 37.248-37.248l178.773333 0 1.706667-1.493333c-0.853333-196.736-160.426667-356.053333-357.418667-356.053333-72.704 0-140.202667 22.016-196.650667 59.306667L228.949333 129.664C307.968 71.466667 405.333333 36.650667 511.018667 36.650667c263.296 0 476.757333 213.461333 476.757333 476.714667C987.776 619.093333 952.96 716.416 894.72 795.477333zM369.493333 476.117333c-0.042667 0.597333-37.248 37.248-37.248 37.248l-178.773333 0c0 197.461333 160.085333 357.546667 357.546667 357.546667 72.192 0 139.093333-21.76 195.285333-58.538667l85.589333 85.589333c-78.848 57.685333-175.701333 92.117333-280.874667 92.117333-263.296 0-476.757333-213.461333-476.757333-476.757333 0-105.173333 34.474667-202.069333 92.16-280.874667l85.589333 85.589333C211.925333 318.208 211.882667 318.336 211.797333 318.464L369.493333 476.117333z" p-id="4737"></path></svg>
      </a>
      <a class="has_tip centerWrap_top_btn" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_github')}" href="https://github.com/xuejianxianzun/PixivFanboxDownloader" target="_blank">
      <svg t="1574401005111" class="icon" widht="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" xmlns:xlink="http://www.w3.org/1999/xlink><defs><style type="text/css"></style></defs><path d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z" p-id="2595"></path></svg>
      </a>
      <a class="has_tip centerWrap_top_btn wiki_url" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_wiki')}" href="https://github.com/xuejianxianzun/PixivFanboxDownloader/wiki" target="_blank">
      <svg t="1574400169015" class="icon" widht="16" height="16" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1872" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="16"><defs><style type="text/css"></style></defs><path d="M1044.286732 3.51978A1138.616836 1138.616836 0 0 0 618.841322 58.172364a198.963565 198.963565 0 0 0-26.814324 10.815324V1023.936004l0.895944-0.383976a979.52278 979.52278 0 0 1 443.236298-68.411724 47.741016 47.741016 0 0 0 51.580776-43.261296V50.172864a47.165052 47.165052 0 0 0-43.453284-46.653084z m-74.299356 632.15249h-224.369977V541.470158h224.369977v94.202112z m0-231.921504h-224.369977V309.484657h224.369977v94.266109zM469.154678 58.172364A1138.296856 1138.296856 0 0 0 43.645272 3.455784 47.421036 47.421036 0 0 0 0 50.172864V908.103244a46.653084 46.653084 0 0 0 15.35904 34.493844 48.060996 48.060996 0 0 0 36.285732 12.415224 980.610712 980.610712 0 0 1 443.300294 68.347728l0.895944 0.575964V68.7957a202.099369 202.099369 0 0 0-26.686332-10.751328zM351.146053 635.800262H126.776076V541.59815h224.369977v94.202112z m0-231.921504H126.776076V309.612649h224.369977v94.266109z" p-id="1873"></path></svg>
      </a>
        <div class="has_tip centerWrap_top_btn centerWrap_close" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_快捷键切换显示隐藏')}">
        <svg t="1574392276519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1123" data-spm-anchor-id="a313x.7781069.0.i0" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M521.693867 449.297067L111.4112 39.0144a51.2 51.2 0 1 0-72.430933 72.362667l410.282666 410.3168-410.282666 410.3168a51.2 51.2 0 1 0 72.3968 72.3968l410.3168-410.282667 410.3168 410.282667a51.2 51.2 0 1 0 72.3968-72.362667l-410.282667-410.350933 410.282667-410.282667a51.2 51.2 0 1 0-72.3968-72.3968l-410.282667 410.282667z" p-id="1124"></path></svg>
        </div>
      </div>
      </div>

      <div class="centerWrap_con">
      <slot data-name="form"></slot>
      </div>

      <div class="gray1 bottom_help_bar"> 
      <span class="showDownTip">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_常见问题')}</span>
      <a class="wiki2" href="https://github.com/xuejianxianzun/PixivFanboxDownloader/wiki" target="_blank"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_wiki')}</a>
      <span id="resetOption">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_重置设置')}</span>
      <a id="zanzhu" class="wiki2 patronText" href="https://afdian.net/@xuejianxianzun" target="_blank">通过“爱发电”网站支持我</a>
      <a id="patreon" class="wiki2 patronText" href="https://www.patreon.com/xuejianxianzun" target="_blank">Become a patron</a>
      <br>
      <p class="downTip tip"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载说明')}</p>
      </div>

      </div>
      `;
        document.body.insertAdjacentHTML('beforeend', centerPanelHTML);
        this.centerPanel = document.querySelector('.centerWrap');
        const userLang = document.documentElement.lang;
        if (['zh', 'zh-CN', 'zh-Hans'].includes(userLang)) {
            document.getElementById('zanzhu').style.display = 'inline-block';
        }
        else {
            document.getElementById('patreon').style.display = 'inline-block';
        }
    }
    // 绑定中间面板上的事件
    bindEvents() {
        // 监听点击扩展图标的消息，开关中间面板
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.msg === 'click_icon') {
                if (this.centerPanel.style.display === 'block') {
                    this.close();
                }
                else {
                    this.show();
                }
            }
        });
        // 关闭按钮
        document
            .querySelector('.centerWrap_close')
            .addEventListener('click', () => {
            this.close();
        });
        // 使用快捷键 Alt + x 切换中间面板显示隐藏
        window.addEventListener('keydown', (ev) => {
            if (ev.altKey && ev.keyCode === 88) {
                const nowDisplay = this.centerPanel.style.display;
                if (nowDisplay === 'block') {
                    this.close();
                }
                else {
                    this.show();
                }
            }
        }, false);
        // 点击右侧图标时，显示
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.clickRightIcon, () => {
            this.show();
        });
        // 开始抓取作品时，隐藏
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.crawlStart, () => {
            this.close();
        });
        // 抓取完作品详细数据时，显示
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.crawlFinish, () => {
            if (!_Store__WEBPACK_IMPORTED_MODULE_3__["store"].states.quickDownload) {
                this.show();
            }
        });
        // 显示常见问题
        document
            .querySelector('.showDownTip')
            .addEventListener('click', () => _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].toggleEl(document.querySelector('.downTip')));
        // 重置设置
        document.getElementById('resetOption').addEventListener('click', () => {
            const result = window.confirm(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_是否重置设置'));
            if (result) {
                _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.resetOption);
            }
        });
    }
    // 显示中间区域
    show() {
        this.centerPanel.style.display = 'block';
        _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.showCenterPanel);
    }
    // 隐藏中间区域
    close() {
        this.centerPanel.style.display = 'none';
        _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.hideCenterPanel);
    }
}
const centerPanel = new CenterPanel();



/***/ }),

/***/ "./src/ts/modules/Colors.ts":
/*!**********************************!*\
  !*** ./src/ts/modules/Colors.ts ***!
  \**********************************/
/*! exports provided: Colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
// 颜色
class Colors {
}
Colors.blue = '#0ea8ef';
Colors.green = '#14ad27';
Colors.red = '#f33939';
Colors.yellow = '#e49d00';



/***/ }),

/***/ "./src/ts/modules/DOM.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/DOM.ts ***!
  \*******************************/
/*! exports provided: DOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
// DOM 操作类
// 保存公用的 DOM 操作方法，以及从 DOM 中获取数据的 API
class DOM {
    // 切换 DOM 元素的可见性
    static toggleEl(el) {
        el.style.display = el.style.display === 'block' ? 'none' : 'block';
    }
    // 将元素插入到页面顶部
    /*
    newindex-inner 是在未登录时的用户投稿列表页面使用的
    layout-body 是在未登录时的搜索页使用的
    */
    static insertToHead(el) {
        const insertPoint = document.body.querySelector('#root');
        if (insertPoint) {
            insertPoint.insertAdjacentElement('afterbegin', el);
        }
        return el;
    }
    static getUserId() {
        const Reg = /creator\/(\d*)?/;
        const testString = [location.href, document.head.innerHTML];
        for (const string of testString) {
            const result = Reg.exec(string);
            if (result && result.length > 1) {
                return result[1];
            }
        }
        throw new Error('getUserId failed!');
    }
    // 动态添加 css 样式
    static addStyle(css) {
        const e = document.createElement('style');
        e.innerHTML = css;
        document.body.append(e);
    }
    // 寻找 slot，本程序使用的 slot 都要有 data-name 属性
    static findSlot(name) {
        const slot = document.querySelector(`slot[data-name=${name}]`);
        if (!slot) {
            throw new Error(`No such slot: ${name}`);
        }
        return slot;
    }
    // 使用指定的插槽
    static useSlot(name, element) {
        const slot = this.findSlot(name);
        if (typeof element === 'string') {
            // 插入字符串形式的元素
            const wrap = document.createElement('div');
            wrap.innerHTML = element;
            const el = wrap.children[0];
            slot.appendChild(el);
            return el;
        }
        else {
            // 插入 html 元素
            slot.appendChild(element);
            return element;
        }
    }
    // 清空指定的插槽
    static clearSlot(name) {
        this.findSlot(name).innerHTML = '';
    }
    static addBtn(slot, bg = '', text = '', attr = []) {
        const e = document.createElement('button');
        e.type = 'button';
        e.style.backgroundColor = bg;
        e.textContent = text;
        for (const [key, value] of attr) {
            e.setAttribute(key, value);
        }
        this.useSlot(slot, e);
        return e;
    }
}



/***/ }),

/***/ "./src/ts/modules/Download.ts":
/*!************************************!*\
  !*** ./src/ts/modules/Download.ts ***!
  \************************************/
/*! exports provided: Download */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Download", function() { return Download; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Log */ "./src/ts/modules/Log.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TitleBar */ "./src/ts/modules/TitleBar.ts");
/* harmony import */ var _FileName__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileName */ "./src/ts/modules/FileName.ts");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProgressBar */ "./src/ts/modules/ProgressBar.ts");
// 下载文件，并发送给浏览器下载






class Download {
    constructor(progressBarIndex, data) {
        this.fileName = '';
        this.stoped = false;
        this.retry = 0;
        this.retryMax = 1;
        this.progressBarIndex = progressBarIndex;
        this.download(data);
        this.listenEvents();
    }
    listenEvents() {
        ;
        [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadStop, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadPause].forEach((event) => {
            window.addEventListener(event, () => {
                this.stoped = true;
            });
        });
    }
    // 设置进度条信息
    setProgressBar(loaded, total) {
        _ProgressBar__WEBPACK_IMPORTED_MODULE_5__["progressBar"].setProgress(this.progressBarIndex, {
            name: this.fileName,
            loaded: loaded,
            total: total,
        });
    }
    // 下载文件
    download(arg) {
        _TitleBar__WEBPACK_IMPORTED_MODULE_3__["titleBar"].change('↓');
        // 获取文件名
        this.fileName = _FileName__WEBPACK_IMPORTED_MODULE_4__["fileName"].getFileName(arg.data);
        // 重设当前下载栏的信息
        this.setProgressBar(0, 0);
        // 下载图片
        let xhr = new XMLHttpRequest();
        xhr.open('GET', arg.data.url, true);
        xhr.responseType = 'blob';
        xhr.withCredentials = true;
        // 显示下载进度
        xhr.addEventListener('progress', (event) => {
            if (this.stoped) {
                xhr.abort();
                xhr = null;
                return;
            }
            this.setProgressBar(event.loaded, event.total);
        });
        // 图片获取完毕（出错时也会进入 loadend）
        xhr.addEventListener('loadend', async () => {
            if (this.stoped) {
                xhr = null;
                return;
            }
            let file = xhr.response; // 要下载的文件
            // 错误处理
            const HandleError = () => {
                let msg = '';
                if (xhr.status === 404) {
                    // 404 错误时
                    msg = _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_file404', this.fileName);
                }
                else {
                    // 无法处理的错误状态
                    msg = _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_文件下载失败', this.fileName);
                }
                _Log__WEBPACK_IMPORTED_MODULE_1__["log"].error(msg, 1);
                const data = {
                    url: '',
                    id: arg.id,
                    tabId: 0,
                    uuid: false,
                };
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.skipSaveFile, data);
            };
            if (xhr.status !== 200) {
                // 状态码错误
                // 正常下载完毕的状态码是 200
                _ProgressBar__WEBPACK_IMPORTED_MODULE_5__["progressBar"].showErrorColor(this.progressBarIndex, true);
                this.retry++;
                if (this.retry >= this.retryMax) {
                    // 重试 retryMax 次依然错误，进行错误处理
                    return HandleError();
                }
                else {
                    return this.download(arg);
                }
            }
            else {
                // 状态码正常
                _ProgressBar__WEBPACK_IMPORTED_MODULE_5__["progressBar"].showErrorColor(this.progressBarIndex, false);
            }
            // 生成下载链接
            const blobUrl = URL.createObjectURL(file);
            // 向浏览器发送下载任务
            this.browserDownload(blobUrl, this.fileName, arg.id, arg.taskBatch);
            xhr = null;
            file = null;
        });
        xhr.send();
    }
    // 向浏览器发送下载任务
    browserDownload(blobUrl, fileName, id, taskBatch) {
        // 如果任务已停止，不会向浏览器发送下载任务
        if (this.stoped) {
            // 释放 bloburl
            URL.revokeObjectURL(blobUrl);
            return;
        }
        const sendData = {
            msg: 'send_download',
            fileUrl: blobUrl,
            fileName: fileName,
            id,
            taskBatch,
        };
        chrome.runtime.sendMessage(sendData);
    }
}



/***/ }),

/***/ "./src/ts/modules/DownloadControl.ts":
/*!*******************************************!*\
  !*** ./src/ts/modules/DownloadControl.ts ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Log */ "./src/ts/modules/Log.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TitleBar */ "./src/ts/modules/TitleBar.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Settings */ "./src/ts/modules/Settings.ts");
/* harmony import */ var _Download__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Download */ "./src/ts/modules/Download.ts");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProgressBar */ "./src/ts/modules/ProgressBar.ts");
// 下载控制










class DownloadControl {
    constructor() {
        this.downloadThreadMax = 5; // 同时下载的线程数的最大值，也是默认值
        this.downloadThread = this.downloadThreadMax; // 同时下载的线程数
        this.taskBatch = 0; // 标记任务批次，每次重新下载时改变它的值，传递给后台使其知道这是一次新的下载
        this.statesList = []; // 下载状态列表，保存每个下载任务的状态
        this.taskList = {}; // 下载任务列表，使用下载的文件的 id 做 key，保存下载栏编号和它在下载状态列表中的索引
        this.downloaded = 0; // 已下载的任务数量
        this.reTryTimer = 0; // 重试下载的定时器
        this.downloadArea = document.createElement('div'); // 下载区域
        this.totalNumberEl = document.createElement('span');
        this.downStatusEl = document.createElement('span');
        this.downloadStop = false; // 是否停止下载
        this.downloadPause = false; // 是否暂停下载
        this.createDownloadArea();
        this.listenEvents();
    }
    // 返回任务停止状态。暂停和停止都视为停止下载
    get downloadStopped() {
        return this.downloadPause || this.downloadStop;
    }
    listenEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlStart, () => {
            this.hideDownloadArea();
            this.reset();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlFinish, () => {
            this.showDownloadArea();
            this.beforeDownload();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.skipSaveFile, (ev) => {
            const data = ev.detail.data;
            this.downloadSuccess(data);
        });
        // 监听浏览器下载文件后，返回的消息
        chrome.runtime.onMessage.addListener((msg) => {
            if (!this.taskBatch) {
                return;
            }
            // 文件下载成功
            if (msg.msg === 'downloaded') {
                // 释放 BLOBURL
                URL.revokeObjectURL(msg.data.url);
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadSucccess);
                this.downloadSuccess(msg.data);
            }
            else if (msg.msg === 'download_err') {
                // 浏览器把文件保存到本地时出错
                _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(`${msg.data.id} download error! code: ${msg.err}. The downloader will try to download the file again `);
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadError);
                // 重新下载这个文件
                this.downloadError(msg.data);
            }
            // UUID 的情况
            if (msg.data && msg.data.uuid) {
                _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_uuid'));
            }
        });
    }
    set setDownloaded(val) {
        this.downloaded = val;
        this.LogDownloadStates();
        // 设置下载进度信息
        this.totalNumberEl.textContent = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length.toString();
        _ProgressBar__WEBPACK_IMPORTED_MODULE_9__["progressBar"].setTotalProgress(this.downloaded);
        // 重置下载进度信息
        if (this.downloaded === 0) {
            this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_未开始下载'));
        }
        // 下载完毕
        if (this.downloaded === _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadComplete);
            this.reset();
            this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载完毕'));
            _Log__WEBPACK_IMPORTED_MODULE_3__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载完毕'), 2);
            _TitleBar__WEBPACK_IMPORTED_MODULE_5__["titleBar"].change('√');
        }
    }
    downloadedAdd() {
        this.setDownloaded = this.downloaded + 1;
    }
    // 显示或隐藏下载区域
    showDownloadArea() {
        this.downloadArea.style.display = 'block';
    }
    hideDownloadArea() {
        this.downloadArea.style.display = 'none';
    }
    // 设置下载状态文本，默认颜色为主题蓝色
    setDownStateText(str, color = '') {
        const el = document.createElement('span');
        el.textContent = str;
        if (color) {
            el.style.color = color;
        }
        this.downStatusEl.innerHTML = '';
        this.downStatusEl.appendChild(el);
    }
    reset() {
        this.statesList = [];
        this.downloadPause = false;
        this.downloadStop = false;
        clearTimeout(this.reTryTimer);
    }
    createDownloadArea() {
        const html = `<div class="download_area">
    <p> ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_共抓取到n个图片', '<span class="fwb blue imgNum">0</span>')}</p>
    
    <div class="centerWrap_btns">
    <button class="startDownload" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_6__["Colors"].blue};"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载按钮1')}</button>
    <button class="pauseDownload" type="button" style="background:#e49d00;"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载按钮2')}</button>
    <button class="stopDownload" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_6__["Colors"].red};"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载按钮3')}</button>
    <button class="copyUrl" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_6__["Colors"].green};"> ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载按钮4')}</button>
    </div>
    <div class="centerWrap_down_tips">
    <p>
    ${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_当前状态')}
    <span class="down_status blue"><span>${_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_未开始下载')}</span></span>
    </p>
    </div>
    </div>`;
        const el = _DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"].useSlot('downloadArea', html);
        this.downloadArea = el;
        this.downStatusEl = el.querySelector('.down_status ');
        this.totalNumberEl = el.querySelector('.imgNum');
        document.querySelector('.startDownload').addEventListener('click', () => {
            this.startDownload();
        });
        document.querySelector('.pauseDownload').addEventListener('click', () => {
            this.pauseDownload();
        });
        document.querySelector('.stopDownload').addEventListener('click', () => {
            this.stopDownload();
        });
        document.querySelector('.copyUrl').addEventListener('click', () => {
            this.showURLs();
        });
    }
    // 显示 url
    showURLs() {
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return alert(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_没有数据可供使用'));
        }
        let result = '';
        for (const now of _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result) {
            result += now.url + '<br>';
        }
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.output, result);
    }
    // 下载线程设置
    setDownloadThread() {
        const setThread = parseInt(_Settings__WEBPACK_IMPORTED_MODULE_7__["form"].downloadThread.value);
        if (setThread < 1 ||
            setThread > this.downloadThreadMax ||
            isNaN(setThread)) {
            // 如果数值非法，则重设为默认值
            this.downloadThread = this.downloadThreadMax;
        }
        else {
            this.downloadThread = setThread; // 设置为用户输入的值
        }
        // 如果剩余任务数量少于下载线程数
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length - this.downloaded < this.downloadThread) {
            this.downloadThread = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length - this.downloaded;
        }
        // 重设下载进度条
        _ProgressBar__WEBPACK_IMPORTED_MODULE_9__["progressBar"].reset(this.downloadThread, this.downloaded);
    }
    // 抓取完毕之后，已经可以开始下载时，根据一些状态进行处理
    beforeDownload() {
        this.setDownloaded = 0;
        this.setDownloadThread();
        const autoDownload = _Settings__WEBPACK_IMPORTED_MODULE_7__["form"].quietDownload.checked;
        if (!autoDownload && !_Store__WEBPACK_IMPORTED_MODULE_2__["store"].states.quickDownload) {
            _TitleBar__WEBPACK_IMPORTED_MODULE_5__["titleBar"].change('▶');
        }
        // 视情况自动开始下载
        if (autoDownload || _Store__WEBPACK_IMPORTED_MODULE_2__["store"].states.quickDownload) {
            this.startDownload();
        }
    }
    // 开始下载
    startDownload() {
        // 如果正在下载中，或无图片，则不予处理
        if (!_Store__WEBPACK_IMPORTED_MODULE_2__["store"].states.allowWork || _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return;
        }
        // 如果之前不是暂停状态，则需要重新下载
        if (!this.downloadPause) {
            this.setDownloaded = 0;
            // 初始化下载记录
            // 状态：
            // -1 未使用
            // 0 使用中
            // 1 已完成
            this.statesList = new Array(_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length).fill(-1);
            this.taskBatch = new Date().getTime(); // 修改本批下载任务的标记
        }
        else {
            // 继续下载
            // 把“使用中”的下载状态重置为“未使用”
            for (let index = 0; index < this.statesList.length; index++) {
                if (this.statesList[index] === 0) {
                    this.statesList[index] = -1;
                }
            }
        }
        // 重置一些条件
        this.downloadPause = false;
        this.downloadStop = false;
        clearTimeout(this.reTryTimer);
        this.setDownloadThread();
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadStart);
        // 启动或继续下载，建立并发下载线程
        for (let i = 0; i < this.downloadThread; i++) {
            this.createDownload(i);
        }
        this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_正在下载中'));
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_正在下载中'));
    }
    // 暂停下载
    pauseDownload() {
        clearTimeout(this.reTryTimer);
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return;
        }
        // 停止的优先级高于暂停。点击停止可以取消暂停状态，但点击暂停不能取消停止状态
        if (this.downloadStop === true) {
            return;
        }
        if (this.downloadPause === false) {
            // 如果正在下载中
            if (!_Store__WEBPACK_IMPORTED_MODULE_2__["store"].states.allowWork) {
                this.downloadPause = true; // 发出暂停信号
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadPause);
                _TitleBar__WEBPACK_IMPORTED_MODULE_5__["titleBar"].change('║');
                this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已暂停'), '#f00');
                _Log__WEBPACK_IMPORTED_MODULE_3__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已暂停'), 2);
            }
            else {
                // 不在下载中的话不允许启用暂停功能
                return;
            }
        }
    }
    // 停止下载
    stopDownload() {
        clearTimeout(this.reTryTimer);
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0 || this.downloadStop) {
            return;
        }
        this.downloadStop = true;
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadStop);
        _TitleBar__WEBPACK_IMPORTED_MODULE_5__["titleBar"].change('■');
        this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已停止'), '#f00');
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已停止'), 2);
        this.downloadPause = false;
    }
    downloadError(data) {
        if (this.downloadPause || this.downloadStop) {
            return false;
        }
        const task = this.taskList[data.id];
        // 复位这个任务的状态
        this.setDownloadedIndex(task.index, -1);
        // 建立下载任务，再次下载它
        this.createDownload(task.progressBarIndex);
    }
    downloadSuccess(data) {
        const task = this.taskList[data.id];
        // 更改这个任务状态为“已完成”
        this.setDownloadedIndex(task.index, 1);
        // 增加已下载数量
        this.downloadedAdd();
        // 是否继续下载
        const no = task.progressBarIndex;
        if (this.checkContinueDownload()) {
            this.createDownload(no);
        }
    }
    // 设置已下载列表中的标记
    setDownloadedIndex(index, value) {
        this.statesList[index] = value;
    }
    // 当一个文件下载完成后，检查是否还有后续下载任务
    checkContinueDownload() {
        // 如果没有全部下载完毕
        if (this.downloaded < _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length) {
            // 如果任务已停止
            if (this.downloadPause || this.downloadStop) {
                return false;
            }
            // 如果已完成的数量 加上 线程中未完成的数量，仍然没有达到文件总数，继续添加任务
            if (this.downloaded + this.downloadThread - 1 < _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    // 在日志上显示下载进度
    LogDownloadStates() {
        let text = `${this.downloaded} / ${_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length}`;
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].log(text, 2, false);
    }
    // 查找需要进行下载的作品，建立下载
    createDownload(progressBarIndex) {
        let length = this.statesList.length;
        let index;
        for (let i = 0; i < length; i++) {
            if (this.statesList[i] === -1) {
                this.statesList[i] = 0;
                index = i;
                break;
            }
        }
        if (index === undefined) {
            throw new Error('There are no data to download');
        }
        else {
            const result = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result[index];
            // 注意这里的 id 用的是 name 属性，因为 id 属性并不唯一。一个投稿里的所有资源的 id 是相同的，但是 name 唯一
            const data = {
                id: result.name,
                data: result,
                index: index,
                progressBarIndex: progressBarIndex,
                taskBatch: this.taskBatch,
            };
            // 保存任务信息
            this.taskList[result.id] = {
                index,
                progressBarIndex: progressBarIndex,
            };
            // 建立下载
            new _Download__WEBPACK_IMPORTED_MODULE_8__["Download"](progressBarIndex, data);
        }
    }
}
new DownloadControl();


/***/ }),

/***/ "./src/ts/modules/EVT.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/EVT.ts ***!
  \*******************************/
/*! exports provided: EVT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVT", function() { return EVT; });
class EVT {
    static fire(type, data = '') {
        const event = new CustomEvent(type, {
            detail: { data: data },
        });
        window.dispatchEvent(event);
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
};



/***/ }),

/***/ "./src/ts/modules/FileName.ts":
/*!************************************!*\
  !*** ./src/ts/modules/FileName.ts ***!
  \************************************/
/*! exports provided: fileName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileName", function() { return fileName; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings */ "./src/ts/modules/Settings.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");




class FileName {
    constructor() {
        // 用正则过滤不安全的字符，（Chrome 和 Windows 不允许做文件名的字符）
        // 不安全的字符，这里多数是控制字符，需要替换掉
        this.unsafeStr = new RegExp(/[\u0001-\u001f\u007f-\u009f\u00ad\u0600-\u0605\u061c\u06dd\u070f\u08e2\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u206f\ufdd0-\ufdef\ufeff\ufff9-\ufffb\ufffe\uffff]/g);
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
        ];
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.previewFileName, () => {
            this.previewFileName();
        });
    }
    // 把一些特殊字符替换成全角字符
    replaceUnsafeStr(str) {
        str = str.replace(this.unsafeStr, '');
        for (let index = 0; index < this.fullWidthDict.length; index++) {
            const rule = this.fullWidthDict[index];
            const reg = new RegExp(rule[0], 'g');
            str = str.replace(reg, rule[1]);
        }
        return str;
    }
    // 生成文件名，传入参数为图片信息
    getFileName(data) {
        let result = _Settings__WEBPACK_IMPORTED_MODULE_1__["form"].userSetName.value;
        // 为空时使用预设的命名规则
        result = result || '{title}/{name}-{index}';
        // 配置所有命名标记
        const cfg = {
            '{id}': {
                value: data.id,
                safe: true,
            },
            '{title}': {
                value: data.title,
                safe: false,
            },
            '{tags}': {
                value: data.tags,
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
            '{date}': {
                value: data.date,
                safe: true,
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
        };
        // 替换命名规则里的特殊字符
        result = this.replaceUnsafeStr(result);
        // 上一步会把斜线 / 替换成全角的斜线 ／，这里再替换回来，否则就不能建立文件夹了
        result = result.replace(/／/g, '/');
        // 把命名规则的标记替换成实际值
        for (const [key, val] of Object.entries(cfg)) {
            // 只有当标记有值时才会进行替换，所以没有值的标记会原样保留
            if (result.includes(key) && val.value !== '' && val.value !== null) {
                let once = String(val.value);
                // 处理标记值中的特殊字符
                if (!val.safe) {
                    once = this.replaceUnsafeStr(once);
                }
                result = result.replace(new RegExp(key, 'g'), once); // 将标记替换成最终值，如果有重复的标记，全部替换
            }
        }
        // 处理空值，连续的 '//'。 有时候两个斜线中间的字段是空值，最后就变成两个斜线挨在一起了
        result = result.replace(/undefined/g, '').replace(/\/{2,9}/, '/');
        // 对每一层路径进行处理
        let tempArr = result.split('/');
        tempArr.forEach((str, index, arr) => {
            // 替换路径首尾的空格
            // 把每层路径头尾的 . 变成全角的．因为 Chrome 不允许头尾使用 .
            arr[index] = str.trim().replace(/^\./g, '．').replace(/\.$/g, '．');
        });
        result = tempArr.join('/');
        // 去掉头尾的 /
        if (result.startsWith('/')) {
            result = result.replace('/', '');
        }
        if (result.endsWith('/')) {
            result = result.substr(0, result.length - 1);
        }
        // 添加后缀名
        result += '.' + data.ext;
        return result;
    }
    // 预览文件名
    previewFileName() {
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return alert(_Lang__WEBPACK_IMPORTED_MODULE_3__["lang"].transl('_没有数据可供使用'));
        }
        // 使用数组储存和拼接字符串，提高性能
        const resultArr = [];
        const length = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length;
        for (let i = 0; i < length; i++) {
            const data = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result[i];
            // 为默认文件名添加颜色。这里有两种处理方式，一种是取出用其他下载软件下载后的默认文件名，一种是取出本程序使用的默认文件名 data.id。这里使用前者，方便用户用其他下载软件下载后，再用生成的文件名重命名。
            const defaultName = data.url.replace(/.*\//, '');
            const defaultNameHtml = `<span class="color999">${defaultName}</span>`;
            // 为生成的文件名添加颜色
            const fullName = this.getFileName(data);
            const part = fullName.split('/');
            const length = part.length;
            for (let i = 0; i < length; i++) {
                const str = part[i];
                if (i < length - 1) {
                    // 如果不是最后一项，说明是文件夹名，添加颜色
                    part[i] = `<span class="color666">${str}</span>`;
                }
                else {
                    // 最后一项，是文件名，添加颜色
                    part[i] = `<span class="color000">${str}</span>`;
                }
            }
            const fullNameHtml = part.join('/');
            // 保存本条结果
            const nowResult = `<p class="result">${defaultNameHtml}: ${fullNameHtml}</p>`;
            resultArr.push(nowResult);
        }
        // 拼接所有结果
        const result = resultArr.join('');
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.output, result);
    }
}
const fileName = new FileName();



/***/ }),

/***/ "./src/ts/modules/Filter.ts":
/*!**********************************!*\
  !*** ./src/ts/modules/Filter.ts ***!
  \**********************************/
/*! exports provided: filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings */ "./src/ts/modules/Settings.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Log */ "./src/ts/modules/Log.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");



// 审查每个文件的数据，决定是否要下载它
class Filter {
    constructor() {
        // 文件类型。fanbox 允许直接上传在投稿里的文件类型只有这些
        this.fileType = {
            image: ['jpg', 'jpeg', 'png', 'gif'],
            music: ['wav', 'mp3', 'flac'],
            video: ['mp4', 'mov', 'avi', 'clip'],
            compressed: ['zip'],
            ps: ['psd'],
            other: ['txt', 'pdf'],
        };
    }
    init() { }
    // 检查作品是否符合过滤器的要求
    // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
    check(option) {
        // 检查文件类型
        if (!this.checkFileType(option.ext)) {
            return false;
        }
        // 检查收费还是免费
        if (!this.checkfeeType(option.fee)) {
            return false;
        }
        // 检查价格范围
        if (!this.checkfeeRange(option.fee)) {
            return false;
        }
        // 检查 id 范围
        if (!this.checkIdRange(option.id)) {
            return false;
        }
        // 检查投稿时间
        if (!this.checkPostDate(option.date)) {
            return false;
        }
        return true;
    }
    checkFileType(ext) {
        // 如果没有传递 ext，则保留这个文件
        if (!ext) {
            return true;
        }
        // 检查 ext 存在于哪种类型里，然后检查这个类型是否被选中
        for (const [key, value] of Object.entries(this.fileType)) {
            if (value.includes(ext)) {
                return _Settings__WEBPACK_IMPORTED_MODULE_0__["form"][key].checked ? true : false;
            }
        }
        // 如果这个 ext 不存在任何规定的类型里，则把它当作 other 类型，决定是否保留
        return _Settings__WEBPACK_IMPORTED_MODULE_0__["form"]['other'].checked ? true : false;
    }
    checkfeeType(fee) {
        if (fee === undefined) {
            return true;
        }
        if (fee > 0) {
            return _Settings__WEBPACK_IMPORTED_MODULE_0__["form"].pay.checked;
        }
        else {
            return _Settings__WEBPACK_IMPORTED_MODULE_0__["form"].free.checked;
        }
    }
    checkfeeRange(fee) {
        if (fee === undefined || !_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].feeSwitch.checked) {
            return true;
        }
        return fee > parseInt(_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].fee.value);
    }
    checkIdRange(id) {
        if (id === undefined || !_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].idRangeSwitch.checked) {
            return true;
        }
        const nowId = parseInt(id.toString());
        const setId = parseInt(_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].idRangeInput.value) || 0;
        return nowId > setId;
    }
    checkPostDate(date) {
        if (!_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].postDate.checked || date === undefined) {
            return true;
        }
        else {
            const nowDate = new Date(date);
            const postDateStart = new Date(_Settings__WEBPACK_IMPORTED_MODULE_0__["form"].postDateStart.value);
            if (isNaN(postDateStart.getTime())) {
                const msg = 'Date format error!';
                this.throwError(msg);
            }
            return nowDate > postDateStart;
        }
    }
    // 当需要时抛出错误
    throwError(msg) {
        _EVT__WEBPACK_IMPORTED_MODULE_2__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_2__["EVT"].events.crawlError);
        _Log__WEBPACK_IMPORTED_MODULE_1__["log"].error(msg, 2);
        window.alert(msg);
        throw new Error(msg);
    }
}
const filter = new Filter();



/***/ }),

/***/ "./src/ts/modules/InitHomePage.ts":
/*!****************************************!*\
  !*** ./src/ts/modules/InitHomePage.ts ***!
  \****************************************/
/*! exports provided: InitHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitHomePage", function() { return InitHomePage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/modules/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/modules/API.ts");





class InitHomePage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    appendCenterBtns() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].blue, _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取赞助的所有用户的投稿')).addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    async FetchPostList() {
        let data;
        if (this.nextUrl) {
            data = (await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(this.nextUrl));
        }
        else {
            data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getPostListSupporting(300);
        }
        console.log(data);
        this.afterFetchPostList(data);
    }
    async fetchPost() { }
}



/***/ }),

/***/ "./src/ts/modules/InitPage.ts":
/*!************************************!*\
  !*** ./src/ts/modules/InitPage.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageType */ "./src/ts/modules/PageType.ts");
/* harmony import */ var _InitHomePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InitHomePage */ "./src/ts/modules/InitHomePage.ts");
/* harmony import */ var _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPostListPage */ "./src/ts/modules/InitPostListPage.ts");
/* harmony import */ var _InitTagPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InitTagPage */ "./src/ts/modules/InitTagPage.ts");
/* harmony import */ var _InitPostPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InitPostPage */ "./src/ts/modules/InitPostPage.ts");
// 初始化页面，初始化抓取流程






class InitPage {
    constructor() {
        this.initPage();
        // 页面类型变化时，初始化抓取流程
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.pageTypeChange, () => {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.destroy);
            this.initPage();
        });
    }
    initPage() {
        switch (_PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].getPageType()) {
            case 0:
            case 1:
                return new _InitHomePage__WEBPACK_IMPORTED_MODULE_2__["InitHomePage"]();
            case 2:
            case 3:
                return new _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__["InitPostListPage"]();
            case 4:
                return new _InitPostPage__WEBPACK_IMPORTED_MODULE_5__["InitPostPage"]();
            case 5:
                return new _InitTagPage__WEBPACK_IMPORTED_MODULE_4__["InitTagPage"]();
            default:
                throw new Error('InitCrawlProcess error: Illegal pageType.');
        }
    }
}
new InitPage();


/***/ }),

/***/ "./src/ts/modules/InitPageBase.ts":
/*!****************************************!*\
  !*** ./src/ts/modules/InitPageBase.ts ***!
  \****************************************/
/*! exports provided: InitPageBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPageBase", function() { return InitPageBase; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Filter */ "./src/ts/modules/Filter.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Log */ "./src/ts/modules/Log.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Settings */ "./src/ts/modules/Settings.ts");
/* harmony import */ var _TitleBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TitleBar */ "./src/ts/modules/TitleBar.ts");
/* harmony import */ var _SaveData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SaveData */ "./src/ts/modules/SaveData.ts");
// 初始化抓取页面的流程










class InitPageBase {
    constructor() {
        this.crawlNumber = 0; // 要抓取的个数/页数
        this.nextUrl = null;
    }
    // 初始化
    init() {
        this.appendCenterBtns();
        this.appendElseEl();
        this.initElse();
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].events.destroy, () => {
            this.destroy();
        });
    }
    // 各个子类私有的初始化内容
    initElse() { }
    // 销毁初始化页面时添加的元素和事件，恢复设置项等
    destroy() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].clearSlot('crawlBtns');
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].clearSlot('otherBtns');
    }
    // 添加中间按钮
    appendCenterBtns() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].blue, _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_开始抓取')).addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    // 添加其他元素（如果有）
    appendElseEl() { }
    // 作品个数/页数的输入不合法
    getWantPageError() {
        _EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].events.crawlError);
        const msg = _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_参数不合法');
        window.alert(msg);
        throw new Error(msg);
    }
    // 检查用户输入的投稿数量设置，并返回提示信息
    // 可以为 -1，或者大于 0
    checkWantPageInput(crawlPartTip, crawlAllTip) {
        const temp = parseInt(_Settings__WEBPACK_IMPORTED_MODULE_7__["form"].setWantPage.value);
        // 如果比 1 小，并且不是 -1，则不通过
        if ((temp < 1 && temp !== -1) || isNaN(temp)) {
            // 比 1 小的数里，只允许 -1 , 0 也不行
            this.getWantPageError();
        }
        if (temp >= 1) {
            _Log__WEBPACK_IMPORTED_MODULE_5__["log"].warning(crawlPartTip.replace('-num-', temp.toString()));
        }
        else if (temp === -1) {
            _Log__WEBPACK_IMPORTED_MODULE_5__["log"].warning(crawlAllTip);
        }
        return temp;
    }
    // 获取投稿数量设置
    getWantPage() {
        const wantPage = parseInt(_Settings__WEBPACK_IMPORTED_MODULE_7__["form"].setWantPage.value);
        if (isNaN(wantPage)) {
            this.getWantPageError();
        }
        if (wantPage > 0) {
            this.crawlNumber = wantPage;
        }
        else {
            this.crawlNumber = -1;
        }
    }
    // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
    async readyCrawl() {
        if (!_Store__WEBPACK_IMPORTED_MODULE_4__["store"].states.allowWork) {
            window.alert(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_当前任务尚未完成2'));
            return;
        }
        _EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].events.crawlStart);
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].clear();
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_任务开始0'));
        _TitleBar__WEBPACK_IMPORTED_MODULE_8__["titleBar"].change('↑');
        this.getWantPage();
        _Filter__WEBPACK_IMPORTED_MODULE_3__["filter"].init();
        // 进入第一个抓取方法
        this.nextStep();
    }
    // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取作品列表。如有不同，由子类具体定义
    nextStep() {
        this.FetchPostList();
    }
    afterFetchPostList(data) {
        const items = data.body.items;
        this.nextUrl = data.body.nextUrl;
        for (const item of items) {
            _SaveData__WEBPACK_IMPORTED_MODULE_9__["saveData"].receive(item);
        }
        if (this.nextUrl) {
            this.FetchPostList();
        }
        else {
            this.crawlFinished();
        }
    }
    afterFetchPost(data) {
        _SaveData__WEBPACK_IMPORTED_MODULE_9__["saveData"].receive(data.body);
        this.crawlFinished();
    }
    // 抓取完毕
    crawlFinished() {
        if (_Store__WEBPACK_IMPORTED_MODULE_4__["store"].result.length === 0) {
            return this.noResult();
        }
        this.nextUrl = null;
        console.log(_Store__WEBPACK_IMPORTED_MODULE_4__["store"].result);
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取文件数量', _Store__WEBPACK_IMPORTED_MODULE_4__["store"].result.length.toString()));
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取完毕'), 2);
        _EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].events.crawlFinish);
    }
    // 抓取结果为 0 时输出提示
    noResult() {
        _EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_6__["EVT"].events.crawlEmpty);
        _TitleBar__WEBPACK_IMPORTED_MODULE_8__["titleBar"].reset();
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取结果为零'), 2);
        window.alert(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取结果为零'));
    }
}



/***/ }),

/***/ "./src/ts/modules/InitPostListPage.ts":
/*!********************************************!*\
  !*** ./src/ts/modules/InitPostListPage.ts ***!
  \********************************************/
/*! exports provided: InitPostListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPostListPage", function() { return InitPostListPage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/modules/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/modules/API.ts");





class InitPostListPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    appendCenterBtns() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].blue, _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取该用户的投稿')).addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    async FetchPostList() {
        let data;
        if (this.nextUrl) {
            data = (await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(this.nextUrl));
        }
        else {
            data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getPostListByUser(_API__WEBPACK_IMPORTED_MODULE_4__["API"].getURLPathField('creator'), 300);
        }
        console.log(data);
        this.afterFetchPostList(data);
    }
    async fetchPost() { }
}



/***/ }),

/***/ "./src/ts/modules/InitPostPage.ts":
/*!****************************************!*\
  !*** ./src/ts/modules/InitPostPage.ts ***!
  \****************************************/
/*! exports provided: InitPostPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPostPage", function() { return InitPostPage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/modules/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/modules/API.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");






class InitPostPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.quickDownBtn = document.createElement('div');
        this.init();
    }
    // 添加中间按钮
    appendCenterBtns() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].blue, _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取这篇投稿')).addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    appendElseEl() {
        // 在右侧创建快速下载按钮
        this.quickDownBtn.id = 'quick_down_btn';
        this.quickDownBtn.textContent = '↓';
        this.quickDownBtn.setAttribute('title', _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_快速下载本页'));
        document.body.appendChild(this.quickDownBtn);
        this.quickDownBtn.addEventListener('click', () => {
            _Store__WEBPACK_IMPORTED_MODULE_5__["store"].states.quickDownload = true;
            this.readyCrawl();
        }, false);
    }
    nextStep() {
        this.fetchPost();
    }
    async FetchPostList() { }
    async fetchPost() {
        const data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getPost(_API__WEBPACK_IMPORTED_MODULE_4__["API"].getURLPathField('post'));
        this.afterFetchPost(data);
    }
}



/***/ }),

/***/ "./src/ts/modules/InitTagPage.ts":
/*!***************************************!*\
  !*** ./src/ts/modules/InitTagPage.ts ***!
  \***************************************/
/*! exports provided: InitTagPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitTagPage", function() { return InitTagPage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/modules/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/modules/API.ts");





class InitTagPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    appendCenterBtns() {
        _DOM__WEBPACK_IMPORTED_MODULE_2__["DOM"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].blue, _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取该tag的投稿')).addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    async FetchPostList() {
        let data;
        if (this.nextUrl) {
            data = (await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(this.nextUrl));
        }
        else {
            data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getTagPostListByUser(_API__WEBPACK_IMPORTED_MODULE_4__["API"].getURLPathField('creator'), _API__WEBPACK_IMPORTED_MODULE_4__["API"].getURLPathField('tag'));
        }
        console.log(data);
        this.afterFetchPostList(data);
    }
    async fetchPost() { }
}



/***/ }),

/***/ "./src/ts/modules/Lang.ts":
/*!********************************!*\
  !*** ./src/ts/modules/Lang.ts ***!
  \********************************/
/*! exports provided: lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lang", function() { return lang; });
/* harmony import */ var _langText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./langText */ "./src/ts/modules/langText.ts");

// 语言类
class Lang {
    constructor() {
        this.langType = 0;
        this.getLangType();
    }
    // 设置语言类型
    getLangType() {
        const userLang = document.documentElement.lang; // 获取语言标识
        switch (userLang) {
            case 'zh':
            case 'zh-CN':
            case 'zh-Hans':
                this.langType = 0; // 设置为简体中文
                break;
            case 'ja':
                this.langType = 1; // 设置为日语
                break;
            case 'zh-Hant':
            case 'zh-tw':
            case 'zh-TW':
                this.langType = 3; // 设置为繁体中文
                break;
            default:
                this.langType = 2; // 设置为英语
                break;
        }
    }
    // translate 翻译
    transl(name, ...arg) {
        let content = _langText__WEBPACK_IMPORTED_MODULE_0__["langText"][name][this.langType];
        arg.forEach((val) => (content = content.replace('{}', val)));
        return content;
    }
}
const lang = new Lang();



/***/ }),

/***/ "./src/ts/modules/Log.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/Log.ts ***!
  \*******************************/
/*! exports provided: log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");



// 日志类
class Log {
    constructor() {
        this.logArea = document.createElement('div'); // 输出日志的区域
        this.id = 'logWrap'; // 日志区域元素的 id
        this.refresh = document.createElement('span'); // 刷新时使用的元素
        this.colors = ['#00ca19', '#d27e00', '#f00'];
        // 切换不同页面时，如果任务已经完成，则清空输出区域，避免日志一直堆积。
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].events.destroy, () => {
            if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].states.allowWork) {
                this.clear();
            }
        });
    }
    // 如果日志元素没有添加到页面上，则添加上去
    checkElement() {
        let test = document.getElementById(this.id);
        if (test === null) {
            this.logArea.id = this.id;
            _DOM__WEBPACK_IMPORTED_MODULE_0__["DOM"].insertToHead(this.logArea);
        }
    }
    // 清空日志
    clear() {
        this.logArea.innerHTML = '';
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
        let span = document.createElement('span');
        if (!keepShow) {
            span = this.refresh;
        }
        span.innerHTML = str;
        if (level > -1) {
            span.style.color = this.colors[level];
        }
        while (br > 0) {
            span.appendChild(document.createElement('br'));
            br--;
        }
        this.logArea.appendChild(span);
    }
    log(str, br = 1, keepShow = true) {
        this.checkElement();
        this.add(str, -1, br, keepShow);
    }
    success(str, br = 1, keepShow = true) {
        this.checkElement();
        this.add(str, 0, br, keepShow);
    }
    warning(str, br = 1, keepShow = true) {
        this.add(str, 1, br, keepShow);
    }
    error(str, br = 1, keepShow = true) {
        this.add(str, 2, br, keepShow);
    }
}
const log = new Log();



/***/ }),

/***/ "./src/ts/modules/Output.ts":
/*!**********************************!*\
  !*** ./src/ts/modules/Output.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
// 输出传递的文本


class Output {
    constructor() {
        this.outputPanel = document.createElement('div'); // 输出面板
        this.outputContent = document.createElement('div'); // 输出文本的容器元素
        this.addOutPutPanel();
        this.bindEvent();
    }
    // 添加输出面板
    addOutPutPanel() {
        const outputPanelHTML = `
    <div class="outputWrap">
    <div class="outputClose" title="${_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_关闭')}">X</div>
    <div class="outputTitle">${_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_输出信息')}</div>
    <div class="outputContent"></div>
    <div class="outputFooter">
    <div class="outputCopy" title="">${_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_复制')}</div>
    </div>
    </div>
    `;
        document.body.insertAdjacentHTML('beforeend', outputPanelHTML);
        this.outputPanel = document.querySelector('.outputWrap');
        this.outputContent = document.querySelector('.outputContent');
    }
    close() {
        this.outputPanel.style.display = 'none';
        this.outputContent.innerHTML = '';
    }
    bindEvent() {
        // 关闭输出面板
        document.querySelector('.outputClose').addEventListener('click', () => {
            this.close();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.hideCenterPanel, () => {
            this.close();
        });
        // 复制输出内容
        document.querySelector('.outputCopy').addEventListener('click', () => {
            const range = document.createRange();
            range.selectNodeContents(this.outputContent);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            // 改变提示文字
            document.querySelector('.outputCopy').textContent = _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_已复制到剪贴板');
            setTimeout(() => {
                window.getSelection().removeAllRanges();
                document.querySelector('.outputCopy').textContent = _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_复制');
            }, 1000);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.output, (ev) => {
            this.output(ev.detail.data);
        });
    }
    // 输出内容
    output(text) {
        if (text) {
            this.outputContent.innerHTML = text;
            this.outputPanel.style.display = 'block';
        }
    }
}
new Output();


/***/ }),

/***/ "./src/ts/modules/PageType.ts":
/*!************************************!*\
  !*** ./src/ts/modules/PageType.ts ***!
  \************************************/
/*! exports provided: pageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageType", function() { return pageType; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
// 获取页面类型

class PageType {
    constructor() {
        this.type = 0;
        this.type = this.getPageType();
        // 页面切换时检查新旧页面是否不同
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.pageSwitch, () => {
            this.checkPageTypeIsNew();
        });
    }
    // 判断页面类型
    getPageType() {
        const url = window.location.href;
        let type;
        if (window.location.pathname === '/fanbox') {
            // https://www.pixiv.net/fanbox
            // 自己主页
            type = 0;
        }
        else if (window.location.pathname === '/fanbox/supporting') {
            // https://www.pixiv.net/fanbox/supporting
            // 正在赞助
            type = 1;
        }
        else if (/creator\/\d*$/.test(window.location.pathname)) {
            // https://www.pixiv.net/fanbox/creator/1499614
            // 画师主页
            type = 2;
        }
        else if (window.location.pathname.endsWith('/post')) {
            // https://www.pixiv.net/fanbox/creator/1499614/post
            // 画师投稿列表页
            type = 3;
        }
        else if (/post\/\d*$/.test(window.location.pathname)) {
            // https://www.pixiv.net/fanbox/creator/1499614/post/867418
            // 投稿内容页
            type = 4;
        }
        else if (window.location.pathname.includes('/tag/')) {
            // https://www.pixiv.net/fanbox/creator/1082583/tag/%E5%8B%95%E7%94%BB
            // tag 页面
            type = 5;
        }
        else if (window.location.pathname.endsWith('/shop')) {
            // https://www.pixiv.net/fanbox/creator/6843920/shop
            // 商店页面
            type = 6;
        }
        else {
            // 没有匹配到可用的页面类型
            throw new Error('Page type matching failed');
        }
        return type;
    }
    // 检查是不是进入到了新的页面类型
    checkPageTypeIsNew() {
        let newType = this.getPageType();
        if (this.type !== newType) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.pageTypeChange, newType);
        }
        // 保存当前页面类型
        this.type = newType;
    }
}
const pageType = new PageType();



/***/ }),

/***/ "./src/ts/modules/ProgressBar.ts":
/*!***************************************!*\
  !*** ./src/ts/modules/ProgressBar.ts ***!
  \***************************************/
/*! exports provided: progressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progressBar", function() { return progressBar; });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");



// 进度条
class ProgressBar {
    constructor() {
        this.wrapHTML = `
  <div class="progressBarWrap">
  <div class="total">
  <span class="text">${_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_下载进度')}</span>
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
  `;
        this.barHTML = `<li class="downloadBar">
  <div class="progressBar progressBar2">
  <div class="progress progress2"></div>
  </div>
  <div class="progressTip progressTip2">
  <span class="fileName"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_已下载')}&nbsp;&nbsp;<span class="loaded">0/0</span>KB
  </div>
  </li>`;
        this.allProgressBar = [];
        this.wrap = _DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"].useSlot('progressBar', this.wrapHTML);
        this.downloadedEl = this.wrap.querySelector('.downloaded');
        this.progressColorEl = this.wrap.querySelector('.progress1');
        this.listWrap = this.wrap.querySelector('.progressBarList');
        this.totalNumberEl = this.wrap.querySelector('.totalNumber');
    }
    // 重设所有进度
    reset(num, downloaded = 0) {
        // 重置总进度条
        this.setTotalProgress(downloaded);
        this.totalNumberEl.textContent = _Store__WEBPACK_IMPORTED_MODULE_0__["store"].result.length.toString();
        // 重置子进度条
        this.listWrap.innerHTML = this.barHTML.repeat(num);
        this.wrap.style.display = 'block';
        // 保存子进度条上需要使用到的元素
        const allProgressBar = this.listWrap.querySelectorAll('.downloadBar');
        this.allProgressBar = [];
        for (const bar of allProgressBar) {
            const data = {
                name: bar.querySelector('.fileName'),
                loaded: bar.querySelector('.loaded'),
                progress: bar.querySelector('.progress'),
            };
            this.allProgressBar.push(data);
        }
    }
    // 设置总进度条的进度
    setTotalProgress(downloaded) {
        this.downloadedEl.textContent = downloaded.toString();
        const progress = (downloaded / _Store__WEBPACK_IMPORTED_MODULE_0__["store"].result.length) * 100;
        this.progressColorEl.style.width = progress + '%';
    }
    // 设置子进度条的进度
    setProgress(index, data) {
        const bar = this.allProgressBar[index];
        bar.name.textContent = data.name;
        bar.loaded.textContent = `${Math.floor(data.loaded / 1024)}/${Math.floor(data.total / 1024)}`;
        const progress = data.loaded / data.total || 0; // 若结果为 NaN 则设为 0
        bar.progress.style.width = progress * 100 + '%';
    }
    // 让某个子进度条显示警告色
    showErrorColor(index, show) {
        const bar = this.allProgressBar[index];
        bar.name.classList[show ? 'add' : 'remove']('downloadError');
    }
}
const progressBar = new ProgressBar();



/***/ }),

/***/ "./src/ts/modules/RightIcon.ts":
/*!*************************************!*\
  !*** ./src/ts/modules/RightIcon.ts ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");

// 右侧的下载图标
class RightIcon {
    constructor() {
        this.icon = document.createElement('div');
        this.addIcon();
        this.bindEvents();
    }
    // 添加右侧下载按钮
    addIcon() {
        this.icon = document.createElement('div');
        this.icon.textContent = '↓';
        this.icon.id = 'rightButton';
        document.body.appendChild(this.icon);
    }
    bindEvents() {
        this.icon.addEventListener('click', () => {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.clickRightIcon);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.hideCenterPanel, () => {
            this.show();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.showCenterPanel, () => {
            this.hide();
        });
    }
    show() {
        this.icon.style.display = 'block';
    }
    hide() {
        this.icon.style.display = 'none';
    }
}
new RightIcon();


/***/ }),

/***/ "./src/ts/modules/SaveData.ts":
/*!************************************!*\
  !*** ./src/ts/modules/SaveData.ts ***!
  \************************************/
/*! exports provided: saveData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveData", function() { return saveData; });
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Filter */ "./src/ts/modules/Filter.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/ts/modules/Store.ts");


class SaveData {
    constructor() {
        // 嵌入的文件只支持指定的网站，每个网站有固定的前缀
        this.providerDict = {
            youtube: 'https://www.youtube.com/watch?v=',
            fanbox: 'https://www.pixiv.net/fanbox/',
            gist: 'https://gist.github.com/',
            soundcloud: 'https://soundcloud.com/',
            vimeo: 'https://vimeo.com/',
            twitter: 'https://twitter.com/',
            gsuite: 'https://gsuite.google.com/',
        };
    }
    receive(data) {
        this.parsePost(data);
    }
    parsePost(data) {
        if (data.body === null) {
            return;
        }
        // 针对投稿进行检查，决定是否保留它
        const id = data.id;
        const fee = data.feeRequired;
        const date = data.publishedDatetime;
        const check = _Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({ id, fee, date });
        if (!check) {
            return;
        }
        // 如果投稿检查通过，保存投稿信息
        const result = {
            id: data.id,
            type: data.type,
            title: data.title,
            date,
            fee,
            user: data.user.name,
            uid: data.user.userId,
            tags: data.tags.join(','),
            files: [],
            links: {
                name: 'links-' + data.id,
                ext: 'txt',
                size: null,
                index: 0,
                text: [],
                url: '',
            },
        };
        // 提取它的资源文件，并对每个资源进行检查，决定是否保存
        let index = 0; // 资源的序号
        // 提取 article 投稿的资源
        if (data.type === 'article') {
            // 保存图片资源
            for (const [id, imageData] of Object.entries(data.body.imageMap)) {
                index++;
                const resource = this.getImageData(imageData, index);
                resource !== null && result.files.push(resource);
            }
            // 保存 file 资源
            for (const [id, fileData] of Object.entries(data.body.fileMap)) {
                index++;
                const resource = this.getFileData(fileData, index);
                resource !== null && result.files.push(resource);
            }
            // 嵌入的资源只能保存到文本
            const embedDataArr = [];
            for (const [id, embedData] of Object.entries(data.body.embedMap)) {
                embedDataArr.push([embedData.serviceProvider, embedData.contentId]);
            }
            const embedLinks = this.getEmbedLinks(embedDataArr, data.id);
            embedLinks !== null && result.links.text.concat(embedLinks);
            // 从正文文本里提取链接
            let texts = '';
            for (const block of data.body.blocks) {
                if (block.type === 'p') {
                    texts += block.text;
                }
            }
            if (texts) {
                const links = this.getTextLinks(texts, data.id);
                links !== null && result.links.text.concat(links);
            }
        }
        // 提取 image 投稿的资源
        if (data.type === 'image') {
            // 保存图片资源
            for (const imageData of data.body.images) {
                index++;
                const resource = this.getImageData(imageData, index);
                resource !== null && result.files.push(resource);
            }
        }
        // 提取 file 投稿的资源
        if (data.type === 'file') {
            // 保存 file 资源
            for (const fileData of data.body.files) {
                index++;
                const resource = this.getFileData(fileData, index);
                resource !== null && result.files.push(resource);
            }
        }
        // 提取 video 投稿的资源
        // video 数据保存到文本
        if (data.type === 'video') {
            const video = data.body.video;
            const embedDataArr = [
                [video.serviceProvider, video.videoId],
            ];
            const embedLinks = this.getEmbedLinks(embedDataArr, data.id);
            embedLinks !== null && result.links.text.concat(embedLinks);
        }
        // 非 article 的投稿都有 text 字段，这这里统一提取里面的链接
        if (data.type !== 'article') {
            const links = this.getTextLinks(data.body.text, data.id);
            links !== null && result.links.text.concat(links);
        }
        // 打印这一个作品里抓取到的资源
        _Store__WEBPACK_IMPORTED_MODULE_1__["store"].addResult(result);
    }
    getImageData(imageData, index) {
        if (_Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({
            ext: imageData.extension,
        })) {
            return {
                name: imageData.id,
                ext: imageData.extension,
                size: null,
                index,
                url: imageData.originalUrl,
            };
        }
        return null;
    }
    getFileData(fileData, index) {
        if (_Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({
            ext: fileData.extension,
        })) {
            return {
                name: fileData.name,
                ext: fileData.extension,
                size: fileData.size,
                index,
                url: fileData.url,
            };
        }
        return null;
    }
    // 从文本里提取链接
    getTextLinks(text, postId) {
        const links = [];
        const Reg = /https:\/\/[\w=\?\.\/&-]+/g;
        const match = Reg.exec(text);
        if (match && match.length > 0) {
            for (const link of match) {
                links.push(link);
            }
        }
        return links;
    }
    // 从嵌入的资源里，获取资源的原网址
    getEmbedLinks(dataArr, postId) {
        const links = [];
        for (const data of dataArr) {
            const [serviceProvider, contentId] = data;
            links.push(this.providerDict[serviceProvider] + contentId);
        }
        return links;
    }
}
const saveData = new SaveData();



/***/ }),

/***/ "./src/ts/modules/SaveSettings.ts":
/*!****************************************!*\
  !*** ./src/ts/modules/SaveSettings.ts ***!
  \****************************************/
/*! exports provided: SaveSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveSettings", function() { return SaveSettings; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
// 保存和初始化设置项
// 只有部分设置会被保存

class SaveSettings {
    constructor(form) {
        // 本地存储中使用的 name
        this.storeName = 'fanboxSetting';
        // 需要持久化保存的设置的默认值
        this.optionDefault = {
            setWantPage: -1,
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
            saveLink: true,
            userSetName: '{id}',
            quietDownload: true,
            downloadThread: 5,
        };
        // 需要持久化保存的设置
        this.options = this.optionDefault;
        this.form = form;
        this.bindOptionEvent();
        // 设置发生改变时，保存设置到本地存储
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.settingChange, (event) => {
            const data = event.detail.data;
            if (Reflect.has(this.optionDefault, data.name)) {
                if (this.options[data.name] !== data.value) {
                    ;
                    this.options[data.name] = data.value;
                    localStorage.setItem(this.storeName, JSON.stringify(this.options));
                }
            }
        });
        this.restoreOption();
    }
    // 恢复值是 Boolean 的设置项
    // 给复选框使用
    restoreBoolean(name) {
        // 优先使用用户设置的值
        if (typeof this.options[name] === 'boolean') {
            this.form[name].checked = Boolean(this.options[name]);
        }
        else {
            // 否则使用默认值
            this.form[name].checked = Boolean(this.optionDefault[name]);
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
            this.form[name].value = this.options[name].toString();
        }
        else {
            // 否则使用默认值
            this.form[name].value = this.optionDefault[name].toString();
        }
    }
    // 从持久化设置，缺省使用默认值，恢复下载区域的设置
    restoreOption() {
        const savedOption = localStorage.getItem(this.storeName);
        // 读取保存的设置
        if (savedOption) {
            this.options = JSON.parse(savedOption);
        }
        else {
            // 如果没有保存过，则不做处理
            return;
        }
        this.restoreString('setWantPage');
        this.restoreString('fee');
        this.restoreString('idRangeInput');
        this.restoreString('postDateStart');
        this.restoreString('userSetName');
        this.restoreString('downloadThread');
        this.restoreBoolean('image');
        this.restoreBoolean('music');
        this.restoreBoolean('video');
        this.restoreBoolean('compressed');
        this.restoreBoolean('ps');
        this.restoreBoolean('other');
        this.restoreBoolean('free');
        this.restoreBoolean('pay');
        this.restoreBoolean('feeSwitch');
        this.restoreBoolean('idRangeSwitch');
        this.restoreBoolean('postDate');
        this.restoreBoolean('saveLink');
        this.restoreBoolean('quietDownload');
    }
    // 处理输入框： change 时直接保存 value
    saveTextInput(name) {
        const el = this.form[name];
        el.addEventListener('change', () => {
            this.emitChange(name, el.value);
        });
    }
    // 处理复选框： click 时直接保存 checked
    saveCheckBox(name) {
        const el = this.form[name];
        el.addEventListener('click', () => {
            this.emitChange(name, el.checked);
        });
    }
    // 处理单选框： click 时直接保存 value
    saveRadio(name) {
        const radios = this.form[name];
        for (const radio of radios) {
            radio.addEventListener('click', () => {
                this.emitChange(name, radio.value);
            });
        }
    }
    // 绑定所有选项的事件，当选项变动触发 settingChange 事件
    // 只可执行一次，否则事件会重复绑定
    bindOptionEvent() {
        // 保存下载的作品类型
        this.saveTextInput('setWantPage');
        this.saveTextInput('fee');
        this.saveTextInput('idRangeInput');
        this.saveTextInput('postDateStart');
        this.saveTextInput('downloadThread');
        this.saveCheckBox('image');
        this.saveCheckBox('music');
        this.saveCheckBox('video');
        this.saveCheckBox('compressed');
        this.saveCheckBox('ps');
        this.saveCheckBox('other');
        this.saveCheckBox('free');
        this.saveCheckBox('pay');
        this.saveCheckBox('feeSwitch');
        this.saveCheckBox('idRangeSwitch');
        this.saveCheckBox('postDate');
        this.saveCheckBox('saveLink');
        this.saveCheckBox('quietDownload');
        // 保存命名规则
        const userSetNameInput = this.form.userSetName;
        ['change', 'focus'].forEach((ev) => {
            userSetNameInput.addEventListener(ev, () => {
                this.emitChange('userSetName', userSetNameInput.value);
            });
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.resetOption, () => {
            this.form.reset();
            this.reset();
        });
    }
    emitChange(name, value) {
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.settingChange, { name: name, value: value });
    }
    // 重设选项
    reset() {
        // 将保存的选项恢复为默认值
        this.options = this.optionDefault;
        // 覆写本地存储里的设置为默认值
        localStorage.setItem(this.storeName, JSON.stringify(this.options));
        // 重设选项
        this.restoreOption();
        // 触发设置改变事件
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.settingChange);
    }
}



/***/ }),

/***/ "./src/ts/modules/SettingHTML.ts":
/*!***************************************!*\
  !*** ./src/ts/modules/SettingHTML.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");

const formHtml = `<form class="settingForm">
  <div class="tabsTitle">
    <div class="title">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取')}</div>
    <div class="title">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载')}</div>
    <div class="title">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_其他')}</div>
  </div>
  <div class="tabsContnet">
    <div class="con">

      <p class="option" data-no="1">
      <span class="setWantPageWrap">
      <span class="has_tip settingNameStyle1 setWantPageTip1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_投稿数量说明')}" style="margin-right: 0px;">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_投稿数量')}</span>
      <span class="gray1" style="margin-right: 10px;"> ? </span>
      <input type="text" name="setWantPage" class="setinput_style1 blue setWantPage"
      value = '-1'>
      &nbsp;&nbsp;&nbsp;
      <span class="setWantPageTip2 gray1">-1 或者大于 0 的数字</span>
      </span>
      </p>

      <p class="option" data-no="2">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_文件类型')}</span>

      <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType1"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_图片')}&nbsp;</label>
      
      <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType2"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_音乐')}&nbsp;</label>

      <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType3"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_视频')}&nbsp;</label>
      
      <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType4"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_压缩文件')}&nbsp;</label>
      
      <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType5"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_PS文件')}&nbsp;</label>

      <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="fileType6"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_其他')}&nbsp;</label>
      </p>

      <p class="option" data-no="21">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_投稿类型')}</span>

      <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType1"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_免费投稿')}&nbsp;</label>

      <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
      <span class="beautify_checkbox"></span>
      <label for="postType2"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_付费投稿')}&nbsp;</label>
      </p>

      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置价格范围')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="feeSwitch">

      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_最小值')}
      <input type="text" name="fee" class="setinput_style1 w100 blue" value="500"> ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_日元')}
      </span>
      </p>
      
      <p class="option" data-no="9">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置id范围')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="idRangeSwitch">

      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_大于')}
      <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
      </span>
      </p>

      <p class="option" data-no="10">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置投稿时间提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置投稿时间')} <span class="gray1"> ? </span></span>

      <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
      <span class="beautify_switch"></span>
      <span class="subOptionWrap" data-show="postDate">
      
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_晚于')}
      <input type="datetime-local" name="postDateStart" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
      </span>
      </p>

      <p class="option" data-no="19">
      <span class="settingNameStyle1">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_保存投稿中的外部链接')}&nbsp;&nbsp; 
      <span class="gray1"> ? </span></span>
      <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>
      
      <slot data-name="crawlBtns" class="centerWrap_btns"></slot>
    </div>
    <div class="con">
    <p class="option" data-no="13">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置文件夹名的提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置文件名')}<span class="gray1"> ? </span></span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value="{id}">
      &nbsp;
      <select name="fileNameSelect">
        <option value="default">…</option>
        <option value="{id}">{id}</option>
        <option value="{title}">{title}</option>
        <option value="{tags}">{tags}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{date}">{date}</option>
        <option value="{fee}">{fee}</option>
        <option value="{user}">{user}</option>
        <option value="{uid}">{uid}</option>
        </select>
      &nbsp;&nbsp;
      <span class="showFileNameTip">？</span>
      </p>
      <p class="fileNameTip tip">
      <strong>${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"]
    .transl('_设置文件夹名的提示')
    .replace('<br>', '. ')}</strong>
      <br>
      <span class="blue">{id}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记id')}
      <br>
      <span class="blue">{user}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记user')}
      <br>
      <span class="blue">{uid}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记uid')}
      <br>
      <span class="blue">{title}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记title')}
      <br>
      <span class="blue">{tags}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记tags')}
      <br>
      <span class="blue">{date}</span>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记date')}
      <br>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_命名标记提醒')}
      </p>
      
      <slot data-name="namingBtns" class="centerWrap_btns"></slot>

      <p class="option" data-no="16">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_线程数字')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_设置下载线程')}<span class="gray1"> ? </span></span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>

      <p class="option" data-no="17">
      <span class="has_tip settingNameStyle1" data-tip="${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_自动下载的提示')}">${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_自动开始下载')}<span class="gray1"> ? </span></span>
      <input type="checkbox" name="quietDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
      <span class="beautify_switch"></span>
      </p>

      <slot data-name="downloadArea"></slot>
      <slot data-name="progressBar"></slot>
    </div>
    <div class="con">
      
      <slot data-name="otherBtns" class="centerWrap_btns"></slot>
    </div>
  </div>
</form>`;
/* harmony default export */ __webpack_exports__["default"] = (formHtml);


/***/ }),

/***/ "./src/ts/modules/Settings.ts":
/*!************************************!*\
  !*** ./src/ts/modules/Settings.ts ***!
  \************************************/
/*! exports provided: form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "form", function() { return form; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/ts/modules/DOM.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Colors */ "./src/ts/modules/Colors.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Lang */ "./src/ts/modules/Lang.ts");
/* harmony import */ var _SaveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SaveSettings */ "./src/ts/modules/SaveSettings.ts");
/* harmony import */ var _SettingHTML__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SettingHTML */ "./src/ts/modules/SettingHTML.ts");






// 设置表单
class Settings {
    constructor() {
        this.activeClass = 'active';
        this.chooseKeys = ['Enter', 'NumpadEnter']; // 让回车键可以控制复选框（浏览器默认只支持空格键）
        this.form = _DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"].useSlot('form', _SettingHTML__WEBPACK_IMPORTED_MODULE_5__["default"]);
        this.allCheckBox = this.form.querySelectorAll('input[type="checkbox"]');
        this.allRadio = this.form.querySelectorAll('input[type="radio"]');
        this.allSwitch = this.form.querySelectorAll('.checkbox_switch');
        this.allLabel = this.form.querySelectorAll('label');
        this.allTabTitle = this.form.querySelectorAll('.tabsTitle .title');
        this.allTabCon = this.form.querySelectorAll('.tabsContnet .con');
        this.bindEvents();
        new _SaveSettings__WEBPACK_IMPORTED_MODULE_4__["SaveSettings"](this.form);
        // new SaveSettings 会初始化选项，但可能会有一些选项的值在初始化过程中没有发生改变，也就不会被监听到变化。所以这里需要直接初始化以下状态。
        this.initFormBueatiful();
        // 激活第一个选项卡
        this.activeTab(0);
    }
    // 设置表单上美化元素的状态
    initFormBueatiful() {
        // 设置改变时，重设 label 激活状态
        this.resetLabelActive();
        // 重设该选项的子选项的显示/隐藏
        this.resetSubOptionDisplay();
    }
    // 设置激活的选项卡
    activeTab(no = 0) {
        for (const title of this.allTabTitle) {
            title.classList.remove(this.activeClass);
        }
        this.allTabTitle[no].classList.add(this.activeClass);
        for (const con of this.allTabCon) {
            con.style.display = 'none';
        }
        this.allTabCon[no].style.display = 'block';
    }
    bindEvents() {
        // 给美化的复选框绑定功能
        for (const checkbox of this.allCheckBox) {
            this.bindCheckboxEvent(checkbox);
        }
        // 给美化的单选按钮绑定功能
        for (const radio of this.allRadio) {
            this.bindRadioEvent(radio);
        }
        // 处理 label 状态
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.settingChange, () => {
            this.initFormBueatiful();
        });
        // 在选项卡的标题上触发事件时，激活对应的选项卡
        for (let index = 0; index < this.allTabTitle.length; index++) {
            ;
            ['click', 'mouseenter'].forEach((name) => {
                this.allTabTitle[index].addEventListener(name, () => {
                    this.activeTab(index);
                });
            });
        }
        // 当抓取完毕可以开始下载时，切换到“下载”选项卡
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlFinish, () => {
            this.activeTab(1);
        });
        // 预览文件名
        _DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"].addBtn('namingBtns', _Colors__WEBPACK_IMPORTED_MODULE_2__["Colors"].green, _Lang__WEBPACK_IMPORTED_MODULE_3__["lang"].transl('_预览文件名')).addEventListener('click', () => {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.previewFileName);
        }, false);
        // 显示命名字段提示
        this.form
            .querySelector('.showFileNameTip')
            .addEventListener('click', () => _DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"].toggleEl(document.querySelector('.fileNameTip')));
        // 输入框获得焦点时自动选择文本（文件名输入框例外）
        const centerInputs = this.form.querySelectorAll('input[type=text]');
        for (const el of centerInputs) {
            if (el.name !== 'userSetName') {
                el.addEventListener('focus', function () {
                    this.select();
                });
            }
        }
        // 把下拉框的选择项插入到文本框里
        this.insertValueToInput(this.form.fileNameSelect, this.form.userSetName);
    }
    // 把下拉框的选择项插入到文本框里
    insertValueToInput(from, to) {
        from.addEventListener('change', () => {
            if (from.value !== 'default') {
                // 把选择项插入到光标位置,并设置新的光标位置
                const position = to.selectionStart;
                to.value =
                    to.value.substr(0, position) +
                        from.value +
                        to.value.substr(position, to.value.length);
                to.selectionStart = position + from.value.length;
                to.selectionEnd = position + from.value.length;
                to.focus();
            }
        });
    }
    // 设置复选框的事件
    bindCheckboxEvent(el) {
        // 让复选框支持用回车键选择
        el.addEventListener('keydown', (event) => {
            if (this.chooseKeys.includes(event.code)) {
                el.checked = !el.checked;
                this.emitChange(el.name, el.checked);
            }
        });
        // 点击美化按钮，反转复选框的值
        el.nextElementSibling.addEventListener('click', () => {
            el.checked = !el.checked;
            this.emitChange(el.name, el.checked);
        });
        // 点击它的 label 时，传递它的值
        const label = this.form.querySelector(`label[for="${el.id}"]`);
        if (label) {
            label.addEventListener('click', () => {
                // 点击复选框的 label 不要手动修改 checked ，因为浏览器会自动处理
                this.emitChange(el.name, el.checked);
            });
        }
    }
    // 设置单选控件的事件
    bindRadioEvent(el) {
        // 点击美化按钮，选择当前单选控件
        el.nextElementSibling.addEventListener('click', () => {
            el.checked = true;
            // 对于单选按钮，它的值是 value，不是 checked
            this.emitChange(el.name, this.form[el.name].value);
        });
        // 点击它的 label 时，传递它的值
        const label = this.form.querySelector(`label[for="${el.id}"]`);
        if (label) {
            label.addEventListener('click', () => {
                this.emitChange(el.name, this.form[el.name].value);
            });
        }
    }
    // 当选项的值被改变时，触发 settingChange 事件
    emitChange(name, value) {
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.settingChange, { name: name, value: value });
    }
    // 重设 label 的激活状态
    resetLabelActive() {
        // 设置复选框的 label 的激活状态
        for (const checkbox of this.allCheckBox) {
            this.setLabelActive(checkbox);
        }
        // 设置单选按钮的 label 的激活状态
        for (const radio of this.allRadio) {
            this.setLabelActive(radio);
        }
    }
    // 设置 input 元素对应的 label 的激活状态
    setLabelActive(input) {
        const label = this.form.querySelector(`label[for="${input.id}"]`);
        if (label) {
            const method = input.checked ? 'add' : 'remove';
            label.classList[method]('active');
        }
    }
    // 重设子选项的显示/隐藏
    resetSubOptionDisplay() {
        for (const _switch of this.allSwitch) {
            const subOption = this.form.querySelector(`.subOptionWrap[data-show="${_switch.name}"]`);
            if (subOption) {
                subOption.style.display = _switch.checked ? 'inline' : 'none';
            }
        }
    }
}
const settings = new Settings();
const form = settings.form;



/***/ }),

/***/ "./src/ts/modules/Store.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/Store.ts ***!
  \*********************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/modules/EVT.ts");
// 仓库

// 存储抓取结果和状态
class Store {
    constructor() {
        this.resultMeta = []; // 储存抓取结果的元数据
        this.result = []; // 储存抓取结果
        // 储存和下载有关的状态
        this.states = {
            allowWork: true,
            quickDownload: false,
        };
        this.bindEvents();
    }
    bindEvents() {
        const allowWorkTrue = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlFinish,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlEmpty,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlError,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadPause,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadStop,
        ];
        allowWorkTrue.forEach((type) => {
            window.addEventListener(type, () => {
                this.states.allowWork = true;
            });
        });
        const allowWorkFalse = [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlStart, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadStart];
        allowWorkFalse.forEach((type) => {
            window.addEventListener(type, () => {
                this.states.allowWork = false;
            });
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.crawlStart, () => {
            this.resetResult();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].events.downloadComplete, () => {
            this.resetStates();
        });
    }
    getCommonData(data) {
        return {
            id: data.id,
            type: data.type,
            title: data.title,
            date: data.date,
            fee: data.fee,
            user: data.user,
            uid: data.uid,
            tags: data.tags,
        };
    }
    // 添加每个作品的信息。只需要传递有值的属性
    addResult(data) {
        this.resultMeta.push(data);
        // 为投稿里的每个 files 生成一份数据
        const files = data.files;
        for (const fileData of files) {
            const result = Object.assign(this.getCommonData(data), fileData);
            this.result.push(result);
        }
        // 为投稿里的所有 text 生成一份数据
        if (data.links.text.length > 0) {
            const text = data.links.text.join('\r\n');
            const blob = new Blob([text], {
                type: 'text/plain',
            });
            data.links.url = URL.createObjectURL(blob);
            const result = Object.assign(this.getCommonData(data), data.links);
            this.result.push(result);
        }
    }
    resetResult() {
        this.resultMeta = [];
        this.result = [];
    }
    resetStates() {
        this.states.allowWork = true;
        this.states.quickDownload = false;
    }
}
const store = new Store();



/***/ }),

/***/ "./src/ts/modules/Tip.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/Tip.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 显示自定义的提示
class Tip {
    constructor() {
        this.tipEl = document.createElement('div'); // tip 元素
        this.addTipEl();
    }
    // 显示提示
    addTipEl() {
        const tipHTML = `<div id="tip"></div>`;
        document.body.insertAdjacentHTML('beforeend', tipHTML);
        this.tipEl = document.getElementById('tip');
        const tips = document.querySelectorAll('.has_tip');
        for (const el of tips) {
            for (const ev of ['mouseenter', 'mouseleave']) {
                el.addEventListener(ev, (event) => {
                    const e = (event || window.event);
                    const text = el.dataset.tip;
                    this.showTip(text, {
                        type: ev === 'mouseenter' ? 1 : 0,
                        x: e.clientX,
                        y: e.clientY,
                    });
                });
            }
        }
    }
    // 显示中间面板上的提示。参数 arg 指示鼠标是移入还是移出，并包含鼠标位置
    showTip(text, arg) {
        if (!text) {
            throw new Error('No tip text.');
        }
        if (arg.type === 1) {
            this.tipEl.innerHTML = text;
            this.tipEl.style.left = arg.x + 30 + 'px';
            this.tipEl.style.top = arg.y - 30 + 'px';
            this.tipEl.style.display = 'block';
        }
        else if (arg.type === 0) {
            this.tipEl.style.display = 'none';
        }
    }
}
new Tip();


/***/ }),

/***/ "./src/ts/modules/TitleBar.ts":
/*!************************************!*\
  !*** ./src/ts/modules/TitleBar.ts ***!
  \************************************/
/*! exports provided: titleBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleBar", function() { return titleBar; });
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageType */ "./src/ts/modules/PageType.ts");
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
        this.status = ['↑', '→', '▶', '↓', '║', '■', '√', ' '];
        this.timer = 0; // 修改 title 的定时器
    }
    // 检查标题里有没有本程序定义的状态字符
    haveStatus(status = '') {
        if (!status) {
            // 没有传递 status，则检查所有标记
            for (const status of this.status) {
                const str = `[${status}]`;
                if (document.title.includes(str)) {
                    return true;
                }
            }
        }
        else {
            // 检查指定标记
            const str = `[${status}]`;
            return document.title.includes(str);
        }
        return false;
    }
    // 重设 title
    reset() {
        const type = _PageType__WEBPACK_IMPORTED_MODULE_0__["pageType"].getPageType();
        clearInterval(this.timer);
        // 储存标题的 mete 元素。在某些页面不存在，有时也与实际上的标题不一致。
        const ogTitle = document.querySelector('meta[property="og:title"]');
        // 无刷新自动加载的页面里，og:title 标签是最早更新标题的，内容也一致。
        if (ogTitle && (type == 1 || type === 2)) {
            document.title = ogTitle.content;
        }
        else {
            // 如果当前 title 里有状态提醒，则设置为状态后面的文字
            if (this.haveStatus()) {
                const index = document.title.indexOf(']');
                document.title = document.title.substr(index + 1, document.title.length);
            }
        }
    }
    // 修改title
    change(string) {
        const state = `[${string}]`;
        // 如果 title 里没有状态，就添加状态
        if (!this.haveStatus()) {
            document.title = `${state} ${document.title}`;
        }
        else {
            // 如果已经有状态了，则替换为新当前传入的状态
            document.title = document.title.replace(/\[.?\]/, state);
        }
        // 闪烁提醒，其实是把 [▶] 或 [→] 与空白 [ ] 来回切换
        if (string === '▶' || string === '→') {
            this.timer = window.setInterval(() => {
                if (this.haveStatus(string)) {
                    // 如果含有状态，就替换成空白
                    document.title = document.title.replace(state, '[ ]');
                }
                else {
                    if (this.haveStatus(' ')) {
                        // 如果含有空白，就替换成状态
                        document.title = document.title.replace('[ ]', state);
                    }
                    else {
                        // 如果都没有，一般是页面切换了，标题被重置了，取消执行闪烁（此时也根本无法形成闪烁效果了）
                        clearInterval(this.timer);
                    }
                }
            }, 500);
        }
        else {
            clearInterval(this.timer);
        }
    }
}
const titleBar = new TitleBar();



/***/ }),

/***/ "./src/ts/modules/langText.ts":
/*!************************************!*\
  !*** ./src/ts/modules/langText.ts ***!
  \************************************/
/*! exports provided: langText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langText", function() { return langText; });
const langText = {
    _只下载已收藏: [
        '只下载已收藏',
        'ブックマークのみをダウンロードする',
        'Download only bookmarked works',
        '只下載已收藏',
    ],
    _只下载已收藏的提示: [
        '只下载已经收藏的作品',
        'ブックマークした作品のみをダウンロードする',
        'Download only bookmarked works',
        '只下載已經收藏的作品',
    ],
    _下载作品类型: [
        '下载作品类型',
        'ダウンロード作品の種類',
        'Download work type',
        '下載作品類型',
    ],
    _下载作品类型的提示: [
        '下载哪些类型的作品',
        'どの種類の作品をダウンロードしますか',
        'Which types of works to download',
        '下載哪些類型的作品',
    ],
    _多p下载前几张: [
        '设置作品张数',
        '作品ごとにダウンロード画像の数',
        'Number of images downloaded per work',
        '設定作品張數',
    ],
    _多p下载前几张提示: [
        '下载每个作品的前几张图片。默认值 0 表示全部下载。',
        '各作品の画像が最初の何枚をダウンロードしますか？ デフォルト値の 0 は、すべてをダウンロードします。',
        'Download the first few images of each piece. The default value of 0 means all downloads.',
        '下載每個作品的前幾張圖片。預設值 0 表示全部下載。',
    ],
    _不能含有tag: [
        '不能含有 tag&nbsp;',
        '指定した tag を除外する',
        'Exclude specified tag',
        '不能含有 tag&nbsp;',
    ],
    _排除tag的提示文字: [
        '您可在下载前设置要排除的tag，这样在下载时将不会下载含有这些tag的作品。不区分大小写；如需排除多个tag，请使用英文逗号分隔。请注意要排除的tag的优先级大于要包含的tag的优先级。',
        'ダウンロード前に、除外する tag を設定できます。大文字と小文字を区別しない；複数の tag を設定する必要がある場合は、「,」で区切ってください。除外された tag は、必要な tag よりも優先されます',
        "Before downloading, you can set the tag you want to exclude. Not case sensitive; If you need to set multiple tags, you can use ',' separated. The excluded tag takes precedence over the included tag",
        '您可在下載前設定要排除的tag，這樣在下載時將不會下載含有這些tag的作品。不區分大小寫；如需排除多個tag，請使用英文逗號分隔。請注意要排除的tag的優先等級大於要包含的tag的優先等級。',
    ],
    _设置了排除tag之后的提示: [
        '排除 tag：',
        '以下の tag を除外：',
        'Excludes tag: ',
        '排除 tag：',
    ],
    _必须含有tag: [
        '必须含有 tag&nbsp;',
        '必要な tag&nbsp;',
        'Must contain tag',
        '必須含有 tag&nbsp;',
    ],
    _必须tag的提示文字: [
        '您可在下载前设置作品里必须包含的tag，不区分大小写；如需包含多个tag，请使用英文逗号分隔。',
        'ダウンロードする前に、必要な tag を設定することができます。大文字と小文字を区別しない；複数の tag を設定する必要がある場合は、「,」で区切ってください。',
        "Before downloading, you can set the tag that must be included. Not case sensitive; If you need to set multiple tags, you can use ',' separated. ",
        '您可在下載前設定作品裡必須包含的tag，不區分大小寫；如需包含多個tag，請使用英文逗號分隔。',
    ],
    _设置了必须tag之后的提示: [
        '包含 tag：',
        '以下の tag を含める：',
        'Include tag: ',
        '包含 tag：',
    ],
    _筛选宽高的按钮文字: [
        '设置宽高条件',
        '幅と高さの条件を設定する',
        'Set the width and height',
        '設定寬高條件',
    ],
    _筛选宽高的按钮Title: [
        '在下载前，您可以设置要下载的图片的宽高条件。',
        'ダウンロードする前に、画像の幅と高さの条件を設定できます。',
        'Before downloading, you can set the width and height conditions of the images you want to download.',
        '在下載前，您可以設定要下載的圖片的寬高條件。',
    ],
    _设置宽高比例: [
        '设置宽高比例',
        '縦横比を設定する',
        'Set the aspect ratio',
        '設定寬高比例',
    ],
    _设置宽高比例Title: [
        '设置宽高比例，也可以手动输入宽高比',
        '縦横比を設定する、手動で縦横比を入力することもできる',
        'Set the aspect ratio, or manually type the aspect ratio',
        '設定寬高比，也可以手動輸入寬高比',
    ],
    _不限制: ['不限制', '無制限', 'not limited', '不限制'],
    _横图: ['横图', '横長', 'Horizontal', '橫圖'],
    _竖图: ['竖图', '縦長', 'Vertical', '豎圖'],
    _输入宽高比: ['宽高比 >=', '縦横比 >=', 'Aspect ratio >=', '寬高比 >='],
    _设置了宽高比之后的提示: [
        '宽高比：{}',
        '縦横比：{}',
        'Aspect ratio: {}',
        '寬高比：{}',
    ],
    _宽高比必须是数字: [
        '宽高比必须是数字',
        '縦横比は数値でなければなりません',
        'The aspect ratio must be a number',
        '寬高比必須是數字',
    ],
    _筛选宽高的提示文字: [
        '请输入最小宽度和最小高度，不会下载不符合要求的图片。',
        '最小幅と最小高さを入力してください。要件を満たしていない画像はダウンロードされません。',
        'Please type the minimum width and minimum height. Will not download images that do not meet the requirements',
        '請輸入最小寬度和最小高度，不會下載不符合要求的圖片。',
    ],
    _本次输入的数值无效: [
        '本次输入的数值无效',
        '無効な入力',
        'Invalid input',
        '本次輸入的數值無效',
    ],
    _设置了筛选宽高之后的提示文字p1: [
        '宽度 >= ',
        '幅 >= ',
        'Width >= ',
        '寬度 >= ',
    ],
    _或者: [' 或者 ', ' または ', ' or ', ' 或是 '],
    _并且: [' 并且 ', ' そして ', ' and ', ' 並且 '],
    _高度设置: ['高度 >= ', '高さ >= ', 'height >= ', '高度 >= '],
    _个数: [
        '设置作品数量',
        '作品数を設定する',
        'Set the number of works',
        '設定作品數量',
    ],
    _页数: [
        '设置页面数量',
        'ページ数を設定する',
        'Set the number of pages',
        '設定頁面數量',
    ],
    _筛选收藏数的按钮文字: [
        '设置收藏数量',
        'ブックマークされた数を設定する',
        'Set the bookmarkCount conditions',
        '設定收藏數量',
    ],
    _筛选收藏数的按钮Title: [
        '在下载前，您可以设置对收藏数量的要求。',
        'ダウンロードする前に、ブックマークされた数の条件を設定することができます。',
        'Before downloading, You can set the requirements for the number of bookmarks.',
        '在下載前，您可以設定對收藏數量的要求。',
    ],
    _设置收藏数量: [
        '设置收藏数量',
        'ブックマークされた数を設定する',
        'Set the number of bookmarks',
        '設定收藏數量',
    ],
    _设置收藏数量的提示: [
        '如果作品的收藏数小于设置的数字，作品不会被下载。',
        '作品のブックマークされた数が設定された数字よりも少ない場合、作品はダウンロードされません。',
        'If the number of bookmarks of the work is less than the set number, the work will not be downloaded.',
        '如果作品的收藏數小於設定的數字，作品不會被下載。',
    ],
    _筛选收藏数的提示文字: [
        '请输入一个数字，如果作品的收藏数小于这个数字，作品不会被下载。',
        '数字を入力してください。 作品のブックマークされた数がこの数字より少ない場合、作品はダウンロードされません。',
        'Please type a number. If the number of bookmarks of the work is less than this number, the work will not be downloaded.',
        '請輸入一個數字，如果作品的收藏數小於這個數字，作品不會被下載。',
    ],
    _收藏数大于: [
        '收藏数 >= ',
        'ブックマークの数 >= ',
        'Number of bookmarks >= ',
        '收藏數 >= ',
    ],
    _收藏数小于: [
        '收藏数 <= ',
        'ブックマークの数 <= ',
        'Number of bookmarks <= ',
        '收藏數 <= ',
    ],
    _本次任务已全部完成: [
        '本次任务已全部完成。',
        'このタスクは完了しました。',
        'This task has been completed.',
        '本次工作已全部完成',
    ],
    _本次任务条件: [
        '本次任务条件: ',
        'このタスクの条件：',
        'This task condition: ',
        '本次工作條件：',
    ],
    _参数不合法: [
        '参数不合法，本次操作已取消。',
        'パラメータは有効ではありません。この操作はキャンセルされました。',
        'Parameter is not legal, this operation has been canceled.',
        '參數不合法，本次動作已取消。',
    ],
    _checkWantPageRule1Arg3: [
        '从本页开始下载-num-个作品',
        'このページから -num- 枚の作品をダウンロード。',
        'Download -num- works from this page.',
        '從本頁開始下載-num-個作品',
    ],
    _checkWantPageRule1Arg4: [
        '向下获取所有作品',
        'このページからすべての作品をダウンロードする。',
        'download all the work from this page.',
        '向下取得所有作品',
    ],
    _checkWantPageRule1Arg8: [
        '从本页开始下载<br>如果要限制下载的页数，请输入从1开始的数字，1为仅下载本页。',
        'このページからダウンロードする<br>ダウンロードするページを設定する場合は、1から始まる数字を入力してください。 1は現在のページのみをダウンロードする。',
        'Download from this page<br>If you want to set the number of pages to download, type a number starting at 1. This page is 1.',
        '從本頁開始下載<br>如果要限制下載的頁數，請輸入從1開始的數字，1為僅下載本頁。',
    ],
    _checkWantPageRule1Arg6: [
        '从本页开始下载-num-页',
        '現在のページから -num- ページをウンロードします',
        'download -num- pages from the current page',
        '從本頁開始下載-num-頁',
    ],
    _checkWantPageRule1Arg7: [
        '下载所有页面',
        'すべてのページをダウンロードする',
        'download all pages',
        '下載所有頁面',
    ],
    _checkWantPageRule1Arg9: [
        '下载 -num- 个相关作品',
        '関連作品 -num- 枚をダウンロードする。',
        'download -num- related works.',
        '下載 -num- 個相關作品',
    ],
    _checkWantPageRule1Arg10: [
        '下载所有相关作品',
        '関連作品をすべてダウンロードする。',
        'download all related works.',
        '下載所有相關作品',
    ],
    _checkWantPageRule1Arg11: [
        '下载推荐作品',
        'お勧め作品をダウンロードする',
        'download recommend works',
        '下載推薦作品',
    ],
    _checkWantPageRule1Arg12: [
        '下载排行榜前 -num- 个作品',
        'ランク前 -num- 位の作品をダウンロードする。',
        'download the top -num- works in the ranking list',
        '下載排行榜前 -num- 個作品',
    ],
    _请输入最低收藏数和要抓取的页数: [
        '请输入最低收藏数和要抓取的页数，用英文逗号分开。\n类似于下面的形式: \n1000,1000',
        'ボックマークの最小数とクロールするページ数を，「,」で区切って入力してください。\n例えば：\n1000,1000',
        "Please type the minimum number of bookmarks, and the number of pages to be crawled, separated by ','.\nE.g:\n1000,1000",
        '請輸入最低收藏數和要擷取的頁數，用英文逗號分開。\n類似於下面的形式: \n1000,1000',
    ],
    _wantPage弹出框文字PageType10: [
        '您想要下载多少页？请输入数字。\r\n当前模式下，列表页的页数最多只有',
        'ダウンロードしたいページ数を入力してください。 \r\n最大値：',
        'Please type the number of pages you want to download.\r\n The maximum value is ',
        '您想要下載多少頁？請輸入數字。\r\n目前模式下，清單頁的頁數最多只有',
    ],
    _输入超过了最大值: [
        '您输入的数字超过了最大值',
        '入力した番号が最大値を超えています',
        'The number you entered exceeds the maximum',
        '您輸入的數字超過了最大值',
    ],
    _任务开始1: [
        '从本页开始下载{}页',
        'このページから {} ページをダウンロードする',
        'download {} pages from this page',
        '從本頁開始下載{}頁',
    ],
    _任务开始0: ['任务开始', 'タスクが開始されます', 'Task starts', '工作開始'],
    _checkNotdownTypeAll: [
        '由于您排除了所有作品类型，本次任务已取消。',
        'すべての種類の作品を除外したため、タスクはキャンセルされました。',
        'Because you excluded all types of work, the task was canceled.',
        '由於您排除了所有作品類型，本次工作已取消。',
    ],
    _checkNotdownTypeResult: [
        '排除作品类型：',
        'これらのタイプの作品を除外します：',
        'Excludes these types of works: ',
        '排除作品類型：',
    ],
    _多图作品: [
        '多图作品',
        'マルチイメージ作品',
        'Multi-image works',
        '多圖作品',
    ],
    _多图下载设置: [
        '多图下载设置',
        'マルチイメージ設定',
        'Download multi-image works',
        '多圖下載設定',
    ],
    _怎样下载多图作品: [
        '怎样下载多图作品？',
        'どのようにマルチイメージ作品をダウンロードしますか？',
        'How to download multi-image works?',
        '怎样下載多圖作品？',
    ],
    _多图建立目录: [
        '多图建立目录',
        'マルチイメージにフォルダを作成',
        'Create directory for multi-image works',
        '多圖建立目錄',
    ],
    _多图建立目录提示: [
        '当你下载多图作品时，下载器可以自动创建一个目录，保存里面的图片。',
        'マルチイメージをダウンロードする時、自動的にフォルダを作成し、イメージをその中で保存することができます。',
        'When you download a multi-image work, the downloader can automatically create a directory and save the images inside.',
        '當你下載多圖作品時，下載器可以自動創建一個目錄，保存裏面的圖片。',
    ],
    _不下载: ['不下载', '必要なし', 'No', '不下載'],
    _全部下载: ['全部下载', '全部ダウンロード', 'Yes', '全部下載'],
    _下载前几张图片: [
        '下载前几张图片：',
        '最初のいくつかの画像：',
        'First few images:',
        '下載前幾張圖片：',
    ],
    _不下载多图作品: [
        '不下载多图作品',
        'マルチイメージ作品をダウンロードしない',
        'Do not download multi-image works',
        '不下載多圖作品',
    ],
    _多图作品下载前n张图片: [
        '多图作品下载前 {} 张图片',
        'マルチイメージ作品は、最初の {} イメージをダウンロードします',
        'Multi-image works download the first {} images',
        '多圖作品下載前 {} 張圖片',
    ],
    _插画: ['插画 ', 'イラスト', 'Illustrations', '插畫 '],
    _漫画: ['漫画 ', '漫画', 'Manga', '漫畫 '],
    _动图: ['动图 ', 'うごイラ', 'Ugoira', '動圖 '],
    _动图保存格式: [
        '动图保存格式',
        'うごイラをどのタイプが保存するか',
        'Save the ugoira work as',
        '動圖儲存格式',
    ],
    _动图保存格式title: [
        '下载动图时，可以把它转换成视频文件',
        'うごイラをダウンロードするとき、動画に変換することができます。',
        'When you download a ugoira work, you can convert it to a video file.',
        '下載動圖時，可以將它轉換為影片檔案',
    ],
    _webmVideo: ['WebM 视频', 'WebM ビデオ', 'WebM video', 'WebM 視頻'],
    _gif: ['GIF 图片', 'GIF 画像', 'GIF picture', 'GIF 圖片'],
    _zipFile: ['Zip 文件', 'ZIP ファイル', 'Zip file', 'Zip 檔案'],
    _当前作品个数: [
        '当前有 {} 个作品 ',
        '今は　{}　枚の作品があります ',
        'There are now {} works ',
        '目前有 {} 個作品 ',
    ],
    _排行榜进度: [
        '已抓取本页面第{}部分',
        'このページの第　{}　部がクロールされました',
        'Part {} of this page has been crawled',
        '已擷取本頁面第{}部分',
    ],
    _新作品进度: [
        '已抓取本页面 {} 个作品',
        'このページの {} つの作品をクロールしました',
        'This page has been crawled {} works',
        '已擷取本頁面 {} 個作品',
    ],
    _抓取多少个作品: [
        '抓取本页面 {} 个作品',
        'このページの {} つの作品をクロールします',
        'Crawl this page {} works',
        '擷取本頁面 {} 個作品',
    ],
    _相关作品抓取完毕: [
        '相关作品抓取完毕。包含有{}个作品，开始获取作品信息。',
        '関連作品はクロールされました。 {} 作品を含み、その作品に関する情報の取得を開始します。',
        'The related works have been crawled. Contains {} works and starts getting information about the work.',
        '相關作品擷取完畢。包含有{}個作品，開始取得作品資訊。',
    ],
    _排行榜任务完成: [
        '本页面抓取完毕。<br>当前有{}个作品，开始获取作品信息。',
        'このページのクロール終了。<br>{}枚の作品があります。 作品情報の取得を開始します。',
        'This page is crawled and now has {} works.<br> Start getting the works for more information.',
        '本頁面擷取完畢。<br>目前有{}個作品，開始取得作品資訊。',
    ],
    _列表页抓取进度: [
        '已抓取列表页{}个页面',
        '{} のリストページを取得しました',
        'Has acquired {} list pages',
        '已擷取清單頁{}個頁面',
    ],
    _列表页抓取完成: [
        '列表页面抓取完成，开始获取图片网址',
        'リストページがクロールされ、画像 URL の取得が開始されます',
        'The list page is crawled and starts to get the image URL',
        '清單頁面擷取完成，開始取得圖片網址',
    ],
    _抓取结果为零: [
        '抓取完毕，但没有找到符合筛选条件的作品。',
        'クロールは終了しましたが、フィルタ条件に一致する作品が見つかりませんでした。',
        'Crawl finished but did not find works that match the filter criteria.',
        '擷取完畢，但沒有找到符合篩選條件的作品。',
    ],
    _当前任务尚未完成: [
        '当前任务尚未完成',
        '現在のタスクはまだ完了していません',
        'The current task has not yet been completed',
        '目前工作尚未完成',
    ],
    _当前任务尚未完成2: [
        '当前任务尚未完成，请等待完成后再下载。',
        '現在のタスクはまだ完了していません、完了するまでお待ちください',
        'The current task has not yet been completed',
        '目前工作尚未完成，請等待完成後再下載。',
    ],
    _列表抓取完成开始获取作品页: [
        '当前列表中有{}张作品，开始获取作品信息',
        '{} 枚の作品があります。 作品情報の取得を開始します。',
        'Now has {} works. Start getting the works for more information.',
        '目前清單中有{}張作品，開始取得作品資訊',
    ],
    _开始获取作品页面: [
        '开始获取作品页面',
        '作品ページの取得を開始する',
        'Start getting the works page',
        '開始取得作品頁面',
    ],
    _无权访问2: [
        '无权访问 {}，跳过该作品。',
        '{} のアクセス権限がありません、作品を無視する。',
        'No access {}, skip.',
        '無權造訪 {}，跳過該作品。',
    ],
    _作品页状态码0: [
        '请求的url不可访问',
        '要求された URL にアクセスできません',
        'The requested url is not accessible',
        '要求的url無法造訪',
    ],
    _作品页状态码400: [
        '该作品已被删除',
        '作品は削除されました',
        'The work has been deleted',
        '該作品已被刪除',
    ],
    _作品页状态码403: [
        '无权访问请求的url 403',
        'リクエストされた url にアクセスできない 403',
        'Have no access to the requested url 403',
        '無權造訪要求的url 403',
    ],
    _作品页状态码404: [
        '404 not found',
        '404 not found',
        '404 not found',
        '404 not found',
    ],
    _抓取图片网址的数量: [
        '已获取 {} 个图片网址',
        '{} つの画像 url を取得',
        'Get {} image URLs',
        '已取得 {} 個圖片網址',
    ],
    _正在抓取: [
        '正在抓取，请等待……',
        'クロール中、しばらくお待ちください...',
        'Getting, please wait...',
        '正在擷取，請等待……',
    ],
    _获取全部书签作品: [
        '获取全部书签作品，时间可能比较长，请耐心等待。',
        'ブックマークしたすべての作品を取得すると、時間がかかることがあります。お待ちください。',
        'Get all bookmarked works, the time may be longer, please wait.',
        '取得全部書籤作品，時間可能比較長，請耐心等待。',
    ],
    _抓取图片网址遇到中断: [
        '当前任务已中断!',
        '現在のタスクが中断されました。',
        'The current task has been interrupted.',
        '目前工作已中斷!',
    ],
    _关闭: ['关闭', 'クローズ', 'close', '關閉'],
    _输出信息: ['输出信息', '出力情報', 'Output information', '輸出資訊'],
    _复制: ['复制', 'コピー', 'Copy', '複製'],
    _已复制到剪贴板: [
        '已复制到剪贴板，可直接粘贴',
        'クリップボードにコピーされました',
        'Has been copied to the clipboard',
        '已複製至剪貼簿，可直接貼上',
    ],
    _下载设置: ['下载设置', 'ダウンロード設定', 'Download settings', '下載設定'],
    _收起展开设置项: [
        '收起/展开设置项',
        '設定の折りたたみ/展開',
        'Collapse/expand settings',
        '摺疊/展開設定項目',
    ],
    _github: [
        'Github 页面，欢迎 star',
        'Github のページ、star をクリックしてください',
        'Github page, if you like, please star it',
        'Github 頁面，歡迎 star',
    ],
    _wiki: ['使用手册', 'マニュアル', 'Wiki', 'Wiki'],
    _快捷键切换显示隐藏: [
        '使用 Alt + X，可以显示和隐藏下载面板',
        'Alt + X を使用してダウンロードパネルを表示および非表示にする',
        'Use Alt + X to show and hide the download panel',
        '使用 Alt + X，可以顯示和隱藏下載面板',
    ],
    _共抓取到n个图片: [
        '共抓取到 {} 个图片',
        '合計 {} 枚の画像を取得し',
        'Crawl a total of {} images',
        '共擷取到 {} 個圖片',
    ],
    _设置文件名: [
        '设置命名规则',
        '命名規則を設定する',
        'Set naming rules',
        '設定命名規則',
    ],
    _设置文件夹名的提示: [
        `可以使用 '/' 建立文件夹<br>示例：{p_title}/{user}/{id}`,
        `フォルダーは '/' で作成できます<br>例：{p_title}/{user}/{id}`,
        `You can create a directory with '/'<br>Example：{p_title}/{user}/{id}`,
        `可以使用 '/' 建立資料夾<br>範例：{p_title}/{user}/{id}`,
    ],
    _添加命名标记前缀: [
        '添加命名标记前缀',
        '前に tag の名前を追加',
        'Add named tag prefix',
        '加入命名標記首碼',
    ],
    _添加字段名称提示: [
        '例如，在用户名前面添加“user_”标记',
        'たとえば、ユーザー名の前に 「user_」 tag を追加します。',
        'For example, add the "user_" tag in front of the username',
        '例如，在使用者名稱前面加入“user_”標記',
    ],
    _查看标记的含义: [
        '查看标记的含义',
        ' tag の意味を表示する',
        'View the meaning of the tag',
        '檢視標記的意義',
    ],
    _命名标记id: [
        '默认文件名，如 44920385_p0',
        'デフォルトのファイル名，例 44920385_p0',
        'Default file name, for example 44920385_p0',
        '預設檔案名稱，如 44920385_p0',
    ],
    _命名标记title: ['作品标题', '作品のタイトル', 'works title', '作品標題'],
    _命名标记tags: [
        '作品的 tag 列表',
        '作品の tags',
        'The tags of the work',
        '作品的 tag 清單',
    ],
    _命名标记user: ['画师名字', 'アーティスト名', 'Artist name', '畫師名稱'],
    _命名标记uid: ['画师 id', 'アーティスト ID', 'Artist id', '畫師 id'],
    _命名标记px: ['宽度和高度', '幅と高さ', 'width and height', '寬度和高度'],
    _命名标记bmk: [
        'bookmark-count，作品的收藏数。把它放在最前面可以让文件按收藏数排序。',
        'bookmark-count，作品のボックマークの数、前に追加することでボックマーク数で并べることができます。',
        'bookmark-count, bookmarks number of works.',
        'bookmark-count，作品的收藏數。將它放在最前面可以讓檔案依收藏數排序。',
    ],
    _命名标记9: [
        '数字 id，如 44920385',
        '44920385 などの番号 ID',
        'Number id, for example 44920385',
        '數字 id，如 44920385',
    ],
    _命名标记p_num: [
        '图片在作品内的序号，如 0、1、2 …… 每个作品都会重新计数。',
        '0、1、2 など、作品の画像のシリアル番号。各ピースは再集計されます。',
        'The serial number of the picture in the work, such as 0, 1, 2 ... Each work will be recounted.',
        '圖片在作品內的序號，如 0、1、2 …… 每個作品都將重新計數。',
    ],
    _命名标记tags_trans: [
        '作品的 tag 列表，附带翻译后的 tag（如果有）',
        '作品の tag リスト、翻訳付き tag (あれば)',
        'The tags of the work, with the translated tag (if any)',
        '作品的 tag 清單，附帶翻譯後的 tag（若有的話）',
    ],
    _命名标记date: [
        '作品的创建日期，格式为 yyyy-MM-dd。如 2019-08-29',
        '作品の作成日は yyyy-MM-dd の形式でした。 2019-08-29 など',
        'The date the creation of the work was in the format yyyy-MM-dd. Such as 2019-08-29',
        '作品的建立日期，格式為 yyyy-MM-dd。如 2019-08-29',
    ],
    _命名标记rank: [
        '作品在排行榜中的排名。如 #1、#2 …… 只能在排行榜页面中使用。',
        '作品のランキング。例え　#1、#2 …… ランキングページのみで使用できます。',
        'The ranking of the work in the ranking pages. Such as #1, #2 ... Can only be used in ranking pages.',
        '作品在排行榜中的排名。如 #1、#2 …… 只能在排行榜頁面中使用。',
    ],
    _命名标记type: [
        '作品类型，分为 illustration、manga、ugoira',
        '作品分類は、illustration、manga、ugoira',
        'The type of work, divided into illustration, manga, ugoira',
        '作品類型，分为 illustration、manga、ugoira',
    ],
    _命名标记提醒: [
        '您可以使用多个标记；建议在不同标记之间添加分割用的字符。示例：{id}-{uid}<br>一定要包含 {id} 或者 {id_num}。<br>* 在某些情况下，会有一些标记不可用。',
        '複数のタグを使用することができます；異なるタグ間の分割のために文字を追加することをお勧めします。例：{id}-{uid}<br>必ず{id}または{id_num}を含めてください。<br>* 場合によっては、一部の tag が利用できず。',
        'You can use multiple tags, and you can add a separate character between different tags. Example: {id}-{uid}<br>Be sure to include {id} or {id_num}.<br>* In some cases, some tags will not be available.',
        '您可以使用多個標記；建議在不同標記之間加入分隔用的字元。範例：{id}-{uid}<br>一定要包含 {id} 或者 {id_num}。<br>* 在某些情況下，會有一些標記不可用。',
    ],
    _文件夹标记PTag: [
        '当前页面的 tag。当前页面没有 tag 时不可用。',
        '現在のページの tag。現在のページの tag がないときは使用できません。',
        'The tag of the current page. Not available if the current page has no tag.',
        '目前頁面的 tag。目前頁面沒有 tag 時無法使用。',
    ],
    _文件夹标记PTitle: [
        '当前页面的标题',
        'ページのタイトル',
        'The title of this page',
        '目前頁面的標題',
    ],
    _预览文件名: [
        '预览文件名',
        'ファイル名のプレビュー',
        'Preview file name',
        '預覽檔案名稱',
    ],
    _设置下载线程: [
        '设置下载线程',
        'ダウンロードスレッドを設定する',
        'Set the download thread',
        '設定下載執行緒',
    ],
    _线程数字: [
        '可以输入 1-5 之间的数字，设置同时下载的数量',
        '同時ダウンロード数を設定、1-5 の数値を入力してください',
        'You can type a number between 1-5 to set the number of concurrent downloads',
        '可以輸入 1-5 之間的數字，設定同時下載的數量',
    ],
    _下载按钮1: ['开始下载', 'ダウンロードを開始', 'start download', '開始下載'],
    _下载按钮2: [
        '暂停下载',
        'ダウンロードを一時停止',
        'pause download',
        '暫停下載',
    ],
    _下载按钮3: ['停止下载', 'ダウンロードを停止', 'stop download', '停止下載'],
    _下载按钮4: ['复制 url', 'URL をコピー', 'copy urls', '複製url'],
    _当前状态: ['当前状态 ', '現在の状態 ', 'Now state ', '目前狀態 '],
    _未开始下载: [
        '未开始下载',
        'まだダウンロードを開始していません',
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
    _常见问题: ['常见问题', 'よくある質問', 'Common problems', '常見問題'],
    _uuid: [
        '如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。',
        'ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。',
        'If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.',
        '如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。',
    ],
    _下载说明: [
        "下载的文件保存在浏览器的下载目录里。<br>请不要在浏览器的下载选项里选中'总是询问每个文件的保存位置'。<br><b>如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。</b><br>QQ群：853021998",
        'ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><b>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。</b>',
        'The downloaded file is saved in the browser`s download directory. <br><b>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.</b>',
        "下載的檔案儲存在瀏覽器的下載目錄裡。<br>請不要在瀏覽器的下載選項裡選取'總是詢問每個檔案的儲存位置'。<br><b>如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。</b><br>QQ群：853021998",
    ],
    _正在下载中: ['正在下载中', 'ダウンロード中', 'Downloading', '正在下載'],
    _下载完毕: [
        '√ 下载完毕!',
        '√ ダウンロードが完了しました',
        '√ Download finished',
        '√ 下載完畢!',
    ],
    _已暂停: [
        '下载已暂停',
        'ダウンロードは一時停止中です',
        'Download is paused',
        '下載已暫停',
    ],
    _已停止: [
        '下载已停止',
        'ダウンロードが停止しました',
        'Download stopped',
        '下載已停止',
    ],
    _已下载: ['已下载', 'downloaded', 'downloaded', '已下載'],
    _抓取完毕: [
        '抓取完毕！',
        'クロールが終了しました！',
        'Crawl finished!',
        '擷取完畢！',
    ],
    _快速下载本页: [
        '快速下载本页作品',
        'この作品をすばやくダウンロードする',
        'Download this work quickly',
        '快速下載本頁作品',
    ],
    _从本页开始抓取new: [
        '从本页开始抓取新作品',
        'このページから新しい作品を入手する',
        'Crawl the new works from this page',
        '從本頁開始擷取新作品',
    ],
    _从本页开始抓取old: [
        '从本页开始抓取旧作品',
        'このページから古い作品を入手する',
        'Crawl the old works from this page',
        '從本頁開始擷取舊作品',
    ],
    _抓取推荐作品: [
        '抓取推荐作品',
        '推奨作品をダウンロードする',
        'Crawl the recommend works',
        '擷取推薦作品',
    ],
    _抓取推荐作品Title: [
        '抓取页面底部的的推荐作品',
        'ページの下部で推奨作品をクロールします',
        'Crawl the recommended works at the bottom of the page',
        '擷取頁面底部的推薦作品',
    ],
    _抓取相关作品: [
        '抓取相关作品',
        '関連作品をダウンロードする',
        'Crawl the related works',
        '擷取相關作品',
    ],
    _相关作品大于0: [
        ' （下载相关作品必须大于 0）',
        ' 「ダウンロードする関連作品の数は0より大きくなければならない」',
        '  (Download related works must be greater than 0)',
        ' （下載相關作品必須大於 0）',
    ],
    _默认下载多页: [
        ', 如有多页，默认会下载全部。',
        '、複数のページがある場合、デフォルトですべてをダウンロードされます。',
        ', If there are multiple pages, the default will be downloaded.',
        ', 如有多頁，預設會下載全部。',
    ],
    _调整完毕: [
        '调整完毕，当前有{}个作品。',
        '調整が完了し、今、{} の作品があります。',
        'The adjustment is complete and now has {} works.',
        '調整完畢，目前有{}個作品。',
    ],
    _抓取当前作品: [
        '抓取当前作品',
        '現在の作品をクロールする',
        'Crawl the current work',
        '擷取目前作品',
    ],
    _抓取当前作品Title: [
        '抓取当前列表里的所有作品',
        '現在のリスト内のすべての作品をクロールする',
        'Crawl all the works in the current list',
        '擷取目前清單裡的所有作品',
    ],
    _清除多图作品: [
        '清除多图作品',
        '複数の作品を削除する',
        'Remove multi-drawing works',
        '清除多圖作品',
    ],
    _清除多图作品Title: [
        '如果不需要可以清除多图作品',
        '必要がない場合は、複数のグラフを削除することができます',
        'If you do not need it, you can delete multiple graphs',
        '如果不需要可以清除多圖作品',
    ],
    _清除动图作品: [
        '清除动图作品',
        'うごイラ作品を削除する',
        'Remove ugoira work',
        '清除動圖作品',
    ],
    _清除动图作品Title: [
        '如果不需要可以清除动图作品',
        '必要がない場合は、うごイラを削除することができます',
        'If you do not need it, you can delete the ugoira work',
        '如果不需要可以清除動圖作品',
    ],
    _手动删除作品: [
        '手动删除作品',
        '作品を手動で削除する',
        'Manually delete the work',
        '手動刪除作品',
    ],
    _手动删除作品Title: [
        '可以在下载前手动删除不需要的作品',
        'ダウンロードする前に不要な作品を手動で削除することができます',
        'You can manually delete unwanted work before downloading',
        '可以在下載前手動刪除不需要的作品',
    ],
    _退出手动删除: [
        '退出手动删除',
        '削除モードを終了する',
        'Exit manually delete',
        '結束手動刪除',
    ],
    _抓取本页作品: [
        '抓取本页作品',
        'このページをクロールする',
        'Crawl this page works',
        '擷取本頁作品',
    ],
    _抓取本页作品Title: [
        '抓取本页列表中的所有作品',
        'このページの全ての作品をクロールする',
        'Crawl this page works',
        '擷取本頁清單中的所有作品',
    ],
    _抓取本排行榜作品: [
        '抓取本排行榜作品',
        'このリストの作品をクロールする',
        'Crawl the works in this list',
        '擷取本排行榜作品',
    ],
    _抓取本排行榜作品Title: [
        '抓取本排行榜的所有作品，包括现在尚未加载出来的。',
        'まだ読み込まれていないものを含めて、このリストの作品をダウンロードする',
        'Crawl all of the works in this list, including those that are not yet loaded.',
        '擷取本排行榜的所有作品，包括現在尚未載入出來的。',
    ],
    _抓取首次登场的作品: [
        '抓取首次登场作品',
        '初登場作品をダウンロードする',
        'Crawl the debut works',
        '擷取首次登場作品',
    ],
    _抓取首次登场的作品Title: [
        '只下载首次登场的作品',
        '初登場作品のみダウンロードします',
        'Download only debut works',
        '只下載首次登場的作品',
    ],
    _抓取该页面的图片: [
        '抓取该页面的图片',
        'ページの画像をクロールする',
        'Crawl the picture of the page',
        '擷取該頁面的圖片',
    ],
    _抓取相似图片: [
        '抓取相似图片',
        '類似の作品をクロールする',
        'Crawl similar works',
        '擷取相似圖片',
    ],
    _要获取的作品个数2: [
        '您想要获取多少个作品？',
        'いくつの作品をダウンロードしたいですか？',
        'How many works do you want to download?',
        '您想要取得多少個作品？',
    ],
    _数字提示1: [
        '-1, 或者大于 0',
        '-1、または 0 より大きい',
        '-1, or greater than 0',
        '-1, 或是大於 0',
    ],
    _下载大家的新作品: [
        '下载大家的新作品',
        'みんなの新作をダウンロードする',
        'Download everyone`s new work',
        '下載大家的新作品',
    ],
    _屏蔽设定: ['屏蔽設定', 'ミュート設定', 'Mute settings', '封鎖設定'],
    _举报: ['举报', '報告', 'Report', '回報'],
    _输入id进行抓取: [
        '输入id进行抓取',
        'idを入力してダウンロードする',
        'Enter id to fetch',
        '輸入id進行擷取',
    ],
    _输入id进行抓取的提示文字: [
        '请输入作品id。如果有多个id，则以换行分割（即每行一个id）',
        'イラストレーターIDを入力してください。 複数の id がある場合は、1 行に 1 つの id を付けます。',
        'Please type the illustration id. If there is more than one id, one id per line.',
        '請輸入作品id。如果有多個id，則以換行分隔（即每行一個id）',
    ],
    _开始抓取: ['开始抓取', 'クロールを開始する', 'Start crawling', '開始擷取'],
    _添加tag: [
        '给未分类作品添加 tag',
        '未分類の作品に tag を追加',
        'Add tag to unclassified work',
        '幫未分類的作品加入 tag',
    ],
    _id不合法: [
        'id不合法，操作取消。',
        'id が不正な、操作はキャンセルされます。',
        'id is illegal, the operation is canceled.',
        'id不合法，動作取消。',
    ],
    _快速收藏: [
        '快速收藏',
        'クイックブックマーク',
        'Quick bookmarks',
        '快速收藏',
    ],
    _启用: ['启用', '有効にする', 'Enable', '啟用'],
    _自动开始下载: [
        '自动开始下载',
        'ダウンロードは自動的に開始されます',
        'Download starts automatically',
        '自動开始下載',
    ],
    _自动下载的提示: [
        '当“开始下载”状态可用时，自动开始下载，不需要点击下载按钮。',
        '「ダウンロードを開始する」ステータスが利用可能になると、ダウンロードは自動的に開始され、ダウンロードボタンをクリックする必要はありません。',
        'When the &quot;Start Downloa&quot; status is available, the download starts automatically and no need to click the download button.',
        '當“開始下載”狀態可用時，自動開始下載，不需要點選下載按鈕。',
    ],
    _转换任务提示: [
        '正在转换 {} 个文件',
        '{} ファイルの変換',
        'Converting {} files',
        '正在轉換 {} 個檔案',
    ],
    _最近更新: ['最近更新', '最近更新する', 'What`s new', '最近更新'],
    _确定: ['确定', '確定', 'Ok', '確定'],
    _file404: [
        '404 错误：文件 {} 不存在。',
        '404 エラー：ファイル {} は存在しません。',
        '404 error: File {} does not exist.',
        '404 錯誤：檔案 {} 不存在。',
    ],
    _文件下载失败: [
        '文件 {} 下载失败',
        'ファイル {} のダウンロードを失敗しました',
        'File {} download failed',
        '檔案 {} 下載失败',
    ],
    _重置设置: ['重置设置', 'リセット設定', 'Reset Settings', '重設設定'],
    _是否重置设置: [
        '是否重置设置？',
        '設定をリセットしますか？',
        'Do you want to reset the settings?',
        '是否重設設定？',
    ],
    _newver: [
        '有新版本可用',
        '新しいバージョンがあります',
        'A new version is available',
        '有新版本可用',
    ],
    _快速下载建立文件夹: [
        '快速下载时，始终创建文件夹',
        'クイックダウンロード時、常にフォルダを作成します',
        'Always create directory when downloading quickly',
        '快速下載時，始終建立資料夾',
    ],
    _快速下载建立文件夹提示: [
        '快速下载时，如果只有一张图片，也会建立文件夹',
        'すばやくダウンロードとき、イラストが一枚だけでも、フォルダも作成されます',
        'When downloading quickly, if there is only one picture, a directory is also created',
        '快速下載時，若只有一張圖片，也會建立資料夾',
    ],
    _设置id范围: [
        '设置 id 范围',
        'id 範囲を設定',
        'Set id range',
        '設定 id 範圍',
    ],
    _设置id范围提示: [
        '您可以输入一个作品 id，抓取比它新或者比它旧的作品',
        '1 つの作品 id を入力することで、それより新しいあるいは古い作品をクロールことができます',
        'You can enter a work id and crawl works that are newer or older than it',
        '您可以輸入一個作品 id，擷取比它新或者比它舊的作品。',
    ],
    _大于: ['大于', 'より大きい', 'Bigger than', '大於'],
    _小于: ['小于', 'より小さい', 'Less than', '小於'],
    _设置投稿时间: [
        '设置投稿时间',
        '投稿日時を設定する',
        'Set posting date',
        '設定投稿時間',
    ],
    _设置投稿时间提示: [
        '您可以下载指定时间内发布的作品',
        '指定された時間内に配信された作品をダウンロードすることができます',
        'You can download works posted in a specified period of time',
        '您可以下載指定時間内發佈的作品',
    ],
    _时间范围: ['时间范围', '時間範囲', 'Time range', '時間范围'],
    _必须大于0: [
        '必须大于 0',
        '0 より大きくなければなりません',
        'must be greater than 0',
        '必須大於 0',
    ],
    _开始筛选: ['开始筛选', 'スクリーニング開始', 'Start screening', '開始篩選'],
    _开始筛选Title: [
        '按照设置来筛选当前 tag 里的作品。',
        '現在の tag にある作品を設定によってスクリーニングする',
        'Screen the works in the current tag.',
        '按照設定來篩選當前 tag 裡的作品。',
    ],
    _在结果中筛选: [
        '在结果中筛选',
        '結果の中からスクリーニング',
        'Screen in results',
        '在結果中篩選',
    ],
    _在结果中筛选Title: [
        '您可以改变设置，并在结果中再次筛选。',
        '設定を変えて、結果の中で再びスクリーニングすることができます。',
        'You can change the settings and screen again in the results.',
        '您可以變更設定，并在結果中再次篩選。',
    ],
    _抓取筛选结果: [
        '抓取筛选结果',
        'スクリーニングの結果をクロールする',
        'Crawl the screening results',
        '擷取篩選結果',
    ],
    _尚未开始筛选: [
        '尚未开始筛选',
        'まだスクリーニングを開始していない',
        'Screening has not started',
        '尚未開始篩選',
    ],
    _没有数据可供使用: [
        '没有数据可供使用',
        '使用可能なデータはない',
        'No data is available.',
        '沒有資料可供使用',
    ],
    _预览搜索结果: [
        '预览搜索页面的筛选结果',
        '検索ページのフィルタ結果をプレビューします',
        'Preview filter results on search page',
        '預覽搜尋頁面的篩選結果',
    ],
    _预览搜索结果说明: [
        '下载器可以把符合条件的作品显示在当前页面上。如果抓取结果太多导致页面崩溃，请关闭这个功能。<br>启用预览功能时，下载器不会自动开始下载。',
        'ローダは、該当する作品を現在のページに表示することができます。クロール結果が多すぎてページが崩れる場合は、この機能をオフにしてください。<br>プレビュー機能を有効にすると、ダウンロードは自動的に開始されません。',
        'The downloader can display the qualified works on the current page. If too many crawling results cause the page to crash, turn off this feature.<br>When the preview feature is enabled, the downloader does not start downloading automatically.',
        '下載器可以將符合條件的作品顯示在目前頁面上。如果擷取結果太多導致頁面當掉，請關閉這個功能。<br>啟用預覽功能時，下載器不會自動開始下載。',
    ],
    _目录名使用: [
        '目录名使用：',
        'ディレクトリ名の使用：',
        'Folder name use: ',
        '資料夾名稱使用：',
    ],
    _命名规则: ['命名规则', '命名規則', 'Naming rule', '命名規則'],
    _启用快速收藏: [
        '启用快速收藏',
        'クイックボックマークを有効にする',
        'Enable quick bookmark',
        '啓用快速收藏',
    ],
    _启用快速收藏说明: [
        '当你点击下载器添加的收藏按钮(☆)，把作品添加到书签时，自动添加这个作品的 tag。',
        'ダウンローダーに追加されたボックマークボタン「☆」をクリックして、作品をブックマークに追加すると、自動的に作品の tag が追加されます。',
        'When you click the favorite button (☆) added by the downloader to bookmark a work, the tag of the work is automatically added.',
        '當你點選下載器新增的收藏按鈕(☆)，將作品加入書籤時，自動新增這個作品的 tag。',
    ],
    _新增设置项: [
        '新增设置项',
        '新たな機能を追加されました。',
        'Added setting items',
        '新增設定項目',
    ],
    _抓取: ['抓取', 'クロール', 'Crawl', '擷取'],
    _下载: ['下载', 'ダウンロードする', 'Download', '下載'],
    _其他: ['其他', 'その他', 'Other', '其他'],
    _第一张图不带序号: [
        '第一张图不带序号',
        '最初のイメージの番号を削除します',
        'The first picture without a serial number',
        '第一張圖片不帶序號',
    ],
    _第一张图不带序号说明: [
        '去掉每个作品第一张图的序号。例如 80036479_p0 变成 80036479',
        '作品ごとの最初のイメージの番号を削除します。例えば 80036479_p0 は 80036479 になります。',
        'Remove the serial number of the first picture of each work. For example 80036479_p0 becomes 80036479.',
        '去掉每個作品第一張圖的序號。例如 80036479_p0 變成 80036479。',
    ],
    _最小值: ['最小值', '最小値', 'Minimum value', '最小值'],
    _最大值: ['最大值', '最大値', 'maximum value', '最大值'],
    _单图作品: [
        '单图作品',
        'マルチイメージ作品',
        'Single image works',
        '單圖作品',
    ],
    _彩色图片: ['彩色图片', 'カラーイメージ', 'Color picture', '彩色圖片'],
    _黑白图片: [
        '黑白图片',
        '白黒イメージ',
        'Black and white pictures',
        '黑白圖片',
    ],
    _不保存图片因为颜色设置: [
        '图片 {} 没有被保存，因为它的颜色不符合设定。',
        'イメージ {} は色が設定に合わないため、保存されていません。',
        'The image {} was not saved because its colors do not match the settings.',
        '圖片 {} 沒有被保存，因為它的顏色不符合設定。',
    ],
    _同时转换多少个动图: [
        '同时转换多少个动图',
        '同時変換のうごイラの上限',
        'How many animations are converted at the same time',
        '同時轉換多少個動圖',
    ],
    _同时转换多少个动图警告: [
        '同时转换多个动图会增加资源占用。<br>转换动图时，请保持该标签页激活，否则浏览器会降低转换速度。',
        '複数の動画を同時に変換すると、リソースの占有が増加します。<br>うごイラを変換するときは、このタブを有効にしてください。そうしないと、ブラウザは変換速度を下げます。',
        'Converting multiple animations at the same time will increase resource consumption. <br> Please keep the tab active when converting animation, otherwise the browser will reduce the conversion speed.',
        '同時轉換多個動圖會增加資源占用。<br>轉換動圖時，請保持這個標籤頁激活，否則瀏覽器會降低轉換速度。',
    ],
    _提示: ['提示', 'ヒント', 'tip', '提示'],
    _fbNew500: [
        '新增设置项：<br>彩色图片；黑白图片。',
        '新たな機能を追加されました：カラーイメージ；白黒イメージ。<br>',
        'Added setting items:<br>Color picture; Black and white pictures.',
        '新增設定項目：<br>彩色圖片；黑白圖片。',
    ],
    _投稿数量: ['投稿数量'],
    _投稿数量说明: ['默认值 -1 将会抓取所有投稿'],
    _文件类型: ['文件类型'],
    _所有: ['所有'],
    _图片: ['图片'],
    _视频: ['视频'],
    _音乐: ['音乐'],
    _压缩文件: ['压缩文件'],
    _PS文件: ['PS文件'],
    _投稿类型: ['投稿类型'],
    _免费投稿: ['免费投稿'],
    _付费投稿: ['付费投稿'],
    _设置价格范围: ['设置价格范围'],
    _日元: ['日元'],
    _晚于: ['晚于'],
    _保存投稿中的外部链接: ['保存投稿中的外部链接'],
    _当前投稿个数: [
        '当前有 {} 个投稿 ',
        '今は　{}　枚の作品があります ',
        'There are now {} post ',
        '目前有 {} 個投稿 ',
    ],
    _抓取文件数量: [
        '已获取 {} 个文件信息',
        '{} つの画像 url を取得',
        'Get {} image URLs',
        '已取得 {} 個圖片網址',
    ],
    _抓取赞助的所有用户的投稿: ['抓取赞助的所有用户的投稿'],
    _抓取该用户的投稿: ['抓取该用户的投稿'],
    _抓取该tag的投稿: ['抓取该 tag 的投稿'],
    _抓取这篇投稿: ['抓取这篇投稿'],
    _抓取商品的封面图: ['抓取商品的封面图'],
};



/***/ })

/******/ });
//# sourceMappingURL=content.js.map