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

/***/ "./src/ts/API.ts":
/*!***********************!*\
  !*** ./src/ts/API.ts ***!
  \***********************/
/*! exports provided: API */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });
class API {
    constructor() {
        this.error = {
            message: 'Fetch failed: Failed to fetch',
            error: {
                message: 'Failed to fetch',
                stack: `TypeError: Failed to fetch\n
              at chrome-extension://mfkglccbgcbnbkdgekepcgnhobeopoji/js/content.js:112:13\n
              ...更多栈信息`,
            },
        };
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
                    return response.json().then((data) => resolve(data));
                }
                else {
                    // HTTP 状态码错误
                    reject({
                        status: response.status,
                        statusText: response.statusText,
                        message: `HTTP error: ${response.status} ${response.statusText}`,
                    });
                }
            })
                .catch((error) => {
                // 第二种异常，请求失败
                // fanbox 的 429 错误会触发请求失败
                // Uncaught (in promise) TypeError: Failed to fetch
                reject({
                    message: `Fetch failed: ${error.message}`,
                    error,
                });
                // 发生 429 错误时，返回的错误信息如下面的 error 所示
            });
        });
    }
    static getCreatorId(url) {
        const split = url.split('/');
        // 首先获取以 @ 开头的用户名
        for (const str of split) {
            if (str.startsWith('@')) {
                return str.split('@')[1];
            }
        }
        // 获取自定义的用户名
        for (const str of split) {
            // hostname
            if (str.endsWith('.fanbox.cc')) {
                return str.split('.')[0];
            }
        }
        throw new Error('GetCreatorId error!');
    }
    // 用 creatorId（用户名） 获取 userId
    static async getUserId(creatorId) {
        const baseURL = `https://api.fanbox.cc/creator.get?creatorId=${creatorId}`;
        const res = (await this.request(baseURL));
        return res.body.user.userId;
    }
    /**获取赞助的用户的文章列表 */
    static async getPostListSupporting(limit = 10, maxPublishedDatetime = '', maxId = '') {
        const baseURL = 'https://api.fanbox.cc/post.listSupporting';
        const url = this.assembleURL(baseURL, {
            limit,
            maxPublishedDatetime,
            maxId,
        });
        return this.request(url);
    }
    static async getPostListByUser(creatorId, limit = 10, maxPublishedDatetime = '', maxId = '') {
        const baseURL = `https://api.fanbox.cc/post.listCreator?creatorId=${creatorId}`;
        const url = this.assembleURL(baseURL, {
            limit,
            maxPublishedDatetime,
            maxId,
            withPinned: 'true',
        });
        return this.request(url);
    }
    static async getTagPostListByUser(userId, tag) {
        const url = `https://api.fanbox.cc/post.listTagged?tag=${tag}&userId=${userId}`;
        return this.request(url);
    }
    static async getPost(postId) {
        const url = `https://api.fanbox.cc/post.info?postId=${postId}`;
        return this.request(url);
    }
}



/***/ }),

/***/ "./src/ts/BG.ts":
/*!**********************!*\
  !*** ./src/ts/BG.ts ***!
  \**********************/
/*! exports provided: bg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bg", function() { return bg; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/IndexedDB */ "./src/ts/utils/IndexedDB.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");




class BG {
    constructor() {
        this.list = [];
        this.bgModeflagClassName = 'xzBG';
        this.bgLayerClassName = 'xzBGLayer';
        this.bgUrl = '';
        this.DBName = 'PFDBG';
        this.DBVer = 1;
        this.storeName = 'bg';
        this.keyName = 'bg';
        // 在数据库升级事件里创建表
        this.onUpdate = (db) => {
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, {
                    keyPath: 'key',
                });
            }
        };
        this.IDB = new _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_2__["IndexedDB"]();
        this.initDB();
        this.bindEvents();
    }
    async initDB() {
        // 如果用户没有启用“背景图片”，就不会创建数据库
        // 因为大部分用户都不会启用此功能，所以没必要创建数据库
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].bgDisplay) {
            await this.IDB.open(this.DBName, this.DBVer, this.onUpdate);
            this.restore();
        }
    }
    createBGLayer(wrap) {
        const div = document.createElement('div');
        div.classList.add(this.bgLayerClassName);
        const el = wrap.insertAdjacentElement('afterbegin', div);
        return el;
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.selectBG, () => {
            this.selectBG();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.clearBG, () => {
            this.clearBG();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'bgDisplay') {
                this.setBGAll();
                if (data.value) {
                    this.initDB();
                }
            }
            if (data.name === 'bgOpacity') {
                this.setBGAll();
            }
            if (data.name === 'bgPositionY') {
                this.setBGAll();
            }
        });
    }
    async restore() {
        const data = (await this.IDB.get(this.storeName, this.keyName));
        if (!data || !data.file) {
            return;
        }
        this.bgUrl = URL.createObjectURL(data.file);
        this.preload();
    }
    async selectBG() {
        const file = (await _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].selectFile('.jpg,.jpeg,.png,.bmp,.webp'))[0];
        this.bgUrl = URL.createObjectURL(file);
        this.preload();
        for (const o of this.list) {
            this.setBG(o);
        }
        const data = {
            key: this.keyName,
            file: file,
        };
        const test = await this.IDB.get(this.storeName, this.keyName);
        this.IDB[test ? 'put' : 'add'](this.storeName, data);
    }
    clearBG() {
        this.IDB.clear(this.storeName);
        this.bgUrl = '';
        for (const o of this.list) {
            o.bg.style.backgroundImage = 'none';
            this.setDisplay(o);
        }
    }
    // 预加载背景图片
    preload() {
        // 由于浏览器的工作原理，背景图片在未被显示之前是不会加载的，在显示时才会进行加载。这会导致背景层显示之后出现短暂的空白（因为在加载图片）。为了避免空白，需要预加载图片
        const img = new Image();
        img.src = this.bgUrl;
        img.style.display = 'none';
        document.body.append(img);
    }
    async setBG(o) {
        this.setPositionY(o);
        this.setOpacity(o);
        this.setBGURL(o);
        this.setDisplay(o);
    }
    async setBGAll() {
        for (const o of this.list) {
            this.setPositionY(o);
            this.setOpacity(o);
            this.setBGURL(o);
            this.setDisplay(o);
        }
    }
    setBGURL(o) {
        o.bg.style.backgroundImage = `url(${this.bgUrl})`;
    }
    setDisplay(o) {
        o.bg.style.display = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].bgDisplay ? 'block' : 'none';
        if (!this.bgUrl) {
            o.wrap.classList.remove(this.bgModeflagClassName);
        }
        else {
            o.wrap.classList[_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].bgDisplay ? 'add' : 'remove'](this.bgModeflagClassName);
        }
    }
    setOpacity(o) {
        o.bg.style.opacity = (o.opacity || _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].bgOpacity / 100).toString();
    }
    setPositionY(o) {
        o.bg.style.backgroundPositionY = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].bgPositionY;
    }
    // 其他模块可以调用这个方法，为一个元素添加背景层
    // 如果传入一个真值的不透明度，会始终使用传入的不透明度，忽略用户用户设置的不透明度
    useBG(wrap, opacity) {
        if (this.bgUrl) {
            this.readySet(wrap, opacity);
        }
        else {
            let timer = window.setInterval(() => {
                if (this.bgUrl) {
                    window.clearInterval(timer);
                    this.readySet(wrap);
                }
            }, 300);
        }
    }
    readySet(wrap, opacity) {
        const o = {
            wrap,
            bg: this.createBGLayer(wrap),
            opacity,
        };
        this.list.push(o);
        this.setBG(o);
    }
}
const bg = new BG();



/***/ }),

/***/ "./src/ts/BoldKeywords.ts":
/*!********************************!*\
  !*** ./src/ts/BoldKeywords.ts ***!
  \********************************/
/*! exports provided: BoldKeywords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoldKeywords", function() { return BoldKeywords; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");


class BoldKeywords {
    constructor(wrap) {
        this.className = 'showBlobKeywords';
        this.wrap = wrap;
        this.bindEvent();
        this.setClassName();
    }
    bindEvent() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'boldKeywords') {
                this.setClassName();
            }
        });
    }
    setClassName() {
        this.wrap.classList[_setting_Settings__WEBPACK_IMPORTED_MODULE_1__["settings"].boldKeywords ? 'add' : 'remove'](this.className);
    }
}



/***/ }),

/***/ "./src/ts/CenterPanel.ts":
/*!*******************************!*\
  !*** ./src/ts/CenterPanel.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _OpenCenterPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpenCenterPanel */ "./src/ts/OpenCenterPanel.ts");
/* harmony import */ var _BG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BG */ "./src/ts/BG.ts");
/* harmony import */ var _BoldKeywords__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BoldKeywords */ "./src/ts/BoldKeywords.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./States */ "./src/ts/States.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");
// 用户界面








// 中间面板
class CenterPanel {
    constructor() {
        this.centerPanel = document.createElement('div'); // 中间面板
        this.allLangFlag = [];
        this.addCenterPanel();
        _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].register(this.centerPanel);
        _BG__WEBPACK_IMPORTED_MODULE_3__["bg"].useBG(this.centerPanel);
        new _BoldKeywords__WEBPACK_IMPORTED_MODULE_4__["BoldKeywords"](this.centerPanel);
        this.allLangFlag = _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].langTypes.map((type) => 'lang_' + type);
        this.setLangFlag();
        this.bindEvents();
    }
    // 添加中间面板
    addCenterPanel() {
        const centerPanelHTML = `
      <div class="centerWrap ${'lang_' + _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].type}">

      <div class="centerWrap_head">
      <div class="centerWrap_title blue">
      ${_Config__WEBPACK_IMPORTED_MODULE_7__["Config"].appName}
      <div class="btns">
      <a class="has_tip centerWrap_top_btn" data-xztip="_github" href="https://github.com/xuejianxianzun/PixivFanboxDownloader" target="_blank">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github"></use>
      </svg>
      </a>
      
      <button class="textButton has_tip centerWrap_top_btn centerWrap_close" data-xztip="_隐藏下载面板" data-xztitle="_隐藏下载面板">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanbi"></use>
      </svg>
      </button>

      </div>
      </div>

      </div>

      <div class="centerWrap_con beautify_scrollbar">
      <slot data-name="form"></slot>

      <div class="help_bar gray1"> 
      <button class="textButton gray1" id="showDownTip" type="button" data-xztext="_常见问题"></button>
      <a class="gray1" href="https://discord.gg/u4wVMy7xJM" target="_blank">Discord</a>
      <a class="gray1" href="https://chrome.google.com/webstore/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank" data-xztext="_pixivDownloader"></a>
      <button class="textButton gray1" id="showPatronTip" type="button" data-xztext="_赞助我"></button>
      </div>
      
      </div>

      </div>
      `;
        document.body.insertAdjacentHTML('beforebegin', centerPanelHTML);
        this.centerPanel = document.querySelector('.centerWrap');
    }
    setLangFlag() {
        this.allLangFlag.forEach((flag) => {
            this.centerPanel.classList.remove(flag);
        });
        this.centerPanel.classList.add('lang_' + _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].type);
    }
    // 绑定中间面板上的事件
    bindEvents() {
        // 监听点击扩展图标的消息，开关中间面板
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.msg === 'click_icon') {
                this.toggle();
            }
        });
        // 使用快捷键 Alt + x 切换中间面板显示隐藏
        window.addEventListener('keydown', (ev) => {
            if (ev.altKey && ev.code === 'KeyX') {
                this.toggle();
            }
        }, false);
        // 关闭按钮
        document
            .querySelector('.centerWrap_close')
            .addEventListener('click', () => {
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('closeCenterPanel');
        });
        // 开始抓取作品时，隐藏
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlStart, () => {
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('closeCenterPanel');
        });
        // 抓取完作品详细数据时，显示
        for (const ev of [_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlFinish, _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.resume]) {
            window.addEventListener(ev, () => {
                if (!_States__WEBPACK_IMPORTED_MODULE_5__["states"].quickCrawl) {
                    this.show();
                }
            });
        }
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.openCenterPanel, () => {
            this.show();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.closeCenterPanel, () => {
            this.close();
        });
        // 显示常见问题
        this.centerPanel
            .querySelector('#showDownTip')
            .addEventListener('click', () => {
            let msg = _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_常见问题说明') + _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_账户可能被封禁的警告');
            if (_Config__WEBPACK_IMPORTED_MODULE_7__["Config"].mobile) {
                msg =
                    msg + '<br><br>' + _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_移动端浏览器可能不会建立文件夹的说明');
            }
            _MsgBox__WEBPACK_IMPORTED_MODULE_6__["msgBox"].show(msg, {
                title: _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_常见问题'),
            });
        });
        this.centerPanel
            .querySelector('#showPatronTip')
            .addEventListener('click', () => _MsgBox__WEBPACK_IMPORTED_MODULE_6__["msgBox"].show(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_赞助方式提示'), {
            title: _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_赞助我'),
        }));
        this.centerPanel.addEventListener('click', (e) => {
            const ev = e || window.event;
            ev.stopPropagation();
        });
        document.addEventListener('click', () => {
            if (getComputedStyle(this.centerPanel)['display'] !== 'none') {
                _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('closeCenterPanel');
            }
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.langChange, () => {
            this.setLangFlag();
        });
    }
    // 显示中间区域
    show() {
        this.centerPanel.style.display = 'block';
        _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('centerPanelOpened');
    }
    // 隐藏中间区域
    close() {
        this.centerPanel.style.display = 'none';
        _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('centerPanelClosed');
    }
    toggle() {
        const nowDisplay = this.centerPanel.style.display;
        nowDisplay === 'block' ? this.close() : this.show();
        if (nowDisplay === 'block') {
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('closeCenterPanel');
        }
        else {
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('openCenterPanel');
        }
    }
}
new CenterPanel();


/***/ }),

/***/ "./src/ts/CheckUnsupportBrowser.ts":
/*!*****************************************!*\
  !*** ./src/ts/CheckUnsupportBrowser.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");



// 某些国产套壳浏览器不能正常使用本程序。如果检测到该浏览器，则显示提示
// 相关文档： notes/一些国产套壳浏览器使用本程序的情况.md
class CheckUnsupportBrowser {
    constructor() {
        this.rules = {
            // "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36 SE 2.X MetaSr 1.0"
            Sougou: function () {
                return navigator.userAgent.includes(' SE ');
            },
            // "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3872.400 QQBrowser/10.8.4455.400"
            QQ: function () {
                return navigator.userAgent.includes('QQBrowser');
            },
            // "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3947.100 Safari/537.36 2345Explorer/10.21.0.21486"
            '2345': function () {
                return navigator.userAgent.includes('2345Explorer');
            },
            All: function () {
                // 如果这个浏览器的 Chrome 内核的版本号较低，也会显示提示
                // 为什么设置为 88：
                // 1. 下载器使用的 Manifest V2 需要的内核版本最低为 79
                // 2. Cent 浏览器的内核版本是 86，但它即使使用 V2，仍然会在转换 GIF 时出现问题，所以需要提高版本号
                // 3. 未来升级到 Manifest V3 需要的内核版本最低为 88
                const minChromeVer = 88;
                const test = navigator.userAgent.match(/Chrome\/(\d*)/);
                if (test && test[1]) {
                    const ver = Number.parseInt(test[1]);
                    if (ver < minChromeVer) {
                        return true;
                    }
                }
                return false;
            },
        };
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingInitialized, () => {
            this.check();
        });
    }
    check() {
        for (const func of Object.values(this.rules)) {
            if (func()) {
                const msg = _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_不支持的浏览器');
                _Log__WEBPACK_IMPORTED_MODULE_2__["log"].error(msg);
                // msgBox.error(msg)
                return;
            }
        }
        if (navigator.userAgent.includes('YaBrowser')) {
            _Log__WEBPACK_IMPORTED_MODULE_2__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_yandex浏览器的警告'));
        }
    }
}
new CheckUnsupportBrowser();


/***/ }),

/***/ "./src/ts/Colors.ts":
/*!**************************!*\
  !*** ./src/ts/Colors.ts ***!
  \**************************/
/*! exports provided: Colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
var Colors;
(function (Colors) {
    // 通用颜色
    Colors["white"] = "#fff";
    Colors["black"] = "#000";
    Colors["red"] = "#f00";
    Colors["theme"] = "#0ea8ef";
    // 带有语义的字体颜色
    Colors["textSuccess"] = "#00BD17";
    Colors["textWarning"] = "#d27e00";
    Colors["textError"] = "#f00";
    // 背景颜色
    // 稍暗，适合在颜色区域的面积较大时使用
    Colors["bgBlue"] = "#0ea8ef";
    Colors["bgGreen"] = "#14ad27";
    Colors["bgYellow"] = "#e49d00";
    Colors["bgRed"] = "#f33939";
    // 带有语义的背景颜色
    // 稍亮，适合在小区域使用
    Colors["bgBrightBlue"] = "#29b3f3";
    Colors["bgSuccess"] = "#00BD17";
    Colors["bgWarning"] = "#e49d00";
    Colors["bgError"] = "#f00";
})(Colors || (Colors = {}));



/***/ }),

/***/ "./src/ts/Config.ts":
/*!**************************!*\
  !*** ./src/ts/Config.ts ***!
  \**************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
// 储存一些配置
// 用户不可以修改这里的配置
class Config {
}
/**使用输出面板显示内容时，如果文件数量大于这个值，就不再显示内容，而是保存到 txt 文件 */
Config.outputMax = 5000;
/**同时下载的文件数量的最大值 */
Config.downloadThreadMax = 3;
/**下载某个文件出错时，最大重试次数 */
Config.retryMax = 10;
/**程序名 */
Config.appName = 'Pixiv Fanbox Downloader';
/**下载器设置在 localStorage 里储存时的 name */
Config.settingStoreName = 'fanboxSetting';
/**文件类型。fanbox 允许直接上传在投稿里的文件类型只有这些。现在没有 bmp 格式了，不过以前文章里上传的文件还会保留，所以这里也不要删除 */
Config.fileType = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    music: ['wav', 'mp3', 'flac'],
    video: ['mp4', 'mov', 'avi'],
    compressed: ['zip'],
    ps: ['psd', 'clip'],
    other: ['txt', 'pdf'],
};
/**默认的命名规则 */
Config.defaultNameRule = '{user}/{date}-{title}/{index}';
Config.defaultNameRuleForNonImages = '{user}/{date}-{title}/{name}';
/**浏览器是否处于移动端模式 */
Config.mobile = navigator.userAgent.includes('Mobile');



/***/ }),

/***/ "./src/ts/EVT.ts":
/*!***********************!*\
  !*** ./src/ts/EVT.ts ***!
  \***********************/
/*! exports provided: EVT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVT", function() { return EVT; });
// 管理自定义事件
class EVENT {
    constructor() {
        this.bindOnceFlagList = [];
        this.list = {
            crawlStart: 'crawlStart',
            crawlFinish: 'crawlFinish',
            crawlEmpty: 'crawlEmpty',
            crawlError: 'crawlError',
            addResult: 'addResult',
            downloadStart: 'downloadStart',
            downloadPause: 'downloadPause',
            downloadStop: 'downloadStop',
            download: 'download',
            downloadSuccess: 'downloadSuccess',
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
            convertError: 'convertError',
            skipDownload: 'skipDownload',
            resetSettings: 'resetSettings',
            exportSettings: 'exportSettings',
            importSettings: 'importSettings',
            settingInitialized: 'settingInitialized',
            resetSettingsEnd: 'resetSettingsEnd',
            pageSwitchedTypeChange: 'pageSwitchedTypeChange',
            pageSwitchedTypeNotChange: 'pageSwitchedTypeNotChange',
            openCenterPanel: 'openCenterPanel',
            closeCenterPanel: 'closeCenterPanel',
            centerPanelOpened: 'centerPanelOpened',
            centerPanelClosed: 'centerPanelClosed',
            showMsg: 'showMsg',
            langChange: 'langChange',
            selectBG: 'selectBG',
            clearBG: 'clearBG',
            wrongSetting: 'wrongSetting',
            clearLog: 'clearLog',
            quickCrawl: 'quickCrawl',
            importDownloadRecord: 'importDownloadRecord',
            exportDownloadRecord: 'exportDownloadRecord',
            clearDownloadRecord: 'clearDownloadRecord',
            resume: 'resume',
            clearSavedCrawl: 'clearSavedCrawl',
        };
    }
    // 只绑定某个事件一次，用于防止事件重复绑定
    // 通过 flag 确认是否是同一个事件
    // 可以执行多次，不会自动解绑
    bindOnce(flag, targetEvt, evtFun) {
        const query = this.bindOnceFlagList.includes(flag);
        if (!query) {
            this.bindOnceFlagList.push(flag);
            window.addEventListener(targetEvt, function (ev) {
                evtFun(ev);
            });
        }
    }
    fire(type, data = '') {
        const event = new CustomEvent(type, {
            detail: { data: data },
        });
        window.dispatchEvent(event);
    }
}
const EVT = new EVENT();



/***/ }),

/***/ "./src/ts/FileName.ts":
/*!****************************!*\
  !*** ./src/ts/FileName.ts ***!
  \****************************/
/*! exports provided: fileName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileName", function() { return fileName; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/ts/Store.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _utils_DateFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/DateFormat */ "./src/ts/utils/DateFormat.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");






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
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.previewFileName, () => {
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
    // 生成 {index} 标记的值
    createIndex(data) {
        let index = data.index.toString();
        // 处理在前面填充 0 的情况
        return _setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].zeroPadding
            ? index.padStart(_setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].zeroPaddingLength, '0')
            : index;
    }
    getNameRule(data) {
        if (_Config__WEBPACK_IMPORTED_MODULE_5__["Config"].fileType.image.includes(data.ext.toLowerCase())) {
            return _setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].userSetName || _Config__WEBPACK_IMPORTED_MODULE_5__["Config"].defaultNameRule;
        }
        else {
            return _setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].nameruleForNonImages || _Config__WEBPACK_IMPORTED_MODULE_5__["Config"].defaultNameRuleForNonImages;
        }
    }
    // 生成文件名，传入参数为图片信息
    getFileName(data) {
        let result = this.getNameRule(data);
        // 配置所有命名标记
        const cfg = {
            '{postid}': {
                value: data.postId,
                safe: true,
            },
            '{post_id}': {
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
                value: this.createIndex(data),
                safe: false,
            },
            '{tags}': {
                value: data.tags,
                safe: false,
            },
            '{date}': {
                value: _utils_DateFormat__WEBPACK_IMPORTED_MODULE_3__["DateFormat"].format(data.date, _setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].dateFormat),
                safe: false,
            },
            '{task_date}': {
                value: _utils_DateFormat__WEBPACK_IMPORTED_MODULE_3__["DateFormat"].format(_Store__WEBPACK_IMPORTED_MODULE_1__["store"].date, _setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].dateFormat),
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
            '{create_id}': {
                value: data.createID,
                safe: true,
            },
            '{uid}': {
                value: data.uid,
                safe: true,
            },
            '{user_id}': {
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
        if (_Store__WEBPACK_IMPORTED_MODULE_1__["store"].result.length === 0) {
            return alert(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_没有数据可供使用'));
        }
        // 使用数组储存和拼接字符串，提高性能
        const resultArr = [];
        let result = '';
        const length = _Store__WEBPACK_IMPORTED_MODULE_1__["store"].result.length;
        if (length < _Config__WEBPACK_IMPORTED_MODULE_5__["Config"].outputMax) {
            for (let i = 0; i < length; i++) {
                const data = _Store__WEBPACK_IMPORTED_MODULE_1__["store"].result[i];
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
                const nowResult = `<p class="result">${fullNameHtml}</p>`;
                resultArr.push(nowResult);
            }
            // 拼接所有结果
            result = resultArr.join('');
        }
        else {
            // 不生成 html 标签，只生成纯文本，保存为 txt 文件
            for (let i = 0; i < length; i++) {
                const data = _Store__WEBPACK_IMPORTED_MODULE_1__["store"].result[i];
                const fullName = this.getFileName(data);
                resultArr.push(fullName);
            }
            result = resultArr.join('\n');
        }
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('output', {
            content: result,
            title: '_预览文件名',
        });
    }
}
const fileName = new FileName();



/***/ }),

/***/ "./src/ts/Filter.ts":
/*!**************************!*\
  !*** ./src/ts/Filter.ts ***!
  \**************************/
/*! exports provided: filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");






// 审查每个文件的数据，决定是否要下载它
class Filter {
    constructor() {
        this.bindEvents();
    }
    // 对启用了的过滤选项显示提示
    showTip() {
        this.getFeeType();
        this.getFeeRange();
        this.getIdRange();
        this.getPostDate();
        this.getTitleMustText();
        this.getTitleCannotText();
        this.getFileNameIncludes();
        this.getFileNameExcludes();
    }
    getFeeType() {
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].free && _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].pay) {
            return;
        }
        let msg = '';
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].free) {
            msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_费用类型')}: ${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_免费投稿')}`;
        }
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].pay) {
            msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_费用类型')}: ${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_付费投稿')}`;
        }
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    getFeeRange() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].feeSwitch) {
            return;
        }
        const msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_价格范围')}: ${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_最小值')} ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fee}¥`;
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    // 提示 id 范围设置
    getIdRange() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRangeSwitch) {
            return;
        }
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(`id ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRange} ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRangeInput}`);
    }
    // 提示投稿时间设置
    getPostDate() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDate) {
            return;
        }
        if (isNaN(_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateStart) || isNaN(_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateStart)) {
            const msg = _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_日期时间格式错误');
            this.showWarning(msg);
        }
        else {
            const start = new Date(_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateStart).toLocaleString();
            const end = new Date(_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateEnd).toLocaleString();
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(`${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_时间范围')}: ${start} - ${end}`);
        }
    }
    getTitleMustText() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleMustTextSwitch) {
            return;
        }
        const msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_投稿标题必须含有文字')}: ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleMustText.toString()}`;
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    getTitleCannotText() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleCannotTextSwitch) {
            return;
        }
        const msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_投稿标题不能含有文字')}: ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleCannotText.toString()}`;
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    getFileNameIncludes() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameIncludeSwitch ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameInclude.length === 0) {
            return;
        }
        const msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_文件名中必须含有文字')}: ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameInclude.toString()}`;
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    getFileNameExcludes() {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExcludeSwitch ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExclude.length === 0) {
            return;
        }
        const msg = `${_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_文件名中不能含有文字')}: ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExclude.toString()}`;
        _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(msg);
    }
    /**生成文章的 URL */
    createPostURL(option) {
        if (option.creatorId && option.id) {
            return `<a href="https://www.fanbox.cc/@${option.creatorId}/posts/${option.id}" target="_blank">${option.title}</a>`;
        }
        return option.title;
    }
    // 检查投稿是否符合过滤器的要求
    // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
    check(option) {
        if (!this.checkFileType(option.ext)) {
            return false;
        }
        if (!this.checkfeeType(option.fee)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_费用类型'));
            return false;
        }
        if (!this.checkfeeRange(option.fee)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_价格范围'));
            return false;
        }
        if (!this.checkIdRange(option.id)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_id范围'));
            return false;
        }
        if (!this.checkPostDate(option.date)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_投稿时间'));
            return false;
        }
        if (!this.checkTitltMustText(option.title)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_投稿标题必须含有文字'));
            return false;
        }
        if (!this.checkTitltCannotText(option.title)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', this.createPostURL(option)) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_投稿标题不能含有文字'));
            return false;
        }
        if (!this.checkFileNameInclude(option.name)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', `${option.name}.${option.ext}`) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_文件名中必须含有文字') +
                ': ' +
                _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameInclude.join(','));
            return false;
        }
        if (!this.checkFileNameExclude(option.name)) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_跳过文章因为', `${option.name}.${option.ext}`) +
                _Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_文件名中不能含有文字') +
                ': ' +
                _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExclude.join(','));
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
        for (const [key, value] of Object.entries(_Config__WEBPACK_IMPORTED_MODULE_2__["Config"].fileType)) {
            if (value.includes(ext)) {
                return _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"][key];
            }
        }
        // 如果这个 ext 不存在任何规定的类型里，则把它当作 other 类型，决定是否保留
        return _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].other;
    }
    checkfeeType(fee) {
        if (fee === undefined) {
            return true;
        }
        if (fee > 0) {
            return _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].pay;
        }
        else {
            return _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].free;
        }
    }
    checkfeeRange(fee) {
        if (fee === undefined || !_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].feeSwitch) {
            return true;
        }
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].feeRange === '>=') {
            return fee >= _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fee;
        }
        else {
            return fee === _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fee;
        }
    }
    checkIdRange(id) {
        if (id === undefined || !_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRangeSwitch) {
            return true;
        }
        const nowId = parseInt(id.toString());
        const setId = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRangeInput;
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].idRange === '>') {
            return nowId > setId;
        }
        else {
            return nowId < setId;
        }
    }
    checkPostDate(date) {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDate ||
            date === undefined ||
            !_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateStart ||
            !_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateEnd) {
            return true;
        }
        const nowDate = new Date(date);
        return (nowDate.getTime() >= _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateStart &&
            nowDate.getTime() <= _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].postDateEnd);
    }
    checkTitltMustText(title) {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleMustTextSwitch ||
            !title ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleMustText.length === 0) {
            return true;
        }
        title = title.toLowerCase();
        const match = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleMustText.filter((str) => title.includes(str.toLowerCase()));
        if (match.length === 0) {
            return false;
        }
        return true;
    }
    checkTitltCannotText(title) {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleCannotTextSwitch ||
            !title ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleCannotText.length === 0) {
            return true;
        }
        title = title.toLowerCase();
        const match = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].titleCannotText.filter((str) => title.includes(str.toLowerCase()));
        if (match.length > 0) {
            return false;
        }
        return true;
    }
    checkFileNameInclude(name) {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameIncludeSwitch ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameInclude.length === 0 ||
            !name) {
            return true;
        }
        const find = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameInclude.some((str) => name.toLowerCase().includes(str.toLowerCase()));
        return find;
    }
    checkFileNameExclude(name) {
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExcludeSwitch ||
            _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExclude.length === 0 ||
            !name) {
            return true;
        }
        const find = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].fileNameExclude.some((str) => name.toLowerCase().includes(str.toLowerCase()));
        return !find;
    }
    // 如果设置项的值不合法，则显示提示
    showWarning(msg) {
        _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('wrongSetting');
        _MsgBox__WEBPACK_IMPORTED_MODULE_4__["msgBox"].error(msg);
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlStart, () => {
            this.showTip();
        });
    }
}
const filter = new Filter();



/***/ }),

/***/ "./src/ts/FormHTML.ts":
/*!****************************!*\
  !*** ./src/ts/FormHTML.ts ***!
  \****************************/
/*! exports provided: formHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formHtml", function() { return formHtml; });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");

// 已使用的最大编号为 56
const formHtml = `<form class="settingForm">
    <p class="option" data-no="2">
    <span class="settingNameStyle1" data-xztext="_文件类型"></span>

    <input type="checkbox" name="image" id="fileType1" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType1" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.image.join()}" data-xztext="_图片"></label>
    
    <input type="checkbox" name="music" id="fileType2" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType2" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.music.join()}" data-xztext="_音乐"></label>

    <input type="checkbox" name="video" id="fileType3" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType3" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.video.join()}" data-xztext="_视频"></label>
    
    <input type="checkbox" name="compressed" id="fileType4" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType4" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.compressed.join()}" data-xztext="_压缩文件"></label>
    
    <input type="checkbox" name="ps" id="fileType5" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType5" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.ps.join()}" data-xztext="_PS文件"></label>

    <input type="checkbox" name="other" id="fileType6" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="fileType6" class="has_tip" data-tip="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].fileType.other.join()}" data-xztext="_其他"></label>
    </p>

    <p class="option" data-no="21">
    <span class="settingNameStyle1" data-xztext="_费用类型"></span>

    <input type="checkbox" name="free" id="postType1" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="postType1" data-xztext="_免费投稿"></label>

    <input type="checkbox" name="pay" id="postType2" class="need_beautify checkbox_common" checked>
    <span class="beautify_checkbox"></span>
    <label for="postType2" data-xztext="_付费投稿"></label>
    </p>

    <p class="option" data-no="9">
    <span class="settingNameStyle1" data-xztext="_价格范围"></span>
    <input type="checkbox" name="feeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="feeSwitch">

    <input type="radio" name="feeRange" id="feeRange1" class="need_beautify radio" value=">=" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="feeRange1">&gt;=</label>

    <input type="radio" name="feeRange" id="feeRange2" class="need_beautify radio" value="=">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="feeRange2">=</label>
    
    <input type="text" name="fee" class="setinput_style1 blue" value="500"> ¥

    </span>
    </p>
    
    <p class="option" data-no="7">
    <span class="has_tip settingNameStyle1" data-xztip="_设置id范围提示">
    <span data-xztext="_id范围"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="idRangeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="idRangeSwitch">
    <input type="radio" name="idRange" id="idRange2" class="need_beautify radio" value="<" checked>
    <span class="beautify_radio"></span>
    <label for="idRange2" data-xztext="_小于"></label>
    <input type="radio" name="idRange" id="idRange1" class="need_beautify radio" value=">">
    <span class="beautify_radio"></span>
    <label for="idRange1" data-xztext="_大于"></label>
    <input type="text" name="idRangeInput" class="setinput_style1 w100 blue" value="0">
    </span>
    </p>

    <p class="option" data-no="10">
    <span class="has_tip settingNameStyle1" data-xztip="_设置投稿时间提示">
    <span data-xztext="_投稿时间"></span>
    <span class="gray1"> ? </span>
    </span>

    <input type="checkbox" name="postDate" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="postDate">
    <input type="datetime-local" name="postDateStart" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
    &nbsp;-&nbsp;
    <input type="datetime-local" name="postDateEnd" placeholder="yyyy-MM-dd HH:mm" class="setinput_style1 postDate blue" value="">
    </span>
    </p>

    <p class="option" data-no="19">
    <span class="settingNameStyle1" data-xztext="_保存投稿中的外部链接"></span>
    <input type="checkbox" name="saveLink" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>
    
    <p class="option" data-no="22">
    <span class="settingNameStyle1" data-xztext="_保存投稿中的封面图片"></span>
    <input type="checkbox" name="savePostCover" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="20">
    <span class="settingNameStyle1" data-xztext="_保存投稿中的文字"></span>
    <input type="checkbox" name="saveText" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="23">
    <span class="has_tip settingNameStyle1" data-xztip="_多条文字用逗号分割">
    <span data-xztext="_投稿标题必须含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="titleMustTextSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="titleMustTextSwitch">
    <input type="text" name="titleMustText" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="24">
    <span class="has_tip settingNameStyle1" data-xztip="_多条文字用逗号分割">
    <span data-xztext="_投稿标题不能含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="titleCannotTextSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="titleCannotTextSwitch">
    <input type="text" name="titleCannotText" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="54">
    <span class="has_tip settingNameStyle1" data-xztip="_文件指的是附件">
    <span data-xztext="_文件名中必须含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="fileNameIncludeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="fileNameIncludeSwitch">
    <span data-xztext="_任一"></span>
    <input type="text" name="fileNameInclude" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <p class="option" data-no="55">
    <span class="has_tip settingNameStyle1" data-xztip="_文件指的是附件">
    <span data-xztext="_文件名中不能含有文字"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="fileNameExcludeSwitch" class="need_beautify checkbox_switch">
    <span class="beautify_switch"></span>
    <span class="subOptionWrap" data-show="fileNameExcludeSwitch">
    <span data-xztext="_任一"></span>
    <input type="text" name="fileNameExclude" class="setinput_style1 blue fileNameRule" value="" placeholder="text1,text2,text3">
    </span>
    </p>

    <slot data-name="crawlBtns" class="centerWrap_btns crawlBtns"></slot>
    <slot data-name="downloadArea"></slot>
    <slot data-name="progressBar"></slot>

    <p class="option" data-no="13">
      <span class="settingNameStyle1">
      <span data-xztext="_图片的命名规则"></span>
      </span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value="${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].defaultNameRule}">
      &nbsp;
      <select name="fileNameSelect" class="beautify_scrollbar">
        <option value="default">…</option>
        <option value="{user}">{user}</option>
        <option value="{create_id}">{create_id}</option>
        <option value="{user_id}">{user_id}</option>
        <option value="{title}">{title}</option>
        <option value="{post_id}">{post_id}</option>
        <option value="{date}">{date}</option>
        <option value="{task_date}">{task_date}</option>
        <option value="{index}">{index}</option>
        <option value="{name}">{name}</option>
        <option value="{ext}">{ext}</option>
        <option value="{fee}">{fee}</option>
        <option value="{tags}">{tags}</option>
        </select>
      &nbsp;
      <slot data-name="saveNamingRule"></slot>
      <button class="showFileNameTip textButton" type="button" data-xztext="_提示"></button>
      </p>
      <p class="tip tipWithBtn" id="tipCreateFolder">
      <span class="left">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].defaultNameRule}</strong>
      </span>
      <span class="right">
        <button type="button" class="textButton gray1" id="tipCreateFolderBtn" data-xztext="_我知道了">
        </button>
      </span>
    </p>
    <p class="fileNameTip tip">
      <span data-xztext="_设置文件夹名的提示"></span>
      <strong>${_Config__WEBPACK_IMPORTED_MODULE_0__["Config"].defaultNameRule}</strong>
      <br>
      <span data-xztext="_命名标记提醒"></span>
      <br>
      <span class="blue">{user}</span>
    <span data-xztext="_命名标记user"></span>
      <br>
      <span class="blue">{create_id}</span>
    <span data-xztext="_命名标记create_id"></span>
      <br>
      <span class="blue">{user_id}</span>
    <span data-xztext="_命名标记uid"></span>
      <br>
      <span class="blue">{title}</span>
    <span data-xztext="_命名标记title"></span>
      <br>
      <span class="blue">{post_id}</span>
    <span data-xztext="_命名标记postid"></span>
      <br>
      <span class="blue">{date}</span>
    <span data-xztext="_命名标记date"></span>
      <br>
      <span class="blue">{task_date}</span>
    <span data-xztext="_命名标记taskDate"></span>
      <br>
      <span class="blue">{index}</span>
    <span data-xztext="_命名标记index"></span>
      <br>
      <span class="blue">{name}</span>
    <span data-xztext="_命名标记name"></span>
      <br>
      <span class="blue">{ext}</span>
    <span data-xztext="_命名标记ext"></span>
      <br>
      <span class="blue">{fee}</span>
    <span data-xztext="_命名标记fee"></span>
      <br>
      <span class="blue">{tags}</span>
    <span data-xztext="_命名标记tags"></span>
    </p>
    
    <p class="option" data-no="33">
    <span class="settingNameStyle1" data-xztext="_非图片的命名规则"></span>
    <input type="text" name="nameruleForNonImages" class="setinput_style1 blue nameruleForNonImages" style="width:300px;" value="{user}/{date}-{title}/{name}">
    </p>

    <p class="option" data-no="31">
    <span class="settingNameStyle1" data-xztext="_日期格式"></span>
    <input type="text" name="dateFormat" class="setinput_style1 blue" style="width:250px;" value="YYYY-MM-DD">
    <button type="button" class="gray1 textButton showDateTip" data-xztext="_提示"></button>
    </p>
    <p class="dateFormatTip tip" style="display:none">
    <span data-xztext="_日期格式提示"></span>
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

    <p class="option" data-no="46">
    <span class="has_tip settingNameStyle1" data-xztip="_在序号前面填充0的说明">
    <span data-xztext="_在序号前面填充0"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="zeroPadding" class="need_beautify checkbox_switch" >
    <span class="beautify_switch" tabindex="0"></span>
    <span class="subOptionWrap" data-show="zeroPadding">
    <span data-xztext="_序号总长度"></span>
    <input type="text" name="zeroPaddingLength" class="setinput_style1 blue" value="3" style="width:30px;min-width: 30px;">
    </span>
    </p>

    <p class="option" data-no="17">
    <span class="has_tip settingNameStyle1" data-xztip="_自动下载的提示">
    <span data-xztext="_自动开始下载"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="autoStartDownload" id="setQuietDownload" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>

    <p class="option" data-no="16">
    <span class="has_tip settingNameStyle1"  data-xztip="_线程数字">
    <span data-xztext="_下载线程"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="text" name="downloadThread" class="has_tip setinput_style1 blue" data-xztip="_线程数字" value="3">
    </p>

    <p class="option" data-no="52">
    <span class="has_tip settingNameStyle1"  data-xztip="_下载完成后显示通知的说明">
    <span data-xztext="_下载完成后显示通知"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="showNotificationAfterDownloadComplete" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>
    
    <p class="option" data-no="56">
    <span class="has_tip settingNameStyle1"  data-xztip="_下载间隔的说明">
    <span data-xztext="_下载间隔"></span>
    <span class="gray1"> ? </span>
    </span>
    
    <span data-xztext="_间隔时间"></span>
    <input type="text" name="downloadInterval" class="setinput_style1 blue" value="1">
    <span data-xztext="_秒"></span>
    </span>
    </p>
      
    <p class="option" data-no="28">
    <span class="has_tip settingNameStyle1" data-xztip="_不下载重复文件的提示">
    <span data-xztext="_不下载重复文件"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="deduplication" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    <span class="subOptionWrap" data-show="deduplication">
    <button class="textButton gray1" type="button" id="exportDownloadRecord" data-xztext="_导出"></button>
    <button class="textButton gray1" type="button" id="importDownloadRecord" data-xztext="_导入"></button>
    <button class="textButton gray1" type="button" id="clearDownloadRecord" data-xztext="_清除"></button>
    </span>
    <button class="textButton gray1" type="button" id="deduplicationHelp" data-xztext="_提示"></button>
    </p>

    <p class="option" data-no="18">
    <span class="has_tip settingNameStyle1" data-xztip="_统一网址格式的说明">
    <span data-xztext="_统一网址格式"></span>
    <span class="gray1"> ? </span>
    </span>
    <input type="checkbox" name="unifiedURL" class="need_beautify checkbox_switch" checked>
    <span class="beautify_switch"></span>
    </p>
      
    <p class="option" data-no="53">
    <span class="settingNameStyle1" data-xztext="_高亮显示关键字"></span>
    <input type="checkbox" name="boldKeywords" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>

    <p class="option" data-no="41">
    <span class="settingNameStyle1" data-xztext="_背景图片"> </span>
    <input type="checkbox" name="bgDisplay" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>

    <span class="subOptionWrap" data-show="bgDisplay">

    <button class="textButton gray1" type="button" id="selectBG" data-xztext="_选择文件"></button>
    <button class="textButton gray1" type="button" id="clearBG" data-xztext="_清除"></button>
    
    &nbsp;
    <span data-xztext="_对齐方式"></span>&nbsp;
    <input type="radio" name="bgPositionY" id="bgPosition1" class="need_beautify radio" value="center" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="bgPosition1" data-xztext="_居中"></label>
    <input type="radio" name="bgPositionY" id="bgPosition2" class="need_beautify radio" value="top">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="bgPosition2" data-xztext="_顶部"></label>
    <span data-xztext="_不透明度"></span>&nbsp;
    <input name="bgOpacity" type="range" />
    </span>
    </p>
    
    <p class="option" data-no="32">
    <span class="settingNameStyle1"><span class="key">Language</span></span>
    <input type="radio" name="userSetLang" id="userSetLang1" class="need_beautify radio" value="auto" checked>
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang1" data-xztext="_自动检测"></label>
    <input type="radio" name="userSetLang" id="userSetLang2" class="need_beautify radio" value="zh-cn">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang2">简体中文</label>
    <input type="radio" name="userSetLang" id="userSetLang3" class="need_beautify radio" value="zh-tw">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang3">繁體中文</label>
    <input type="radio" name="userSetLang" id="userSetLang4" class="need_beautify radio" value="ja">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang4">日本語</label>
    <input type="radio" name="userSetLang" id="userSetLang5" class="need_beautify radio" value="en">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang5">English</label>
    <input type="radio" name="userSetLang" id="userSetLang6" class="need_beautify radio" value="ko">
    <span class="beautify_radio" tabindex="0"></span>
    <label for="userSetLang6">한국어</label>
    </p>

    <p class="option" data-no="37">
    <span class="settingNameStyle1" data-xztext="_管理设置"></span>
    <button class="textButton gray1" type="button" id="exportSettings" data-xztext="_导出设置"></button>
    <button class="textButton gray1" type="button" id="importSettings" data-xztext="_导入设置"></button>
    <button class="textButton gray1" type="button" id="resetSettings" data-xztext="_重置设置"></button>
    </p>
    
    <p class="option" data-no="51">
    <span class="has_tip settingNameStyle1" data-xztip="_显示高级设置说明">
    <span data-xztext="_显示高级设置"></span>
    <span class="gray1"> ? </span></span>
    <input type="checkbox" name="showAdvancedSettings" class="need_beautify checkbox_switch">
    <span class="beautify_switch" tabindex="0"></span>
    </p>

</form>`;


/***/ }),

/***/ "./src/ts/InitHomePage.ts":
/*!********************************!*\
  !*** ./src/ts/InitHomePage.ts ***!
  \********************************/
/*! exports provided: InitHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitHomePage", function() { return InitHomePage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/API.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PageType */ "./src/ts/PageType.ts");








class InitHomePage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.crawlFlag = 'supporting';
        this.init();
    }
    // 添加中间按钮
    addCrawlBtns() {
        if (_PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].type === _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].list.Home ||
            _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].type === _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].list.Supporting) {
            _Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].bgBlue, '_抓取赞助的所有用户的投稿').addEventListener('click', () => {
                this.crawlFlag = 'supporting';
                this.readyCrawl();
            });
        }
        if (_PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].type === _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].list.Home ||
            _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].type === _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].list.Following) {
            _Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].bgBlue, '_抓取关注的所有用户的投稿').addEventListener('click', () => {
                const confirm = window.confirm(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取关注的所有用户的投稿的提示'));
                if (!confirm) {
                    return;
                }
                this.crawlFlag = 'following';
                this.readyCrawl();
            });
        }
        if (_PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].type === _PageType__WEBPACK_IMPORTED_MODULE_7__["pageType"].list.Home) {
            _Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].bgGreen, '_清空已保存的抓取结果').addEventListener('click', () => {
                _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('clearSavedCrawl');
            });
        }
    }
    nextStep() {
        switch (this.crawlFlag) {
            case 'supporting':
                return this.getSupportingPostList();
            case 'following':
                return this.getFollowingPostList();
        }
    }
    /**获取赞助的所有用户的所有投稿 */
    async getSupportingPostList() {
        _Log__WEBPACK_IMPORTED_MODULE_6__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取赞助的所有用户的投稿'));
        let data;
        if (this.nextUrl) {
            data = (await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(this.nextUrl));
        }
        else {
            data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getPostListSupporting(300);
        }
        // 如果没有赞助任何创作者, 那么这里获取到的是空数据
        // {"body":{"items":[],"nextUrl":null}}
        if (data.body.items.length === 0 && data.body.nextUrl === null) {
            _Log__WEBPACK_IMPORTED_MODULE_6__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_没有赞助的用户'));
            return this.FetchPostListFinished();
        }
        this.afterFetchPostListOld(data);
    }
    /**获取关注的所有用户的所有投稿 */
    async getFollowingPostList() {
        var _a;
        _Log__WEBPACK_IMPORTED_MODULE_6__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取关注的所有用户的投稿'));
        // 获取关注的用户列表
        const url = 'https://api.fanbox.cc/creator.listFollowing';
        const json = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(url);
        if (((_a = json === null || json === void 0 ? void 0 : json.body) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const userList = json.body.map((user) => {
                return {
                    creatorId: user.creatorId,
                    name: user.user.name,
                };
            });
            _Log__WEBPACK_IMPORTED_MODULE_6__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_正在关注的创作者') + ':');
            // 获取每个作者的文章列表分页网址
            for (const user of userList) {
                _Log__WEBPACK_IMPORTED_MODULE_6__["log"].log(user.name);
                await this.getPostListURLs(user.creatorId);
            }
            // console.log(this.postListURLs)
            // 获取文章列表
            _Log__WEBPACK_IMPORTED_MODULE_6__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载器会减慢抓取速度以免被限制'));
            this.FetchPostList();
        }
        else {
            _Log__WEBPACK_IMPORTED_MODULE_6__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_没有找到关注的用户'));
            return this.FetchPostListFinished();
        }
    }
}



/***/ }),

/***/ "./src/ts/InitPage.ts":
/*!****************************!*\
  !*** ./src/ts/InitPage.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageType */ "./src/ts/PageType.ts");
/* harmony import */ var _InitHomePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InitHomePage */ "./src/ts/InitHomePage.ts");
/* harmony import */ var _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPostListPage */ "./src/ts/InitPostListPage.ts");
/* harmony import */ var _InitTagPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InitTagPage */ "./src/ts/InitTagPage.ts");
/* harmony import */ var _InitPostPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InitPostPage */ "./src/ts/InitPostPage.ts");
// 初始化页面，初始化抓取流程






class InitPage {
    constructor() {
        this.initPage();
        // 页面类型变化时，初始化抓取流程
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitchedTypeChange, () => {
            setTimeout(() => {
                this.initPage();
            }, 0);
        });
    }
    initPage() {
        switch (_PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].type) {
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.Home:
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.Supporting:
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.Following:
                return new _InitHomePage__WEBPACK_IMPORTED_MODULE_2__["InitHomePage"]();
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.UserHome:
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.UserPostList:
                return new _InitPostListPage__WEBPACK_IMPORTED_MODULE_3__["InitPostListPage"]();
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.Post:
                return new _InitPostPage__WEBPACK_IMPORTED_MODULE_5__["InitPostPage"]();
            case _PageType__WEBPACK_IMPORTED_MODULE_1__["pageType"].list.Tags:
                return new _InitTagPage__WEBPACK_IMPORTED_MODULE_4__["InitTagPage"]();
            default:
                return;
        }
    }
}
new InitPage();


/***/ }),

/***/ "./src/ts/InitPageBase.ts":
/*!********************************!*\
  !*** ./src/ts/InitPageBase.ts ***!
  \********************************/
/*! exports provided: InitPageBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPageBase", function() { return InitPageBase; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./src/ts/Filter.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ "./src/ts/Store.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _SaveData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SaveData */ "./src/ts/SaveData.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./API */ "./src/ts/API.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./States */ "./src/ts/States.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Toast */ "./src/ts/Toast.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
// 初始化抓取页面的流程












class InitPageBase {
    constructor() {
        this.crawlNumber = 0; // 要抓取的个数/页数
        this.nextUrl = null;
        /**并发请求数量 */
        this.getPostDataThreadMax = 1;
        this.getPostDataThreadNum = 0;
        this.getPostDatafinished = 0;
        this.postListURLs = [];
    }
    init() {
        this.addCrawlBtns();
        this.addAnyElement();
        this.initAny();
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].list.pageSwitchedTypeChange, () => {
            this.destroy();
        });
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].bindOnce('crawlCompleteTime', _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].list.crawlFinish, () => {
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].crawlCompleteTime = new Date().getTime();
        });
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].bindOnce('downloadCompleteTime', _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].list.downloadComplete, () => {
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].downloadCompleteTime = new Date().getTime();
        });
    }
    // 各个子类私有的初始化内容
    initAny() { }
    // 销毁初始化页面时添加的元素和事件，恢复设置项等
    destroy() {
        _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].clearSlot('crawlBtns');
    }
    // 添加中间按钮
    addCrawlBtns() { }
    // 添加其他元素（如果有）
    addAnyElement() { }
    confirmRecrawl() {
        if (_Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length > 0) {
            // 如果已经有抓取结果，则检查这些抓取结果是否已被下载过
            // 如果没有被下载过，则显示提醒
            if (_States__WEBPACK_IMPORTED_MODULE_8__["states"].crawlCompleteTime > _States__WEBPACK_IMPORTED_MODULE_8__["states"].downloadCompleteTime) {
                const _confirm = window.confirm(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_已有抓取结果时进行提醒'));
                return _confirm;
            }
        }
        return true;
    }
    // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
    async readyCrawl() {
        if (_States__WEBPACK_IMPORTED_MODULE_8__["states"].busy) {
            window.alert(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_当前任务尚未完成2'));
            return;
        }
        if (!this.confirmRecrawl()) {
            return;
        }
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('clearLog');
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_开始抓取'));
        _Toast__WEBPACK_IMPORTED_MODULE_10__["toast"].show(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_开始抓取'));
        _MsgBox__WEBPACK_IMPORTED_MODULE_9__["msgBox"].resetOnce('tipLinktext');
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('crawlStart');
        this.getPostDataThreadNum = 0;
        this.getPostDatafinished = 0;
        this.nextUrl = null;
        this.postListURLs = [];
        // 进入第一个抓取方法
        this.nextStep();
    }
    // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取文章列表。如有不同，由子类自行修改
    nextStep() {
        this.FetchPostList();
    }
    /**获取一个作者的文章列表分页网址 */
    // 获取分页数据，然后构造出每次请求该作者 300 篇文章的 URL
    async getPostListURLs(creatorId) {
        const paginateData = await _API__WEBPACK_IMPORTED_MODULE_7__["API"].request(`https://api.fanbox.cc/post.paginateCreator?creatorId=${creatorId}`);
        // console.log(paginateData.body)
        if ((paginateData === null || paginateData === void 0 ? void 0 : paginateData.body.length) > 0) {
            // 分页数据里的 URL 格式如下：
            // https://api.fanbox.cc/post.listCreator?creatorId=usotukiya&maxPublishedDatetime=2024-08-04%2020%3A41%3A47&maxId=8345112&limit=10
            // 每次可以获取 10 个文章的数据，但是 limit 的最大值是 300，可以一次获取 300 篇文章的数据
            // 所以下面每隔 30 个网址保存一次，并把 limit 改成 300
            let index = 0;
            const total = paginateData.body.length;
            while (index < total) {
                const url = paginateData.body[index];
                this.postListURLs.push(url.replace('limit=10', 'limit=300'));
                index = index + 30;
            }
            // this.postListURLs.forEach(url => console.log(url))
        }
    }
    /**获取文章列表数据。如果传入了 URL，则是为了重试抓取该 URL */
    async FetchPostList(url) {
        await _States__WEBPACK_IMPORTED_MODULE_8__["states"].awaitNextCrawl();
        if (url === undefined) {
            url = this.postListURLs.shift();
            if (url === undefined) {
                _Log__WEBPACK_IMPORTED_MODULE_4__["log"].error(`Error in crawling: internal error \n FetchPostList url is undefined\n End Crawling`);
                return this.FetchPostListFinished();
            }
        }
        try {
            const data = (await _API__WEBPACK_IMPORTED_MODULE_7__["API"].request(url));
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].addNextCrawlTime();
            this.afterFetchPostList(data);
        }
        catch (error) {
            console.log(error);
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].addNextCrawlTime('long');
            this.FetchPostList(url);
        }
    }
    /**保存符合过滤条件的文章的 ID，之后会抓取这些文章的详细数据 */
    afterFetchPostList(data) {
        if (data.body.length === 0) {
            return this.noResult();
        }
        for (const item of data.body) {
            if (item.body === null) {
                continue;
            }
            // 对投稿进行检查，决定是否保留它
            const id = item.id;
            const creatorId = item.creatorId;
            const fee = item.feeRequired;
            const date = item.publishedDatetime;
            const title = item.title;
            const check = _Filter__WEBPACK_IMPORTED_MODULE_2__["filter"].check({ id, creatorId, fee, date, title });
            if (check) {
                _Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.push(id);
            }
        }
        if (this.postListURLs.length > 0) {
            this.FetchPostList();
        }
        else {
            this.FetchPostListFinished();
        }
    }
    afterFetchPostListOld(data) {
        if (data.body.items.length === 0) {
            return this.noResult();
        }
        const items = data.body.items;
        this.nextUrl = data.body.nextUrl;
        for (const item of items) {
            if (item.body === null) {
                continue;
            }
            // 针对投稿进行检查，决定是否保留它
            const id = item.id;
            const creatorId = item.creatorId;
            const fee = item.feeRequired;
            const date = item.publishedDatetime;
            const title = item.title;
            const check = _Filter__WEBPACK_IMPORTED_MODULE_2__["filter"].check({ id, creatorId, fee, date, title });
            if (check) {
                _Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.push(id);
            }
        }
        if (this.nextUrl) {
            this.FetchPostList();
        }
        else {
            this.FetchPostListFinished();
        }
    }
    /**获取了要抓取的文章的 ID 列表之后，开始抓取每个文章的详细数据 */
    FetchPostListFinished() {
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_列表页抓取完成'));
        if (_Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.length === 0) {
            return this.noResult();
        }
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_当前有x个投稿', _Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.length.toString()));
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_开始获取投稿信息'));
        for (let i = 0; i < this.getPostDataThreadMax; i++) {
            const postId = _Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.shift();
            if (postId) {
                this.getPostDataThreadNum++;
                this.fetchPost(postId);
            }
            else {
                break;
            }
        }
    }
    async fetchPost(postId) {
        await _States__WEBPACK_IMPORTED_MODULE_8__["states"].awaitNextCrawl();
        try {
            const data = await _API__WEBPACK_IMPORTED_MODULE_7__["API"].getPost(postId);
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].addNextCrawlTime();
            this.afterFetchPost(data);
        }
        catch (error) {
            console.log(error);
            _States__WEBPACK_IMPORTED_MODULE_8__["states"].addNextCrawlTime('long');
            this.fetchPost(postId);
        }
    }
    afterFetchPost(data) {
        _SaveData__WEBPACK_IMPORTED_MODULE_6__["saveData"].receive(data.body);
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].log(`${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_待处理')} ${_Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.length}`, 1, false);
        // 当抓取完一个文章之后，如果还有等待抓取的文章就继续抓取
        // 否则当前抓取线程结束。等待所有抓取线程完成之后，文章数据就全部获取了
        const postId = _Store__WEBPACK_IMPORTED_MODULE_3__["store"].postIdList.shift();
        if (postId) {
            this.fetchPost(postId);
        }
        else {
            this.getPostDatafinished++;
            if (this.getPostDatafinished == this.getPostDataThreadNum) {
                this.crawlFinished();
            }
        }
    }
    // 抓取完毕
    crawlFinished() {
        if (_Store__WEBPACK_IMPORTED_MODULE_3__["store"].skipDueToFee > 0) {
            _Log__WEBPACK_IMPORTED_MODULE_4__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_因为价格限制而跳过的投稿数量') + _Store__WEBPACK_IMPORTED_MODULE_3__["store"].skipDueToFee);
        }
        if (_Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length === 0) {
            return this.noResult();
        }
        // 把抓取结果按照 postid 升序排列
        _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.sort(_utils_Utils__WEBPACK_IMPORTED_MODULE_11__["Utils"].sortByProperty('postId', 'asc'));
        _Store__WEBPACK_IMPORTED_MODULE_3__["store"].date = new Date();
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取文件数量', _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length.toString()));
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取完毕'), 2);
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('crawlFinish');
        // console.log(store.result)
    }
    // 抓取结果为 0 时输出提示
    noResult() {
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('crawlFinish');
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].fire('crawlEmpty');
        _Log__WEBPACK_IMPORTED_MODULE_4__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取结果为零'), 2);
        _MsgBox__WEBPACK_IMPORTED_MODULE_9__["msgBox"].error(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取结果为零'));
    }
}



/***/ }),

/***/ "./src/ts/InitPostListPage.ts":
/*!************************************!*\
  !*** ./src/ts/InitPostListPage.ts ***!
  \************************************/
/*! exports provided: InitPostListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPostListPage", function() { return InitPostListPage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/API.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");






class InitPostListPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    addCrawlBtns() {
        _Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].bgBlue, '_抓取该用户的投稿').addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    async nextStep() {
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取该用户的投稿'));
        this.postListURLs = [];
        const creatorId = _API__WEBPACK_IMPORTED_MODULE_4__["API"].getCreatorId(location.href);
        await this.getPostListURLs(creatorId);
        _Log__WEBPACK_IMPORTED_MODULE_5__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载器会减慢抓取速度以免被限制'));
        this.FetchPostList();
    }
}



/***/ }),

/***/ "./src/ts/InitPostPage.ts":
/*!********************************!*\
  !*** ./src/ts/InitPostPage.ts ***!
  \********************************/
/*! exports provided: InitPostPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitPostPage", function() { return InitPostPage; });
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./API */ "./src/ts/API.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./States */ "./src/ts/States.ts");







class InitPostPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_2__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    addCrawlBtns() {
        _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].bgBlue, '_抓取这篇投稿').addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    initAny() {
        _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].bindOnce('quickCrawl', _EVT__WEBPACK_IMPORTED_MODULE_5__["EVT"].list.quickCrawl, () => {
            if (!_States__WEBPACK_IMPORTED_MODULE_6__["states"].busy) {
                this.readyCrawl();
            }
        });
    }
    destroy() {
        _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].clearSlot('crawlBtns');
    }
    nextStep() {
        this.getPostDataThreadNum = 1;
        this.fetchPost();
    }
    async fetchPost() {
        await _States__WEBPACK_IMPORTED_MODULE_6__["states"].awaitNextCrawl();
        try {
            const data = await _API__WEBPACK_IMPORTED_MODULE_3__["API"].getPost(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__["Utils"].getURLPathField(window.location.pathname, 'posts'));
            _States__WEBPACK_IMPORTED_MODULE_6__["states"].addNextCrawlTime();
            this.afterFetchPost(data);
        }
        catch (error) {
            console.log(error);
            _States__WEBPACK_IMPORTED_MODULE_6__["states"].addNextCrawlTime('long');
            this.fetchPost();
        }
    }
}



/***/ }),

/***/ "./src/ts/InitTagPage.ts":
/*!*******************************!*\
  !*** ./src/ts/InitTagPage.ts ***!
  \*******************************/
/*! exports provided: InitTagPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitTagPage", function() { return InitTagPage; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _InitPageBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InitPageBase */ "./src/ts/InitPageBase.ts");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ "./src/ts/API.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");







class InitTagPage extends _InitPageBase__WEBPACK_IMPORTED_MODULE_3__["InitPageBase"] {
    constructor() {
        super();
        this.init();
    }
    // 添加中间按钮
    addCrawlBtns() {
        _Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].addBtn('crawlBtns', _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].bgBlue, '_抓取该tag的投稿').addEventListener('click', () => {
            this.readyCrawl();
        });
    }
    async FetchPostList() {
        _Log__WEBPACK_IMPORTED_MODULE_6__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_抓取该tag的投稿'));
        let data;
        if (this.nextUrl) {
            data = (await _API__WEBPACK_IMPORTED_MODULE_4__["API"].request(this.nextUrl));
        }
        else {
            data = await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getTagPostListByUser(await _API__WEBPACK_IMPORTED_MODULE_4__["API"].getUserId(_API__WEBPACK_IMPORTED_MODULE_4__["API"].getCreatorId(location.href)), _utils_Utils__WEBPACK_IMPORTED_MODULE_5__["Utils"].getURLPathField(window.location.pathname, 'tags'));
        }
        this.afterFetchPostListOld(data);
    }
}



/***/ }),

/***/ "./src/ts/Lang.ts":
/*!************************!*\
  !*** ./src/ts/Lang.ts ***!
  \************************/
/*! exports provided: lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lang", function() { return lang; });
/* harmony import */ var _langText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./langText */ "./src/ts/langText.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");


// 语言类
class Lang {
    constructor() {
        this.langTypes = ['zh-cn', 'zh-tw', 'en', 'ja', 'ko'];
        this.flagIndex = new Map([
            ['zh-cn', 0],
            ['zh-tw', 1],
            ['en', 2],
            ['ja', 3],
            ['ko', 4],
        ]);
        // 保存注册的元素
        // 在注册的元素里设置特殊的标记，让本模块可以动态更新其文本
        this.elList = [];
        this.type = this.getHtmlLangType();
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name !== 'userSetLang') {
                return;
            }
            const old = this.type;
            this.type = data.value === 'auto' ? this.getHtmlLangType() : data.value;
            if (this.type !== old) {
                _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].fire('langChange');
                this.elList.forEach((el) => {
                    this.handleMark(el);
                });
            }
        });
    }
    // 获取页面使用的语言，返回语言标记
    getHtmlLangType() {
        const flag = document.documentElement.lang;
        switch (flag) {
            case 'zh':
            case 'zh-CN':
            case 'zh-Hans':
                return 'zh-cn'; // 简体中文
            case 'ja':
                return 'ja'; // 日本語
            case 'zh-Hant':
            case 'zh-tw':
            case 'zh-TW':
                return 'zh-tw'; // 繁體中文
            case 'ko':
                return 'ko'; // 한국어
            default:
                return 'en'; // English
        }
    }
    // translate
    transl(name, ...arg) {
        let content = _langText__WEBPACK_IMPORTED_MODULE_0__["langText"][name][this.flagIndex.get(this.type)];
        arg.forEach((val) => (content = content.replace('{}', val)));
        return content;
    }
    register(el) {
        this.elList.push(el);
        this.handleMark(el);
    }
    // 查找元素上的标记，设置其文本和属性
    handleMark(wrap) {
        // 设置 innerHTML
        const textEl = wrap.querySelectorAll('*[data-xztext]');
        for (const el of textEl) {
            // 因为有些文本中含有 html 标签，所以这里需要使用 innerHTML 而不是 textContent
            el.innerHTML = this.transl(el.dataset.xztext);
        }
        // 元素自身存在 xztext 标记的情况
        const text = wrap.dataset.xztext;
        if (text) {
            wrap.innerHTML = this.transl(text);
        }
        // 设置带参数的 innerHTML
        const textArgsEl = wrap.querySelectorAll('*[data-xztextargs]');
        textArgsEl.forEach((el) => this.handleTextArgs(el));
        // 元素自身存在 xztextargs 标记的情况
        const textargs = wrap.dataset.xztextargs;
        if (textargs) {
            this.handleTextArgs(wrap);
        }
        // 设置 tip
        const tipEl = wrap.querySelectorAll('*[data-xztip]');
        for (const el of tipEl) {
            el.dataset.tip = this.transl(el.dataset.xztip);
        }
        // 设置 placeholder
        const placeholderEl = wrap.querySelectorAll('*[data-xzplaceholder]');
        for (const el of placeholderEl) {
            el.setAttribute('placeholder', this.transl(el.dataset.xzplaceholder));
        }
        // 设置 title
        const titleEl = wrap.querySelectorAll('*[data-xztitle]');
        for (const el of titleEl) {
            el.setAttribute('title', this.transl(el.dataset.xztitle));
        }
        // 元素自身存在 title 标记的情况
        const title = wrap.dataset.xztitle;
        if (title) {
            wrap.setAttribute('title', this.transl(title));
        }
    }
    handleTextArgs(el) {
        let args = el.dataset.xztextargs.split(',');
        const first = args.shift();
        el.innerHTML = this.transl(first, ...args);
    }
    // 需要更新已注册元素的文本时调用此方法
    updateText(el, ...args) {
        // 清空文本的情况
        if (args === undefined || args[0] === '') {
            delete el.dataset.xztext;
            delete el.dataset.xztextargs;
            el.innerHTML = '';
            return;
        }
        // 设置文本
        if (args.length === 1) {
            // 无参数文本
            el.dataset.xztext = args[0];
            el.innerHTML = this.transl(args[0]);
            delete el.dataset.xztextargs;
        }
        else {
            // 有参数文本
            el.dataset.xztextargs = args.join(',');
            const first = args.shift();
            el.innerHTML = this.transl(first, ...args);
            delete el.dataset.xztext;
        }
    }
}
const lang = new Lang();



/***/ }),

/***/ "./src/ts/ListenPageSwitch.ts":
/*!************************************!*\
  !*** ./src/ts/ListenPageSwitch.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");

// 监听页面的无刷新切换
class ListenPageSwitch {
    constructor() {
        this.supportListenHistory();
        this.listenPageSwitch();
    }
    // 为监听 url 变化的事件提供支持
    supportListenHistory() {
        const s = document.createElement('script');
        const url = chrome.runtime.getURL('lib/listen_history_change.js');
        s.src = url;
        document.head.appendChild(s);
    }
    // 无刷新切换页面时派发事件
    listenPageSwitch() {
        // 点击浏览器的前进或后退按钮会触发 popstate 事件
        // 点击链接进入一个 url 不同的页面是 pushState 操作
        // 现在还没有遇到 replaceState 操作
        ;
        ['pushState', 'popstate', 'replaceState'].forEach((item) => {
            window.addEventListener(item, () => {
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('pageSwitch');
            });
        });
    }
}
new ListenPageSwitch();


/***/ }),

/***/ "./src/ts/Log.ts":
/*!***********************!*\
  !*** ./src/ts/Log.ts ***!
  \***********************/
/*! exports provided: log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");


// 日志
class Log {
    constructor() {
        /**每个日志区域显示多少条日志 */
        // 如果日志条数超出最大值，下载器会创建多个日志区域
        this.max = 100;
        /**最新的日志区域里的日志条数。刷新的日志不会计入 */
        this.count = 0;
        this.logWrap = document.createElement('div'); // 日志容器的区域，当日志条数很多时，会产生多个日志容器。默认是隐藏的（display: none）
        this.activeLogWrapID = 'logWrap'; // 当前活跃的日志容器的 id，也是最新的一个日志容器
        this.logContent = document.createElement('div'); // 日志的主体区域，始终指向最新的那个日志容器内部
        this.logContentClassName = 'logContent'; // 日志主体区域的类名
        this.logWrapClassName = 'logWrap'; // 日志容器的类名，只负责样式
        this.logWrapFlag = 'logWrapFlag'; // 日志容器的标志，当需要查找日志区域时，使用这个类名而不是 logWrap，因为其他元素可能也具有 logWrap 类名，以应用其样式。
        /**储存会刷新的日志所使用的元素，可以传入 flag 来区分多个刷新区域 */
        // 每个刷新区域使用一个 span 元素，里面的文本会变化
        // 通常用于显示进度，例如 0/10, 1/10, 2/10... 10/10
        // 如果不传入 flag，那么所有的刷新内容会共用 default 的 span 元素
        this.refresh = {
            default: document.createElement('span'),
        };
        this.toBottom = false; // 指示是否需要把日志滚动到底部。当有日志被添加或刷新，则为 true。滚动到底部之后复位到 false，避免一直滚动到底部。
        /**不同日志等级的文字颜色 */
        this.levelColor = [
            'inherit',
            _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textSuccess,
            _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textWarning,
            _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textError,
        ];
        // 因为日志区域限制了最大高度，可能会出现滚动条
        // 所以使用定时器，使日志总是滚动到底部
        window.setInterval(() => {
            if (this.toBottom) {
                this.logContent.scrollTop = this.logContent.scrollHeight;
                this.toBottom = false;
            }
        }, 500);
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.clearLog, () => {
            this.removeAll();
        });
    }
    // 添加日志
    /*
    str 日志文本
    level 日志等级
    br 换行标签的个数
    keepShow 是否为持久日志。默认为 true，把这一条日志添加后不再修改。false 则会刷新显示这条日志。
  
    level 日志等级：
    0 normal
    1 success
    2 warning
    3 error
    */
    add(str, level, br, keepShow, refreshFlag = 'default') {
        this.createLogArea();
        let span = document.createElement('span');
        if (!keepShow) {
            if (this.refresh[refreshFlag] === undefined) {
                this.refresh[refreshFlag] = span;
            }
            else {
                span = this.refresh[refreshFlag];
            }
        }
        else {
            this.count++;
            // 如果页面上的日志条数超过指定数量，则生成一个新的日志区域
            // 因为日志数量太多的话会占用很大的内存。同时显示 8000 条日志可能占用接近 1 GB 的内存
            if (this.count >= this.max) {
                // 移除 id 属性，也就是 this.activeLogWrapID
                // 下次输出日志时查找不到这个 id，就会新建一个日志区域
                this.logWrap.removeAttribute('id');
                // 滚动到底部
                this.logContent.scrollTop = this.logContent.scrollHeight;
            }
        }
        span.innerHTML = str;
        span.style.color = this.levelColor[level];
        while (br > 0) {
            span.appendChild(document.createElement('br'));
            br--;
        }
        this.logContent.appendChild(span);
        this.toBottom = true; // 需要把日志滚动到底部
    }
    log(str, br = 1, keepShow = true, refreshFlag = 'default') {
        this.add(str, 0, br, keepShow, refreshFlag);
    }
    success(str, br = 1, keepShow = true, refreshFlag = 'default') {
        this.add(str, 1, br, keepShow, refreshFlag);
    }
    warning(str, br = 1, keepShow = true, refreshFlag = 'default') {
        this.add(str, 2, br, keepShow, refreshFlag);
    }
    error(str, br = 1, keepShow = true, refreshFlag = 'default') {
        this.add(str, 3, br, keepShow, refreshFlag);
    }
    /**将一条刷新的日志元素持久化 */
    // 例如当某个进度显示到 10/10 的时候，就不会再变化了，此时应该将其持久化
    // 其实就是下载器解除了对它的引用，这样它的内容就不会再变化了
    // 并且下载器会为这个 flag 生成一个新的 span 元素待用
    persistentRefresh(refreshFlag = 'default') {
        this.refresh[refreshFlag] = document.createElement('span');
    }
    /**创建新的日志区域 */
    createLogArea() {
        // 先检查是否存在日志区域
        let test = document.getElementById(this.activeLogWrapID);
        // 创建日志区域
        if (test === null) {
            this.count = 0;
            const logWrap = document.createElement('div');
            logWrap.id = this.activeLogWrapID;
            logWrap.classList.add(this.logWrapClassName, this.logWrapFlag);
            const logContent = document.createElement('div');
            logContent.classList.add(this.logContentClassName, 'beautify_scrollbar');
            logWrap.append(logContent);
            // 添加到 body 前面
            this.logWrap = logWrap;
            this.logContent = logContent;
            document.body.insertAdjacentElement('beforebegin', this.logWrap);
        }
    }
    removeAll() {
        const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`);
        allLogWrap.forEach((wrap) => wrap.remove());
        this.count = 0;
    }
    showAll() {
        const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`);
        allLogWrap.forEach((wrap) => {
            wrap.style.display = 'block';
            // 把内容滚动到底部
            const logContent = wrap.querySelector(`.${this.logContentClassName}`);
            if (logContent) {
                logContent.scrollTop = logContent.scrollHeight;
            }
        });
    }
    hideAll() {
        const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`);
        allLogWrap.forEach((wrap) => (wrap.style.display = 'none'));
    }
}
const log = new Log();



/***/ }),

/***/ "./src/ts/MsgBox.ts":
/*!**************************!*\
  !*** ./src/ts/MsgBox.ts ***!
  \**************************/
/*! exports provided: msgBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msgBox", function() { return msgBox; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _BG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BG */ "./src/ts/BG.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");





// 简单的消息框
class MsgBox {
    constructor() {
        this.typeColor = {
            success: _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textSuccess,
            warning: _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textWarning,
            error: _Colors__WEBPACK_IMPORTED_MODULE_1__["Colors"].textError,
        };
        this.onceFlags = [];
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.showMsg, (ev) => {
            const msg = ev.detail.data;
            this.create(msg);
        });
    }
    /** 在当前标签页中只会显示一次的消息
     */
    once(flag, msg, type = 'show', arg) {
        if (this.onceFlags.includes(flag)) {
            return;
        }
        this.onceFlags.push(flag);
        switch (type) {
            case 'show':
                this.show(msg, arg);
                break;
            case 'warning':
                this.warning(msg, arg);
                break;
            case 'success':
                this.success(msg, arg);
                break;
            case 'error':
                this.error(msg, arg);
                break;
            default:
                this.show(msg, arg);
                break;
        }
    }
    /**
     * 清除某个 once 标记，使其对应的消息可以再次显示
     */
    resetOnce(flag) {
        const index = this.onceFlags.findIndex((str) => str === flag);
        if (index > -1) {
            this.onceFlags.splice(index);
        }
    }
    show(msg, arg) {
        this.create(Object.assign({}, arg, { msg: msg }));
    }
    success(msg, arg) {
        this.create(Object.assign({ color: this.typeColor.success }, arg, { msg: msg }));
    }
    warning(msg, arg) {
        this.create(Object.assign({ color: this.typeColor.warning }, arg, { msg: msg }));
    }
    error(msg, arg) {
        this.create(Object.assign({ color: this.typeColor.error }, arg, { msg: msg }));
    }
    create(data) {
        const wrap = document.createElement('div');
        wrap.classList.add('xz_msg_box');
        let colorStyle = '';
        if (data.color) {
            colorStyle = `style="color:${data.color}"`;
        }
        wrap.innerHTML = `
        <p class="title" ${colorStyle}>${data.title || _Config__WEBPACK_IMPORTED_MODULE_4__["Config"].appName}</p>
        <p class="content" ${colorStyle}>${data.msg}</p>
        <button class="btn" type="button">${data.btn || _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_确定')}</button>
      `;
        _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].register(wrap);
        const btn = wrap.querySelector('.btn');
        if (btn) {
            wrap.addEventListener('click', (ev) => {
                ev.stopPropagation();
            });
            btn.addEventListener('click', () => {
                this.remove(wrap);
            });
            window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.closeCenterPanel, () => {
                this.remove(wrap);
            });
        }
        document.body.append(wrap);
        btn.focus();
        _BG__WEBPACK_IMPORTED_MODULE_3__["bg"].useBG(wrap);
    }
    remove(el) {
        el && el.parentNode && el.parentNode.removeChild(el);
    }
}
const msgBox = new MsgBox();



/***/ }),

/***/ "./src/ts/OpenCenterPanel.ts":
/*!***********************************!*\
  !*** ./src/ts/OpenCenterPanel.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");


// 页面右侧的按钮，点击可以打开中间面板
class OpenCenterPanel {
    constructor() {
        this.btn = document.createElement('button');
        this.addBtn();
        this.show();
        this.bindEvents();
    }
    addBtn() {
        this.btn = document.createElement('button');
        this.btn.classList.add('rightButton');
        this.btn.id = 'openCenterPanelBtn';
        this.btn.setAttribute('data-xztitle', '_显示下载面板');
        this.btn.innerHTML = `<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-dakai"></use>
</svg>`;
        document.body.append(this.btn);
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].register(this.btn);
    }
    bindEvents() {
        // 这里阻止事件冒泡是为了配合 CenterPanel 的“点击页面其他部分隐藏 CenterPanel”的效果
        this.btn.addEventListener('click', (e) => {
            const ev = e || window.event;
            ev.stopPropagation();
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('openCenterPanel');
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.centerPanelClosed, () => {
            this.show();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.centerPanelOpened, () => {
            this.hide();
        });
    }
    show() {
        this.btn.style.display = 'flex';
    }
    hide() {
        this.btn.style.display = 'none';
    }
}
new OpenCenterPanel();


/***/ }),

/***/ "./src/ts/OutputPanel.ts":
/*!*******************************!*\
  !*** ./src/ts/OutputPanel.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/ts/Store.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Toast */ "./src/ts/Toast.ts");







// 输出面板
class OutputPanel {
    constructor() {
        this.addOutPutPanel();
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].register(this.outputPanel);
        this.bindEvents();
    }
    bindEvents() {
        this.closeBtn.addEventListener('click', () => {
            this.close();
        });
        this.outputPanel.addEventListener('click', (e) => {
            const ev = e || window.event;
            ev.stopPropagation();
        });
        document.addEventListener('click', () => {
            if (this.outputPanel.style.display !== 'none') {
                this.close();
            }
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.closeCenterPanel, () => {
            this.close();
        });
        // 复制输出内容
        this.copyBtn.addEventListener('click', () => {
            const range = document.createRange();
            range.selectNodeContents(this.outputContent);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            _Toast__WEBPACK_IMPORTED_MODULE_6__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_已复制到剪贴板'));
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.output, (ev) => {
            this.output(ev.detail.data);
        });
    }
    addOutPutPanel() {
        const html = `
    <div class="outputWrap">
    <div class="outputClose" data-xztitle="_关闭">×</div>
    <div class="outputTitle" data-xztext="_输出信息"></div>
    <div class="outputContent beautify_scrollbar"></div>
    <div class="outputFooter">
    <button class="outputCopy" data-xztext="_复制"></button>
    </div>
    </div>
    `;
        document.body.insertAdjacentHTML('beforebegin', html);
        this.outputPanel = document.querySelector('.outputWrap');
        this.outputTitle = this.outputPanel.querySelector('.outputTitle');
        this.outputContent = this.outputPanel.querySelector('.outputContent');
        this.copyBtn = this.outputPanel.querySelector('.outputCopy');
        this.closeBtn = this.outputPanel.querySelector('.outputClose');
    }
    // 输出内容
    output(data) {
        if (!data.content) {
            return _Toast__WEBPACK_IMPORTED_MODULE_6__["toast"].error(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_没有数据可供使用'));
        }
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length < _Config__WEBPACK_IMPORTED_MODULE_4__["Config"].outputMax) {
            this.copyBtn.disabled = false;
            _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.outputTitle, data.title);
            this.outputContent.innerHTML = data.content;
            this.outputPanel.style.display = 'block';
        }
        else {
            // 如果结果较多，则不直接输出，改为保存 txt 文件
            const file = new Blob([data.content], {
                type: 'text/plain',
            });
            const url = URL.createObjectURL(file);
            const fileName = `Output-${new Date().toLocaleString()}.txt`;
            _utils_Utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].downloadFile(url, fileName);
            this.copyBtn.disabled = true;
            _MsgBox__WEBPACK_IMPORTED_MODULE_5__["msgBox"].warning(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_输出内容太多已经为你保存到文件'));
        }
    }
    // 关闭输出面板
    close() {
        this.outputPanel.style.display = 'none';
        this.outputContent.innerHTML = '';
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.outputTitle, '_输出信息');
    }
}
new OutputPanel();


/***/ }),

/***/ "./src/ts/PageType.ts":
/*!****************************!*\
  !*** ./src/ts/PageType.ts ***!
  \****************************/
/*! exports provided: pageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageType", function() { return pageType; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
// 获取页面类型

// 所有页面类型及对应的数字编号
// 可以通过 pageType.list 使用
var PageName;
(function (PageName) {
    PageName[PageName["Unsupported"] = -1] = "Unsupported";
    PageName[PageName["Home"] = 0] = "Home";
    PageName[PageName["Supporting"] = 1] = "Supporting";
    PageName[PageName["UserHome"] = 2] = "UserHome";
    PageName[PageName["UserPostList"] = 3] = "UserPostList";
    PageName[PageName["Post"] = 4] = "Post";
    PageName[PageName["Tags"] = 5] = "Tags";
    PageName[PageName["Shop"] = 6] = "Shop";
    PageName[PageName["Following"] = 7] = "Following";
})(PageName || (PageName = {}));
class PageType {
    constructor() {
        this.type = 0;
        // 所有页面类型
        this.list = PageName;
        this.type = this.getType();
        // 页面切换时检查新旧页面是否不同
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitch, () => {
            this.checkTypeChange();
        });
    }
    getType() {
        const host = window.location.hostname;
        const path = window.location.pathname;
        const userPage = (!host.startsWith('www.') &&
            !host.startsWith('api.') &&
            !host.startsWith('downloads.')) ||
            path.startsWith('/@');
        if (host === 'www.fanbox.cc' && path === '/') {
            // https://www.fanbox.cc/
            // 自己主页
            return PageName.Home;
        }
        else if (path === '/creators/supporting') {
            // https://www.fanbox.cc/creators/supporting
            // 正在赞助的创作者
            return PageName.Supporting;
        }
        else if (path === '/creators/following') {
            // https://www.fanbox.cc/creators/following
            // 正在关注的创作者
            return PageName.Following;
        }
        else if (userPage &&
            !path.includes('/posts') &&
            !path.includes('/tags/') &&
            !path.includes('/shop')) {
            // https://kyomoneko.fanbox.cc/
            // https://www.fanbox.cc/@official
            // 画师主页
            return PageName.UserHome;
        }
        else if (userPage && path.endsWith('/posts')) {
            // https://kyomoneko.fanbox.cc/posts
            // https://www.fanbox.cc/@official/posts
            // 画师投稿列表页
            return PageName.UserPostList;
        }
        else if (userPage && path.includes('/posts/')) {
            // https://kyomoneko.fanbox.cc/posts/904593
            // https://www.fanbox.cc/@official/posts/996286
            // 投稿内容页
            return PageName.Post;
        }
        else if (userPage && path.includes('/tags/')) {
            // https://eto13.fanbox.cc/tags/%E5%8B%95%E7%94%BB
            // tag 页面
            return PageName.Tags;
        }
        else if (userPage && path.endsWith('/shop')) {
            // https://yajirushikey.fanbox.cc/shop
            // 商店页面
            return PageName.Shop;
        }
        else {
            // 没有匹配到可用的页面类型
            return PageName.Unsupported;
        }
    }
    // 页面切换时，检查页面类型是否变化
    checkTypeChange() {
        const old = this.type;
        this.type = this.getType();
        if (this.type !== old) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('pageSwitchedTypeChange', this.type);
        }
        else {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('pageSwitchedTypeNotChange', this.type);
        }
    }
}
const pageType = new PageType();



/***/ }),

/***/ "./src/ts/ProgressBar.ts":
/*!*******************************!*\
  !*** ./src/ts/ProgressBar.ts ***!
  \*******************************/
/*! exports provided: progressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progressBar", function() { return progressBar; });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/ts/Store.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");




class ProgressBar {
    constructor() {
        this.wrapHTML = `
  <div class="progressBarWrap">
  <div class="total">
  <span class="text" data-xztext="_下载进度"></span>
  <div class="right1">
  <div class="progressBar progressBar1">
  <div class="progress progress1"></div>
  </div>
  <div class="totalNumberWrap">
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
  <span class="fileName"></span>
  </div>
  </li>`;
        this.allProgressBar = [];
        this.wrap = _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].useSlot('progressBar', this.wrapHTML);
        this.downloadedEl = this.wrap.querySelector('.downloaded');
        this.progressColorEl = this.wrap.querySelector('.progress1');
        this.listWrap = this.wrap.querySelector('.progressBarList');
        this.totalNumberEl = this.wrap.querySelector('.totalNumber');
        _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].register(this.wrap);
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_3__["EVT"].list.crawlStart, () => {
            this.hide();
        });
    }
    // 重设所有进度
    reset(progressBarNum, downloaded = 0) {
        if (progressBarNum === 0) {
            // 如果进度条数量为 0（抓取结果为空），则隐藏进度条区域
            return this.hide();
        }
        // 重置总进度条
        this.setTotalProgress(downloaded);
        this.totalNumberEl.textContent = _Store__WEBPACK_IMPORTED_MODULE_0__["store"].result.length.toString();
        // 重置子进度条
        this.listWrap.innerHTML = this.barHTML.repeat(progressBarNum);
        this.show();
        // 保存子进度条上需要使用到的元素
        const allProgressBar = this.listWrap.querySelectorAll('.downloadBar');
        this.allProgressBar = [];
        for (const bar of allProgressBar) {
            const data = {
                name: bar.querySelector('.fileName'),
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
        const progress = data.loaded / data.total || 0; // 若结果为 NaN 则设为 0
        bar.progress.style.width = progress * 100 + '%';
    }
    // 让某个子进度条显示警告色
    showErrorColor(index, show) {
        const bar = this.allProgressBar[index];
        bar.name.classList[show ? 'add' : 'remove']('downloadError');
    }
    show() {
        this.wrap.style.display = 'block';
    }
    hide() {
        this.wrap.style.display = 'none';
    }
}
const progressBar = new ProgressBar();



/***/ }),

/***/ "./src/ts/QuickCrawl.ts":
/*!******************************!*\
  !*** ./src/ts/QuickCrawl.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageType */ "./src/ts/PageType.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./States */ "./src/ts/States.ts");




// 快速抓取
class QuickCrawl {
    constructor() {
        this.show = true; // 是否显示
        // 指定在哪些页面类型里启用
        this.enablePageType = [_PageType__WEBPACK_IMPORTED_MODULE_2__["pageType"].list.Post];
        this.addBtn();
        this.setVisible();
        this.bindEvents();
    }
    addBtn() {
        // 在右侧添加快速抓取按钮
        this.btn = document.createElement('button');
        this.btn.classList.add('rightButton');
        this.btn.id = 'quickCrawlBtn';
        this.btn.setAttribute('data-xztitle', '_快速下载本页');
        this.btn.innerHTML = `<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-download"></use>
</svg>`;
        document.body.append(this.btn);
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].register(this.btn);
    }
    bindEvents() {
        // 点击按钮启动快速抓取
        this.btn.addEventListener('click', () => {
            this.sendDownload();
        }, false);
        // 使用快捷键 Alt + q 启动快速抓取
        window.addEventListener('keydown', (ev) => {
            if (this.show && ev.altKey && ev.code === 'KeyQ') {
                this.sendDownload();
            }
        }, false);
        // 页面类型改变时设置按钮的显示隐藏
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitch, () => {
            this.setVisible();
        });
    }
    sendDownload() {
        _States__WEBPACK_IMPORTED_MODULE_3__["states"].quickCrawl = true;
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('quickCrawl');
    }
    setVisible() {
        this.show = this.enablePageType.includes(_PageType__WEBPACK_IMPORTED_MODULE_2__["pageType"].type);
        this.btn.style.display = this.show ? 'flex' : 'none';
    }
}
new QuickCrawl();


/***/ }),

/***/ "./src/ts/SaveData.ts":
/*!****************************!*\
  !*** ./src/ts/SaveData.ts ***!
  \****************************/
/*! exports provided: saveData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveData", function() { return saveData; });
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Filter */ "./src/ts/Filter.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/ts/Store.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");






class SaveData {
    constructor() {
        // 嵌入的文件只支持指定的网站，每个网站有固定的前缀
        this.providerDict = {
            youtube: 'https://www.youtube.com/watch?v=',
            fanbox: 'https://www.fanbox.cc/',
            gist: 'https://gist.github.com/',
            soundcloud: 'https://soundcloud.com/',
            vimeo: 'https://player.vimeo.com/video/',
            twitter: 'https://twitter.com/i/web/status/',
            google_forms: 'https://docs.google.com/forms/d/e/',
        };
        this.extractTextReg = new RegExp(/<[^<>]+>/g);
        this.matchImgSrc = new RegExp(/(?<=src=")https.*?(jpeg|jpg|png|gif|bmp)/g);
    }
    receive(data) {
        this.parsePost(data);
    }
    parsePost(data) {
        // 针对投稿进行检查，决定是否保留它
        const id = data.id;
        const creatorId = data.creatorId;
        const fee = data.feeRequired;
        const date = data.publishedDatetime;
        const title = data.title;
        const check = _Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({ id, creatorId, fee, date, title });
        if (!check) {
            return;
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
            createID: data.creatorId,
            tags: data.tags.join(','),
            files: [],
            textContent: {
                fileID: '',
                name: 'links-' + data.id,
                ext: 'txt',
                size: null,
                index: 0,
                text: [],
                url: '',
                retryUrl: null,
            },
        };
        // 提取它的资源文件，并对每个资源进行检查，决定是否保存
        let index = 0; // 资源的序号
        // 封面图和文本资源的序号是 0，其他文件的序号自增
        // 提取投稿的封面图片
        // 封面图片的序号设置为 0，所以它里面不需要对 index 进行操作
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].savePostCover) {
            const cover = data.coverImageUrl;
            if (cover) {
                const { name, ext } = this.getUrlNameAndExt(cover);
                const r = {
                    fileID: this.createFileId(),
                    name,
                    ext,
                    size: null,
                    index,
                    url: cover,
                    retryUrl: null,
                };
                result.files.push(r);
            }
        }
        // 对于因为价格限制不能抓取文章，在此时返回，但是会保存封面图
        if (data.body === null) {
            _Store__WEBPACK_IMPORTED_MODULE_1__["store"].skipDueToFee++;
            _Log__WEBPACK_IMPORTED_MODULE_3__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_跳过文章因为', `<a href="https://www.fanbox.cc/@${creatorId}/posts/${id}" target="_blank">${title}</a>`) +
                _Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_价格限制') +
                ` ${fee}`);
            if (result.files.length > 0) {
                _Store__WEBPACK_IMPORTED_MODULE_1__["store"].addResult(result);
            }
            return;
        }
        // 非 article 投稿都有 text 字段，这这里统一提取里面的链接
        // 但是因为正则没有分组，所以非 article 投稿中如果有多个链接，可能会有遗漏，待考
        // 提取文本中的链接有两种来源，一种是文章正文里的文本，一种是嵌入资源。先从正文提取链接，后提取嵌入资源的链接。这样链接保存下来的顺序比较合理。
        if (data.type !== 'article') {
            let text = '';
            if (data.type === 'entry') {
                text = data.body.html.replace(this.extractTextReg, '');
            }
            else {
                text = data.body.text;
            }
            if (text) {
                const links = this.getTextLinks(text);
                result.textContent.text = result.textContent.text.concat(links);
                result.textContent.fileID = this.createFileId();
                // 保存文章正文里的文字
                if (_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].saveText) {
                    result.textContent.text.push(text);
                }
            }
        }
        // 提取 article 投稿的资源
        if (data.type === 'article') {
            let linkTexts = [];
            let text = ''; // 正文文本
            for (const block of data.body.blocks) {
                if (block.type === 'p' || block.type === 'header') {
                    // 保存正文里的链接
                    // 文本里也可能有链接，稍后会尝试提取链接
                    block.text && linkTexts.push(block.text);
                    if (block.links && block.links.length > 0) {
                        // 保存链接
                        for (const links of block.links) {
                            linkTexts.push(links.url);
                        }
                    }
                    // 保存正文里的文字
                    if (block.text) {
                        if (block.type === 'p') {
                            // 在每个段落后面添加换行
                            text += block.text + '\r\n';
                        }
                        else if (block.type === 'header') {
                            // 对于标题文本，在其前后添加换行，以便和其他文本之间留出一定空白
                            text += `\r\n${block.text}\r\n\r\n`;
                        }
                    }
                    else if (block.text === '') {
                        // 空字符串在网页上渲染出来的表现是一个额外的空行，用于隔开段落。所以这里额外添加一个换行
                        text += '\r\n';
                    }
                }
            }
            for (const link of linkTexts) {
                const links = this.getTextLinks(link);
                result.textContent.text = result.textContent.text.concat(links);
                result.textContent.fileID = this.createFileId();
            }
            // 如果有链接，则添加一个空字符串，使其占据一行
            // 这样可以让链接和下面的正文部分之间有一个空行
            if (result.textContent.text.length > 0) {
                result.textContent.text.push('');
            }
            if (_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].saveText && text) {
                result.textContent.text.push(text);
            }
            // 保存图片资源
            for (const block of data.body.blocks) {
                if (block.type === 'image') {
                    const imageData = data.body.imageMap[block.imageId];
                    if (!imageData) {
                        continue;
                    }
                    index++;
                    const resource = this.getImageData(imageData, index);
                    resource !== null && result.files.push(resource);
                }
            }
            // 保存 file 资源
            for (const block of data.body.blocks) {
                if (block.type === 'file') {
                    const fileData = data.body.fileMap[block.fileId];
                    if (!fileData) {
                        continue;
                    }
                    index++;
                    const resource = this.getFileData(fileData, index);
                    resource !== null && result.files.push(resource);
                }
            }
            // 保存嵌入的资源，只能保存到文本
            const embedDataArr = [];
            for (const [id, embedData] of Object.entries(data.body.embedMap)) {
                embedDataArr.push([embedData.serviceProvider, embedData.contentId]);
            }
            const embedLinks = this.getEmbedLinks(embedDataArr, data.id);
            result.textContent.text = result.textContent.text.concat(embedLinks);
            result.textContent.fileID = this.createFileId();
            // 保存嵌入的 URL，只能保存到文本
            if (_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].saveLink) {
                const urlArr = [];
                for (const val of Object.values(data.body.urlEmbedMap)) {
                    if (val.type === 'default') {
                        urlArr.push(val.url);
                    }
                    else if (val.type === 'html' || val.type === 'html.card') {
                        // 尝试从 html 代码中提取 url
                        const testURL = val.html.match('iframe src="(http.*)"');
                        if (testURL && testURL.length > 1) {
                            let url = testURL[1];
                            // 对 Google Drive 的链接进行特殊处理，将其从转换后的嵌入网址还原为原始网址
                            if (url.includes('preview?usp=embed_googleplus')) {
                                url = url.replace('preview?usp=embed_googleplus', 'edit?usp=drive_link');
                            }
                            if (url.includes('embeddedfolderview?id=')) {
                                url = url
                                    .replace('embeddedfolderview?id=', 'drive/folders/')
                                    .replace('#list', '?usp=drive_link');
                            }
                            urlArr.push(url);
                        }
                        else {
                            urlArr.push(val.html);
                        }
                    }
                }
                if (urlArr.length > 0) {
                    result.textContent.text = result.textContent.text.concat(urlArr.join('\n\n'));
                    result.textContent.fileID = this.createFileId();
                }
            }
        }
        // 提取 image 投稿的资源
        if (data.type === 'image') {
            // 保存图片资源
            for (const imageData of data.body.images) {
                if (!imageData) {
                    continue;
                }
                index++;
                const resource = this.getImageData(imageData, index);
                resource !== null && result.files.push(resource);
            }
        }
        // 提取 entry 投稿的图片资源
        // 不知道此类型投稿中是否有其他类型的资源
        if (data.type === 'entry') {
            const LinkList = data.body.html.match(/<a.*?>/g);
            if (LinkList) {
                for (const a of LinkList) {
                    const matchUrl = a.match('https.*(jpeg|jpg|png|gif|bmp)');
                    if (!matchUrl) {
                        continue;
                    }
                    // 组合出 imageData，添加到结果中
                    index++;
                    const url = matchUrl[0];
                    const { name, ext } = this.getUrlNameAndExt(url);
                    let width = 0;
                    const widthMatch = a.match(/width="(\d*?)"/);
                    if (widthMatch && widthMatch.length > 1) {
                        width = parseInt(widthMatch[1]);
                    }
                    let height = 0;
                    const heightMatch = a.match(/height="(\d*?)"/);
                    if (heightMatch && heightMatch.length > 1) {
                        height = parseInt(heightMatch[1]);
                    }
                    const imageData = {
                        id: name,
                        extension: ext,
                        originalUrl: url,
                        thumbnailUrl: url,
                        width: width,
                        height: height,
                    };
                    const resource = this.getImageData(imageData, index);
                    resource !== null && result.files.push(resource);
                }
            }
        }
        // 提取 file 投稿的资源，也就是作者上传的附件
        if (data.type === 'file') {
            // 保存 file 资源
            for (const fileData of data.body.files) {
                if (!fileData) {
                    continue;
                }
                index++;
                const resource = this.getFileData(fileData, index);
                resource !== null && result.files.push(resource);
            }
        }
        // 提取 video 投稿的资源，注意这里的 video 是引用的外部网站的链接，不是作者上传的附件
        // video 数据保存到文本
        if (data.type === 'video') {
            const video = data.body.video;
            const embedDataArr = [
                [video.serviceProvider, video.videoId],
            ];
            const embedLinks = this.getEmbedLinks(embedDataArr, data.id);
            result.textContent.text = result.textContent.text.concat(embedLinks);
            result.textContent.fileID = this.createFileId();
        }
        if (result.textContent.text.length > 0) {
            const findURL = result.textContent.text.some((text) => text.includes('https://'));
            if (findURL) {
                _MsgBox__WEBPACK_IMPORTED_MODULE_5__["msgBox"].once('tipLinktext', _Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_提示有外链保存到txt'));
            }
        }
        _Store__WEBPACK_IMPORTED_MODULE_1__["store"].addResult(result);
    }
    getImageData(imageData, index) {
        if (_Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({
            ext: imageData.extension,
        })) {
            return {
                fileID: imageData.id,
                name: imageData.id,
                ext: imageData.extension,
                size: null,
                index,
                url: imageData.originalUrl,
                retryUrl: imageData.thumbnailUrl,
            };
        }
        return null;
    }
    getFileData(fileData, index) {
        if (_Filter__WEBPACK_IMPORTED_MODULE_0__["filter"].check({
            ext: fileData.extension,
            name: fileData.name,
        })) {
            return {
                fileID: fileData.id,
                name: fileData.name,
                ext: fileData.extension,
                size: fileData.size,
                index,
                url: fileData.url,
                retryUrl: null,
            };
        }
        return null;
    }
    // 从文本里提取链接
    getTextLinks(text) {
        const links = [];
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].saveLink) {
            return links;
        }
        // 一个段落里可能包含多个链接（啊好麻烦），所以用换行符来尝试分割一下
        const textArray = text.split('\n');
        const Reg = /http[s]*:\/\/[\w=\?\.\/&\-\#\!\%]+/g;
        for (const str of textArray) {
            const match = Reg.exec(str);
            Reg.lastIndex = 0;
            if (match && match.length > 0) {
                for (const link of match) {
                    links.push(link);
                }
            }
        }
        return links;
    }
    // 从嵌入的资源里，获取资源的原网址
    getEmbedLinks(dataArr, postId) {
        const links = [];
        if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].saveLink) {
            return links;
        }
        for (const data of dataArr) {
            const [serviceProvider, contentId] = data;
            let link = this.providerDict[serviceProvider] + contentId;
            // 谷歌表单需要在链接后面添加特定后缀
            if (serviceProvider === 'google_forms') {
                link = link + '/viewform';
            }
            links.push(link);
        }
        return links;
    }
    // 下载器自己生成的 txt 文件没有 id，所以这里需要自己给它生成一个 id
    // 使用时间戳并不保险，因为有时候代码执行太快，会生成重复的时间戳。所以后面加上随机字符
    createFileId() {
        return (new Date().getTime().toString() +
            Math.random().toString(16).replace('.', ''));
    }
    // 传入文件 url，提取文件名和扩展名
    getUrlNameAndExt(url) {
        const split = url.split('/');
        const fileName = split[split.length - 1];
        const name = fileName.split('.')[0];
        const ext = fileName.split('.')[1];
        return {
            name,
            ext,
        };
    }
}
const saveData = new SaveData();



/***/ }),

/***/ "./src/ts/ShowHowToUse.ts":
/*!********************************!*\
  !*** ./src/ts/ShowHowToUse.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");





class ShowHowToUse {
    constructor() {
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_3__["EVT"].list.settingInitialized, () => {
            this.check();
        });
    }
    check() {
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].showHowToUse) {
            this.show();
            Object(_setting_Settings__WEBPACK_IMPORTED_MODULE_4__["setSetting"])('showHowToUse', false);
        }
    }
    show() {
        _MsgBox__WEBPACK_IMPORTED_MODULE_2__["msgBox"].show(_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_HowToUse') + _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_账户可能被封禁的警告'), {
            title: _Config__WEBPACK_IMPORTED_MODULE_1__["Config"].appName,
            btn: _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_我知道了'),
        });
    }
}
new ShowHowToUse();


/***/ }),

/***/ "./src/ts/ShowNotification.ts":
/*!************************************!*\
  !*** ./src/ts/ShowNotification.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tools */ "./src/ts/Tools.ts");




class ShowNotification {
    constructor() {
        this.iconURL = '';
        this.iconURL = chrome.runtime.getURL('icon/logo128.png');
        this.bindEvents();
    }
    bindEvents() {
        // 当用户开启“下载完成后显示通知”的提示时，请求权限
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'showNotificationAfterDownloadComplete' && data.value) {
                this.requstPremission();
            }
        });
        // 当下载任务完毕时，显示通知
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete, () => {
            window.setTimeout(() => {
                // 如果抓取标签列表没有完成，则不显示通知
                // 在一次抓取多个标签时，当最后一个标签下载完之后会解除 crawlTagList 状态，这时可以显示一条通知
                // 如果有等待下载的任务，则不显示通知
                if (_setting_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].showNotificationAfterDownloadComplete) {
                    this.show(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_下载完毕2'), _Tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getPageTitle());
                }
            }, 0);
        });
    }
    async show(title, text) {
        await this.requstPremission();
        new Notification(title, {
            body: text,
            // 不设置 tag。如果设置了相同的 tag，那么新的通知会覆盖旧的通知，导致如果有多个页面下载完毕，用户只能看到最后一个页面的通知
            // tag: '',
            icon: this.iconURL,
        });
    }
    requstPremission() {
        if (Notification.permission !== 'granted') {
            return Notification.requestPermission();
        }
    }
}
new ShowNotification();


/***/ }),

/***/ "./src/ts/ShowWhatIsNew.ts":
/*!*********************************!*\
  !*** ./src/ts/ShowWhatIsNew.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Config */ "./src/ts/Config.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting/Settings */ "./src/ts/setting/Settings.ts");





// 显示最近更新内容
class ShowWhatIsNew {
    constructor() {
        this.flag = '4.7.0';
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_3__["EVT"].list.settingInitialized, () => {
            // 消息文本要写在 settingInitialized 事件回调里，否则它们可能会被翻译成错误的语言
            let msg = `
      <strong>${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_新增设置项')}: ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载间隔')}</strong>
      <br>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_下载间隔的说明')}`;
            // <strong>${lang.transl('_新增设置项')}: ${lang.transl(
            //   '_非图片的命名规则'
            // )}</strong>
            // ${lang.transl('_新增非图片命名规则的说明')}
            // 在更新说明的下方显示赞助提示
            msg += `
      <br>
      <br>
      ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_赞助方式提示')}`;
            this.show(msg);
        });
    }
    show(msg) {
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_4__["settings"].whatIsNewFlag !== this.flag) {
            _MsgBox__WEBPACK_IMPORTED_MODULE_2__["msgBox"].show(msg, {
                title: _Config__WEBPACK_IMPORTED_MODULE_1__["Config"].appName + ` ${_Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_最近更新')}`,
                btn: _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].transl('_我知道了'),
            });
            Object(_setting_Settings__WEBPACK_IMPORTED_MODULE_4__["setSetting"])('whatIsNewFlag', this.flag);
        }
    }
}
new ShowWhatIsNew();


/***/ }),

/***/ "./src/ts/States.ts":
/*!**************************!*\
  !*** ./src/ts/States.ts ***!
  \**************************/
/*! exports provided: states */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "states", function() { return states; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Log */ "./src/ts/Log.ts");



// 储存需要跨模块使用的、会变化的状态
// 这里的状态不需要持久化保存
// 状态的值通常只由单一的模块修改
class States {
    constructor() {
        /**指示 settings 是否初始化完毕 */
        this.settingInitialized = false;
        /**表示下载器是否处于繁忙状态
         *
         * 繁忙：下载器正在抓取作品，或者正在下载文件
         */
        this.busy = false;
        /**快速下载标记
         *
         * 快速下载模式中不会显示下载面板，并且总是会自动开始下载
         *
         * 启动快速下载时设为 true，下载完成或中止时复位到 false
         */
        this.quickCrawl = false;
        /**是否处于下载中 */
        this.downloading = false;
        // 保存每次抓取完成和下载完成的时间戳，用来判断这次抓取结果是否已被下载完毕
        this.crawlCompleteTime = 1;
        this.downloadCompleteTime = 0;
        /**指示下一次抓取在什么时候进行 */
        this.nextCrawlTime = 0;
        this.bindEvents();
    }
    async awaitNextCrawl() {
        if (this.nextCrawlTime > 0) {
            const now = Date.now();
            if (now < this.nextCrawlTime) {
                const waitTime = this.nextCrawlTime - now;
                await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
        }
        return true;
    }
    resetNextCrawlTime() {
        this.nextCrawlTime = 0;
    }
    /**设置下一次抓取的时间。short 增加 1 秒钟，long 增加 6 分钟 */
    addNextCrawlTime(timeSpan = 'short') {
        const now = Date.now();
        if (timeSpan === 'short') {
            // 增加 500 - 2000 ms 之间的随机时间
            const add_time = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
            this.nextCrawlTime = now + add_time;
        }
        else {
            // 增加 300 - 360 秒之间的随机时间
            const add_time = Math.floor(Math.random() * (360000 - 300000 + 1)) + 300000;
            this.nextCrawlTime = now + add_time;
            _Log__WEBPACK_IMPORTED_MODULE_2__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_下载器会等待几分钟然后再继续抓取'));
        }
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingInitialized, () => {
            this.settingInitialized = true;
        });
        const idle = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlFinish,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadPause,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete,
        ];
        idle.forEach((type) => {
            window.addEventListener(type, () => {
                this.busy = false;
            });
        });
        const busy = [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlStart, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStart];
        busy.forEach((type) => {
            window.addEventListener(type, () => {
                this.busy = true;
            });
        });
        // 下载完成，或者下载中止时，复位快速下载类状态
        const resetQuickState = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlEmpty,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadPause,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete,
        ];
        for (const ev of resetQuickState) {
            window.addEventListener(ev, () => {
                this.quickCrawl = false;
            });
        }
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStart, () => {
            this.downloading = true;
        });
        const downloadIdle = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadPause,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete,
        ];
        for (const ev of downloadIdle) {
            window.addEventListener(ev, () => {
                this.downloading = false;
            });
        }
    }
}
const states = new States();



/***/ }),

/***/ "./src/ts/Store.ts":
/*!*************************!*\
  !*** ./src/ts/Store.ts ***!
  \*************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");

// 存储抓取结果和状态
class Store {
    constructor() {
        this.postIdList = [];
        /**抓取结果的元数据 */
        this.resultMeta = [];
        /**抓取结果 */
        this.result = [];
        /**抓取完成的时间 */
        this.date = new Date();
        /**因为价格限制而不能抓取的文章 */
        this.skipDueToFee = 0;
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlStart, () => {
            this.resetResult();
        });
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
            createID: data.createID,
            tags: data.tags,
        };
    }
    // 添加每个作品的信息。只需要传递有值的属性
    addResult(data) {
        this.resultMeta.push(data);
        // 为投稿里的所有的 文本内容 生成一份数据
        // 但是此时并不会生成文本的 URL，等到下载时才会为其生成 URL
        if (data.textContent.text.length > 0) {
            const result = Object.assign(this.getCommonData(data), data.textContent);
            this.result.push(result);
        }
        // 为投稿里的每个 files 生成一份数据
        const files = data.files;
        for (const fileData of files) {
            const result = Object.assign(this.getCommonData(data), fileData);
            this.result.push(result);
        }
    }
    resetResult() {
        this.postIdList = [];
        this.resultMeta = [];
        this.result = [];
        this.skipDueToFee = 0;
    }
}
const store = new Store();



/***/ }),

/***/ "./src/ts/Tip.ts":
/*!***********************!*\
  !*** ./src/ts/Tip.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
                    if (!text) {
                        console.log(el);
                    }
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

/***/ "./src/ts/Toast.ts":
/*!*************************!*\
  !*** ./src/ts/Toast.ts ***!
  \*************************/
/*! exports provided: toast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toast", function() { return toast; });
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Colors */ "./src/ts/Colors.ts");

// 轻提示，只显示文字和背景颜色
// 适用于无需用户进行确认的提示
class Toast {
    constructor() {
        this.defaultCfg = {
            msg: '',
            color: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].white,
            bgColor: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].bgBrightBlue,
            dealy: 1500,
            enter: 'up',
            leave: 'fade',
            position: 'mouse',
        };
        this.successCfg = {
            msg: '',
            color: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].white,
            bgColor: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].bgSuccess,
            dealy: 1500,
            enter: 'up',
            leave: 'fade',
            position: 'mouse',
        };
        this.warningCfg = {
            msg: '',
            color: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].white,
            bgColor: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].bgWarning,
            dealy: 1500,
            enter: 'up',
            leave: 'fade',
            position: 'mouse',
        };
        this.errorCfg = {
            msg: '',
            color: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].white,
            bgColor: _Colors__WEBPACK_IMPORTED_MODULE_0__["Colors"].bgError,
            dealy: 1500,
            enter: 'up',
            leave: 'fade',
            position: 'mouse',
        };
        this.tipClassName = 'xzToast';
        this.mousePosition = { x: 0, y: 0 };
        this.minTop = 20;
        this.once = 1; // 每一帧移动多少像素
        this.total = 20; // 移动多少像素后消失
        this.bindEvents();
    }
    bindEvents() {
        // 必须是监听 mousemove 而不是 click
        window.addEventListener('mousemove', (ev) => {
            this.mousePosition.x = ev.x;
            this.mousePosition.y = ev.y;
        });
    }
    show(msg, arg) {
        this.create(Object.assign({}, this.defaultCfg, arg, { msg: msg }));
    }
    success(msg, arg) {
        this.create(Object.assign({}, this.successCfg, arg, { msg: msg }));
    }
    warning(msg, arg) {
        this.create(Object.assign({}, this.warningCfg, arg, { msg: msg }));
    }
    error(msg, arg) {
        this.create(Object.assign({}, this.errorCfg, arg, { msg: msg }));
    }
    create(arg) {
        const span = document.createElement('span');
        span.textContent = arg.msg;
        span.style.color = arg.color;
        // 设置背景颜色，优先使用 color
        span.style.backgroundColor = arg.bgColor;
        span.style.opacity = '0'; // 先使提示完全透明
        // 把提示添加到页面上
        span.classList.add(this.tipClassName);
        document.body.appendChild(span);
        // 设置 left，使其居中
        // 默认的中间点是窗口的中间
        let centerPoint = window.innerWidth / 2;
        if (arg.position === 'mouse') {
            // 把中间点设置为鼠标所处的位置
            centerPoint = this.mousePosition.x;
        }
        // 设置 left
        const rect = span.getBoundingClientRect();
        let left = centerPoint - rect.width / 2;
        const minLeft = 0; // 防止提示左侧超出窗口
        const maxLeft = window.innerWidth - rect.width; // 防止提示右侧超出窗口
        if (left < minLeft) {
            left = minLeft;
        }
        if (left > maxLeft) {
            left = maxLeft;
        }
        span.style.left = left + 'px';
        // 设置 top
        let lastTop = 0;
        if (arg.position === 'topCenter') {
            lastTop = this.minTop;
        }
        if (arg.position === 'center') {
            lastTop = window.innerHeight / 2 - this.minTop;
        }
        if (arg.position === 'mouse') {
            // 跟随鼠标位置
            // top 值减去一点高度，使文字出现在鼠标上方
            let y = this.mousePosition.y - 40;
            if (y < this.minTop) {
                y = this.minTop;
            }
            lastTop = y;
        }
        // 出现动画
        if (arg.enter === 'none') {
            span.style.top = lastTop + 'px';
            span.style.opacity = '1';
        }
        else {
            this.enter(span, arg.enter, lastTop);
        }
        // 消失动画
        window.setTimeout(() => {
            if (arg.leave === 'none') {
                span.remove();
            }
            else {
                this.leave(span, arg.leave, lastTop);
            }
        }, arg.dealy);
    }
    // 提示出现的动画
    enter(el, way, lastTop) {
        const startTop = lastTop + this.total; // 初始 top 值
        const once = 2;
        const total = this.total;
        let numberOfTimes = 0; // 执行次数
        const frame = function (timestamp) {
            numberOfTimes++;
            // 计算总共上移了多少像素
            const move = once * numberOfTimes;
            // 计算不透明度
            const opacity = move / total;
            if (move <= total && opacity <= 1) {
                if (way === 'up') {
                    el.style.top = startTop - move + 'px';
                }
                el.style.opacity = opacity.toString();
                // 请求下一帧
                window.requestAnimationFrame(frame);
            }
        };
        window.requestAnimationFrame(frame);
    }
    // 提示消失的动画
    leave(el, way, lastTop) {
        const startTop = lastTop; // 初始 top 值
        const once = this.once;
        const total = this.total;
        let numberOfTimes = 0; // 执行次数
        const frame = function (timestamp) {
            numberOfTimes++;
            // 计算总共上移了多少像素
            const move = once * numberOfTimes;
            // 计算不透明度
            const opacity = 1 - move / total;
            if (move < total && opacity > 0) {
                if (way === 'up') {
                    el.style.top = startTop - move + 'px';
                }
                el.style.opacity = opacity.toString();
                // 请求下一帧
                window.requestAnimationFrame(frame);
            }
            else {
                // 动画执行完毕，删除元素
                el.remove();
            }
        };
        window.requestAnimationFrame(frame);
    }
}
const toast = new Toast();



/***/ }),

/***/ "./src/ts/Tools.ts":
/*!*************************!*\
  !*** ./src/ts/Tools.ts ***!
  \*************************/
/*! exports provided: Tools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tools", function() { return Tools; });
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lang */ "./src/ts/Lang.ts");

class Tools {
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
    // 创建下载面板上的通用按钮
    // 注意 textFlag 和 titleFlag 必须是 LangText 里存在的属性，这是为了能根据语言设置动态切换文本
    // 如果 text 和 title 是直接设置的字符串，那么不应该使用这个方法设置，而是由调用者自行设置
    static addBtn(slot, bg = '', textFlag = '', titleFlag = '') {
        const e = document.createElement('button');
        e.type = 'button';
        e.style.backgroundColor = bg;
        textFlag && e.setAttribute('data-xztext', textFlag);
        titleFlag && e.setAttribute('data-xztitle', titleFlag);
        this.useSlot(slot, e);
        _Lang__WEBPACK_IMPORTED_MODULE_0__["lang"].register(e);
        return e;
    }
    /**获取页面标题 */
    // 删除了下载器在标题上添加的状态
    static getPageTitle() {
        let result = document.title
            .replace(/\[(↑|→|▶|↓|║|■|✓| )\]/, '')
            .replace(/^ (\d+) /, '');
        // 如果开头有空格则去掉空格
        if (result.startsWith(' ')) {
            result = result.replace(/ */, '');
        }
        return result;
    }
}



/***/ }),

/***/ "./src/ts/UnifiedURL.ts":
/*!******************************!*\
  !*** ./src/ts/UnifiedURL.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EVT */ "./src/ts/EVT.ts");

class UnifiedURL {
    constructor() {
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'unifiedURL' && data.value) {
                this.check();
            }
        });
    }
    check() {
        // 首先取出二级域名
        // https://www.fanbox.cc/
        const test = location.hostname.match(/(.*)\.fanbox.cc/);
        if (!test || test.length < 2) {
            return;
        }
        const subDomain = test[1];
        // 对于一些特定的二级域名，不会跳转
        if (subDomain === 'www' ||
            subDomain === 'api' ||
            subDomain === 'downloads') {
            return;
        }
        // 如果二级域名不符合上面的条件，那么就是用户名。
        // 判断用户是否登录，如果未登录，则不会跳转
        // 因为未登录时，fanbox 会强制把网址改为用户名在前的形式，下载器无法把网址改成用户名在后的形式
        const metaElement = document.head.querySelector('meta#metadata');
        if (!metaElement) {
            return;
        }
        const content = metaElement.getAttribute('content');
        if (!content) {
            return;
        }
        const data = JSON.parse(content);
        // null 说明用户未登录。登录后是 string id
        if (data.context.user.userId === null) {
            return;
        }
        // 用户名在后面时，path 不能以斜线结尾，否则会 404。（用户名在前且处于用户主页时，path 就只有一个斜线）
        let path = location.pathname;
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }
        // 在 https://www.fanbox.cc/ 后面插入用户名
        const newURL = `https://www.fanbox.cc/@${subDomain}` + path;
        location.href = newURL;
    }
}
new UnifiedURL();


/***/ }),

/***/ "./src/ts/content.ts":
/*!***************************!*\
  !*** ./src/ts/content.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UnifiedURL__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UnifiedURL */ "./src/ts/UnifiedURL.ts");
/* harmony import */ var _ListenPageSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListenPageSwitch */ "./src/ts/ListenPageSwitch.ts");
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageType */ "./src/ts/PageType.ts");
/* harmony import */ var _CenterPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CenterPanel */ "./src/ts/CenterPanel.ts");
/* harmony import */ var _setting_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting/Form */ "./src/ts/setting/Form.ts");
/* harmony import */ var _InitPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InitPage */ "./src/ts/InitPage.ts");
/* harmony import */ var _QuickCrawl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QuickCrawl */ "./src/ts/QuickCrawl.ts");
/* harmony import */ var _Tip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Tip */ "./src/ts/Tip.ts");
/* harmony import */ var _Tip__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Tip__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _OutputPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OutputPanel */ "./src/ts/OutputPanel.ts");
/* harmony import */ var _download_DownloadControl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./download/DownloadControl */ "./src/ts/download/DownloadControl.ts");
/* harmony import */ var _download_ShowStatusOnTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./download/ShowStatusOnTitle */ "./src/ts/download/ShowStatusOnTitle.ts");
/* harmony import */ var _download_Resume__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./download/Resume */ "./src/ts/download/Resume.ts");
/* harmony import */ var _ShowNotification__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ShowNotification */ "./src/ts/ShowNotification.ts");
/* harmony import */ var _ShowHowToUse__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ShowHowToUse */ "./src/ts/ShowHowToUse.ts");
/* harmony import */ var _ShowWhatIsNew__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ShowWhatIsNew */ "./src/ts/ShowWhatIsNew.ts");
/* harmony import */ var _CheckUnsupportBrowser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CheckUnsupportBrowser */ "./src/ts/CheckUnsupportBrowser.ts");
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


















/***/ }),

/***/ "./src/ts/download/Download.ts":
/*!*************************************!*\
  !*** ./src/ts/download/Download.ts ***!
  \*************************************/
/*! exports provided: Download */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Download", function() { return Download; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _FileName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FileName */ "./src/ts/FileName.ts");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProgressBar */ "./src/ts/ProgressBar.ts");
/* harmony import */ var _DownloadRecord__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DownloadRecord */ "./src/ts/download/DownloadRecord.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Log */ "./src/ts/Log.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../States */ "./src/ts/States.ts");
/* harmony import */ var _DownloadInterval__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DownloadInterval */ "./src/ts/download/DownloadInterval.ts");
// 下载文件，并发送给浏览器下载








class Download {
    constructor(progressBarIndex, data) {
        this.fileName = '';
        this.progressBarIndex = progressBarIndex;
        this.arg = data;
        this.download(data);
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadSuccess, (event) => {
            const donwloadSuccessData = event.detail.data;
            if (donwloadSuccessData.url === this.arg.data.url) {
                this.setProgressBar(1024, 1024);
            }
        });
    }
    // 跳过下载这个文件。可以传入用于提示的文本
    skipDownload(data, msg) {
        if (msg) {
            _Log__WEBPACK_IMPORTED_MODULE_5__["log"].warning(msg);
        }
        if (_States__WEBPACK_IMPORTED_MODULE_6__["states"].downloading) {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('skipDownload', data);
        }
    }
    // 设置进度条信息
    setProgressBar(loaded, total) {
        _ProgressBar__WEBPACK_IMPORTED_MODULE_2__["progressBar"].setProgress(this.progressBarIndex, {
            name: this.fileName,
            loaded: loaded,
            total: total,
        });
    }
    // 下载文件
    async download(arg) {
        this.fileName = _FileName__WEBPACK_IMPORTED_MODULE_1__["fileName"].getFileName(arg.data);
        // 检查是否是重复文件
        const url = arg.data.url;
        if (!url.startsWith('blob')) {
            const duplicate = await _DownloadRecord__WEBPACK_IMPORTED_MODULE_3__["downloadRecord"].checkDeduplication(arg.data);
            if (duplicate) {
                return this.skipDownload({
                    id: arg.id,
                    reason: 'duplicate',
                }, _Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_跳过下载因为重复文件', this.fileName));
            }
        }
        await _DownloadInterval__WEBPACK_IMPORTED_MODULE_7__["downloadInterval"].wait();
        // 重设当前下载栏的信息
        this.setProgressBar(0, 0);
        // 向浏览器发送下载任务
        this.browserDownload(url, this.fileName, arg.id, arg.taskBatch);
    }
    // 向浏览器发送下载任务
    browserDownload(url, fileName, id, taskBatch) {
        const sendData = {
            msg: 'send_download',
            fileUrl: url,
            fileName: fileName,
            id,
            taskBatch,
        };
        chrome.runtime.sendMessage(sendData);
    }
}



/***/ }),

/***/ "./src/ts/download/DownloadControl.ts":
/*!********************************************!*\
  !*** ./src/ts/download/DownloadControl.ts ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store */ "./src/ts/Store.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Log */ "./src/ts/Log.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Colors */ "./src/ts/Colors.ts");
/* harmony import */ var _Download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Download */ "./src/ts/download/Download.ts");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ProgressBar */ "./src/ts/ProgressBar.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../States */ "./src/ts/States.ts");
/* harmony import */ var _ShowSkipCount__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ShowSkipCount */ "./src/ts/download/ShowSkipCount.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _DownloadStates__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DownloadStates */ "./src/ts/download/DownloadStates.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Toast */ "./src/ts/Toast.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Config */ "./src/ts/Config.ts");
// 下载控制















class DownloadControl {
    constructor() {
        this.downloadThread = 2; // 同时下载的线程数
        this.taskBatch = 0; // 标记任务批次，每次重新下载时改变它的值，传递给后台使其知道这是一次新的下载
        this.taskList = {}; // 下载任务列表，使用下载的文件的 id 做 key，保存下载栏编号和它在下载状态列表中的索引
        this.downloaded = 0; // 已下载的任务数量
        this.reTryTimer = 0; // 重试下载的定时器
        this.wrapper = document.createElement('div');
        this.downStatusEl = document.createElement('span');
        this.stop = false; // 是否停止下载
        this.pause = false; // 是否暂停下载
        this.createDownloadArea();
        this.bindEvents();
        const skipTipWrap = this.wrapper.querySelector('.skip_tip');
        new _ShowSkipCount__WEBPACK_IMPORTED_MODULE_10__["ShowSkipCount"](skipTipWrap);
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlStart, () => {
            this.hideDownloadArea();
            this.reset();
        });
        for (const ev of [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlFinish, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.resume]) {
            window.addEventListener(ev, (ev) => {
                // 当恢复了未完成的抓取数据时，将下载状态设置为暂停
                this.pause = ev.type === 'resume';
                // 让开始下载的方法进入任务队列，以便让监听上述事件的其他部分的代码先执行完毕
                window.setTimeout(() => {
                    this.readyDownload();
                }, 0);
            });
        }
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.skipDownload, (ev) => {
            // 跳过下载的文件不会触发 downloadSuccess 事件
            const data = ev.detail.data;
            this.downloadSuccess(data);
        });
        // 监听浏览器下载文件后，返回的消息
        chrome.runtime.onMessage.addListener((msg) => {
            var _a;
            if (!this.taskBatch) {
                return;
            }
            // 丢失文件名的情况。对于下载器动态创建的 Blob URL，文件名会是 UUID
            // 对于 Fanbox 原有的 URL，文件名会是 URL 最后一段路径（浏览器会把这段作为默认的文件名）
            if ((_a = msg.data) === null || _a === void 0 ? void 0 : _a.uuid) {
                _Log__WEBPACK_IMPORTED_MODULE_3__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_uuid'), 1, false, 'filenameUUID');
                _MsgBox__WEBPACK_IMPORTED_MODULE_11__["msgBox"].once('uuidTip', _Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_uuid'), 'show');
            }
            // 文件下载成功
            if (msg.msg === 'downloaded') {
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadSuccess', msg.data);
                this.downloadSuccess(msg.data);
            }
            else if (msg.msg === 'download_err') {
                // 浏览器把文件保存到本地时出错
                // 用户操作导致下载取消的情况，跳过这个文件，不再重试保存它。触发条件如：
                // 用户在浏览器弹出“另存为”对话框时取消保存
                // 用户让 IDM 转接这个下载时
                if (msg.err === 'USER_CANCELED') {
                    _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_user_canceled_tip', msg.data.url, msg.err || 'unknown'));
                    this.downloadSuccess(msg.data);
                    return;
                }
                else if (msg.err === 'SERVER_BAD_CONTENT') {
                    // 404 错误不重试下载
                    _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(`${msg.data.url} Download error! Code: ${msg.err}. 404: file does not exist.`);
                }
                else if (msg.err === 'SERVER_FAILED') {
                    // 通常是 500 错误，尝试重试下载
                    _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(`${msg.data.url} Download error! Code: ${msg.err}. This is a server-side error, not a downloader bug. The downloader will retry the download.`);
                    this.downloadError(msg.data, msg.err);
                }
                else {
                    // 其他错误
                    _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(`${msg.data.url} Download error! Code: ${msg.err}. Will try again later.`);
                    // 重新下载这个文件
                    this.downloadError(msg.data, msg.err);
                }
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadError');
            }
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete, () => {
            _Log__WEBPACK_IMPORTED_MODULE_3__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载完毕'), 2);
            _Toast__WEBPACK_IMPORTED_MODULE_13__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_下载完毕2'), {
                position: 'topCenter',
            });
        });
    }
    setDownloaded() {
        this.downloaded = _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].downloadedCount();
        const text = `${this.downloaded} / ${_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length}`;
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].log(text, 2, false);
        // 设置总下载进度条
        _ProgressBar__WEBPACK_IMPORTED_MODULE_7__["progressBar"].setTotalProgress(this.downloaded);
        // 所有文件正常下载完毕（跳过下载的文件也算正常下载）
        if (this.downloaded === _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length) {
            window.setTimeout(() => {
                // 延后触发下载完成的事件。因为下载完成事件是由上游事件（跳过下载，或下载成功事件）派生的，如果这里不延迟触发，可能导致其他模块先接收到下载完成事件，后接收到上游事件。
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadComplete');
            }, 0);
            this.reset();
        }
    }
    // 显示或隐藏下载区域
    showDownloadArea() {
        this.wrapper.style.display = 'block';
    }
    hideDownloadArea() {
        this.wrapper.style.display = 'none';
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
        this.pause = false;
        this.stop = false;
        clearTimeout(this.reTryTimer);
    }
    createDownloadArea() {
        const html = `<div class="download_area">
    <div class="centerWrap_btns">
    <button class="startDownload" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_5__["Colors"].bgBlue};" data-xztext="_开始下载"></button>
    <button class="pauseDownload" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_5__["Colors"].bgYellow};" data-xztext="_暂停下载"></button>
    <button class="stopDownload" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_5__["Colors"].bgRed};" data-xztext="_停止下载"></button>
    <button class="previewFileName" type="button" style="background:${_Colors__WEBPACK_IMPORTED_MODULE_5__["Colors"].bgGreen};" data-xztext="_预览文件名"></button>
    </div>
    <div class="download_status_text_wrap">
    <span data-xztext="_当前状态"></span>
    <span class="down_status" data-xztext="_未开始下载"></span>
    <span class="skip_tip warn"></span>
    </div>
    </div>`;
        this.wrapper = _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].useSlot('downloadArea', html);
        _Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].register(this.wrapper);
        this.downStatusEl = this.wrapper.querySelector('.down_status');
        this.wrapper
            .querySelector('.startDownload')
            .addEventListener('click', () => {
            this.startDownload();
        });
        this.wrapper
            .querySelector('.pauseDownload')
            .addEventListener('click', () => {
            this.pauseDownload();
        });
        this.wrapper
            .querySelector('.stopDownload')
            .addEventListener('click', () => {
            this.stopDownload();
        });
        this.wrapper
            .querySelector('.previewFileName')
            .addEventListener('click', () => {
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('previewFileName');
        });
    }
    // 下载线程设置
    setDownloadThread() {
        const setThread = _setting_Settings__WEBPACK_IMPORTED_MODULE_8__["settings"].downloadThread;
        if (setThread < 1 ||
            setThread > _Config__WEBPACK_IMPORTED_MODULE_14__["Config"].downloadThreadMax ||
            isNaN(setThread)) {
            // 如果数值非法，则重设为默认值
            this.downloadThread = _Config__WEBPACK_IMPORTED_MODULE_14__["Config"].downloadThreadMax;
        }
        else {
            this.downloadThread = setThread; // 设置为用户输入的值
        }
        // 如果剩余任务数量少于下载线程数
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length - this.downloaded < this.downloadThread) {
            this.downloadThread = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length - this.downloaded;
        }
        // 重设下载进度条
        _ProgressBar__WEBPACK_IMPORTED_MODULE_7__["progressBar"].reset(this.downloadThread, this.downloaded);
    }
    // 抓取完毕之后，已经可以开始下载时，根据一些状态进行处理
    readyDownload() {
        if (_States__WEBPACK_IMPORTED_MODULE_9__["states"].busy || _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return;
        }
        this.showDownloadArea();
        this.setDownloaded();
        this.setDownloadThread();
        // 视情况自动开始下载
        if (_setting_Settings__WEBPACK_IMPORTED_MODULE_8__["settings"].autoStartDownload || _States__WEBPACK_IMPORTED_MODULE_9__["states"].quickCrawl) {
            this.startDownload();
        }
    }
    // 开始下载
    startDownload() {
        // 如果正在下载中，或无图片，则不予处理
        if (_States__WEBPACK_IMPORTED_MODULE_9__["states"].busy || _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return;
        }
        if (this.pause) {
            // 从上次中断的位置继续下载
            // 把“使用中”的下载状态重置为“未使用”
            _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].resume();
        }
        else {
            // 如果之前没有暂停任务，也没有进入恢复模式，则重新下载
            // 初始化下载状态列表
            _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].init();
        }
        // 重置一些条件
        this.reset();
        this.setDownloaded();
        this.taskBatch = new Date().getTime(); // 修改本批下载任务的标记
        this.setDownloadThread();
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadStart');
        // 启动或继续下载，建立并发下载线程
        for (let i = 0; i < this.downloadThread; i++) {
            this.createDownload(i);
        }
        this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_正在下载中'));
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].log(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_正在下载中'));
        if (_Config__WEBPACK_IMPORTED_MODULE_14__["Config"].mobile) {
            _Log__WEBPACK_IMPORTED_MODULE_3__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_移动端浏览器可能不会建立文件夹的说明'));
        }
    }
    // 暂停下载
    pauseDownload() {
        clearTimeout(this.reTryTimer);
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0) {
            return;
        }
        // 停止的优先级高于暂停。点击停止可以取消暂停状态，但点击暂停不能取消停止状态
        if (this.stop === true) {
            return;
        }
        if (this.pause === false) {
            // 如果正在下载中
            if (_States__WEBPACK_IMPORTED_MODULE_9__["states"].busy) {
                this.pause = true; // 发出暂停信号
                _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadPause');
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
        if (_Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length === 0 || this.stop) {
            return;
        }
        this.stop = true;
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('downloadStop');
        this.setDownStateText(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已停止'), '#f00');
        _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(_Lang__WEBPACK_IMPORTED_MODULE_4__["lang"].transl('_已停止'), 2);
        this.pause = false;
    }
    downloadError(data, err) {
        if (this.pause || this.stop) {
            return false;
        }
        const task = this.taskList[data.id];
        // 复位这个任务的状态
        _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].setState(task.index, -1);
        // 建立下载任务，再次下载它
        // 如果出现了服务端错误，可能是获取原图时出现错误，改为使用缩略图进行下载
        this.createDownload(task.progressBarIndex, err === 'SERVER_FAILED');
    }
    downloadSuccess(data) {
        const task = this.taskList[data.id];
        // 更改这个任务状态为“已完成”
        _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].setState(task.index, 1);
        // 增加已下载数量
        this.setDownloaded();
        // 是否继续下载
        const no = task.progressBarIndex;
        if (this.checkContinueDownload()) {
            this.createDownload(no);
        }
    }
    // 当一个文件下载完成后，检查是否还有后续下载任务
    checkContinueDownload() {
        // 如果没有全部下载完毕
        if (this.downloaded < _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result.length) {
            // 如果任务已停止
            if (this.pause || this.stop) {
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
    // 查找需要进行下载的作品，建立下载
    // 可选第二个参数：使用缩略图 url 而不是原图 url 进行下载
    createDownload(progressBarIndex, useThumb = false) {
        const index = _DownloadStates__WEBPACK_IMPORTED_MODULE_12__["downloadStates"].getFirstDownloadItem();
        if (index === undefined) {
            throw new Error('There are no data to download');
        }
        else {
            let result = _Store__WEBPACK_IMPORTED_MODULE_2__["store"].result[index];
            // 对于文本数据，此时创建其 URL
            if (result.text && result.text.length > 0) {
                const text = result.text.join('\r\n');
                const blob = new Blob([text], {
                    type: 'text/plain',
                });
                result.url = URL.createObjectURL(blob);
                result.size = blob.size;
            }
            // 对于需要使用缩略图来重试下载的情况，如果没有缩略图，则跳过下载此文件
            if (useThumb) {
                if (result.retryUrl) {
                    ;
                    [result.url, result.retryUrl] = [result.retryUrl, result.url];
                }
                else {
                    _Log__WEBPACK_IMPORTED_MODULE_3__["log"].error(`${result.url} Unable to retry, this file has been skipped.`);
                    const data = {
                        url: result.url,
                        id: result.fileID,
                        tabId: 0,
                        uuid: false,
                    };
                    return this.downloadSuccess(data);
                }
            }
            const data = {
                id: result.fileID,
                data: result,
                index: index,
                progressBarIndex: progressBarIndex,
                taskBatch: this.taskBatch,
            };
            // 保存任务信息
            this.taskList[data.data.fileID] = {
                index,
                progressBarIndex: progressBarIndex,
            };
            // 建立下载
            new _Download__WEBPACK_IMPORTED_MODULE_6__["Download"](progressBarIndex, data);
        }
    }
}
new DownloadControl();


/***/ }),

/***/ "./src/ts/download/DownloadInterval.ts":
/*!*********************************************!*\
  !*** ./src/ts/download/DownloadInterval.ts ***!
  \*********************************************/
/*! exports provided: downloadInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadInterval", function() { return downloadInterval; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Log */ "./src/ts/Log.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting/Settings */ "./src/ts/setting/Settings.ts");




class DownloadInterval {
    constructor() {
        /**允许开始下载的时间戳 */
        // 不管设置里的值是多少，初始值都是 0，即允许第一次下载立即开始
        // 在开始下载第一个文件后，才会有实际的值
        this.allowDownloadTime = 0;
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'downloadInterval') {
                if (data.value === 0) {
                    this.reset();
                }
            }
        });
        const resetEvents = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlFinish,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStart,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadPause,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete,
        ];
        resetEvents.forEach((evt) => {
            window.addEventListener(evt, () => {
                this.reset();
            });
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStart, () => {
            // 在开始下载时，如果应用了间隔时间，则显示一条日志提醒
            if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].downloadInterval > 0) {
                const msg = _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_下载间隔') +
                    `: ${_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].downloadInterval} ` +
                    _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_秒');
                _Log__WEBPACK_IMPORTED_MODULE_2__["log"].warning(msg, 1, false, 'downloadInterval');
            }
        });
    }
    reset() {
        this.allowDownloadTime = 0;
    }
    addTime() {
        // 对 settings.downloadInterval 进行随机，生成它的 0.8 倍至 1.2 倍之间的数字
        const randomFactor = 0.8 + Math.random() * 0.4; // Generates a number between 0.8 and 1.2
        const interval = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].downloadInterval * 1000 * randomFactor;
        this.allowDownloadTime = new Date().getTime() + interval;
    }
    wait() {
        return new Promise(async (resolve) => {
            // 首先检查此设置不应该生效的情况，立即放行
            if (_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].downloadInterval === 0) {
                return resolve(true);
            }
            // 可以立即开始下载
            if (new Date().getTime() >= this.allowDownloadTime) {
                this.addTime();
                return resolve(true);
            }
            // 需要等待
            const timer = window.setInterval(() => {
                if (new Date().getTime() >= this.allowDownloadTime) {
                    window.clearInterval(timer);
                    this.addTime();
                    return resolve(true);
                }
            }, 50);
        });
    }
}
const downloadInterval = new DownloadInterval();



/***/ }),

/***/ "./src/ts/download/DownloadRecord.ts":
/*!*******************************************!*\
  !*** ./src/ts/download/DownloadRecord.ts ***!
  \*******************************************/
/*! exports provided: downloadRecord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadRecord", function() { return downloadRecord; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Log */ "./src/ts/Log.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/IndexedDB */ "./src/ts/utils/IndexedDB.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Toast */ "./src/ts/Toast.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../MsgBox */ "./src/ts/MsgBox.ts");








// 保存下载记录，用来判断重复下载的文件
class DownloadRecord {
    constructor() {
        this.DBName = 'DLRecord';
        this.DBVer = 1;
        this.storeName = 'record';
        this.IDB = new _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_4__["IndexedDB"]();
        this.init();
    }
    async init() {
        await this.initDB();
        this.bindEvents();
    }
    // 初始化数据库，获取数据库对象
    async initDB() {
        // 在升级事件里创建表和索引
        const onUpdate = (db) => {
            if (!db.objectStoreNames.contains(this.storeName)) {
                const store = db.createObjectStore(this.storeName, { keyPath: 'url' });
                store.createIndex('url', 'url', { unique: true });
            }
        };
        return new Promise(async (resolve, reject) => {
            resolve(await this.IDB.open(this.DBName, this.DBVer, onUpdate));
        });
    }
    /**去掉文件 url 开头的协议和域名部分，以减少索引字段的长度 */
    removeHttp(url) {
        // url 如：
        // https://downloads.fanbox.cc/files/post/1745346/kDCd7V1aaHQPltLU2ZTxxfuX.jpeg
        return url.replace('https://downloads.fanbox.cc/', '');
    }
    bindEvents() {
        // 当有文件下载完成时，存储这个任务的记录
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadSuccess, (ev) => {
            const successData = ev.detail.data;
            // 如果是 Blob URL 则不保存这个下载记录
            // 如果文件名异常，不保存这个下载记录，以便用户之后重新下载这个文件
            if (!successData.url.startsWith('blob') && !successData.uuid) {
                this.addRecord({
                    url: this.removeHttp(successData.url),
                });
            }
        });
        // 导入下载记录的按钮
        {
            const btn = document.querySelector('#importDownloadRecord');
            if (btn) {
                btn.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('importDownloadRecord');
                });
            }
        }
        // 监听导入下载记录的事件
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.importDownloadRecord, () => {
            this.importRecordFromJSON();
        });
        // 导出下载记录的按钮
        {
            const btn = document.querySelector('#exportDownloadRecord');
            if (btn) {
                btn.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('exportDownloadRecord');
                });
            }
        }
        // 监听导出下载记录的事件
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.exportDownloadRecord, () => {
            this.exportRecord();
        });
        // 清空下载记录的按钮
        {
            const btn = document.querySelector('#clearDownloadRecord');
            if (btn) {
                btn.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('clearDownloadRecord');
                });
            }
        }
        // 监听清空下载记录的事件
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.clearDownloadRecord, () => {
            this.clearRecords();
        });
    }
    // 添加一条下载记录
    async addRecord(record) {
        this.IDB.put(this.storeName, record);
    }
    /** 检查一个作品是否是重复下载
     *
     * 返回值 true 表示重复，false 表示不重复
     */
    async checkDeduplication(result) {
        return new Promise(async (resolve, reject) => {
            // 如果未启用去重，直接返回不重复
            if (!_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].deduplication) {
                return resolve(false);
            }
            // 在数据库进行查找
            const data = (await this.IDB.get(this.storeName, this.removeHttp(result.url)));
            return resolve(!!data);
        });
    }
    // 清空下载记录
    clearRecords() {
        this.IDB.clear(this.storeName);
        _Toast__WEBPACK_IMPORTED_MODULE_6__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_下载记录已清除'));
    }
    // 导出下载记录
    async exportRecord() {
        const record = (await this.IDB.getAll(this.storeName));
        const blob = _utils_Utils__WEBPACK_IMPORTED_MODULE_5__["Utils"].json2BlobSafe(record);
        const url = URL.createObjectURL(blob);
        _utils_Utils__WEBPACK_IMPORTED_MODULE_5__["Utils"].downloadFile(url, `record-${_utils_Utils__WEBPACK_IMPORTED_MODULE_5__["Utils"].replaceUnsafeStr(new Date().toLocaleString())}.json`);
        _Toast__WEBPACK_IMPORTED_MODULE_6__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导出成功'));
    }
    // 导入下载记录
    async importRecord(record) {
        _Log__WEBPACK_IMPORTED_MODULE_2__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导入下载记录'));
        _Log__WEBPACK_IMPORTED_MODULE_2__["log"].log(record.length.toString());
        await this.IDB.batchAddData(this.storeName, record, 'url');
        _Log__WEBPACK_IMPORTED_MODULE_2__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导入成功'));
        _Toast__WEBPACK_IMPORTED_MODULE_6__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导入成功'));
        _MsgBox__WEBPACK_IMPORTED_MODULE_7__["msgBox"].success(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导入成功'), {
            title: _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_导入下载记录'),
        });
    }
    // 从 json 文件导入
    async importRecordFromJSON() {
        const record = (await _utils_Utils__WEBPACK_IMPORTED_MODULE_5__["Utils"].loadJSONFile().catch((err) => {
            _MsgBox__WEBPACK_IMPORTED_MODULE_7__["msgBox"].error(err);
            return;
        }));
        if (!record) {
            return;
        }
        // 判断格式是否符合要求
        if (Array.isArray(record) === false || record[0].url === undefined) {
            return _MsgBox__WEBPACK_IMPORTED_MODULE_7__["msgBox"].error(_Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl('_格式错误'));
        }
        this.importRecord(record);
    }
}
const downloadRecord = new DownloadRecord();



/***/ }),

/***/ "./src/ts/download/DownloadStates.ts":
/*!*******************************************!*\
  !*** ./src/ts/download/DownloadStates.ts ***!
  \*******************************************/
/*! exports provided: downloadStates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadStates", function() { return downloadStates; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Store */ "./src/ts/Store.ts");


// 下载状态列表
class DownloadStates {
    constructor() {
        this.states = [];
        this.bindEvents();
    }
    bindEvents() {
        // 初始化下载状态
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlFinish, () => {
            this.init();
        });
    }
    // 创建新的状态列表
    init() {
        this.states = new Array(_Store__WEBPACK_IMPORTED_MODULE_1__["store"].result.length).fill(-1);
    }
    // 统计下载完成的数量
    downloadedCount() {
        let count = 0;
        const length = this.states.length;
        for (let i = 0; i < length; i++) {
            if (this.states[i] === 1) {
                count++;
            }
        }
        return count;
    }
    // 接受传入的状态数据
    // 目前只有在恢复下载的时候使用
    replace(states) {
        this.states = states;
    }
    // 恢复之前的下载任务
    // 这会把之前的“下载中”标记复位到“未开始下载”，以便再次下载
    resume() {
        const length = this.states.length;
        for (let i = 0; i < length; i++) {
            if (this.states[i] === 0) {
                this.setState(i, -1);
            }
        }
    }
    // 获取第一个“未开始下载”标记的索引
    getFirstDownloadItem() {
        const length = this.states.length;
        for (let i = 0; i < length; i++) {
            if (this.states[i] === -1) {
                this.setState(i, 0);
                return i;
            }
        }
        return undefined;
    }
    // 设置已下载列表中的标记
    setState(index, value) {
        this.states[index] = value;
    }
    clear() {
        this.states = [];
    }
}
const downloadStates = new DownloadStates();



/***/ }),

/***/ "./src/ts/download/Resume.ts":
/*!***********************************!*\
  !*** ./src/ts/download/Resume.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Log */ "./src/ts/Log.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store */ "./src/ts/Store.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../States */ "./src/ts/States.ts");
/* harmony import */ var _DownloadStates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DownloadStates */ "./src/ts/download/DownloadStates.ts");
/* harmony import */ var _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/IndexedDB */ "./src/ts/utils/IndexedDB.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Toast */ "./src/ts/Toast.ts");








// 断点续传。恢复未完成的下载
class Resume {
    constructor() {
        this.DBName = 'PFD';
        this.DBVer = 1;
        this.dataName = 'taskData'; // 下载任务数据的表名
        this.statesName = 'taskStates'; // 下载状态列表的表名
        this.putStatesTime = 1000; // 每隔指定时间存储一次最新的下载状态
        this.needPutStates = false; // 指示是否需要更新存储的下载状态
        this.IDB = new _utils_IndexedDB__WEBPACK_IMPORTED_MODULE_6__["IndexedDB"]();
        this.init();
    }
    async init() {
        await this.initDB();
        this.bindEvents();
        if (_States__WEBPACK_IMPORTED_MODULE_4__["states"].settingInitialized) {
            this.restoreData();
        }
        this.regularPutStates();
        this.clearExired();
    }
    // 初始化数据库，获取数据库对象
    async initDB() {
        // 在升级事件里创建表和索引
        const onUpdate = (db) => {
            if (!db.objectStoreNames.contains(this.dataName)) {
                const dataStore = db.createObjectStore(this.dataName, {
                    keyPath: 'id',
                });
                dataStore.createIndex('id', 'id', { unique: true });
                dataStore.createIndex('url', 'url', { unique: true });
            }
            if (!db.objectStoreNames.contains(this.statesName)) {
                const statesStore = db.createObjectStore(this.statesName, {
                    keyPath: 'id',
                });
                statesStore.createIndex('id', 'id', { unique: true });
            }
        };
        // 打开数据库
        return new Promise(async (resolve, reject) => {
            resolve(await this.IDB.open(this.DBName, this.DBVer, onUpdate));
        });
    }
    // 恢复未完成任务的数据
    async restoreData() {
        // 如果下载器在抓取或者在下载，则不恢复数据
        if (_States__WEBPACK_IMPORTED_MODULE_4__["states"].busy) {
            return;
        }
        // 恢复抓取结果
        const url = this.getURL();
        const taskData = (await this.IDB.get(this.dataName, url, 'url'));
        if (taskData === null) {
            return;
        }
        _Log__WEBPACK_IMPORTED_MODULE_1__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_正在恢复抓取结果'));
        _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result = taskData.data;
        _Store__WEBPACK_IMPORTED_MODULE_3__["store"].date = taskData.date;
        this.taskId = taskData.id;
        // 恢复下载状态
        const taskStates = (await this.IDB.get(this.statesName, this.taskId, 'id'));
        if (taskStates) {
            _DownloadStates__WEBPACK_IMPORTED_MODULE_5__["downloadStates"].replace(taskStates.states);
        }
        // 恢复完成
        _Log__WEBPACK_IMPORTED_MODULE_1__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_已恢复抓取结果'), 2);
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('resume');
    }
    bindEvents() {
        // 抓取完成时，保存这次任务的数据
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlFinish, async () => {
            this.saveData();
        });
        // 当有文件下载完成或者跳过下载时，更新下载状态
        const saveEv = [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadSuccess, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.skipDownload];
        saveEv.forEach((val) => {
            window.addEventListener(val, () => {
                this.needPutStates = true;
            });
        });
        // 任务下载完毕时，以及停止任务时，清除这次任务的数据
        const clearDataEv = [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop];
        for (const ev of clearDataEv) {
            window.addEventListener(ev, async () => {
                this.clearData();
            });
        }
        // 切换页面时，重新检查恢复数据
        const restoreEvt = [_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitch, _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingInitialized];
        restoreEvt.forEach((evt) => {
            window.addEventListener(evt, () => {
                this.restoreData();
            });
        });
        // 清空已保存的抓取结果
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.clearSavedCrawl, () => {
            this.clearSavedCrawl();
        });
    }
    // 存储抓取结果
    async saveData() {
        if (_Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length === 0) {
            return;
        }
        this.taskId = _Store__WEBPACK_IMPORTED_MODULE_3__["store"].date.getTime();
        const url = this.getURL();
        // 首先检查这个网址下是否已经存在数据，如果有数据，则清除之前的数据，保持每个网址只有一份数据
        const taskData = (await this.IDB.get(this.dataName, url, 'url'));
        if (taskData) {
            await this.IDB.delete(this.dataName, taskData.id);
            await this.IDB.delete(this.statesName, taskData.id);
        }
        // 如果此时本次任务已经完成，就不进行保存了
        if (_DownloadStates__WEBPACK_IMPORTED_MODULE_5__["downloadStates"].downloadedCount() === _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length) {
            return;
        }
        // 保存本次任务的数据
        _Log__WEBPACK_IMPORTED_MODULE_1__["log"].warning(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_正在保存抓取结果'));
        const resultData = {
            id: this.taskId,
            url: url,
            data: _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result,
            date: _Store__WEBPACK_IMPORTED_MODULE_3__["store"].date,
        };
        try {
            await this.IDB.add(this.dataName, resultData);
        }
        catch (error) {
            // 当存储失败时
            console.error(error);
            if (error.target && error.target.error && error.target.error.message) {
                const msg = error.target.error.message;
                _Log__WEBPACK_IMPORTED_MODULE_1__["log"].error('IndexedDB: ' + msg);
            }
        }
        // 保存 states 数据
        const statesData = {
            id: this.taskId,
            states: _DownloadStates__WEBPACK_IMPORTED_MODULE_5__["downloadStates"].states,
        };
        this.IDB.add(this.statesName, statesData);
        _Log__WEBPACK_IMPORTED_MODULE_1__["log"].success(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_已保存抓取结果'), 2);
    }
    // 定时 put 下载状态
    async regularPutStates() {
        window.setInterval(() => {
            if (this.needPutStates) {
                const statesData = {
                    id: this.taskId,
                    states: _DownloadStates__WEBPACK_IMPORTED_MODULE_5__["downloadStates"].states,
                };
                this.needPutStates = false;
                // 如果此时本次任务已经完成，就不进行保存了
                if (_DownloadStates__WEBPACK_IMPORTED_MODULE_5__["downloadStates"].downloadedCount() === _Store__WEBPACK_IMPORTED_MODULE_3__["store"].result.length) {
                    return;
                }
                this.IDB.put(this.statesName, statesData);
            }
        }, this.putStatesTime);
    }
    async clearData() {
        if (!this.taskId) {
            return;
        }
        // 下载完成时，清除这次任务储存的数据，需要使用保存的 taskId，而不是 URL
        // 因为用户在下载时可能切换了页面 URL，如果使用 URL 就会导致差找不到对应的数据
        const taskData = (await this.IDB.get(this.dataName, this.taskId, 'id'));
        if (!taskData) {
            return;
        }
        this.IDB.delete(this.dataName, this.taskId);
        this.IDB.delete(this.statesName, this.taskId);
    }
    // 清除过期的数据
    async clearExired() {
        // 数据的过期时间，设置为 31 天。31*24*60*60*1000
        const expiryTime = 2678400000;
        // 每隔一天检查一次数据是否过期
        const nowTime = new Date().getTime();
        let lastCheckTime = 0;
        const storeName = 'lastCheckExired';
        const data = localStorage.getItem(storeName);
        if (data === null) {
            localStorage.setItem(storeName, lastCheckTime.toString());
        }
        else {
            lastCheckTime = Number.parseInt(data);
        }
        if (nowTime - lastCheckTime < 86400000) {
            return;
        }
        localStorage.setItem(storeName, nowTime.toString());
        // 检查数据是否过期
        const callback = (item) => {
            if (item) {
                const data = item.value;
                if (nowTime - data.date.getTime() > expiryTime) {
                    this.IDB.delete(this.dataName, data.url);
                    this.IDB.delete(this.statesName, data.id);
                }
                item.continue();
            }
        };
        this.IDB.openCursor(this.dataName, callback);
    }
    // 清空已保存的抓取结果
    async clearSavedCrawl() {
        await Promise.all([
            this.IDB.clear(this.dataName),
            this.IDB.clear(this.statesName),
        ]);
        _Toast__WEBPACK_IMPORTED_MODULE_7__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_数据清除完毕'));
    }
    // 处理本页面的 url
    getURL() {
        return window.location.href.split('#')[0];
    }
}
new Resume();


/***/ }),

/***/ "./src/ts/download/ShowSkipCount.ts":
/*!******************************************!*\
  !*** ./src/ts/download/ShowSkipCount.ts ***!
  \******************************************/
/*! exports provided: ShowSkipCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowSkipCount", function() { return ShowSkipCount; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");


// 显示跳过下载的文件数量
class ShowSkipCount {
    constructor(el) {
        this.count = 0; // 跳过下载的数量
        this.el = el;
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].register(this.el);
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.crawlStart, () => {
            this.reset();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStop, () => {
            // 重置计数但不清空提示文字，因为用户还需要看
            this.count = 0;
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.skipDownload, () => {
            this.addCount();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadStart, () => {
            if (this.count === 0) {
                this.reset();
            }
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.downloadComplete, () => {
            // 重置计数但不清空提示文字，因为用户还需要看
            this.count = 0;
        });
    }
    addCount() {
        this.count++;
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.el, '_已跳过n个文件', this.count.toString());
    }
    reset() {
        this.count = 0;
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.el, '');
    }
}



/***/ }),

/***/ "./src/ts/download/ShowStatusOnTitle.ts":
/*!**********************************************!*\
  !*** ./src/ts/download/ShowStatusOnTitle.ts ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PageType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PageType */ "./src/ts/PageType.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../States */ "./src/ts/States.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tools */ "./src/ts/Tools.ts");




/**
↑ 抓取中
→ 等待下一步操作（搜索页）
▶ 可以开始下载
↓ 下载中
║ 下载暂停
■ 下载停止
✓ 下载完毕
*/
var Flags;
(function (Flags) {
    Flags["crawling"] = "\u2191";
    Flags["waiting"] = "\u2192";
    Flags["readyDownload"] = "\u25B6";
    Flags["downloading"] = "\u2193";
    Flags["paused"] = "\u2551";
    Flags["stopped"] = "\u25A0";
    Flags["completed"] = "\u2713";
    Flags["space"] = " ";
})(Flags || (Flags = {}));
// 把下载器运行中的状态添加到页面标题前面
class ShowStatusOnTitle {
    constructor() {
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlStart, () => {
            this.set(Flags.crawling);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.worksUpdate, () => {
            this.set(Flags.waiting);
        });
        for (const ev of [_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlFinish, _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.resume]) {
            window.addEventListener(ev, () => {
                this.set(Flags.readyDownload);
            });
        }
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.downloadStart, () => {
            this.set(Flags.downloading);
        });
        // 切换了页面之后，标题可能会被 pixiv 修改，这样就没有标记了
        // 在这里监听页面切换的事件，如果切换后下载器仍在下载中，则重新添加标记
        // 回调函数应该在 pixiv 修改标题之后执行
        // 但是 pageSwitch 触发时，标题尚未被 pixiv 修改。pixiv 是在 pageSwitch 之后修改标题的。
        // 所以我使用定时器来检查标题是否被 pixiv 修改了
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.pageSwitch, () => {
            window.clearInterval(this.pageSwitchTimer);
            if (!_States__WEBPACK_IMPORTED_MODULE_2__["states"].downloading) {
                return;
            }
            const nowTitle = _Tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getPageTitle();
            this.pageSwitchTimer = window.setInterval(() => {
                if (_Tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getPageTitle() !== nowTitle) {
                    this.set(Flags.downloading);
                    window.clearInterval(this.pageSwitchTimer);
                }
            }, 500);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.downloadComplete, () => {
            this.set(Flags.completed);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.downloadPause, () => {
            this.set(Flags.paused);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.downloadStop, () => {
            this.set(Flags.stopped);
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.crawlEmpty, () => {
            this.reset();
        });
    }
    // 检查标题里是否含有标记
    includeFlag(flag) {
        if (!flag) {
            // 没有传递标记，则检查所有标记
            for (const value of Object.values(Flags)) {
                const str = `[${value}]`;
                if (document.title.includes(str)) {
                    return true;
                }
            }
        }
        else {
            // 否则检查指定标记
            const str = `[${flag}]`;
            return document.title.includes(str);
        }
        return false;
    }
    // 重设 title
    reset() {
        window.clearInterval(this.flashingTimer);
        const metaTagPage = [_PageType__WEBPACK_IMPORTED_MODULE_0__["pageType"].list.UserHome, _PageType__WEBPACK_IMPORTED_MODULE_0__["pageType"].list.UserPostList];
        // 从 og:title 标签获取标题。og:title 标签是最早更新标题的。但不确定是否在所有页面上都可以直接使用 og:title 标签的内容，所以这里只在部分页面上使用
        if (metaTagPage.includes(_PageType__WEBPACK_IMPORTED_MODULE_0__["pageType"].type)) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                document.title = ogTitle.content;
                return;
            }
        }
        // 去掉 title 里的标记
        const index = document.title.indexOf(']');
        document.title = document.title.substring(index + 1);
    }
    // 在标题上显示指定标记
    set(flag) {
        const str = `[${flag}]`;
        // 如果 title 里没有标记，就添加标记
        if (!this.includeFlag()) {
            document.title = `${str} ${document.title}`;
        }
        else {
            // 如果已经有标记了，则替换为新当前传入的标记
            document.title = document.title.replace(/\[.?\]/, str);
        }
        // 可以开始下载，或者等待下一步操作，进行闪烁提醒
        if (flag === Flags.readyDownload || flag === Flags.waiting) {
            this.flashing(flag);
        }
        else {
            window.clearInterval(this.flashingTimer);
        }
    }
    // 闪烁提醒，把给定的标记替换成空白，来回切换
    flashing(flag) {
        window.clearInterval(this.flashingTimer);
        const str = `[${flag}]`;
        const whiteSpace = `[${Flags.space}]`;
        this.flashingTimer = window.setInterval(() => {
            if (this.includeFlag(flag)) {
                // 如果含有标记，就替换成空白
                document.title = document.title.replace(str, whiteSpace);
            }
            else {
                if (this.includeFlag(Flags.space)) {
                    // 如果含有空白，就替换成标记
                    document.title = document.title.replace(whiteSpace, str);
                }
                else {
                    // 如果都没有，一般是页面切换了，标题被重置了，取消闪烁
                    window.clearInterval(this.flashingTimer);
                }
            }
        }, 500);
    }
}
new ShowStatusOnTitle();


/***/ }),

/***/ "./src/ts/langText.ts":
/*!****************************!*\
  !*** ./src/ts/langText.ts ***!
  \****************************/
/*! exports provided: langText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langText", function() { return langText; });
// 储存下载器使用的多语言文本
// 在属性名前面加上下划线，和文本内容做出区别
// {} 是占位符
// <br> 是换行
const langText = {
    _开始抓取: [
        '开始抓取',
        '開始抓取',
        'start crawling',
        'クロールを開始する',
        '크롤링 시작',
    ],
    _或者: [' 或者 ', ' 或是 ', ' or ', ' または ', ' 또는 '],
    _并且: [' 并且 ', ' 並且 ', ' and ', ' かつ ', ' 그리고 '],
    _任务开始: [
        '任务开始',
        '工作開始',
        'Task starts',
        'タスクの開始',
        '작업 시작',
    ],
    _抓取结果为零: [
        '抓取完毕，但没有找到符合筛选条件的文件。',
        '擷取完畢，但沒有找到符合篩選條件的檔案。',
        'Crawl finished but did not find files that match the filter criteria.',
        'フィルタ条件で検索しましたが、該当するファイルは見つかりませんでした。',
        '긁어오기가 완료되었지만 필터 조건과 일치하는 파일을 찾지 못했습니다.',
    ],
    _当前任务尚未完成: [
        '当前任务尚未完成',
        '目前工作尚未完成',
        'The current task has not yet been completed',
        '現在の作業はまだ完了していません',
        '현재 작업이 아직 완료되지 않았습니다',
    ],
    _当前任务尚未完成2: [
        '当前任务尚未完成，请等待完成后再下载。',
        '目前工作尚未完成，請等待完成後再下載。',
        'The current task has not yet been completed',
        '現在のタスクはまだ完了していません。完了するまでお待ちください。',
        '현재 작업이 아직 완료되지 않았습니다.',
    ],
    _关闭: ['关闭', '關閉', 'close', '閉じる', '닫기'],
    _输出信息: [
        '输出信息',
        '輸出資訊',
        'Output information',
        '出力情報',
        '출력 정보',
    ],
    _复制: ['复制', '複製', 'Copy', 'コピー', '복사'],
    _已复制到剪贴板: [
        '已复制到剪贴板，可直接粘贴',
        '已複製至剪貼簿，可直接貼上',
        'Has been copied to the clipboard',
        'クリップボードにコピーしました。',
        '클립보드에 복사되었습니다.',
    ],
    _下载设置: [
        '下载设置',
        '下載設定',
        'Download settings',
        'ダウンロード設定',
        '다운로드 설정',
    ],
    _收起展开设置项: [
        '收起/展开设置项',
        '摺疊/展開設定項目',
        'Collapse/expand settings',
        '設定の折りたたみ/展開',
        '설정 축소/확장',
    ],
    _github: [
        'Github 页面，欢迎 star',
        'Github 頁面，歡迎 star',
        'Github page, if you like, please star it',
        'Github のページ。ぜひ star をください。',
        'Github, 유용하셨다면 Star를 주세요.',
    ],
    _pixivDownloader: [
        'Pixiv 下载器',
        'Pixiv 下載器',
        'Pixiv Downloader',
        'Pixiv ダウンロード',
        'Pixiv 다운로더',
    ],
    _抓取: ['抓取', '擷取', 'Crawl', '保存', '긁어오기'],
    _下载: ['下载', '下載', 'Download', 'ダウンロード', '다운로드'],
    _其他: ['其他', '其他', 'Other', 'その他', '그 외'],
    _快捷键切换显示隐藏: [
        '使用 Alt + X，可以显示和隐藏下载面板',
        '使用 Alt + X，可以顯示和隱藏下載面板',
        'Use Alt + X to show and hide the download panel',
        'Alt + X でダウンロードパネルを表示/非表示にできます。',
        'Alt + X를 사용하여 다운로드 패널 보이기 및 숨기기',
    ],
    _共抓取到n个文件: [
        '共抓取到 {} 个文件',
        '共擷取到 {} 個檔案',
        'Crawl a total of {} files',
        '合計 {} 個のファイルを取得しました。',
        '총 {}개의 파일 긁어오기',
    ],
    _命名规则: [
        ' <span class="key">命名</span>规则',
        '<span class="key">命名</span>規則',
        '<span class="key">Naming</span> rule',
        '<span class="key">命名</span>規則',
        '<span class="key">명명</span> 규칙',
    ],
    _设置文件夹名的提示: [
        `可以使用 '<span class="key">/</span>' 建立文件夹。示例：`,
        `可以使用斜線（<span class="key">/</span>）建立資料夾。範例：`,
        `You can create a directory with '<span class="key">/</span>'. Example：`,
        `フォルダーは '<span class="key">/</span>' で作成できます。例：`,
        `'<span class="key">/</span>'을 사용하여 디렉토리를 생성할 수 있습니다.<br>예:`,
    ],
    _命名标记user: [
        '画师名字',
        '畫師名稱',
        'Artist name',
        'ユーザー名',
        '아티스트명',
    ],
    _命名标记create_id: [
        '画师的创作者 ID（英文名或罗马字）',
        '畫師的創作者 ID（英文名或羅馬字）',
        `Artist's Creator ID (English or Romaji)`,
        'アーティストのクリエイター ID (英語またはローマ字)',
        '아티스트 크리에이터 ID(영어 또는 로마자)',
    ],
    _命名标记uid: [
        '画师 ID（数字）',
        '畫師 ID（數字）',
        'Artist ID (number)',
        'ユーザーID（数字）',
        '아티스트 ID(숫자)',
    ],
    _预览文件名: [
        '预览文件名',
        '預覽檔案名稱',
        'Preview file name',
        'ファイル名',
        '파일명 미리보기',
    ],
    _下载线程: [
        '同时下载<span class="key">数量</span>',
        '同時下載<span class="key">數量</span>',
        'Download <span class="key">thread</span>',
        '同時ダウンロード数',
        '다운로드 <span class="key">쓰레드</span>',
    ],
    _线程数字: [
        '可以输入 1-3 之间的数字，设置同时下载的数量',
        '可以輸入 1-3 之間的數字，設定同時下載的數量',
        'You can type a number between 1-3 to set the number of concurrent downloads',
        '同時にダウンロードするファイルの数を 1-3 で設定します。',
        '1-3 사이의 숫자를 입력하여 동시 다운로드 수를 설정할 수 있습니다.',
    ],
    _下载按钮1: [
        '开始下载',
        '開始下載',
        'start download',
        'ダウンロードを開始',
        '다운로드 시작',
    ],
    _下载按钮2: [
        '暂停下载',
        '暫停下載',
        'pause download',
        'ダウンロードを一時停止',
        '다운로드 일시중지',
    ],
    _下载按钮3: [
        '停止下载',
        '停止下載',
        'stop download',
        'ダウンロードを停止',
        '다운로드 정지',
    ],
    _下载按钮4: ['复制 url', '複製url', 'copy urls', 'URLをコピー', 'URL 복사'],
    _当前状态: [
        '当前状态 ',
        '目前狀態 ',
        'Now state ',
        '現在の状態 ',
        '현재 상태 ',
    ],
    _未开始下载: [
        '未开始下载',
        '未開始下載',
        'Not yet started downloading',
        'まだダウンロードを開始していません。',
        '아직 다운로드를 시작하지 않았습니다.',
    ],
    _常见问题: [
        '常见问题',
        '常見問題',
        'Common problems',
        'よくある質問',
        '자주 묻는 질문',
    ],
    _uuid: [
        `下载器检测到下载后的文件名可能异常。如果文件名是一串随机的字母和数字，或者没有使用下载器设置里的命名规则，就表示发生了此问题。<br>
这不是下载器自身的问题，而是被其他扩展程序影响了，导致下载器设置的文件名丢失。<br>
当你遇到这个问题时，可以考虑下面的处理方法：<br>
1. 推荐：你可以新建一个浏览器本地用户来使用这个下载器。对于 Chrome 和 Edge 浏览器，你可以点击浏览器右上角的头像图标，然后创建新的个人资料（不需要登录 Google 或 Microsoft 账号）。每个用户都有独立的浏览器窗口，所以你可以为新用户安装这个下载器，并且不要安装其他扩展程序。当你需要下载 Pixiv 或 Fanbox 的文件时，使用这个用户进行下载，就可以避免受到其他扩展程序的影响。
<br>
2. 你可以找出导致此问题的扩展程序，并在使用本下载器时，临时禁用它们。这些扩展程序通常具有下载文件、管理下载的功能，例如：IDM Integration Module、Chrono 下载管理器、mage Downloade 等。如果你不确定是哪个扩展导致的，可以先禁用所有扩展，然后一个一个启用，并使用下载器进行下载，这样就可以找出是哪个扩展导致了此问题。<br>
<br>
技术细节：<br>
某些扩展程序会监听 chrome.downloads.onDeterminingFilename 事件，这很容易导致预设的文件名丢失。<br>
假设本下载器为某个文件设置了自定义文件名：user/image.jpg。<br>
如果另一个扩展程序监听了 onDeterminingFilename 事件，浏览器会询问它对文件名的建议（使它有机会修改文件名）。问题在于：此时浏览器传递的文件名是默认的（也就是 URL 里的最后一段路径），而不是下载器设置的文件名。<br>
所以下载器设置的文件名会丢失，并且文件名会变成 URL 里的最后一段路径。<br>`,
        `下載器檢測到下載後的檔名可能異常。如果檔名是一串隨機的字母和數字，或者沒有使用下載器設定裡的命名規則，就表示發生了此問題。<br>
這不是下載器自身的問題，而是被其他擴充套件程式影響了，導致下載器設定的檔名丟失。<br>
當你遇到這個問題時，可以考慮下面的處理方法：<br>
1. 推薦：你可以新建一個瀏覽器本地使用者來使用這個下載器。對於 Chrome 和 Edge 瀏覽器，你可以點選瀏覽器右上角的頭像圖示，然後建立新的個人資料（不需要登入 Google 或 Microsoft 賬號）。每個使用者都有獨立的瀏覽器視窗，所以你可以為新使用者安裝這個下載器，並且不要安裝其他擴充套件程式。當你需要下載 Pixiv 或 Fanbox 的檔案時，使用這個使用者進行下載，就可以避免受到其他擴充套件程式的影響。
<br>
2. 你可以找出導致此問題的擴充套件程式，並在使用本下載器時，臨時禁用它們。這些擴充套件程式通常具有下載檔案、管理下載的功能，例如：IDM Integration Module、Chrono 下載管理器、mage Downloade 等。如果你不確定是哪個擴充套件導致的，可以先禁用所有擴充套件，然後一個一個啟用，並使用下載器進行下載，這樣就可以找出是哪個擴充套件導致了此問題。<br>
<br>
技術細節：<br>
某些擴充套件程式會監聽 chrome.downloads.onDeterminingFilename 事件，這很容易導致預設的檔名丟失。<br>
假設本下載器為某個檔案設定了自定義檔名：user/image.jpg。<br>
如果另一個擴充套件程式監聽了 onDeterminingFilename 事件，瀏覽器會詢問它對檔名的建議（使它有機會修改檔名）。問題在於：此時瀏覽器傳遞的檔名是預設的（也就是 URL 裡的最後一段路徑），而不是下載器設定的檔名。<br>
所以下載器設定的檔名會丟失，並且檔名會變成 URL 裡的最後一段路徑。<br>`,
        `The downloader detects that the file name after downloading may be abnormal. If the file name is a string of random letters and numbers, or does not use the naming rules in the downloader settings, it means that this problem has occurred. <br>
This is not a problem with the downloader itself, but it is affected by other extensions, causing the file name set by the downloader to be lost. <br>
When you encounter this problem, you can consider the following solutions: <br>
1. Recommended: You can create a new browser local user to use this downloader. For Chrome and Edge browsers, you can click the avatar icon in the upper right corner of the browser and create a new profile (no need to log in to a Google or Microsoft account). Each user has a separate browser window, so you can install this downloader for the new user and do not install other extensions. When you need to download files from Pixiv or Fanbox, use this user to download to avoid being affected by other extensions. <br>
2. You can find out the extensions that cause this problem and temporarily disable them when using this downloader. These extensions usually have the functions of downloading files and managing downloads, such as: IDM Integration Module, Chrono Download Manager, mage Downloade, etc. If you are not sure which extension is causing the problem, you can find out which extension is causing the problem by disabling all extensions, then enabling them one by one and downloading them using the Downloader. <br>
<br>
Technical details: <br>
Some extensions listen to the chrome.downloads.onDeterminingFilename event, which can easily cause the preset file name to be lost. <br>
Suppose this Downloader sets a custom file name for a file: user/image.jpg. <br>
If another extension listens to the onDeterminingFilename event, the browser will ask it for suggestions for the file name (giving it a chance to modify the file name). The problem is: the file name passed by the browser is the default (the last path in the URL), not the file name set by the Downloader. <br>
So the file name set by the Downloader is lost, and the file name becomes the last path in the URL. <br>`,
        `ダウンローダーは、ダウンロード後のファイル名が異常である可能性があることを検出しました。ファイル名がランダムな文字と数字の文字列である場合、またはダウンローダー設定の命名規則を使用していない場合は、この問題が発生していることを意味します。<br>
これはダウンローダー自体の問題ではなく、他の拡張機能の影響を受け、ダウンローダーによって設定されたファイル名が失われています。<br>
この問題が発生した場合は、以下の解決策を検討してください。<br>
1. 推奨：このダウンローダーを使用するために、新しいブラウザローカルユーザーを作成できます。ChromeおよびEdgeブラウザの場合、ブラウザの右上隅にあるアバターアイコンをクリックして、新しいプロファイルを作成できます（GoogleまたはMicrosoftアカウントにログインする必要はありません）。ユーザーごとにブラウザウィンドウが異なりますので、新しいユーザー用にこのダウンローダーをインストールし、他の拡張機能はインストールしないでください。PixivやFanboxからファイルをダウンロードする必要がある場合は、他の拡張機能の影響を受けないように、このユーザーを使用してダウンロードしてください。 <br>
2. この問題の原因となっている拡張機能を特定し、このダウンローダーを使用する際に一時的に無効にすることができます。これらの拡張機能は通常、ファイルのダウンロードとダウンロード管理の機能を備えています。例としては、IDM Integration Module、Chrono Download Manager、mage Downloade などがあります。どの拡張機能が問題の原因となっているのかわからない場合は、すべての拡張機能を無効にしてから、1つずつ有効にしてダウンローダーを使用してダウンロードすることで、どの拡張機能が問題の原因となっているのかを特定できます。<br>
<br>
技術的な詳細: <br>
一部の拡張機能は chrome.downloads.onDeterminingFilename イベントをリッスンしており、これによりプリセットされたファイル名が失われる場合があります。<br>
このダウンローダーがファイルにカスタムファイル名（user/image.jpg）を設定するとします。<br>
別の拡張機能が onDeterminingFilename イベントをリッスンしている場合、ブラウザはその拡張機能にファイル名の候補を尋ねます（これにより、拡張機能はファイル名を変更する機会を得ます）。問題は、ブラウザから渡されるファイル名がデフォルト（URL の最後のパス）であり、ダウンローダーによって設定されたファイル名ではないことです。<br>
そのため、ダウンローダーによって設定されたファイル名は失われ、ファイル名が URL の最後のパスになります。<br>`,
        `다운로더가 다운로드 후 파일 이름이 비정상적일 수 있음을 감지했습니다. 파일 이름이 임의의 문자와 숫자로 구성되어 있거나 다운로더 설정의 명명 규칙을 사용하지 않는 경우 이 문제가 발생했음을 의미합니다. <br>
이 문제는 다운로더 자체의 문제가 아니라 다른 확장 프로그램의 영향을 받아 다운로더에서 설정한 파일 이름이 손실되는 것입니다. <br>
이 문제가 발생하면 다음 해결 방법을 고려해 보세요. <br>
1. 권장 사항: 이 다운로더를 사용할 새 브라우저 로컬 사용자를 만들 수 있습니다. Chrome 및 Edge 브라우저의 경우 브라우저 오른쪽 상단의 아바타 아이콘을 클릭하고 새 프로필을 만들 수 있습니다(Google 또는 Microsoft 계정에 로그인할 필요 없음). 각 사용자는 별도의 브라우저 창을 사용하므로 새 사용자를 위해 이 다운로더를 설치하고 다른 확장 프로그램을 설치하지 않아도 됩니다. Pixiv 또는 Fanbox에서 파일을 다운로드해야 하는 경우 다른 확장 프로그램의 영향을 받지 않도록 이 사용자를 사용하여 다운로드하세요. <br>
2. 이 문제를 일으키는 확장 프로그램을 찾아 이 다운로더를 사용할 때 일시적으로 비활성화할 수 있습니다. 이러한 확장 프로그램은 일반적으로 IDM 통합 모듈, Chrono Download Manager, mage Downloade 등과 같이 파일 다운로드 및 다운로드 관리 기능을 제공합니다. 어떤 확장 프로그램이 문제를 일으키는지 확실하지 않은 경우, 모든 확장 프로그램을 비활성화한 후 하나씩 활성화하고 다운로더를 사용하여 다운로드하면 어떤 확장 프로그램이 문제를 일으키는지 확인할 수 있습니다. <br>
<br>
기술 세부 정보: <br>
일부 확장 프로그램은 chrome.downloads.onDeterminingFilename 이벤트를 수신하는데, 이로 인해 미리 설정된 파일 이름이 쉽게 손실될 수 있습니다. <br>
이 다운로더가 파일에 사용자 지정 파일 이름(user/image.jpg)을 설정한다고 가정해 보겠습니다. <br>
다른 확장 프로그램이 onDeterminingFilename 이벤트를 수신하는 경우, 브라우저는 해당 확장 프로그램에 파일 이름을 제안하도록 요청하여 파일 이름을 수정할 수 있는 기회를 제공합니다. 문제는 브라우저에서 전달된 파일 이름이 다운로더에서 설정한 파일 이름이 아니라 기본값(URL의 마지막 경로)이라는 것입니다. <br>
따라서 다운로더에서 설정한 파일 이름은 사라지고, 파일 이름이 URL의 마지막 경로가 됩니다. <br>`,
    ],
    _下载说明: [
        "下载的文件保存在浏览器的下载目录里。<br>请不要在浏览器的下载选项里选中'总是询问每个文件的保存位置'。<br><b>如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。</b><br>QQ群：853021998",
        '下載的檔案儲存在瀏覽器的下載目錄裡。<br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><b>如果下載後的檔案名稱異常，請停用其他有下載功能的瀏覽器擴充功能。</b><br>QQ群：853021998',
        'The downloaded file is saved in the browser`s download directory. <br><b>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.</b>',
        'ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><b>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。</b>',
        '다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다. <br><b>다운로드 후 파일명이 비정상인 경우 다운로드 기능이 있는 다른 브라우저 확장 프로그램을 비활성화해주세요.</b>',
    ],
    _正在下载中: [
        '正在下载中',
        '正在下載',
        'Downloading',
        'ダウンロード中',
        '다운로드 중',
    ],
    _下载完毕: [
        '✓ 下载完毕!',
        '✓ 下載完畢!',
        '✓ Download finished!',
        '✓ ダウンロードが完了しました！',
        '✓ 다운로드 완료!',
    ],
    _已暂停: [
        '下载已暂停',
        '下載已暫停',
        'Download is paused',
        'ダウンロードを一時停止中です。',
        '다운로드 일시중지',
    ],
    _已停止: [
        '下载已停止',
        '下載已停止',
        'Download stopped',
        'ダウンロードを停止しました。',
        '다운로드 정지',
    ],
    _已下载: ['已下载', '已下載', 'downloaded', 'ダウンロードした', '다운로드됨'],
    _抓取完毕: [
        '抓取完毕！',
        '擷取完畢！',
        'Crawl finished!',
        'クロールが完了しました！',
        '긁어오기 완료!',
    ],
    _自动开始下载: [
        '<span class="key">自动</span>开始下载',
        '<span class="key">自動</span>開始下載',
        'Download starts <span class="key">automatically</span>',
        'ダウンロードを自動的に開始する',
        '<span class="key">자동으로</span> 다운로드 시작',
    ],
    _自动下载的提示: [
        '当“开始下载”状态可用时，自动开始下载，不需要点击下载按钮。',
        '當可下載時自動開始下載，不需要點選下載按鈕。',
        'When the &quot;Start Download&quot; status is available, the download starts automatically and no need to click the download button.',
        '「ダウンロードを開始する」ステータスが有効になると、ダウンロードが自動的に開始され、ダウンロードボタンをクリックする必要がなくなります。',
        '&quot;다운로드 시작&quot; 상태가 활성화되면, 다운로드가 자동으로 시작되고 다운로드 시작 버튼을 클릭할 필요가 없게 됩니다.',
    ],
    _文件下载失败: [
        '文件 {} 下载失败',
        '檔案 {} 下載失败',
        'File {} download failed',
        'ファイル {} のダウンロードに失敗しました。',
        '{} 파일 다운로드 실패',
    ],
    _是否重置设置: [
        '是否重置设置？',
        '是否重設設定？',
        'Do you want to reset the settings?',
        '設定をリセットしますか？',
        '설정을 초기화하시겠습니까?',
    ],
    _id范围: [
        '<span class="key">ID</span> 范围',
        '<span class="key">ID</span> 範圍',
        '<span class="key">ID</span> range',
        '<span class="key">ID</span>の範囲',
        '<span class="key">ID</span> 범위',
    ],
    _设置id范围提示: [
        '您可以输入一个投稿 ID，抓取比它新或者比它旧的投稿',
        '您可以輸入一個投稿 ID，擷取比它新或者比它舊的投稿。',
        'You can enter a work ID and crawl posts that are newer or older than it',
        '1つの投稿IDを入力することで、それより新しいあるいは古い投稿をまとめてダウンロードすることができます。',
        '1개의 게시물 ID를 입력하면 그보다 새로운 혹은 오래된 게시물을 일괄 다운로드 받을 수 있습니다.',
    ],
    _大于: ['大于', '大於', 'Bigger than', 'より新しい', '보다 큼'],
    _小于: ['小于', '小於', 'Less than', 'より古い', '보다 작음'],
    _投稿时间: [
        '投稿<span class="key">时间</span>',
        '投稿<span class="key">時間</span>',
        'Posting <span class="key">date</span>',
        '投稿<span class="key">日時</span>',
        '투고 <span class="key">날짜</span>',
    ],
    _设置投稿时间提示: [
        '您可以下载指定时间内发布的投稿',
        '您可以下載指定時間内發佈的投稿',
        'You can download posts published within a specified time',
        '指定期間内の投稿をまとめてダウンロードできます。',
        '지정된 기간 내에 게시물을 다운로드할 수 있습니다.',
    ],
    _没有数据可供使用: [
        '没有数据可供使用',
        '沒有資料可供使用',
        'No data is available.',
        '該当するデータはありません。',
        '사용 가능한 데이터가 없습니다.',
    ],
    _最小值: ['最小值', '最小值', 'Minimum value', '最小値', '최소'],
    _最大值: ['最大值', '最大值', 'maximum value', '最大値', '최대'],
    _文件类型: [
        '<span class="key">文件</span>类型',
        '<span class="key">檔案</span>類型',
        '<span class="key">File</span> type',
        '<span class="key">ファイル</span>タイプ',
        '<span class="key">파일</span> 유형',
    ],
    _图片: ['图片', '圖片', 'Image', '画像', '이미지'],
    _视频: ['视频', '影片', 'Video', '映像', '동영상'],
    _音乐: ['音频', '音訊', 'Audio', '音声', '오디오'],
    _压缩文件: [
        '压缩文件',
        '壓縮檔',
        'Compressed file',
        '圧縮ファイル',
        '압축된 파일',
    ],
    _PS文件: ['源文件', '原始檔', 'Source File', 'ソースファイル', '소스 파일'],
    _费用类型: [
        '<span class="key">费用</span>类型',
        '<span class="key">費用</span>型別',
        '<span class="key">Fee</span> type',
        '<span class="key">料金</span>タイプ',
        '<span class="key">수수료</span> 유형',
    ],
    _免费投稿: ['免费投稿', '免費投稿', 'Free post', '無料投稿', '무료 게시물'],
    _付费投稿: ['付费投稿', '付費投稿', 'Paid post', '有償投稿', '유료 게시물'],
    _价格范围: [
        '<span class="key">价格</span>范围',
        '<span class="key">價格</span>範圍',
        '<span class="key">Price</span> range',
        '<span class="key">価格</span>帯',
        '<span class="key">가격</span> 범위',
    ],
    _保存投稿中的外部链接: [
        '保存投稿中的外部<span class="key">链接</span>',
        '儲存投稿中的外部<span class="key">連結</span>',
        'Save external <span class="key">links</span> in the posts',
        '本文中の外部<span class="key">リンク</span>を保存',
        '게시물의 외부 <span class="key">링크</span> 저장',
    ],
    _保存投稿中的文字: [
        '保存投稿中的<span class="key">文字</span>',
        '儲存投稿中的<span class="key">文字</span>',
        'Save the <span class="key">text</span> in the posts',
        '投稿の<span class="key">本文</span>を保存',
        '게시물의 <span class="key">본문</span> 저장',
    ],
    _抓取文件数量: [
        '已获取 {} 个文件',
        '已取得 {} 個檔案',
        '{} Files acquired',
        '{} 個のファイルを取得',
        '{}개의 파일을 획득하였습니다',
    ],
    _早于: ['早于', '早於', 'Earlier than', 'より前', '보다 이전'],
    _晚于: ['晚于', '晚於', 'Later than', 'より後', '보다 이후'],
    _抓取赞助的所有用户的投稿: [
        '抓取赞助的所有用户的投稿',
        '擷取所有贊助用戶的投稿',
        'Crawl all sponsored posts',
        '支援中のユーザーの投稿をまとめて保存',
        '지원 중인 모든 크리에이터의 게시물 긁어오기',
    ],
    _没有赞助的用户: [
        '没有可用的数据，可能是因为你没有赞助的创作者。如果你认为是程序错误，请向作者反馈。',
        '沒有可用的資料，可能是因為你沒有贊助的創作者。如果你認為是程式錯誤，請向作者反饋。',
        `There is no available data, probably because you don't have a sponsored creator. If you think it's a program error, please give feedback to the author.`,
        '利用可能なデータがありません。おそらくスポンサークリエイターがいないためです。 プログラミングのミスだと思われる場合は、作者にフィードバックしてください。',
        '스폰서 크리에이터가 없기 때문에 사용할 수 있는 데이터가 없습니다. 프로그래밍 오류라고 생각되면 작성자에게 피드백을 보내주세요.',
    ],
    _抓取关注的所有用户的投稿: [
        '抓取关注的所有用户的投稿',
        '抓取關注的所有使用者的投稿',
        'Crawl all posts of following users',
        'フォローしているユーザーのすべての投稿をクロールする',
        '다음 사용자의 모든 게시물을 크롤링합니다.',
    ],
    _抓取关注的所有用户的投稿的提示: [
        `提示：关注的用户里不包含赞助的用户。\n\n如果你有多个关注的用户，抓取他们的所有投稿可能会产生大量的网络请求。你可以根据需要设置一些过滤条件，以避免产生不必要的抓取。例如设置“费用类型”、“投稿时间”等。\n\n是否立即开始抓取？`,
        `提示：關注的使用者裡不包含贊助的使用者。\n\n如果你有多個關注的使用者，抓取他們的所有投稿可能會產生大量的網路請求。你可以根據需要設定一些過濾條件，以避免產生不必要的抓取。例如設定“費用型別”、“投稿時間”等。\n\n是否立即開始抓取？`,
        `Tip: Followed users do not include sponsored users. \n\nIf you have multiple followed users, crawling all their posts may generate a large number of network requests. You can set some filtering conditions as needed to avoid unnecessary crawling. For example, set "fee type", "post time", etc. \n\nDo you want to start crawling now?`,
        `ヒント: フォローしているユーザーにはスポンサーユーザーは含まれません。\n\nフォローしているユーザーが複数いる場合、そのユーザーの投稿をすべてクロールすると、大量のネットワーク リクエストが発生する可能性があります。不要なクロールを回避するために、必要に応じてフィルタリング条件を設定できます。たとえば、「料金タイプ」、「投稿時間」などを設定します。\n\n今すぐクロールを開始しますか?`,
        `팁: 팔로우된 사용자에는 스폰서 사용자가 포함되지 않습니다. \n\n팔로우된 사용자가 여러 명인 경우 모든 게시물을 크롤링하면 많은 수의 네트워크 요청이 생성될 수 있습니다. 불필요한 크롤링을 피하기 위해 필요에 따라 일부 필터링 조건을 설정할 수 있습니다. 예를 들어 "수수료 유형", "게시 시간" 등을 설정합니다. \n\n지금 크롤링을 시작하시겠습니까?`,
    ],
    _正在关注的创作者: [
        '正在关注的创作者',
        '關注中的創作者',
        'Followed Creators',
        'フォロー中のクリエイター',
        '팔로우 중인 크리에이터',
    ],
    _没有找到关注的用户: [
        '没有找到关注的用户',
        '沒有找到關注的創作者',
        'No following users found',
        'フォローしているユーザーが見つかりません',
        '다음 사용자를 찾을 수 없습니다.',
    ],
    _你可以在首页和关注的创作者页面里使用此功能: [
        '你可以在 Fanbox 主页和关注的创作者页面里使用此功能。',
        '你可以在 Fanbox 主頁和關注的創作者頁面裡使用此功能',
        'You can use this feature on the Fanbox homepage and the creators you follow page.',
        'この機能は、Fanboxホームページやフォローしているクリエイターのページでご利用いただけます。',
        '이 기능은 Fanbox 홈페이지와 팔로우하는 크리에이터 페이지에서 사용할 수 있습니다.',
    ],
    _抓取该用户的投稿: [
        '抓取该用户的投稿',
        '擷取該用戶的投稿',
        "Crawl this user's posts",
        'このユーザーの投稿をまとめて保存',
        '이 크리에이터의 게시물 긁어오기',
    ],
    _抓取该tag的投稿: [
        '抓取该 tag 的投稿',
        '擷取該 tag 的投稿',
        'Crawl posts with this tag',
        'このタグの投稿をまとめて保存',
        '이 태그를 사용하여 게시물 긁어오기',
    ],
    _抓取这篇投稿: [
        '抓取这篇投稿',
        '擷取這篇投稿',
        'Crawl this post',
        'この投稿を保存',
        '이 게시물을 긁어오기',
    ],
    _抓取商品的封面图: [
        '抓取商品的封面图',
        '擷取商品的封面圖',
        'Crawl the cover image of the product',
        '投稿の表紙画像を保存',
        '게시물의 표지 이미지를 긁어오기',
    ],
    _命名标记postid: ['投稿 ID', '投稿 ID', 'Post ID', '投稿ID', '게시물 ID'],
    _命名标记title: [
        '投稿标题',
        '投稿標題',
        'Post title',
        '投稿のタイトル',
        '게시물 제목',
    ],
    _命名标记tags: [
        '投稿的 tag 列表（可能为空）',
        '投稿的 tag 列表（可能為空）',
        "Post's tag list (may be empty)",
        '投稿のタグリスト（空の場合があります）',
        '게시물의 태그 목록 (비어있을 수 있음)',
    ],
    _命名标记date: [
        '投稿的发布日期，如 2019-08-29',
        '投稿的發布日期，如 2019-08-29',
        'The publication date of the post, such as 2019-08-29',
        '投稿日など，例 2019-08-29',
        '게시물의 투고일. 예: 2019-08-29',
    ],
    _命名标记fee: [
        '投稿的价格',
        '投稿的價格',
        'Post price',
        '支援額',
        '게시물 가격',
    ],
    _命名标记index: [
        '文件在它所属的投稿里的序号',
        '檔案在它所屬的投稿裡的序號',
        'The serial number of the file in the post it belongs to',
        '投稿内のファイルの連番',
        '게시물의 파일 일련번호',
    ],
    _命名标记name: [
        '文件在投稿里的文件名',
        '檔案在投稿裡的名稱',
        'File name in the post',
        '投稿内のファイル名',
        '게시물의 파일명',
    ],
    _命名标记ext: [
        '文件的扩展名',
        '檔案的副檔名',
        'File extension',
        'ファイルの拡張子',
        '파일 확장자',
    ],
    _命名标记提醒: [
        '您可以使用多个标记；建议在不同标记之间添加分割用的字符。示例：{postid}-{title}<br>建议在命名规则中包含 {postid} 和 {index}，防止文件名重复。',
        '您可以使用多個標記；建議在不同標記之間加入分隔用的字元。範例：{postid}-{title}<br>建議在命名規則中包含 {postid} 和 {index}，防止檔名重複。',
        'You can use multiple tags; it is recommended to add characters to separate between different tags. Example: {postid}-{title} <br> It is recommended to include {postid} and {index} in the naming rules to prevent duplicate file names.',
        '複数のタグを使用できます。異なるタグを区切るために文字を追加することを推奨します。 例：{postid}-{title} <br>ファイル名の衝突を防ぐために、命名規則に{postid}と{index}を含めることを推奨します。',
        '여러 태그를 사용할 수 있습니다. 서로 다른 태그 사이에 구분자를 넣는 것을 권장합니다.<br>예: {title}-{postid}<br>파일명이 중복되지 않도록 명명 규칙에 {postid}와 {index}를 포함할 것을 권장합니다.',
    ],
    _日期格式: [
        '日期和时间<span class="key">格式</span>',
        '日期和時間<span class="key">格式</span>',
        'Date and time <span class="key">format</span>',
        '日付と時刻の書式',
        '날짜 및 시간 <span class="key">형식</span>',
    ],
    _日期格式提示: [
        '你可以使用以下标记来设置日期和时间格式。这会影响命名规则里的 {date} 和 {task_date}。<br>对于时间如 2021-04-30T06:40:08',
        '你可以使用以下標記來設定日期和時間格式。這會影響命名規則裡的 {date} 和 {task_date}。<br>對於資料如：2021-04-30T06:40:08。',
        'You can use the following notation to set the date and time format. This will affect {date} and {task_date} in the naming rules. <br>For time such as 2021-04-30T06:40:08',
        '以下のタグを使用して日時の書式を設定できます。 これは命名規則の {date} と {task_date} に影響します。 <br> 例：2021-04-30T06:40:08',
        '아래 태그를 사용하여 날짜 형식을 설정할 수 있습니다.<br>이것은 명명 규칙의 {date}와 {task_date}에 영향을 미칩니다.<br>예: 2021-04-30T 06:40:08',
    ],
    _命名标记taskDate: [
        '本次任务抓取完成时的时间。例如：2020-10-21',
        '本次工作擷取完成時的時間。例如：2020-10-21。',
        'The time when the task was crawl completed. For example: 2020-10-21',
        'タスクを完了した日時。 例：2020-10-21',
        '긁어오기 작업 완료 날짜. 예: 2020-10-21',
    ],
    _提示: ['提示', '提示', 'tip', 'ヒント', '팁'],
    _保存投稿中的封面图片: [
        '保存投稿中的<span class="key">封面</span>图片',
        '儲存投稿中的<span class="key">封面</span>圖片',
        'Save the <span class="key">cover</span> image in the posts',
        '投稿の<span class="key">表紙</span>画像を保存',
        '게시물의 <span class="key">표지</span> 이미지 저장',
    ],
    _列表页抓取完成: [
        '列表页面抓取完成',
        '清單頁面擷取完成',
        'The list page is crawled',
        'リストページがクロールされ',
        '목록 페이지를 긁어왔습니다',
    ],
    _当前有x个投稿: [
        '当前有 {} 个投稿 ',
        '目前有 {} 個投稿 ',
        'There are now {} posts',
        '今は　{}　枚の投稿があります ',
        '현재 {}개의 게시물이 있습니다',
    ],
    _开始获取投稿信息: [
        '开始获取投稿信息',
        '開始取得投稿資訊',
        'Start getting post data',
        '投稿情報の取得を開始します',
        '게시물 데이터 취득을 시작합니다',
    ],
    _待处理: ['待处理', '待處理', 'Pending', '処理待ち', '처리 대기'],
    _共抓取到n个作品: [
        '共抓取到 {} 个投稿',
        '共擷取到 {} 個投稿',
        'Crawl a total of {} posts',
        '合計 {} 件の投稿があります',
        '총 {}개의 게시물을 긁어오기',
    ],
    _最近更新: [
        '最近更新',
        '最近更新',
        'What`s new',
        '最近更新する',
        '최근 업데이트',
    ],
    _我知道了: ['我知道了', '我知道了', 'OK', '分かりました', '확인'],
    _格式错误: [
        '格式错误',
        '格式錯誤',
        'Format error',
        'フォーマットエラー',
        '형식 오류',
    ],
    _导入成功: [
        '导入成功',
        '匯入成功',
        'Import successfully',
        'インポート成功',
        '가져오기 성공',
    ],
    _导出成功: [
        '导出成功',
        '匯出成功',
        'Export successfully',
        'エクスポート成功',
        '내보내기 성공',
    ],
    _确定: ['确定', '確定', 'Ok', '確定', '확인'],
    _时间范围: ['时间范围', '時間範圍', 'Time range', '時間範囲', '시간 범위'],
    _背景图片: [
        '<span class="key">背景</span>图片',
        '<span class="key">背景</span>圖片',
        '<span class="key">Background</span> image',
        '<span class="key">背景</span>画像',
        '<span class="key">배경</span> 이미지',
    ],
    _选择文件: [
        '选择文件',
        '選擇檔案',
        'Select a file',
        'ファイルを選択',
        '파일 선택',
    ],
    _不透明度: ['不透明度', '不透明度', 'Opacity', '不透明度', '투명도'],
    _对齐方式: ['对齐方式', '對齊方式', 'Alignment', '揃え方式', '정렬'],
    _顶部: ['顶部', '頂部', 'top', '上揃え', '상단'],
    _居中: ['居中', '居中', 'center', '中央揃え', '중앙'],
    _常见问题说明: [
        `下载器不能绕过付费限制。
    <br><br>
    下载的文件保存在浏览器的下载目录里。如果你想保存到其他位置，需要修改下载器的下载目录。
    <br><br>
    建议在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。
    <br><br>
    如果下载后的文件名异常，请禁用其他有下载功能的浏览器扩展。
    <br><br>
    下载器 QQ 群：853021998
    <br><br>
    如果你需要一个机场（梯子）的话，可以试试我现在用的机场：魔法喵 <a href="https://mofacgb.cc/register?code=GYjQWDob" title="魔法喵" target="_blank">https://mofacgb.cc</a>，性价比很高，9.9 元 768 GB 流量（倍率都是 1x），而且速度很快，下载国外网盘的文件时可以跑满我的带宽（70 MB/s）。
    <br>
    如果上面的网址打不开，可以访问地址发布页：<a href="https://mofmiao.com" title="魔法喵" target="_blank">https://mofmiao.com</a>
    <br>
    你也可以查看我写的使用体验：<a href="https://saber.love/?p=12736" title="魔法喵使用体验" target="_blank">魔法喵使用体验</a>
    <br>
    我的邀请码：GYjQWDob
    <br><br>
    `,
        '下載器不能繞過付費限制。<br><br>下載的檔案儲存在瀏覽器的下載目錄裡。<br><br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><br>如果下載後的檔名異常，請停用其他有下載功能的瀏覽器擴充功能。<br><br>',
        'Downloaders cannot bypass paid restrictions.<br><br>The downloaded file is saved in the browser`s download directory. <br><br>It is recommended to turn off "Ask where to save each file before downloading" in the browser`s download settings.<br><br>If the file name after downloading is abnormal, disable other browser extensions that have download capabilities.<br><br>',
        'ダウンローダーは、有料の制限を回避できません。<br><br>ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><br>ブラウザのダウンロード設定で 「 ダウンロード前に各ファイルの保存場所を確認する 」 をオフにすることをお勧めします。<br><br>ダウンロード後のファイル名が異常な場合は、ダウンロード機能を持つ他のブラウザ拡張機能を無効にしてください。<br><br>',
        '다운로더는 유료 제한을 우회할 수 없습니다.<br><br>다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다.<br><br>브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치 확인"을 끄는 것이 좋습니다.<br><br>다운로드 후 파일명이 이상할 경우 다운로드 기능이 있는 다른 브라우저 확장 프로그램을 비활성화해주세요.<br><br>',
    ],
    _赞助我: ['赞助我', '贊助我', 'Sponsor me', '支援する', '후원하기'],
    _赞助方式提示: [
        `如果您觉得这个工具对您有帮助，可以考虑赞助我，谢谢！<br>
    您可以在 Patreon 上赞助我：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
    中国大陆用户可以在“爱发电”上赞助我：<br>
    <a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a><br>
    也可以扫描二维码：<br>
    <a href="https://github.com/xuejianxianzun/PixivFanboxDownloader#%E6%94%AF%E6%8C%81%E5%92%8C%E6%8D%90%E5%8A%A9" target="_blank">在 Github 上查看二维码</a>。
    `,
        `如果您覺得這個工具對您有幫助，可以考慮贊助我，謝謝！<br>
    您可以在 Patreon 上贊助我：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a><br>
    中國大陸使用者可以在“愛發電”上贊助我：<br>
    <a href="https://afdian.com/a/xuejianxianzun" target="_blank">https://afdian.com/a/xuejianxianzun</a>
    `,
        `If you find this tool helpful, please consider sponsoring me, thank you!<br>
    You can sponsor me on Patreon: <br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a>
    `,
        `このツールが役に立ったと思われる場合は、スポンサーになることをご検討ください。ありがとうございます。<br>
    ご支援してくださった方は、以下の Patreon で：<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank"> https://www.patreon.com/xuejianxianzun </a>
    `,
        `이 도구가 도움이 된다면 후원해 보시기 바랍니다. 감사합니다!<br>
    Patreon에서 저를 후원해주세요<br>
    <a href="https://www.patreon.com/xuejianxianzun" target="_blank">https://www.patreon.com/xuejianxianzun</a>
    `,
    ],
    _隐藏下载面板: [
        '隐藏下载面板（Alt + X）',
        '隱藏下載面板（Alt + X）',
        'Hide the download panel (Alt + X)',
        'ダウンロードパネルを非表示にする（Alt + X）',
        '다운로드 패널 숨기기 (Alt + X)',
    ],
    _显示下载面板: [
        '显示下载面板 (Alt + X)',
        '顯示下載面板 (Alt + X)',
        'Show download panel (Alt + X)',
        'ダウンロードパネルを表示 (Alt + X)',
        '다운로드 패널 보이기 (Alt + X)',
    ],
    _输出内容太多已经为你保存到文件: [
        '因为输出内容太多，已经为您保存到文件。',
        '因為輸出內容太多，已經為你儲存到檔案。',
        'Because the output is too much, it has been saved to a file.',
        '出力内容が多いため、txt ファイルに保存しました。',
        '출력 내용이 너무 많아, 파일로 저장했습니다.',
    ],
    _保存: ['保存', '儲存', 'Save', '保存', '저장'],
    _加载: ['加载', '載入', 'Load', 'ロード', '불러오기'],
    _保存命名规则提示: [
        '保存命名规则，最多 20 个',
        '儲存命名規則，最多 20 個',
        'Save naming rule, up to 20',
        '命名規則を保存します。最大 20 個まで',
        '명명 규칙 저장, 최대 20개',
    ],
    _已保存命名规则: [
        '已保存命名规则',
        '已儲存命名規則',
        'Naming rule saved',
        '命名規則を保存しました',
        '명명 규칙이 저장되었습니다.',
    ],
    _快速下载本页: [
        '快速下载本页作品 (Alt + Q)',
        '快速下載本頁作品 (Alt + Q)',
        'Download this work quickly (Alt + Q)',
        'この作品をすばやくダウンロードする (Alt + Q)',
        '작품 빠른 다운로드 (Alt + Q)',
    ],
    _高亮显示关键字: [
        '<span class="key">高亮</span>显示关键字',
        '<span class="key">標明</span>顯示關鍵字',
        '<span class="key">Highlight</span> keywords',
        'キーワードを強調表示',
        '<span class="key">강조</span> 키워드 표시',
    ],
    _导出: ['导出', '匯出', 'Export', 'エクスポート', '내보내기'],
    _导入: ['导入', '匯入', 'Import', 'インポート', '불러오기'],
    _清除: ['清除', '清除', 'Clear', 'クリア', '비우기'],
    _提示2: ['提示', '提示', 'Tip', '？', '팁'],
    _管理设置: [
        '管理<span class="key">设置</span>',
        '管理<span class="key">設定</span>',
        'Manage <span class="key">settings</span>',
        '<span class="key">設定</span>の管理',
        '<span class="key">설정</span> 관리',
    ],
    _导出设置: [
        '导出设置',
        '匯出設定',
        'Export settings',
        '設定をエクスポート',
        '내보내기',
    ],
    _导入设置: [
        '导入设置',
        '匯入設定',
        'Import settings',
        '設定をインポート',
        '불러오기',
    ],
    _重置设置: [
        '重置设置',
        '重設設定',
        'Reset settings',
        '設定をリセット',
        '설정 초기화',
    ],
    _自动检测: ['自动检测', '自動偵測', 'Auto', '自動検出', '자동'],
    _显示高级设置: [
        '显示<span class="key">高级</span>设置',
        '顯示<span class="key">進階</span>設定',
        'Show <span class="key">advanced</span> settings',
        '詳細設定を表示する',
        '<span class="key">고급</span> 설정 보기',
    ],
    _显示高级设置说明: [
        '被隐藏的设置仍然会发挥作用',
        '被隱藏的設定仍然會發揮作用',
        'Hidden settings will still work',
        '隠していた設定がそのまま機能する',
        '숨겨진 설정은 계속 작동합니다.',
    ],
    _下载完成后显示通知: [
        '下载完成后显示<span class="key">通知</span>',
        '下載完成後顯示<span class="key">通知</span>',
        'Show <span class="key">notification</span> after download is complete',
        'ダウンロードが完了した後に通知を表示する',
        '다운로드가 완료되면 <span class="key">알림</span> 표시',
    ],
    _下载完成后显示通知的说明: [
        '当所有文件下载完成后显示一条系统通知。可能会请求通知权限。',
        '當所有檔案下載完成後顯示一條系統通知。可能會請求通知許可權。',
        'Show a system notification when all files have been downloaded. May require notification permission.',
        'すべてのファイルのダウンロードが完了したらシステム通知を表示します。通知の許可が必要になる場合があります。',
        '모든 파일이 다운로드되면 시스템 알림을 표시합니다. 알림 권한이 필요할 수 있습니다.',
    ],
    _下载完毕2: [
        '下载完毕',
        '下載完畢',
        'Download complete',
        'ダウンロードが完了しました',
        '다운로드 완료',
    ],
    _在序号前面填充0: [
        '在序号前面<span class="key">填充 0</span>',
        '在序號前面<span class="key">填充 0</span>',
        '<span class="key">Add 0</span> in front of the serial number',
        'シリアル番号の前に 0 を記入',
        '일련번호 앞 <span class="key">0 채우기</span>',
    ],
    _在序号前面填充0的说明: [
        '这可以解决一些软件不能正确的按照文件名来排序文件的问题。',
        '這可以解決一些軟體不能正確的按照檔名來排序檔案的問題。',
        'This can solve the problem that some software cannot correctly sort files by file name.',
        'これにより、一部のソフトウェアがファイルをファイル名で正しくソートできないという問題を解決できます。',
        '이것은 일부 소프트웨어가 파일 이름별로 파일을 올바르게 정렬할 수 없는 문제를 해결할 수 있습니다.',
    ],
    _序号总长度: [
        '序号总长度',
        '序號總長度',
        'Total length of serial number',
        'シリアル番号の全長',
        '일련번호 전체 길이',
    ],
    _不下载重复文件: [
        '不下载<span class="key">重复</span>文件',
        '不下載<span class="key">重複</span>檔案',
        'Don`t download <span class="key">duplicate</span> files',
        '重複するファイルをダウンロードしない',
        '<span class="key">중복</span>파일 다운로드하지 않기',
    ],
    _不下载重复文件的提示: [
        `下载器会保存自己的下载记录。每个下载成功（保存到硬盘）的文件都会保存一条下载记录。下载失败的文件不会产生下载记录。<br>
    如果你启用了“不下载重复文件”功能，那么下载器会在下载每一个文件前检查下载记录，如果它是重复文件，下载器就会跳过它（不下载它）。<br>
    <br>
    补充说明：<br>
    - 这不是一个可靠的功能。下载器没有权限读取硬盘上的文件，所以只能依赖自己保存的下载记录。如果你把下载过的文件删除了，下载器是不会知道的，依然会认为文件下载过，从而跳过下载。如果有时你确实需要重新下载，可以关闭此功能。<br>
    - 下载器的下载记录保存在浏览器的 IndexedDB 里。它不是浏览器的下载记录，所以清除浏览器的下载记录不会影响此功能。额外提一句，如果浏览器的下载记录太多，会导致浏览器在启动时卡住一段时间。如果你遇到了此问题，应该清除浏览器的下载记录。<br>
    - 注意：清除浏览器的数据时，清除“Cookie 及其他网站数据”会导致下载器的下载记录被清空！如果你要清理此项，可以提前导出下载记录，以避免丢失下载记录。<br>
    - 如果你使用多个设备或浏览器，可以点击“导出”按钮导出下载器的下载记录，然后在新的设备上导入。<br>
    - 如果你想清空下载器的下载记录，可以点击此设置右边的“清除”按钮。<br>
    `,
        `下載器會儲存自己的下載記錄。每個下載成功（儲存到硬碟）的檔案都會儲存一條下載記錄。下載失敗的檔案不會產生下載記錄。<br>
    如果你啟用了“不下載重複檔案”功能，那麼下載器會在下載每一個檔案前檢查下載記錄，如果它是重複檔案，下載器就會跳過它（不下載它）。<br>
    <br>
    補充說明：<br>
    - 這不是一個可靠的功能。下載器沒有許可權讀取硬碟上的檔案，所以只能依賴自己儲存的下載記錄。如果你把下載過的檔案刪除了，下載器是不會知道的，依然會認為檔案下載過，從而跳過下載。如果有時你確實需要重新下載，可以關閉此功能。<br>
    - 下載器的下載記錄儲存在瀏覽器的 IndexedDB 裡。它不是瀏覽器的下載記錄，所以清除瀏覽器的下載記錄不會影響此功能。額外提一句，如果瀏覽器的下載記錄太多，會導致瀏覽器在啟動時卡住一段時間。如果你遇到了此問題，應該清除瀏覽器的下載記錄。<br>
    - 注意：清除瀏覽器的資料時，清除“Cookie 及其他網站資料”會導致下載器的下載記錄被清空！如果你要清理此項，可以提前匯出下載記錄，以避免丟失下載記錄。<br>
    - 如果你使用多個裝置或瀏覽器，可以點選“匯出”按鈕匯出下載器的下載記錄，然後在新的裝置上匯入。<br>
    - 如果你想清空下載器的下載記錄，可以點選此設定右邊的“清除”按鈕。<br>
    `,
        `This downloader will save its own download history. Each file that is successfully downloaded (saved to disk) will have a download record saved. Files that fail to download will not have a download record. <br>
If you enable the "Do not download duplicate files" feature, the downloader will check the download record before downloading each file. If it is a duplicate file, the downloader will skip it (not download it). <br>
<br>
Additional notes: <br>
- This is not a reliable feature. The downloader does not have permission to read files on the disk, so it can only rely on its own saved download records. If you delete a downloaded file, the downloader will not know and will still think that the file has been downloaded and skip the download. If you do need to re-download sometimes, you can turn this feature off. <br>
- The download history of the Downloader is saved in the browser's IndexedDB. It is not the browser's download history, so clearing the browser's download history will not affect this feature. As an extra note, if the browser has too many download history, it will cause the browser to get stuck for a while when it starts. If you encounter this problem, you should clear the browser's download history. <br>
- Note: When clearing the browser's data, clearing "Cookies and other website data" will cause the Downloader's download history to be cleared! If you want to clear this item, you can export the download history in advance to avoid losing the download history. <br>
- If you use multiple devices or browsers, you can click the "Export" button to export the Downloader's download history, and then import it on a new device. <br>
- If you want to clear the Downloader's download history, you can click the "Clear" button to the right of this setting. <br>
`,
        `このダウンローダーは独自のダウンロード履歴を保存します。正常にダウンロード（ディスクに保存）されたファイルにはダウンロード記録が保存されます。ダウンロードに失敗したファイルにはダウンロード記録は保存されません。<br>
「重複ファイルをダウンロードしない」機能を有効にすると、ダウンローダーは各ファイルをダウンロードする前にダウンロード記録を確認します。重複ファイルの場合は、ダウンローダーはそのファイルをスキップ（ダウンロードしない）します。<br>
<br>
補足事項：<br>
- これは信頼できる機能ではありません。ダウンローダーはディスク上のファイルを読み取る権限がないため、保存されたダウンロード記録のみに依存します。ダウンロード済みのファイルを削除しても、ダウンローダーはそれを認識できず、ファイルがダウンロード済みであると認識してダウンロードをスキップします。再ダウンロードが必要な場合は、この機能をオフにすることができます。<br>
- ダウンローダーのダウンロード履歴はブラウザのIndexedDBに保存されます。これはブラウザのダウンロード履歴ではないため、ブラウザのダウンロード履歴を消去してもこの機能には影響しません。なお、ブラウザにダウンロード履歴が多すぎると、起動時にしばらくフリーズすることがあります。この問題が発生した場合は、ブラウザのダウンロード履歴を消去することをお勧めします。<br>
- 注：ブラウザのデータを消去する際に、「Cookieとその他のウェブサイトデータ」を消去すると、ダウンローダーのダウンロード履歴も消去されます。この項目を消去する場合は、ダウンロード履歴の損失を防ぐために、事前にダウンロード履歴をエクスポートしておくことをお勧めします。 <br>
- 複数のデバイスやブラウザを使用している場合は、「エクスポート」ボタンをクリックしてダウンローダーのダウンロード履歴をエクスポートし、新しいデバイスにインポートすることができます。<br>
- ダウンローダーのダウンロード履歴を消去したい場合は、この設定の右側にある「クリア」ボタンをクリックしてください。<br>
`,
        `이 다운로더는 자체 다운로드 기록을 저장합니다. 성공적으로 다운로드된(디스크에 저장된) 각 파일에는 다운로드 기록이 저장됩니다. 다운로드에 실패한 파일에는 다운로드 기록이 없습니다. <br>
"중복 파일 다운로드 안 함" 기능을 활성화하면 다운로더는 각 파일을 다운로드하기 전에 다운로드 기록을 확인합니다. 중복 파일인 경우, 다운로더는 해당 파일을 건너뜁니다(다운로드하지 않습니다). <br>
<br>
추가 참고 사항: <br>
- 이 기능은 신뢰할 수 없습니다. 다운로더는 디스크에 있는 파일을 읽을 권한이 없으므로 자체 저장된 다운로드 기록에만 의존합니다. 다운로드한 파일을 삭제하면 다운로더는 해당 파일이 다운로드된 것으로 인식하지 못하고 다운로드를 건너뜁니다. 다시 다운로드해야 하는 경우 이 기능을 끌 수 있습니다. <br>
- 다운로더의 다운로드 기록은 브라우저의 IndexedDB에 저장됩니다. 브라우저의 다운로드 기록이 아니므로 브라우저의 다운로드 기록을 삭제해도 이 기능에는 영향을 미치지 않습니다. 참고로, 브라우저에 다운로드 기록이 너무 많으면 브라우저가 시작 시 잠시 멈춥니다. 이 문제가 발생하면 브라우저의 다운로드 기록을 삭제해야 합니다. <br>
- 참고: 브라우저 데이터를 삭제할 때 "쿠키 및 기타 웹사이트 데이터"를 삭제하면 다운로더의 다운로드 기록이 삭제됩니다! 이 항목을 삭제하려면 다운로드 기록을 미리 내보내어 다운로드 기록이 손실되는 것을 방지할 수 있습니다. <br>
- 여러 기기 또는 브라우저를 사용하는 경우, "내보내기" 버튼을 클릭하여 다운로더의 다운로드 기록을 내보낸 후 새 기기로 가져올 수 있습니다. <br>
- 다운로더의 다운로드 기록을 지우려면 이 설정 오른쪽에 있는 "지우기" 버튼을 클릭하세요. <br>
`,
    ],
    _清除下载记录: [
        '清除下载记录',
        '清除下載紀錄',
        'Clear download record',
        '履歴をクリア',
        '다운로드 기록 비우기',
    ],
    _下载记录已清除: [
        '下载记录已清除',
        '已清除下載紀錄',
        'Download record has been cleared',
        'ダウンロード履歴がクリアされました',
        '다운로드 기록이 비워졌습니다',
    ],
    _跳过下载因为重复文件: [
        '检测到文件 {} 已经下载过，跳过此次下载',
        '偵測到檔案 {} 已經下載過，跳過此次下載。',
        'Skip downloading duplicate files {}',
        '重複ファイル {} をスキップ',
        '파일 {}이(가) 이미 다운로드되어 있어, 다운로드를 건너뜁니다',
    ],
    _导入下载记录: [
        '导入下载记录',
        '匯入下載紀錄',
        'Import download record',
        'ダウンロード記録をインポート',
        '다운로드 기록 불러오기',
    ],
    _完成: ['完成', '完成', 'Completed', '完了', '완료됨'],
    _HowToUse: [
        '点击页面右侧的蓝色按钮可以打开下载器面板。<br><br>下载的文件保存在浏览器的下载目录里。<br><br>建议您在浏览器的下载设置中关闭“下载前询问每个文件的保存位置”。<br><br><strong>下载器不能绕过付费限制。</strong>',
        '點選頁面右側的藍色按鈕可以開啟下載器面板。<br><br>下載的檔案儲存在瀏覽器的下載目錄裡。<br><br>請不要在瀏覽器的下載選項裡選取「下載每個檔案前先詢問儲存位置」。<br><br><strong>下載器不能繞過付費限制。</strong>',
        'Click the blue button on the right side of the page to open the downloader panel.<br><br>The downloaded file is saved in the browser`s download directory. <br><br>It is recommended to turn off "Ask where to save each file before downloading" in the browser`s download settings.<br><br><strong>Downloaders cannot bypass paid restrictions.</strong>',
        'ページ右側の青いボタンをクリックすると、ダウンローダーパネルが開きます。<br><br>ダウンロードしたファイルは、ブラウザのダウンロードディレクトリに保存されます。<br><br>ブラウザのダウンロード設定で 「 ダウンロード前に各ファイルの保存場所を確認する 」 をオフにすることをお勧めします。<br><br><strong>ダウンローダーは、有料の制限を回避できません。</strong>',
        '페이지 오른쪽에 있는 파란색 버튼을 클릭하면 다운로드 패널이 열립니다.<br><br>다운로드한 파일은 브라우저의 다운로드 디렉토리에 저장됩니다.<br><br>브라우저의 다운로드 설정에서 "다운로드 전에 각 파일의 저장 위치 확인"을 끄는 것이 좋습니다.<br><br><strong>다운로더는 유료 제한을 우회할 수 없습니다.</strong>',
    ],
    _whatisnew: [
        `代码重构，并添加了新的功能。例如：`,
        `程式碼重構，並添加了新的功能。例如：`,
        `Code refactored and new features added. E.g:`,
        `コードのリファクタリングと新機能の追加。 例えば：`,
        `코드가 리팩터링되고 새로운 기능이 추가되었습니다. 예:`,
    ],
    _开始下载: [
        '开始下载',
        '開始下載',
        'Start download',
        '開始',
        '다운로드 시작',
    ],
    _暂停下载: [
        '暂停下载',
        '暫停下載',
        'Pause download',
        '一時停止',
        '다운로드 일시중지',
    ],
    _停止下载: ['停止下载', '停止下載', 'Stop download', '停止', '다운로드 정지'],
    _复制url: [
        '复制 URL',
        '複製下載網址',
        'Copy URLs',
        'URL をコピー',
        'URL 복사',
    ],
    _下载进度: [
        '下载进度',
        '下載進度',
        'Total progress',
        '概要',
        '다운로드 진행률',
    ],
    _数据清除完毕: [
        '数据清除完毕',
        '資料清除完畢',
        'Data cleared',
        'クリアされたデータ',
        '데이터가 비워졌습니다',
    ],
    _已跳过n个文件: [
        '已跳过 {} 个文件',
        '已跳過 {} 個檔案',
        '{} files skipped',
        '{} つのファイルをスキップしました',
        '{}개의 파일을 건너뛰었습니다',
    ],
    _统一网址格式: [
        '统一<span class="key">网址</span>格式',
        '統一<span class="key">網址</span>格式',
        'Unified <span class="key">URL</span> Format',
        '統一 <span class="key">URL</span> 形式',
        '통합 <span class="key">URL</span> 형식',
    ],
    _统一网址格式的说明: [
        '保持用户名在域名之后，例如：https://www.fanbox.cc/@username',
        '保持使用者名稱在域名後面，例如：https://www.fanbox.cc/@username',
        'Keep the username after the domain name, for example: https://www.fanbox.cc/@username',
        'ユーザー名はドメイン名の後にあります。例: https://www.fanbox.cc/@username',
        '도메인 이름 뒤에 사용자 이름을 유지합니다. 예를 들면 다음과 같습니다. https://www.fanbox.cc/@username',
    ],
    _正在保存抓取结果: [
        '正在保存抓取结果',
        '正在儲存擷取結果',
        'Saving crawl results',
        'クロール結果を保存しています',
        '긁어오기 결과 저장 중',
    ],
    _已保存抓取结果: [
        '已保存抓取结果',
        '已儲存擷取結果',
        'Crawl results saved',
        'クロール結果を保存しました',
        '긁어오기 결과가 저장되었습니다',
    ],
    _正在恢复抓取结果: [
        '正在恢复抓取结果',
        '正在還原擷取結果',
        'Restoring crawl results',
        'クロール結果を再開しています',
        '긁어오기 결과 복구 중',
    ],
    _已恢复抓取结果: [
        '已恢复抓取结果',
        '已還原擷取結果',
        'Crawl results resumed',
        'クロール結果を再開しました',
        '긁어오기 결과가 복구되었습니다',
    ],
    _清空已保存的抓取结果: [
        '清空已保存的抓取结果',
        '清除已儲存的擷取結果',
        'Clear saved crawl results',
        'セーブしたクロール結果をクリアします',
        '저장된 긁어오기 결과 비우기',
    ],
    _恢复未完成的下载任务: [
        '恢复未完成的下载任务',
        '恢復未完成的下載任務',
        'Resume unfinished download tasks',
        '未完了のダウンロード タスクを再開する',
        '완료되지 않은 다운로드 작업 재개',
    ],
    _价格限制: ['价格限制', '價格限制', `Price limit`, '価格制限', '가격 제한'],
    _因为价格限制不能抓取投稿: [
        '因为价格限制，无法抓取投稿：',
        '因為價格限制，無法抓取投稿：',
        `Can't crawl post due to price limit: `,
        '価格制限のため投稿をクロールできません: ',
        '가격 제한으로 인해 게시물을 크롤링할 수 없음: ',
    ],
    _因为价格限制而跳过的投稿数量: [
        '因为价格限制而跳过的投稿数量：',
        '因為價格限制而跳過的投稿數量：',
        'Number of posts skipped due to price limit: ',
        '価格制限によりスキップされた投稿の数: ',
        '가격 제한으로 인해 건너뛴 게시물 수: ',
    ],
    _即使遇到价格限制也可以保存封面图: [
        '即使遇到价格限制，也可以保存封面图',
        '即使遇到價格限制，也可以儲存封面圖',
        '即使有价格限制，也可以保存封面图片',
        '価格制限があっても表紙画像を保存',
        '가격 제한이 있어도 표지 이미지 저장',
    ],
    _投稿标题必须含有文字: [
        '投稿<span class="key">标题</span>必须含有文字',
        '投稿<span class="key">標題</span>必須含有文字',
        'Post <span class="key">title</span> must contain text',
        '投稿のタイトルにはテキストを含める必要があります',
        '게시물 제목에는 텍스트가 포함되어야 합니다',
    ],
    _投稿标题不能含有文字: [
        '投稿<span class="key">标题</span>不能含有文字',
        '投稿<span class="key">標題</span>不能含有文字',
        'Post <span class="key">title</span> cannot contain text',
        '投稿のタイトルにテキストを含めることはできません',
        '게시물 제목은 텍스트를 포함할 수 없습니다',
    ],
    _文件名中必须含有文字: [
        '<span class="key">文件名</span>中必须含有文字',
        '<span class="key">檔名</span>中必須含有文字',
        '<span class="key">File names</span> must contain text',
        'ファイル名に次の文字列を含める',
        '파일 이름에는 다음이 포함되어야 합니다',
    ],
    _文件名中不能含有文字: [
        '<span class="key">文件名</span>中不能含有文字',
        '<span class="key">檔名</span>中不能含有文字',
        '<span class="key">File names</span> cannot contain text',
        'ファイル名に次の文字列を含めない',
        '파일 이름에는 다음을 포함할 수 없습니다',
    ],
    _文件指的是附件: [
        '此处的文件指作者上传的附件（会显示文件名的那些），通常是压缩文件、视频、音频。',
        '此處的檔案指作者上傳的附件（會顯示檔名的那些），通常是壓縮檔案、影片、音訊。',
        'The file here refers to the attachment uploaded by the author (the file name will be displayed), usually a compressed file, video, or audio.',
        'ここでのファイルとは、作成者がアップロードした添付ファイル (ファイル名が表示されます) を指し、通常は圧縮ファイル、ビデオ、またはオーディオです。',
        '여기서 파일이란 작성자가 업로드한 첨부파일(파일명이 표시됩니다.)을 의미하며 일반적으로 압축된 파일, 비디오, 오디오 등입니다.',
    ],
    _多条文字用逗号分割: [
        '你可以设置多条文字，不区分大小写；每条之间用半角逗号(,)分割',
        '你可以設定多條文字，不區分大小寫；每條之間用半形逗號(,)分割',
        'You can set multiple texts, not case sensitive, and separate each with a comma (,)',
        '複数のテキストを設定でき、大文字と小文字を区別しない、それぞれをカンマ (,) で区切ります',
        '대소문자를 구분하지 않고 여러 텍스트를 설정할 수 있으며 각각을 쉼표(,)로 구분할 수 있습니다.',
    ],
    _日期时间格式错误: [
        '日期时间格式错误',
        '日期時間格式錯誤',
        'wrong datetime format',
        '間違った日時形式',
        '잘못된 날짜/시간 형식',
    ],
    _跳过文章因为: [
        '跳过 {} 因为：',
        '跳過 {} 因為：',
        'Skip {} because: ',
        '{} をスキップする理由: ',
        '다음과 같은 이유로 {}를 건너뜁니다.',
    ],
    _优化性能和用户体验: [
        '优化性能和用户体验。',
        '最佳化效能和使用者體驗。',
        'Optimize performance and user experience.',
        'パフォーマンスとユーザー エクスペリエンスを最適化します。',
        '성능과 사용자 경험을 최적화합니다.',
    ],
    _修复bug: ['修复 bug', '修復 bug', 'fix bugs', 'バグを修正', '버그 수정'],
    _不支持的浏览器: [
        '你的浏览器不能正常使用这个扩展程序，主要原因可能是浏览器内核版本太低，或者存在兼容性问题。<br>建议您更换成最新版本的 Chrome 或 Edge 浏览器。',
        '你的瀏覽器不能正常使用這個擴充套件程式，主要原因可能是瀏覽器核心版本太低，或者存在相容性問題。<br>建議您更換成最新版本的 Chrome 或 Edge 瀏覽器。',
        'Your browser cannot use this extension properly. The main reason may be that the browser kernel version is too low, or there is a compatibility problem. <br>We recommend that you switch to the latest version of Chrome or Edge.',
        'お使いのブラウザでは、この拡張機能を正しく使用できません。 主な理由としては、ブラウザのカーネル バージョンが低すぎるか、互換性の問題がある可能性があります。 <br>最新バージョンの Chrome または Edge に切り替えることをお勧めします。',
        '브라우저에서 이 확장 프로그램을 제대로 사용할 수 없습니다. 주된 이유는 브라우저 커널 버전이 너무 낮거나 호환성 문제가 있기 때문일 수 있습니다. <br>최신 버전의 Chrome 또는 Edge로 전환하는 것이 좋습니다.',
    ],
    _新增设置项: [
        '新增设置项',
        '新增設定項目',
        'Added setting items',
        '新たな機能を追加されました',
        '새로운 설정 항목 추가',
    ],
    _新增功能: ['新增功能', '新增功能', 'New feature', '新機能', '새로운 기능'],
    _增加了一些提示: [
        '增加了一些提示',
        '增加了一些提示',
        'Added some tips',
        'いくつかのヒントを追加しました',
        '몇 가지 팁을 추가했습니다.',
    ],
    _user_canceled_tip: [
        `{} 未保存，code：{}。`,
        `{} 未儲存，code：{}。`,
        `{} not saved, code: {}.`,
        `{} 保存されていません。code：{}。`,
        `{} 저장되지 않음, 코드: {}.`,
    ],
    _yandex浏览器的警告: [
        `如果你在 Yandex 浏览器（Android）上使用 Pixiv Fanbox Downloader，请换成 Kiwi 浏览器。<br>
    因为下载器在最近将会升级到 Manifest version 3，但是 Yandex 浏览器不支持  Manifest version 3， 所以它不能使用新版本的下载器。`,
        `如果你在 Yandex 瀏覽器（Android）上使用 Pixiv Fanbox Downloader，請換成 Kiwi 瀏覽器。<br>
    因為下載器在最近將會升級到 Manifest version 3，但是 Yandex 瀏覽器不支援  Manifest version 3， 所以它不能使用新版本的下載器。`,
        `If you are using Pixiv Fanbox Downloader on Yandex browser（Android）, please switch to Kiwi browser. <br>
    Because the downloader will be upgraded to Manifest version 3 in the near future, but Yandex browser does not support Manifest version 3, so it cannot use the new version of the downloader.`,
        `Yandex（Android） ブ Pixiv Fanbox Downloader を使用している場合は、Kiwi ブラウザに切り替えてください。 <br>
    ダウンローダは近いうちにマニフェスト バージョン 3 にアップグレードされますが、Yandex ブラウザはマニフェスト バージョン 3 をサポートしていないため、新しいバージョンのダウンローダを使用することはできません。`,
        `Yandex Browser(Android)에서 Pixiv Fanbox Downloader를 사용하는 경우 Kiwi 브라우저로 전환하십시오. <br>
    다운로더는 가까운 시일 내에 Manifest 버전 3으로 업그레이드되지만 Yandex 브라우저는 Manifest 버전 3을 지원하지 않으므로 새 버전의 다운로더를 사용할 수 없습니다.`,
    ],
    _新增命名标记: [
        '新增命名标记',
        '新增命名標記',
        'Add named tag',
        '名前付きタグを追加',
        '명명된 태그 추가',
    ],
    _升级到manifest_v3的提示: [
        '下载器已升级到 Manifest V3。<br>如果你在下载时遇到问题，请打开扩展管理页面，重新加载本扩展。',
        '下載器已升級到 Manifest V3。<br>如果你在下載時遇到問題，請開啟擴充套件管理頁面，重新載入本擴充套件。',
        'Downloader has been upgraded to Manifest V3. <br>If you encounter problems when downloading, please open the extension management page and reload this extension.',
        'Downloader が Manifest V3 にアップグレードされました。 <br>ダウンロード中に問題が発生した場合は、拡張機能の管理ページを開いて、この拡張機能をリロードしてください。',
        '다운로더가 Manifest V3로 업그레이드되었습니다. <br>다운로드 시 문제가 발생하면 확장 프로그램 관리 페이지를 열고 이 확장 프로그램을 새로고침하세요.',
    ],
    _图片的命名规则: [
        '图片的<span class="key">命名规则</span>',
        '圖片的<span class="key">命名規則</span>',
        '<span class="key">Naming rule</span> for image files',
        '画像ファイルの<span class="key">命名規則</span>',
        '이미지 파일의 명명 규칙',
    ],
    _非图片的命名规则: [
        '<span class="key">非图片</span>的命名规则',
        '<span class="key">非圖片</span>的命名規則',
        'Naming rule for <span class="key">non-image files</span>',
        '<span class="key">画像以外</span>のファイルの命名規則',
        '이미지가 아닌 파일의 이름 지정 규칙',
    ],
    _新增非图片命名规则的说明: [
        `现在你可以为图片文件和非图片文件设置独立的命名规则。<br>
    另外，非图片文件的默认名字改为它们的原文件名，而不是序号。`,
        `現在你可以為圖片檔案和非圖片檔案設定獨立的命名規則。<br>
    另外，非圖片檔案的預設名字改為它們的原檔名，而不是序號。`,
        `Now you can set separate naming rules for image files and non-image files. <br>
    Also, the default names of non-image files have been changed to their original filenames instead of serial numbers.`,
        `画像ファイルと非画像ファイルに別々の命名規則を設定できるようになりました。 <br>
    また、画像以外のファイルのデフォルト名は、シリアル番号ではなく元のファイル名に変更されています。`,
        `이제 이미지 파일과 이미지가 아닌 파일에 대해 별도의 이름 지정 규칙을 설정할 수 있습니다. <br>
    또한 이미지가 아닌 파일의 기본 이름이 일련 번호 대신 원래 파일 이름으로 변경되었습니다.`,
    ],
    _修复已知问题: [
        '修复已知问题',
        '修復已知問題',
        'fix known issues',
        '既知の問題を修正する',
        '알려진 문제 수정',
    ],
    _修复因为API数据变化导致抓取失败的问题: [
        '修复因为 API 数据变化导致抓取失败的问题。',
        '修復因為 API 資料變化導致抓取失敗的問題。',
        'Fix crawl failure due to API data changes.',
        'APIデータの変更によるクロールの失敗を修正しました。',
        'API 데이터 변경으로 인한 크롤링 실패를 수정합니다.',
    ],
    _任一: ['任一', '任一', 'One', '何れか', '하나만'],
    _提示有外链保存到txt: [
        '这次的抓取结果里有一些外部链接，下载器会把它们保存到 TXT 文件里，请手动处理。',
        '這次的抓取結果裡有一些外部連結，下載器會把它們儲存到 TXT 檔案裡，請手動處理。',
        'There are some external links in the crawling results this time. The downloader will save them into TXT files. Please handle them manually.',
        '今回のクロール結果には外部リンクがいくつか含まれます。ダウンローダーはそれらをTXTファイルに保存します。手動で処理してください。',
        '이번에는 크롤링 결과에 외부 링크가 몇 개 있습니다. 다운로더가 이를 TXT 파일로 저장합니다. 수동으로 처리해 주세요.',
    ],
    _下载器会等待几分钟然后再继续抓取: [
        '下载器会等待几分钟，然后再继续抓取。',
        '下載器會等待幾分鐘，然後再繼續擷取。',
        'The downloader will wait a few minutes before continuing to crawl.',
        'ダウンローダーは数分間待機してから、クロールを続行します。',
        '다운로더가 몇 분 기다린 후 크롤링을 계속합니다.',
    ],
    _下载器会减慢抓取速度以免被限制: [
        '下载器会减慢抓取速度，以避免被 Fanbox 限制抓取。',
        '下載器會減慢擷取速度，以避免被 Fanbox 限制擷取。',
        'The downloader will slow down the crawling speed to avoid being restricted by Fanbox.',
        'ダウンローダーは、Fanboxによるクロール制限を避けるために、クロール速度を落とします。',
        '다운로더는 Fanbox에 의해 크롤링이 제한되는 것을 피하기 위해 크롤링 속도를 늦춥니다.',
    ],
    _下载间隔: [
        '下载<span class="key">间隔</span>',
        '下載<span class="key">間隔</span>',
        'Download <span class="key">interval</span>',
        'ダウンロード<span class="key">間隔</span>',
        '다운로드 <span class="key">간격</span>',
    ],
    _秒: ['秒', '秒', 'seconds', '秒', '초',],
    _间隔时间: [
        '间隔时间：',
        '間隔時間：',
        'Interval time:',
        'インターバル時間：',
        '간격 시간:',
        'Интервал времени:',
    ],
    _下载间隔的说明: [
        `每隔一定时间开始一次下载，单位是秒。<br>
默认值为 1，即每小时最多会从 Fanbox 下载 3600 个文件。<br>
这是为了降低从 Fanbox 下载文件的频率（特别是下载体积较小的图片时），从而减少账号被封的可能性。<br>
你可以修改此设置，最小值是 0（即无限制）。<br>`,
        `每隔一定時間開始一次下載，單位是秒。<br>
預設值為 1，即每小時最多會從 Fanbox 下載 3600 個檔案。<br>
這是為了降低從 Fanbox 下載檔案的頻率（特別是下載體積較小的圖片時），從而減少賬號被封的可能性。<br>
你可以修改此設定，最小值是 0（即無限制）。<br>`,
        `The interval at which downloads are initiated, measured in seconds. <br>
The default value is 1, meaning a maximum of 3,600 files will be downloaded from Fanbox per hour. <br>
This is intended to reduce the frequency of downloads from Fanbox (especially when downloading small images), thereby reducing the likelihood of your account being blocked. <br>
You can modify this setting; the minimum value is 0 (no limit). <br>`,
        `ダウンロードを開始する間隔（秒単位）。<br>
デフォルト値は1で、Fanboxから1時間あたり最大3,600個のファイルがダウンロードされます。<br>
これは、Fanboxからのダウンロード頻度（特に小さな画像をダウンロードする場合）を減らし、アカウントがブロックされる可能性を減らすことを目的としています。<br>
この設定は変更できます。最小値は0（制限なし）です。<br>`,
        `다운로드 시작 간격(초)입니다. <br>
기본값은 1이며, Fanbox에서 시간당 최대 3,600개의 파일이 다운로드됩니다. <br>
이 설정은 Fanbox에서 다운로드 빈도(특히 작은 이미지 다운로드 시)를 줄여 계정이 차단될 가능성을 줄이기 위한 것입니다. <br>
이 설정은 수정할 수 있으며, 최소값은 0(제한 없음)입니다. <br>`,
    ],
    _已有抓取结果时进行提醒: [
        '这个标签页里已经有抓取结果了，重新开始抓取会清空这些抓取结果。\n请确认是否要重新开始抓取？',
        '這個標籤頁裡已經有抓取結果了，重新開始抓取會清空這些抓取結果。\n請確認是否要重新開始抓取？',
        'There are already crawl results on this tab. Restarting the crawl will clear these crawl results. \nPlease confirm that you want to restart the crawl?',
        'このタブにはすでにクロール結果があります。クロールを再開すると、これらのクロール結果は消去されます。 \nクロールを再開するかどうかを確認してください?',
        '이 탭에는 이미 크롤링 결과가 있습니다. 크롤링을 다시 시작하면 크롤링 결과가 지워집니다. \n크롤링을 다시 시작할 것인지 확인해주세요.',
    ],
    _账户可能被封禁的警告: [
        `<strong>警告</strong>：频繁和大量的抓取、下载可能会导致你的账号被封禁。<br>
下载器默认会减慢抓取和下载的速度。但如果你的账户依然被封禁，下载器不会承担任何责任。<br>
当你需要下载很多文件时，建议设置比较大的下载间隔时间。<br><br>`,
        `<strong>警告</strong>：頻繁和大量的抓取、下載可能會導致你的賬號被封禁。<br>
下載器預設會減慢抓取和下載的速度。但如果你的賬戶依然被封禁，下載器不會承擔任何責任。<br>
當你需要下載很多檔案時，建議設定比較大的下載間隔時間。<br><br>`,
        `<strong>Warning</strong>: Frequent and heavy downloading and scraping may result in your account being banned. <br>
Downloader will slow down the download and scraping speeds by default. However, if your account is still banned, Downloadloader will not be held responsible. <br>
If you need to download a lot of files, it is recommended to set a longer download interval. <br>`,
        `<strong>警告</strong>: 頻繁かつ大量のダウンロードやスクレイピングを行うと、アカウントが停止される可能性があります。<br>
Downloader はデフォルトでダウンロードとスクレイピングの速度を低下させます。それでもアカウントが停止された場合、Downloadloader は責任を負いません。<br>
大量のファイルをダウンロードする必要がある場合は、ダウンロード間隔を長めに設定することをお勧めします。<br>`,
        `<strong>경고</strong>: 잦은 다운로드 및 스크래핑은 계정 정지로 이어질 수 있습니다. <br>
Downloader는 기본적으로 다운로드 및 스크래핑 속도를 늦춥니다. 하지만 계정 정지가 해제되지 않은 경우에도 Downloadloader는 책임을 지지 않습니다. <br>
많은 파일을 다운로드해야 하는 경우, 다운로드 간격을 더 길게 설정하는 것이 좋습니다. <br>`,
    ],
    _移动端浏览器可能不会建立文件夹的说明: [
        `如果你使用的是移动端的浏览器，它可能不会建立文件夹。这不是下载器的问题。<br>如果你遇到了这种情况，需要修改命名规则以避免文件名重复。一个简单的方法是把默认命名规则里的 '/' 修改成 '-'。`,
        `如果你使用的是移動端的瀏覽器，它可能不會建立資料夾。這不是下載器的問題。<br>如果你遇到了這種情況，需要修改命名規則以避免檔名重複。一個簡單的方法是把預設命名規則裡的 '/' 修改成 '-'。`,
        `If you are using a mobile browser, it may not create a folder. This is not a problem with the downloader. If this happens, you need to modify the naming rules to avoid duplicate file names. A simple way to do this is to change the '/' in the default naming rules to '-'.`,
        `モバイルブラウザをご利用の場合、フォルダが作成されない場合があります。これはダウンローダーの問題ではありません。このような場合は、ファイル名の重複を避けるために命名規則を変更する必要があります。簡単な方法としては、デフォルトの命名規則の「/」を「-」に変更することです。`,
        `모바일 브라우저를 사용하는 경우 폴더가 생성되지 않을 수 있습니다. 이는 다운로더 문제가 아닙니다. 이 경우 파일 이름 중복을 방지하기 위해 파일 이름 지정 규칙을 수정해야 합니다. 간단한 방법은 기본 파일 이름 지정 규칙에서 '/'를 '-'로 변경하는 것입니다.`,
    ],
};



/***/ }),

/***/ "./src/ts/setting/Form.ts":
/*!********************************!*\
  !*** ./src/ts/setting/Form.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _FormHTML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FormHTML */ "./src/ts/FormHTML.ts");
/* harmony import */ var _setting_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting/Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _SaveNamingRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SaveNamingRule */ "./src/ts/setting/SaveNamingRule.ts");
/* harmony import */ var _FormSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormSettings */ "./src/ts/setting/FormSettings.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Options__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Options */ "./src/ts/setting/Options.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../MsgBox */ "./src/ts/MsgBox.ts");










// 设置表单
class Form {
    constructor() {
        /**所有的美化表单元素 */
        // 每个美化的 input 控件后面必定有一个 span 元素
        // label 和 子选项区域则不一定有
        this.allBeautifyInput = [];
        /**一些固定格式的帮助元素 */
        this.tips = [
            {
                wrapID: 'tipCreateFolder',
                wrap: document.createElement('span'),
                settingName: 'tipCreateFolder',
            },
        ];
        this.form = _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].useSlot('form', _FormHTML__WEBPACK_IMPORTED_MODULE_2__["formHtml"]);
        _Lang__WEBPACK_IMPORTED_MODULE_7__["lang"].register(this.form);
        this.getElements();
        const allOptions = this.form.querySelectorAll('.option');
        _Options__WEBPACK_IMPORTED_MODULE_8__["options"].init(allOptions);
        new _SaveNamingRule__WEBPACK_IMPORTED_MODULE_4__["SaveNamingRule"](this.form.userSetName);
        new _FormSettings__WEBPACK_IMPORTED_MODULE_5__["FormSettings"](this.form);
        this.bindEvents();
    }
    getElements() {
        // 获取所有的美化控件和它们对应的 span 元素
        const allCheckBox = this.form.querySelectorAll('input[type="checkbox"]');
        const allRadio = this.form.querySelectorAll('input[type="radio"]');
        const checkboxAndRadio = [allCheckBox, allRadio];
        for (const arr of checkboxAndRadio) {
            arr.forEach((input) => {
                let subOption = null;
                if (input.classList.contains('checkbox_switch')) {
                    subOption = this.form.querySelector(`.subOptionWrap[data-show="${input.name}"]`);
                }
                this.allBeautifyInput.push({
                    input: input,
                    span: input.nextElementSibling,
                    label: this.form.querySelector(`label[for="${input.id}"]`),
                    subOption: subOption,
                });
            });
        }
        // 获取所有在表单上直接显示的提示元素
        for (const item of this.tips) {
            const wrap = this.form.querySelector('#' + item.wrapID);
            if (wrap) {
                item.wrap = wrap;
            }
        }
    }
    bindEvents() {
        // 为美化的表单控件绑定事件
        for (const item of this.allBeautifyInput) {
            const { input, span } = item;
            // 点击美化元素时，点击真实的 input 控件
            span.addEventListener('click', () => {
                input.click();
            });
            // 当美化元素获得焦点，并且用户按下了回车或空格键时，点击真实的 input 控件
            span.addEventListener('keydown', (event) => {
                if ((event.code === 'Enter' || event.code === 'Space') &&
                    event.target === span) {
                    event.stopPropagation();
                    event.preventDefault();
                    input.click();
                }
            });
        }
        // 设置变化或者重置时，重新设置美化状态
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, _utils_Utils__WEBPACK_IMPORTED_MODULE_6__["Utils"].debounce(() => {
            this.initFormBeautify();
            this.showTips();
        }, 50));
        // 用户点击“我知道了”按钮之后不再显示对应的提示
        for (const item of this.tips) {
            if (item.wrap) {
                const btn = item.wrap.querySelector('button');
                btn.addEventListener('click', () => {
                    Object(_setting_Settings__WEBPACK_IMPORTED_MODULE_3__["setSetting"])(item.settingName, false);
                });
            }
        }
        // 选择背景图片
        {
            const el = this.form.querySelector('#selectBG');
            if (el) {
                el.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('selectBG');
                });
            }
        }
        // 清除背景图片
        {
            const el = this.form.querySelector('#clearBG');
            if (el) {
                el.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('clearBG');
                });
            }
        }
        // 重置设置
        {
            const el = this.form.querySelector('#resetSettings');
            if (el) {
                el.addEventListener('click', () => {
                    const result = window.confirm(_Lang__WEBPACK_IMPORTED_MODULE_7__["lang"].transl('_是否重置设置'));
                    if (result) {
                        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('resetSettings');
                    }
                });
            }
        }
        // 导出设置
        {
            const el = this.form.querySelector('#exportSettings');
            if (el) {
                el.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('exportSettings');
                });
            }
        }
        // 导入设置
        {
            const el = this.form.querySelector('#importSettings');
            if (el) {
                el.addEventListener('click', () => {
                    _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('importSettings');
                });
            }
        }
        // 显示不下载重复文件的提示
        const deduplicationHelp = this.form.querySelector('#deduplicationHelp');
        deduplicationHelp.addEventListener('click', () => {
            _MsgBox__WEBPACK_IMPORTED_MODULE_9__["msgBox"].show(_Lang__WEBPACK_IMPORTED_MODULE_7__["lang"].transl('_不下载重复文件的提示'), {
                title: _Lang__WEBPACK_IMPORTED_MODULE_7__["lang"].transl('_不下载重复文件'),
            });
        });
        // 显示命名字段提示
        this.form
            .querySelector('.showFileNameTip')
            .addEventListener('click', () => _utils_Utils__WEBPACK_IMPORTED_MODULE_6__["Utils"].toggleEl(document.querySelector('.fileNameTip')));
        // 显示日期格式提示
        this.form
            .querySelector('.showDateTip')
            .addEventListener('click', () => _utils_Utils__WEBPACK_IMPORTED_MODULE_6__["Utils"].toggleEl(document.querySelector('.dateFormatTip')));
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
        const from = this.form.fileNameSelect;
        const to = this.form.userSetName;
        from.addEventListener('change', () => {
            if (from.value !== 'default') {
                // 把选择项插入到光标位置,并设置新的光标位置
                const position = to.selectionStart;
                to.value =
                    to.value.substring(0, position) +
                        from.value +
                        to.value.substring(position);
                to.selectionStart = position + from.value.length;
                to.selectionEnd = position + from.value.length;
                to.focus();
            }
        });
    }
    // 设置表单里的美化元素的状态
    initFormBeautify() {
        for (const item of this.allBeautifyInput) {
            const { input, span, label, subOption } = item;
            // 重设 label 的高亮状态
            if (label) {
                const method = input.checked ? 'add' : 'remove';
                label.classList[method]('active');
            }
            // 重设子选项区域的显示/隐藏状态
            if (subOption) {
                subOption.style.display = input.checked ? 'inline' : 'none';
            }
        }
    }
    // 是否显示提示
    showTips() {
        for (const item of this.tips) {
            item.wrap.style.display = _setting_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"][item.settingName] ? 'block' : 'none';
        }
    }
}
new Form();


/***/ }),

/***/ "./src/ts/setting/FormSettings.ts":
/*!****************************************!*\
  !*** ./src/ts/setting/FormSettings.ts ***!
  \****************************************/
/*! exports provided: FormSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSettings", function() { return FormSettings; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _utils_DateFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DateFormat */ "./src/ts/utils/DateFormat.ts");
/* harmony import */ var _NameRuleManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NameRuleManager */ "./src/ts/setting/NameRuleManager.ts");




class FormSettings {
    constructor(form) {
        // 没有填写 userSetName 字段，因为这个字段由 nameRuleManager 管理
        this.inputFileds = {
            checkbox: [
                'image',
                'music',
                'video',
                'compressed',
                'ps',
                'other',
                'free',
                'pay',
                'feeSwitch',
                'idRangeSwitch',
                'postDate',
                'saveLink',
                'saveText',
                'autoStartDownload',
                'showAdvancedSettings',
                'bgDisplay',
                'boldKeywords',
                'showNotificationAfterDownloadComplete',
                'zeroPadding',
                'deduplication',
                'savePostCover',
                'unifiedURL',
                'titleMustTextSwitch',
                'titleCannotTextSwitch',
                'fileNameIncludeSwitch',
                'fileNameExcludeSwitch',
            ],
            text: [
                'fee',
                'idRangeInput',
                'downloadThread',
                'dateFormat',
                'bgOpacity',
                'zeroPaddingLength',
                'titleMustText',
                'titleCannotText',
                'nameruleForNonImages',
                'fileNameInclude',
                'fileNameExclude',
                'downloadInterval',
            ],
            radio: ['idRange', 'feeRange', 'bgPositionY', 'userSetLang'],
            textarea: [],
            datetime: ['postDateStart', 'postDateEnd'],
        };
        this.restoreTimer = 0;
        this.form = form;
        _NameRuleManager__WEBPACK_IMPORTED_MODULE_3__["nameRuleManager"].registerInput(this.form.userSetName);
        this.bindEvents();
        this.restoreFormSettings();
        this.ListenChange();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, () => {
            window.clearTimeout(this.restoreTimer);
            this.restoreTimer = window.setTimeout(() => {
                this.restoreFormSettings();
            }, 0);
        });
    }
    // 监听所有输入选项的变化
    // 该函数可执行一次，否则事件会重复绑定
    ListenChange() {
        for (const name of this.inputFileds.text) {
            this.saveTextInput(name);
        }
        for (const name of this.inputFileds.textarea) {
            this.saveTextInput(name);
        }
        for (const name of this.inputFileds.datetime) {
            this.saveTextInput(name);
        }
        for (const name of this.inputFileds.radio) {
            this.saveRadio(name);
        }
        for (const name of this.inputFileds.checkbox) {
            this.saveCheckBox(name);
        }
    }
    // 读取设置，恢复到表单里
    restoreFormSettings() {
        for (const name of this.inputFileds.text) {
            this.restoreString(name);
        }
        for (const name of this.inputFileds.radio) {
            this.restoreString(name);
        }
        for (const name of this.inputFileds.textarea) {
            this.restoreString(name);
        }
        for (const name of this.inputFileds.checkbox) {
            this.restoreBoolean(name);
        }
        for (const name of this.inputFileds.datetime) {
            this.restoreDate(name);
        }
    }
    // ---------------------
    // 处理输入框： change 时保存 value
    saveTextInput(name) {
        const el = this.form[name];
        el.addEventListener('change', () => {
            Object(_Settings__WEBPACK_IMPORTED_MODULE_1__["setSetting"])(name, el.value);
        });
    }
    // 处理复选框： click 时保存 checked
    saveCheckBox(name) {
        const el = this.form[name];
        el.addEventListener('click', () => {
            Object(_Settings__WEBPACK_IMPORTED_MODULE_1__["setSetting"])(name, el.checked);
        });
    }
    // 处理单选框： click 时保存 value
    saveRadio(name) {
        const radios = this.form[name];
        for (const radio of radios) {
            radio.addEventListener('click', () => {
                Object(_Settings__WEBPACK_IMPORTED_MODULE_1__["setSetting"])(name, radio.value);
            });
        }
    }
    // 恢复值为 Boolean 的设置项
    restoreBoolean(name) {
        if (_Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name] !== undefined) {
            this.form[name].checked = _Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name];
        }
    }
    // 恢复值为 string 的设置项
    restoreString(name) {
        if (_Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name] !== undefined) {
            this.form[name].value = _Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name].toString();
        }
    }
    // 恢复日期、时间设置项
    restoreDate(name) {
        if (_Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name] !== undefined) {
            // 把时间戳转换成 input 使用的字符串
            const date = _Settings__WEBPACK_IMPORTED_MODULE_1__["settings"][name];
            this.form[name].value = _utils_DateFormat__WEBPACK_IMPORTED_MODULE_2__["DateFormat"].format(date, 'YYYY-MM-DDThh:mm');
        }
    }
}



/***/ }),

/***/ "./src/ts/setting/NameRuleManager.ts":
/*!*******************************************!*\
  !*** ./src/ts/setting/NameRuleManager.ts ***!
  \*******************************************/
/*! exports provided: nameRuleManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameRuleManager", function() { return nameRuleManager; });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config */ "./src/ts/Config.ts");
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings */ "./src/ts/setting/Settings.ts");




// 管理命名规则
// 在实际使用中，作为 settings.userSetName 的代理
// 其他类必须使用 nameRuleManager.rule 存取器来存取命名规则
class NameRuleManager {
    constructor() {
        // 命名规则输入框的集合
        this.inputList = [];
        this.bindEvents();
    }
    bindEvents() {
        const evts = [
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.settingInitialized,
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.resetSettingsEnd,
            _EVT__WEBPACK_IMPORTED_MODULE_1__["EVT"].list.pageSwitchedTypeChange,
        ];
        evts.forEach((evt) => {
            window.addEventListener(evt, () => {
                this.setInputValue();
            });
        });
    }
    get rule() {
        return _Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].userSetName;
    }
    set rule(str) {
        // 检查传递的命名规则的合法性
        // 替换特殊字符
        str = this.handleUserSetName(str) || _Config__WEBPACK_IMPORTED_MODULE_0__["Config"].defaultNameRule;
        Object(_Settings__WEBPACK_IMPORTED_MODULE_3__["setSetting"])('userSetName', str);
        this.setInputValue();
    }
    // 注册命名规则输入框
    registerInput(input) {
        this.inputList.push(input);
        this.setInputValue();
        // 保存事件被触发之前的值
        let lastValue = input.value;
        // 给输入框绑定事件
        const evList = ['change', 'focus'];
        // change 事件只对用户手动输入有效
        // 当用户从下拉框添加一个命名标记时，不会触发 change 事件，需要监听 focus 事件
        evList.forEach((evName) => {
            input.addEventListener(evName, () => {
                // 当事件触发时，比较输入框的值是否与事件触发之前发生了变化
                // 如果值没有变化，就什么都不做
                // 对于 change 事件来说，值必然发生了变化，但是 focus 就不一定了
                // 试想：用户修改命名规则为非法的规则，例如输入 111，触发 change 事件之后下载器会提示命名规则非法
                // 然后用户点击输入框（focus 事件）想要修改规则，此时值没有变化，就不应该执行后续代码。如果依然执行后续代码，那么每当用户点击输入框，下载器就会马上显示提示，这导致用户根本没办法在输入框里修改命名规则
                if (input.value === lastValue) {
                    return;
                }
                lastValue = input.value;
                this.rule = input.value;
            });
        });
    }
    // 设置输入框的值为当前命名规则
    setInputValue() {
        const rule = this.rule;
        this.inputList.forEach((input) => {
            input.value = rule;
        });
        if (rule !== _Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].userSetName) {
            Object(_Settings__WEBPACK_IMPORTED_MODULE_3__["setSetting"])('userSetName', rule);
        }
    }
    // 处理用命名规则的非法字符和非法规则
    // 这里不必处理得非常详尽，因为在生成文件名时，还会对结果进行处理
    // 测试用例：在作品页面内设置下面的命名规则，下载器会自动进行更正
    // /{page_tag}/|/{user}////<//{rank}/{px}/{sl}/{page_tag}///{id}-{user}-{user_id}""-?{tags_transl_only}////
    handleUserSetName(str) {
        // 替换命名规则里可能存在的非法字符
        str = _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].replaceUnsafeStr(str);
        // replaceUnsafeStr 会把斜线 / 替换成全角的斜线 ／，这里再替换回来，否则就不能建立文件夹了
        str = str.replace(/／/g, '/');
        // 处理连续的 /
        str = str.replace(/\/{2,100}/g, '/');
        // 如果命名规则头部或者尾部是 / 则去掉
        if (str.startsWith('/')) {
            str = str.replace('/', '');
        }
        if (str.endsWith('/')) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
}
const nameRuleManager = new NameRuleManager();



/***/ }),

/***/ "./src/ts/setting/Options.ts":
/*!***********************************!*\
  !*** ./src/ts/setting/Options.ts ***!
  \***********************************/
/*! exports provided: options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settings */ "./src/ts/setting/Settings.ts");



// 控制每个设置的隐藏、显示
// 设置页数/个数的提示文本
class Options {
    constructor() {
        // 保持显示的选项的 id
        this.whiteList = [2, 21, 51, 13, 17, 33];
        // 某些页面类型需要隐藏某些选项。当调用 hideOption 方法时，把选项 id 保存起来
        // 优先级高于 whiteList
        this.hiddenList = [];
    }
    init(allOption) {
        this.allOption = allOption;
        this.handleShowAdvancedSettings();
        this.bindEvents();
    }
    bindEvents() {
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'showAdvancedSettings') {
                this.handleShowAdvancedSettings();
            }
        });
        const list = [
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitchedTypeNotChange,
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.pageSwitchedTypeChange,
        ];
        list.forEach((ev) => {
            window.addEventListener(ev, () => {
                this.hiddenList = [];
                window.setTimeout(() => {
                    this.handleShowAdvancedSettings();
                });
            });
        });
    }
    handleShowAdvancedSettings() {
        for (const option of this.allOption) {
            if (option.dataset.no === undefined) {
                continue;
            }
            const no = Number.parseInt(option.dataset.no);
            // 如果需要隐藏高级设置
            if (!_Settings__WEBPACK_IMPORTED_MODULE_2__["settings"].showAdvancedSettings) {
                // 如果在白名单中，并且当前页面不需要隐藏它，那么它就是显示的
                if (this.whiteList.includes(no) && !this.hiddenList.includes(no)) {
                    this.showOption([no]);
                }
                // 如果没有在白名单中，或者当前页面需要隐藏它，就隐藏它
                if (!this.whiteList.includes(no) || this.hiddenList.includes(no)) {
                    option.style.display = 'none';
                }
            }
            else {
                // 如果需要显示高级设置，那么只隐藏当前页面需要隐藏的选项
                if (this.hiddenList.includes(no)) {
                    option.style.display = 'none';
                }
                else {
                    this.showOption([no]);
                }
            }
        }
    }
    // 使用编号获取指定选项的元素
    getOption(no) {
        for (const option of this.allOption) {
            if (option.dataset.no === no.toString()) {
                return option;
            }
        }
        throw `Not found this option: ${no}`;
    }
    // 显示或隐藏指定的选项
    setOptionDisplay(no, display) {
        for (const number of no) {
            this.getOption(number).style.display = display;
        }
    }
    // 显示所有选项
    // 在切换不同页面时使用
    showAllOption() {
        for (const el of this.allOption) {
            el.style.display = 'block';
        }
    }
    // 隐藏指定的选项。参数是数组，传递设置项的编号。
    // 注意：由于这个方法会修改 hiddenList，所以它是有副作用的
    // 这个方法只应该在其他类里面使用，在这个类里不要直接调用它
    hideOption(no) {
        this.hiddenList = no;
        this.setOptionDisplay(no, 'none');
    }
    // 显示指定的选项。因为页面无刷新加载，所以一些选项被隐藏后，可能需要再次显示
    showOption(no) {
        this.setOptionDisplay(no, 'block');
    }
    // 设置 “抓取多少作品/页面” 选项的提示和预设值
    setWantPageTip(arg) {
        _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.wantPageEls.text, arg.text);
        this.wantPageEls.wrap.dataset.xztip = arg.tip;
        this.wantPageEls.wrap.dataset.tip = _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].transl(arg.tip);
        // rangTip 可能需要翻译
        if (arg.rangTip.startsWith('_')) {
            _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.wantPageEls.rangTip, arg.rangTip);
        }
        else {
            // 也可能直接传递了字符串，不需要翻译
            _Lang__WEBPACK_IMPORTED_MODULE_1__["lang"].updateText(this.wantPageEls.rangTip, '');
            this.wantPageEls.rangTip.textContent = arg.rangTip;
        }
    }
}
const options = new Options();



/***/ }),

/***/ "./src/ts/setting/SaveNamingRule.ts":
/*!******************************************!*\
  !*** ./src/ts/setting/SaveNamingRule.ts ***!
  \******************************************/
/*! exports provided: SaveNamingRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveNamingRule", function() { return SaveNamingRule; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tools */ "./src/ts/Tools.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings */ "./src/ts/setting/Settings.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Toast */ "./src/ts/Toast.ts");
/* harmony import */ var _NameRuleManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NameRuleManager */ "./src/ts/setting/NameRuleManager.ts");






// 保存和加载命名规则列表
class SaveNamingRule {
    constructor(ruleInput) {
        this.limit = 20; // 最大保存数量
        this._show = false; // 是否显示列表
        this.html = `
  <div class="saveNamingRuleWrap">
  <button class="nameSave textButton has_tip" type="button" data-xztip="_保存命名规则提示" data-xztext="_保存"></button>
  <button class="nameLoad textButton" type="button" data-xztext="_加载"></button>
  <ul class="namingRuleList"></ul>
  </div>`;
        this.ruleInput = ruleInput;
        _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].clearSlot('saveNamingRule');
        const wrap = _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].useSlot('saveNamingRule', this.html);
        _Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].register(wrap);
        this.saveBtn = wrap.querySelector('button.nameSave');
        this.loadBtn = wrap.querySelector('button.nameLoad');
        this.listWrap = wrap.querySelector('ul.namingRuleList');
        this.createList();
        this.bindEvents();
    }
    set show(boolean) {
        this._show = boolean;
        boolean ? this.showListWrap() : this.hideListWrap();
    }
    get show() {
        return this._show;
    }
    bindEvents() {
        this.saveBtn.addEventListener('click', () => {
            this.add(this.ruleInput.value);
        });
        this.loadBtn.addEventListener('click', () => {
            this.show = !this.show;
        });
        this.listWrap.addEventListener('mouseleave', () => {
            this.show = false;
        });
        // 设置发生变化时重新创建列表
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, (ev) => {
            const data = ev.detail.data;
            if (data.name === 'namingRuleList') {
                this.createList();
            }
        });
    }
    add(rule) {
        if (_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList.length === this.limit) {
            this.delete(0);
        }
        // 如果这个规则已存在，不会重复添加它
        if (!_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList.includes(rule)) {
            const list = Array.from(_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList);
            list.push(rule);
            Object(_Settings__WEBPACK_IMPORTED_MODULE_3__["setSetting"])('namingRuleList', list);
        }
        _Toast__WEBPACK_IMPORTED_MODULE_4__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_2__["lang"].transl('_已保存命名规则'));
    }
    delete(index) {
        const list = Array.from(_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList);
        list.splice(index, 1);
        Object(_Settings__WEBPACK_IMPORTED_MODULE_3__["setSetting"])('namingRuleList', list);
    }
    select(rule) {
        this.ruleInput.value = rule;
        _NameRuleManager__WEBPACK_IMPORTED_MODULE_5__["nameRuleManager"].rule = rule;
    }
    createList() {
        const htmlArr = [];
        for (let i = 0; i < _Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList.length; i++) {
            const html = `<li>
      <span class="rule">${_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList[i]}</span>
      <button class="delete textButton" type="button" data-index="${i}">×</button>
    </li>`;
            htmlArr.push(html);
        }
        if (_Settings__WEBPACK_IMPORTED_MODULE_3__["settings"].namingRuleList.length === 0) {
            htmlArr.push(`<li><i>&nbsp;&nbsp;&nbsp;&nbsp;no data</i></li>`);
        }
        this.listWrap.innerHTML = htmlArr.join('');
        const ruleEls = this.listWrap.querySelectorAll('.rule');
        for (const el of ruleEls) {
            el.addEventListener('click', () => {
                this.select(el.textContent);
                this.show = false;
            });
        }
        const deleteEls = this.listWrap.querySelectorAll('.delete');
        for (const el of deleteEls) {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                this.delete(index);
            });
        }
    }
    showListWrap() {
        this.listWrap.style.display = 'block';
    }
    hideListWrap() {
        this.listWrap.style.display = 'none';
    }
}



/***/ }),

/***/ "./src/ts/setting/Settings.ts":
/*!************************************!*\
  !*** ./src/ts/setting/Settings.ts ***!
  \************************************/
/*! exports provided: settings, setSetting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSetting", function() { return setSetting; });
/* harmony import */ var _EVT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EVT */ "./src/ts/EVT.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _MsgBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MsgBox */ "./src/ts/MsgBox.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Config */ "./src/ts/Config.ts");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Toast */ "./src/ts/Toast.ts");
/* harmony import */ var _Lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lang */ "./src/ts/Lang.ts");
// settings 保存了下载器的所有设置项
// 获取设置项的值：
// settings[name]
// 修改设置项的值：
// setSetting(name, value)
// 本模块会触发 3 个事件：
// EVT.list.settingChange
// 当任意一个设置项被赋值时触发（本模块不会区分值是否发生了变化）。这是最常用的事件。
// 事件的参数里会传递这个设置项的名称和值，格式如：
// {name: string, value: any}
// 如果某个模块要监听特定的设置项，应该使用参数的 name 来判断触发事件的设置项是否是自己需要的设置项
// 如果不依赖于特定设置项，则应该考虑使用节流或者防抖来限制事件监听器的执行频率，防止造成严重的性能问题
// EVT.list.settingInitialized
// 当设置初始化完毕后（恢复保存的设置之后）触发。这个事件在生命周期里只会触发一次。
// 过程中，每个设置项都会触发一次 settingChange 事件
// EVT.list.resetSettingsEnd
// 重置设置之后触发
// 导入设置之后触发
// 过程中，每个设置项都会触发一次 settingChange 事件
// 如果打开了多个标签页，每个页面的 settings 数据是互相独立的，在一个页面里修改设置不会影响另一个页面里的设置。
// 但是持久化保存的数据只有一份：最后一次设置变更是在哪个页面发生的，就保存哪个页面的 settings 数据。






class Settings {
    constructor() {
        // 默认设置
        this.defaultSettings = {
            image: true,
            music: true,
            video: true,
            compressed: true,
            ps: true,
            other: true,
            free: true,
            pay: true,
            feeSwitch: false,
            feeRange: '>=',
            fee: 500,
            idRangeSwitch: false,
            idRangeInput: 0,
            idRange: '>',
            postDate: false,
            postDateStart: 946684800000,
            postDateEnd: 4102444800000,
            saveLink: true,
            saveText: false,
            userSetName: 'fanbox/{user}/{date}-{title}/{index}',
            autoStartDownload: true,
            downloadThread: 3,
            dateFormat: 'YYYY-MM-DD',
            savePostCover: true,
            userSetLang: 'auto',
            tipCreateFolder: true,
            whatIsNewFlag: 'xuejian&saber',
            showAdvancedSettings: false,
            bgDisplay: false,
            bgOpacity: 60,
            bgPositionY: 'center',
            boldKeywords: true,
            namingRuleList: [],
            showNotificationAfterDownloadComplete: false,
            zeroPadding: false,
            zeroPaddingLength: 3,
            deduplication: false,
            showHowToUse: true,
            unifiedURL: true,
            titleMustTextSwitch: false,
            titleMustText: [],
            titleCannotTextSwitch: false,
            titleCannotText: [],
            nameruleForNonImages: 'fanbox/{user}/{date}-{title}/{name}',
            fileNameIncludeSwitch: false,
            fileNameInclude: [],
            fileNameExcludeSwitch: false,
            fileNameExclude: [],
            downloadInterval: 1,
        };
        this.allSettingKeys = Object.keys(this.defaultSettings);
        // 值为浮点数的选项
        this.floatNumberKey = [
            'downloadInterval',
        ];
        // 值为整数的选项不必单独列出
        // 值为数字数组的选项
        this.numberArrayKeys = [];
        // 值为字符串数组的选项
        this.stringArrayKeys = [
            'namingRuleList',
            'titleMustText',
            'titleCannotText',
            'fileNameInclude',
            'fileNameExclude',
        ];
        // 以默认设置作为初始设置
        this.settings = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].deepCopy(this.defaultSettings);
        this.store = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].debounce(() => {
            // chrome.storage.local 的储存上限是 5 MiB（5242880 Byte）
            chrome.storage.local.set({
                [_Config__WEBPACK_IMPORTED_MODULE_3__["Config"].settingStoreName]: this.settings,
            });
        }, 50);
        this.restore();
        this.bindEvents();
    }
    bindEvents() {
        // 当设置发生变化时进行本地存储
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.settingChange, () => {
            this.store();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.resetSettings, () => {
            this.reset();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.exportSettings, () => {
            this.exportSettings();
        });
        window.addEventListener(_EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].list.importSettings, () => {
            this.importSettings();
        });
    }
    // 读取恢复设置
    restore() {
        let restoreData = this.defaultSettings;
        // 首先从 chrome.storage 获取配置
        chrome.storage.local.get(_Config__WEBPACK_IMPORTED_MODULE_3__["Config"].settingStoreName, (result) => {
            if (result[_Config__WEBPACK_IMPORTED_MODULE_3__["Config"].settingStoreName]) {
                restoreData = result[_Config__WEBPACK_IMPORTED_MODULE_3__["Config"].settingStoreName];
            }
            else {
                // 如无数据则尝试从 localStorage 获取配置，因为旧版本的配置储存在 localStorage 中
                const savedSettings = localStorage.getItem(_Config__WEBPACK_IMPORTED_MODULE_3__["Config"].settingStoreName);
                if (savedSettings) {
                    restoreData = JSON.parse(savedSettings);
                }
            }
            this.assignSettings(restoreData);
            _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('settingInitialized');
        });
    }
    // 接收整个设置项，通过循环将其更新到 settings 上
    // 循环设置而不是整个替换的原因：
    // 1. 进行类型转换，如某些设置项是 number ，但是数据来源里是 string，setSetting 可以把它们转换到正确的类型
    // 2. 某些选项在旧版本里没有，所以不能用旧的设置整个覆盖
    assignSettings(data) {
        const origin = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].deepCopy(data);
        for (const [key, value] of Object.entries(origin)) {
            this.setSetting(key, value);
        }
    }
    exportSettings() {
        const blob = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].json2Blob(this.settings);
        const url = URL.createObjectURL(blob);
        _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].downloadFile(url, _Config__WEBPACK_IMPORTED_MODULE_3__["Config"].appName + ` Settings.json`);
        _Toast__WEBPACK_IMPORTED_MODULE_4__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_导出成功'));
    }
    async importSettings() {
        const loadedJSON = (await _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].loadJSONFile().catch((err) => {
            return _MsgBox__WEBPACK_IMPORTED_MODULE_2__["msgBox"].error(err);
        }));
        if (!loadedJSON) {
            return;
        }
        // 检查是否存在设置里的属性
        if (loadedJSON.downloadThread === undefined) {
            return _MsgBox__WEBPACK_IMPORTED_MODULE_2__["msgBox"].error(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_格式错误'));
        }
        // 开始恢复导入的设置
        this.reset(loadedJSON);
        _Toast__WEBPACK_IMPORTED_MODULE_4__["toast"].success(_Lang__WEBPACK_IMPORTED_MODULE_5__["lang"].transl('_导入成功'), {
            position: 'center',
        });
    }
    // 重置设置 或者 导入设置
    // 可选参数：传递一份设置数据，用于从配置文件导入，恢复设置
    reset(data) {
        this.assignSettings(data ? data : this.defaultSettings);
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('resetSettingsEnd');
    }
    tipError(key) {
        _MsgBox__WEBPACK_IMPORTED_MODULE_2__["msgBox"].error(`${key}: Invalid value`);
    }
    // 更改设置项
    // 其他模块应该通过这个方法更改设置
    // 这里面有一些类型转换的代码，主要目的：
    // 1. 兼容旧版本的设置。读取旧版本的设置时，将其转换成新版本的设置。例如某个设置在旧版本里是 string 类型，值为 'a,b,c'。新版本里是 string[] 类型，这里会自动将其转换成 ['a','b','c']
    // 2. 减少额外操作。例如某个设置的类型为 string[]，其他模块可以传入 string 类型的值如 'a,b,c'，而不必先把它转换成 string[]
    setSetting(key, value) {
        if (!this.allSettingKeys.includes(key)) {
            return;
        }
        const keyType = typeof this.defaultSettings[key];
        const valueType = typeof value;
        // 将传入的值转换成选项对应的类型
        if (keyType === 'string' && valueType !== 'string') {
            value = value.toString();
        }
        if (keyType === 'number' && valueType !== 'number') {
            // 时间是需要特殊处理的 number 类型
            if (key === 'postDateStart' || key == 'postDateEnd') {
                if (valueType === 'string') {
                    if (value === '') {
                        // 如果日期是空字符串，则替换为默认值
                        value = this.defaultSettings[key];
                    }
                    else {
                        // 把日期字符串转换成时间戳
                        const date = new Date(value);
                        value = date.getTime();
                    }
                }
            }
            else {
                // 处理普通的 number 类型
                if (this.floatNumberKey.includes(key)) {
                    value = Number.parseFloat(value);
                }
                else {
                    value = Number.parseInt(value);
                }
            }
            if (isNaN(value)) {
                return this.tipError(key);
            }
        }
        if (keyType === 'boolean' && valueType !== 'boolean') {
            value = !!value;
        }
        if (key === 'downloadThread' &&
            value > _Config__WEBPACK_IMPORTED_MODULE_3__["Config"].downloadThreadMax) {
            value = _Config__WEBPACK_IMPORTED_MODULE_3__["Config"].downloadThreadMax;
        }
        if (key === 'downloadInterval' && value < 0) {
            value = 0;
        }
        if (key === 'downloadInterval' && value > 3600) {
            value = 3600;
        }
        // 处理数组类型的值
        if (Array.isArray(this.defaultSettings[key])) {
            if (this.stringArrayKeys.includes(key)) {
                // 字符串转换成 string[]
                if (valueType === 'string') {
                    value = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].string2array(value);
                }
            }
            if (this.numberArrayKeys.includes(key)) {
                // 把数组转换成 number[]
                if (Array.isArray(value)) {
                    value = value.map((val) => {
                        if (typeof val !== 'number') {
                            return Number(val);
                        }
                        else {
                            return val;
                        }
                    });
                }
                else {
                    return;
                }
            }
        }
        // 更改设置
        ;
        this.settings[key] = value;
        // 触发设置变化的事件
        _EVT__WEBPACK_IMPORTED_MODULE_0__["EVT"].fire('settingChange', { name: key, value: value });
    }
}
const self = new Settings();
const settings = self.settings;
const setSetting = self.setSetting.bind(self);



/***/ }),

/***/ "./src/ts/utils/DateFormat.ts":
/*!************************************!*\
  !*** ./src/ts/utils/DateFormat.ts ***!
  \************************************/
/*! exports provided: DateFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateFormat", function() { return DateFormat; });
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
        const _date = new Date(date);
        const YYYY = _date.getFullYear().toString();
        const YY = YYYY.substring(YYYY.length - 2, YYYY.length);
        const MM = (_date.getMonth() + 1).toString().padStart(2, '0');
        const MMM = this.months[_date.getMonth()];
        const MMMM = this.Months[_date.getMonth()];
        const DD = _date.getDate().toString().padStart(2, '0');
        const hh = _date.getHours().toString().padStart(2, '0');
        const mm = _date.getMinutes().toString().padStart(2, '0');
        const ss = _date.getSeconds().toString().padStart(2, '0');
        // 对格式字符串进行替换
        let r = format;
        r = r.replace('YYYY', YYYY);
        r = r.replace('YY', YY);
        r = r.replace('MMMM', MMMM);
        r = r.replace('MMM', MMM);
        r = r.replace('MM', MM);
        r = r.replace('DD', DD);
        r = r.replace('hh', hh);
        r = r.replace('mm', mm);
        r = r.replace('ss', ss);
        return r;
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
];
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
];



/***/ }),

/***/ "./src/ts/utils/IndexedDB.ts":
/*!***********************************!*\
  !*** ./src/ts/utils/IndexedDB.ts ***!
  \***********************************/
/*! exports provided: IndexedDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDB", function() { return IndexedDB; });
// 封装操作 IndexedDB 的一些公共方法，仅满足本程序使用，并不完善
class IndexedDB {
    async open(DBName, DBVer, onUpgrade) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DBName, DBVer);
            request.onupgradeneeded = (ev) => {
                if (onUpgrade) {
                    onUpgrade(request.result);
                }
            };
            request.onsuccess = (ev) => {
                this.db = request.result;
                resolve(request.result);
            };
            request.onerror = (ev) => {
                console.error('open indexDB failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async add(storeNames, data) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readwrite')
                .objectStore(storeNames)
                .add(data);
            r.onsuccess = (ev) => {
                resolve(ev);
            };
            r.onerror = (ev) => {
                console.error(`add failed in ${storeNames}`, data);
                console.trace();
                reject(ev);
            };
        });
    }
    async put(storeNames, data) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readwrite')
                .objectStore(storeNames)
                .put(data);
            r.onsuccess = (ev) => {
                resolve(ev);
            };
            r.onerror = (ev) => {
                console.error('put failed');
                console.trace();
                reject(ev);
            };
        });
    }
    // 向一个存储库中批量添加数据
    async batchAddData(storeName, dataList, key) {
        return new Promise(async (resolve, reject) => {
            var _a;
            if (dataList.length === 0) {
                resolve();
            }
            // 获取已存在的 key
            const existedKeys = (await this.getAllKeys(storeName));
            // 使用事务
            const tr = (_a = this.db) === null || _a === void 0 ? void 0 : _a.transaction(storeName, 'readwrite');
            if (!tr) {
                throw new Error(`transaction ${storeName} is undefined`);
            }
            const store = tr.objectStore(storeName);
            tr.oncomplete = () => {
                resolve();
            };
            tr.onerror = (err) => {
                console.error(err);
                reject(err);
            };
            async function insert(data) {
                return new Promise((resolve, reject) => {
                    if (existedKeys.includes(data[key])) {
                        resolve();
                    }
                    else {
                        const request = store.add(data);
                        request.onsuccess = () => {
                            resolve();
                        };
                        request.onerror = (err) => {
                            reject(err);
                        };
                    }
                });
            }
            for (const data of dataList) {
                await insert(data);
            }
        });
    }
    // 如果没有找到对应的记录，则返回 null
    async get(storeNames, key, index) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const store = this.db
                .transaction(storeNames, 'readonly')
                .objectStore(storeNames);
            let r;
            if (index !== undefined) {
                const i = store.index(index);
                r = i.get(key);
            }
            else {
                r = store.get(key);
            }
            r.onsuccess = (ev) => {
                const data = r.result;
                resolve(data ? data : null);
            };
            r.onerror = (ev) => {
                console.error('get failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async getAll(storeNames) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readwrite')
                .objectStore(storeNames)
                .getAll();
            r.onsuccess = (ev) => {
                const data = r.result;
                if (data) {
                    resolve(data);
                }
                resolve(data ? data : null);
            };
            r.onerror = (ev) => {
                console.error('getAll failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async getAllKeys(storeNames) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readonly')
                .objectStore(storeNames)
                .getAllKeys();
            r.onsuccess = (ev) => {
                const data = r.result;
                resolve(data ? data : null);
            };
            r.onerror = (ev) => {
                console.error('getAllKeys failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async delete(storeNames, key) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readwrite')
                .objectStore(storeNames)
                .delete(key);
            r.onsuccess = (ev) => {
                resolve(ev);
            };
            r.onerror = (ev) => {
                console.error('delete failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async clear(storeNames) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames, 'readwrite')
                .objectStore(storeNames)
                .clear();
            r.onsuccess = (ev) => {
                resolve();
            };
            r.onerror = (ev) => {
                console.error('clear failed');
                console.trace();
                reject(ev);
            };
        });
    }
    async openCursor(storeNames, CB) {
        return new Promise((resolve, reject) => {
            if (this.db === undefined) {
                reject('Database is not defined');
                return;
            }
            const r = this.db
                .transaction(storeNames)
                .objectStore(storeNames)
                .openCursor();
            r.onsuccess = (ev) => {
                CB(r.result);
                resolve(); // 这个 resolve 会在 cb 执行一次之后就触发
            };
            r.onerror = (ev) => {
                console.error('openCursor failed');
                console.trace();
                reject(ev);
            };
        });
    }
}



/***/ }),

/***/ "./src/ts/utils/Utils.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/Utils.ts ***!
  \*******************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
class Utils {
    // reg 预先创建，而不是运行时创建，因为运行时重复创建太多次了
    // 用正则去掉不安全的字符
    static replaceUnsafeStr(str) {
        str = str.replace(this.unsafeStr, '');
        // 把一些特殊字符替换成全角字符
        for (let index = 0; index < this.fullWidthDict.length; index++) {
            const rule = this.fullWidthDict[index];
            const reg = new RegExp(rule[0], 'g');
            str = str.replace(reg, rule[1]);
        }
        return str;
    }
    // 对象深拷贝
    static deepCopy(data) {
        if (data === null || typeof data !== 'object') {
            return data;
        }
        const result = (Array.isArray(data) ? [] : {});
        for (const [key, value] of Object.entries(data)) {
            result[key] =
                data === null || typeof data !== 'object' ? value : this.deepCopy(value);
        }
        return result;
    }
    // 字符串分割成数组
    static string2array(str) {
        str = str.replace(/\n/g, ''); // textarea 的值可能会存在换行符
        const temp = str.trim().split(',');
        const result = [];
        for (const str of temp) {
            if (str !== '') {
                result.push(str.trim());
            }
        }
        return result;
    }
    // 依据对象某个属性的值（视为数字）来排序对象数组。默认降序排列
    static sortByProperty(key, order = 'desc') {
        return function (a, b) {
            // 排序的内容有时可能是字符串，需要转换成数字排序
            const value1 = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]);
            const value2 = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]);
            if (value2 < value1) {
                return order === 'desc' ? -1 : 1;
            }
            else if (value2 > value1) {
                return order === 'desc' ? 1 : -1;
            }
            else {
                return 0;
            }
        };
    }
    // 创建 input 元素选择 json 文件
    static async loadJSONFile() {
        return new Promise((resolve, reject) => {
            const i = document.createElement('input');
            i.setAttribute('type', 'file');
            i.setAttribute('accept', 'application/json');
            i.onchange = () => {
                if (i.files && i.files.length > 0) {
                    // 读取文件内容
                    const file = new FileReader();
                    file.readAsText(i.files[0]);
                    file.onload = () => {
                        const str = file.result;
                        let result;
                        try {
                            result = JSON.parse(str);
                            // if((result as any).constructor !== Object){
                            // 允许是对象 {} 或者数组 []
                            if (result === null || typeof result !== 'object') {
                                const msg = 'Data is not an object!';
                                return reject(new Error(msg));
                            }
                            return resolve(result);
                        }
                        catch (error) {
                            const msg = 'JSON parse error!';
                            return reject(new Error(msg));
                        }
                    };
                }
            };
            i.click();
        });
    }
    // 创建 input 元素选择文件
    static async selectFile(accept) {
        return new Promise((resolve, reject) => {
            const i = document.createElement('input');
            i.setAttribute('type', 'file');
            if (accept) {
                i.setAttribute('accept', accept);
            }
            i.onchange = () => {
                if (i.files && i.files.length > 0) {
                    return resolve(i.files);
                }
                else {
                    return reject();
                }
            };
            i.click();
        });
    }
    // 通过创建 a 标签来下载文件
    static downloadFile(url, fileName) {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
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
    /**获取 URL path 中，某个路径名称后面的字符串。适用于符合 RESTful API 风格的路径
     *
     * 注意：传入的是 path，而不是整个 URL
     */
    // 例如：
    // https://www.pixiv.net/users/27482064/following/%E9%83%A8%E5%88%86%E5%96%9C%E6%AC%A2
    // 查询 'users' 返回 '27482064'
    // 因为 location.pathname 传入的字符串是浏览器自动编码过的，所以返回的字符串也是编码过的
    static getURLPathField(path, query) {
        const array = path.split('/');
        const index = array.findIndex((str) => str === query);
        if (index === -1) {
            return '';
        }
        return array[index + 1] || '';
    }
    // 切换 DOM 元素的可见性
    // 第二个参数设置显示时的 display，默认是 block，如果要设置为其他类型，则需要指定第二个参数
    static toggleEl(el, showDisplay = 'block') {
        el.style.display = el.style.display === showDisplay ? 'none' : showDisplay;
    }
    // 动态添加 css 样式
    static addStyle(css) {
        const e = document.createElement('style');
        e.innerHTML = css;
        document.body.append(e);
    }
    // 加载一个图片，当 onload 事件发生之后返回 img 元素
    static async loadImg(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = () => {
                reject(new Error(`Load image error! url: ${url}`));
            };
        });
    }
    /**JSON 转换成 Blob 对象。如果数据量可能比较大，则不应该使用这个方法 */
    static json2Blob(data) {
        const str = JSON.stringify(data, null, 2);
        const blob = new Blob([str], { type: 'application/json' });
        return blob;
    }
    /**JSON 转换成 Blob 对象。可以处理更大的数据量 */
    static json2BlobSafe(data) {
        // 在这个数组里储存数组字面量
        let result = [];
        // 添加数组的开始符号
        result.push('[');
        // 循环添加每一项数据
        for (const item of data) {
            result.push(JSON.stringify(item));
            result.push(',');
        }
        // 删除最后一个分隔符，否则会导致格式错误
        result.pop();
        // 添加数组的结束符号
        result.push(']');
        // 创建 blob 对象
        const blob = new Blob(result, { type: 'application/json' });
        result = [];
        return blob;
    }
    /**防抖 */
    static debounce(func, wait) {
        // 默认的定时器 id 不能使用有意义的数字，否则 clearTimeout 可能会错误的清除其他定时器
        let timer = undefined;
        const context = this;
        return function () {
            const args = arguments;
            window.clearTimeout(timer);
            timer = window.setTimeout(func.bind(context, ...args), wait);
        };
    }
    /**节流 */
    static throttle(func, delay) {
        let time = 0;
        const context = this;
        return function () {
            const args = arguments;
            const now = new Date().getTime();
            if (now - time >= delay) {
                time = now;
                return func.apply(context, args);
            }
        };
    }
    /**用 URL 里的后缀名替换 originName 的后缀名
     *
     * 例如传入参数 123.txt, https://.../123.jpg
     *
     * 返回 123.jpg
     */
    static replaceSuffix(originName, url) {
        const nameArray = originName.split('.');
        const urlArray = url.split('.');
        nameArray[nameArray.length - 1] = urlArray[urlArray.length - 1];
        return nameArray.join('.');
    }
    /**获取后缀名 */
    static getSuffix(name) {
        const nameArray = name.split('.');
        return nameArray[nameArray.length - 1];
    }
}
// 不安全的字符，这里多数是控制字符，需要替换掉
Utils.unsafeStr = new RegExp(/[\u0001-\u001f\u007f-\u009f\u00ad\u0600-\u0605\u061c\u06dd\u070f\u08e2\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u206f\ufdd0-\ufdef\ufeff\ufff9-\ufffb\ufffe\uffff]/g);
// 一些需要替换成全角字符的符号，左边是正则表达式的字符
Utils.fullWidthDict = [
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



/***/ })

/******/ });
//# sourceMappingURL=content.js.map