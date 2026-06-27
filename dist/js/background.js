/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/TotalDownload.ts":
/*!*********************************!*\
  !*** ./src/ts/TotalDownload.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   totalDownload: () => (/* binding */ totalDownload)
/* harmony export */ });
class TotalDownload {
    constructor() {
        /** 记录每天的下载总体积。key 是当天的 date，value 是当天的下载总量（字节数） */
        this.data = {};
        this.init();
    }
    init() {
        // 初始化存储
        chrome.runtime.onInstalled.addListener((details) => {
            if (details.reason === 'install') {
                chrome.storage.local.set({ totalDownload: {} }, () => {
                    if (chrome.runtime.lastError) {
                        console.error('初始化存储失败:', chrome.runtime.lastError.message);
                    }
                    else {
                        console.log('totalDownload 初始化成功');
                    }
                });
            }
        });
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.msg === 'getTotalDownload') {
                // 返回今天的数据
                sendResponse({ total: this.data[this.getDate()] });
            }
            else if (request.msg === 'getTotalDownloadHistory30') {
                // 返回最近 30 天的数据（虽然可以返回所有数据，但是天数太多的话，前台不好展示）
                this.getLast30DaysData().then((history) => {
                    sendResponse({ history });
                });
                // 由于这个 sendResponse 是异步，所以需要返回 true 让消息端口不要关闭
                // Return true to keep the message port open for async response
                return true;
            }
            else {
                // Return false for unhandled messages
                return false;
            }
        });
        // 加载 totalDownload
        setTimeout(() => {
            this.restore();
        }, 0);
    }
    async restore() {
        const result = await chrome.storage.local.get(['totalDownload']);
        this.data = result.totalDownload || {};
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
        chrome.storage.local.set({ totalDownload: this.data }, () => {
            // console.log(`更新 ${date} 的下载量: ${this.data[date]} 字节`)
        });
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/ts/background.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TotalDownload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TotalDownload */ "./src/ts/TotalDownload.ts");

// 当点击扩展图标时，显示/隐藏下载面板
chrome.action.onClicked.addListener(function (tab) {
    // 在本程序没有权限的页面上点击扩展图标时，url 始终是 undefined，此时不发送消息
    if (!tab.url) {
        return;
    }
    chrome.tabs.sendMessage(tab.id, {
        msg: 'click_icon',
    });
});
// 当扩展被安装、被更新、或者浏览器升级时，初始化数据
chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({ dlData: {}, batchNo: {} });
});
/**存储每个下载任务的数据。
 *
 * 因为下载完成的顺序和前台发送的顺序可能不一致，所以需要把数据保存起来以供查询 */
let dlData = {};
/**使用每个页面的 tabId 作为索引，储存当前下载任务的批次编号（在该页面里）。用来判断不同批次的下载 */
let batchNo = {};
const fileNameList = new Map();
// 接收下载请求
chrome.runtime.onMessage.addListener(async function (msg, sender) {
    // 接收下载任务
    if (msg.msg === 'send_download') {
        // 当处于初始状态时，或者变量被回收了，就从存储中读取数据储存在变量中
        // 之后每当要使用这两个数据时，从变量读取，而不是从存储中获得。这样就解决了数据不同步的问题，而且性能更高
        if (Object.keys(batchNo).length === 0) {
            const data = await chrome.storage.local.get(['batchNo', 'dlData']);
            batchNo = data.batchNo || {};
            dlData = data.dlData || {};
        }
        const tabId = sender.tab.id;
        // 如果开始了新一批的下载，重设批次编号，清空下载索引
        if (batchNo[tabId] !== msg.taskBatch) {
            batchNo[tabId] = msg.taskBatch;
            chrome.storage.local.set({ batchNo });
        }
        fileNameList.set(msg.fileUrl, msg.fileName);
        // 开始下载
        chrome.downloads.download({
            url: msg.fileUrl,
            filename: msg.fileName,
            conflictAction: 'uniquify',
            saveAs: false,
        }, (id) => {
            // id 是 Chrome 新建立的下载任务的 id
            dlData[id] = {
                url: msg.fileUrl,
                id: msg.id,
                tabId: tabId,
                uuid: false,
                size: -1,
            };
            chrome.storage.local.set({ dlData });
        });
        return false;
    }
    else if (msg.msg === 'save_file_no_replay') {
        // 保存不需要返回下载状态的文件
        chrome.downloads.download({
            url: msg.fileUrl,
            filename: msg.fileName,
            conflictAction: 'overwrite',
            saveAs: false,
        });
    }
});
// 判断文件名是否变成了 UUID 格式。因为文件名处于整个绝对路径的中间，所以没加首尾标记 ^ $
const UUIDRegexp = /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/;
// 监听下载事件
// 每个下载会触发两次 onChanged 事件
chrome.downloads.onChanged.addListener(async function (detail) {
    var _a, _b, _c;
    // 根据 detail.id 取出保存的数据
    // 如果有数据，就是本扩展建立的下载，所以不会监听到非本扩展建立的下载
    let data = dlData[detail.id];
    if (!data) {
        const getData = await chrome.storage.local.get(['dlData']);
        dlData = getData.dlData || {};
        data = dlData[detail.id];
    }
    if (data) {
        let msg = '';
        let err = '';
        // 判断当前文件名是否正常。下载时必定会有一次 detail.filename.current 有值
        if (detail.filename && detail.filename.current) {
            const changedName = detail.filename.current;
            // 文件名是 UUID
            if (changedName.match(UUIDRegexp) !== null) {
                data.uuid = true;
            }
            // 检查文件名是 URL 里最后一段的情况
            // Fanbox 下载器的多数文件是直接把原 URL 发送给浏览器下载的，因此很多时候即使受到其他扩展程序的影响，也不会是 UUID，而是原文件名，例如：
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
            // fileNameList 里储存的预期的文件名示例：
            // fanbox/omutatsu／おむたつ/2025-07-22-🔞7月22日🔞/0.jpeg
            const expectedName = fileNameList.get(data.url);
            if (expectedName) {
                // 取出预期的文件名的最后一部分，上面的文件名的结果是 "0"
                const name = ((_a = expectedName.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]) || '';
                // 取出实际的文件名的最后一部分（注意，即使是与预期一致的文件名，实际上也可能有序号）
                let name2 = '';
                if (changedName.includes('\\')) {
                    name2 = ((_b = changedName.split('\\').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0]) || '';
                }
                else {
                    name2 = ((_c = changedName.split('/').pop()) === null || _c === void 0 ? void 0 : _c.split('.')[0]) || '';
                }
                // 如果实际文件名不是以预期的文件名开头，则说明文件名异常
                if (name2 && name2.startsWith(name) === false) {
                    data.uuid = true;
                }
            }
        }
        if (detail.state && detail.state.current === 'complete') {
            msg = 'downloaded';
            // 下载完成后，查询下载项的体积
            // 查询花费的时间：在下载记录不是很多的情况下，查询耗时多为 2 - 5 ms
            chrome.downloads.search({ id: detail.id }, (results) => {
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
            });
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
            chrome.tabs.sendMessage(data.tabId, { msg, data, err });
            // 清除这个任务的数据
            dlData[detail.id] = null;
            chrome.storage.local.set({ dlData });
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map