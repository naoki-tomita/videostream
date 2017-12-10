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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var queryStr = location.href.split("?")[1];
var queryObj = {};
queryStr.split("&").map(function (q) { return q.split("="); }).forEach(function (q) { return queryObj[q[0]] = q[1]; });
function query(key) {
    return queryObj[key];
}
exports.query = query;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Video_1 = __webpack_require__(2);
var Comment_1 = __webpack_require__(4);
var App = /** @class */ (function () {
    function App() {
        this.video = new Video_1.Video();
        this.comment = new Comment_1.Comments(this.video);
        this.initEvents();
    }
    App.prototype.initEvents = function () {
        var _this = this;
        var play = document.getElementById("play");
        var playing = false;
        play.addEventListener("click", function () {
            if (playing) {
                _this.video.pause();
                play.innerHTML = "play";
            }
            else {
                _this.video.play();
                play.innerHTML = "pause";
            }
            playing = !playing;
        });
    };
    return App;
}());
window.App = App;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(3);
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        var _this = _super.call(this) || this;
        var id = Query_1.query("id");
        _this.video = document.getElementById("video");
        _this.video.setAttribute("src", "/apis/videos/" + id);
        _this.initEvents();
        return _this;
    }
    Video.prototype.initEvents = function () {
        var _this = this;
        this.video.addEventListener("play", function () {
            _this.dispatch("play");
        });
        this.video.addEventListener("pause", function () {
            _this.dispatch("pause");
        });
    };
    Video.prototype.play = function () {
        this.video.play();
    };
    Video.prototype.pause = function () {
        this.video.pause();
    };
    Video.prototype.now = function () {
        return this.video.currentTime;
    };
    Video.prototype.onPlay = function (cb) {
        this.on("play", cb);
    };
    Video.prototype.onPause = function (cb) {
        this.on("pause", cb);
    };
    return Video;
}(Observable_1.Observable));
exports.Video = Video;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable() {
        this.events = {};
    }
    Observable.prototype.on = function (type, cb) {
        this.events[type] || (this.events[type] = []);
        this.events[type].push(cb);
    };
    Observable.prototype.dispatch = function (type) {
        this.events[type] && this.events[type].forEach(function (e) { return e(); });
    };
    return Observable;
}());
exports.Observable = Observable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = __webpack_require__(0);
var Comments = /** @class */ (function () {
    function Comments(video) {
        this.isPlaying = false;
        this.comment = document.getElementById("comment");
        this.sendBtn = document.getElementById("send");
        this.commentView = new CommentView();
        this.video = video;
        this.initEvents();
    }
    Comments.prototype.initEvents = function () {
        var _this = this;
        this.sendBtn.addEventListener("click", function () {
            var comment = _this.comment.value;
            var currentTime = _this.video.now();
            sendComment(comment, currentTime);
            _this.addComment(comment);
        });
        this.video.onPlay(this.play.bind(this));
        this.video.onPause(this.pause.bind(this));
    };
    Comments.prototype.play = function () {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.polling();
    };
    Comments.prototype.polling = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var comments, now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isPlaying) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, listComment()];
                    case 1:
                        comments = _a.sent();
                        now = this.video.now();
                        comments
                            .filter(function (c) { return (c.time >= now && c.time < now + 0.5); })
                            .forEach(function (c) { return _this.addComment(c.comment); });
                        // bug included...
                        // when click button repeatedly interval less than 500ms, polling will be executed twice time.
                        setTimeout(this.polling.bind(this), 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    Comments.prototype.pause = function () {
        if (!this.isPlaying) {
            return;
        }
        this.isPlaying = false;
    };
    Comments.prototype.addComment = function (comment) {
        this.commentView.addComment(comment);
    };
    return Comments;
}());
exports.Comments = Comments;
var CommentView = /** @class */ (function () {
    function CommentView() {
        this.comments = [];
        var el = document.getElementById("comments");
        this.context = el.getContext("2d");
        this.maxWidth = el.width;
        this.maxHeight = el.height;
        this.animate();
    }
    CommentView.prototype.addComment = function (comment) {
        this.comments.push({
            pos: {
                x: this.maxWidth,
                y: Math.random() * this.maxHeight,
            },
            text: comment,
        });
    };
    CommentView.prototype.render = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.maxWidth, this.maxHeight);
        this.comments.forEach(function (c) { return _this.renderComment(c); });
        this.comments.forEach(function (c) { return c.pos.x -= 1; });
        this.comments = this.comments.filter(function (c) { return c.pos.x >= 0; });
    };
    CommentView.prototype.renderComment = function (comment) {
        this.context.font = "15px メイリオ";
        this.context.strokeStyle = "white";
        this.context.lineWidth = 3;
        this.context.fillStyle = "black";
        this.context.strokeText(comment.text, comment.pos.x, comment.pos.y);
        this.context.fillText(comment.text, comment.pos.x, comment.pos.y);
    };
    CommentView.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    };
    return CommentView;
}());
function sendComment(comment, time) {
    return __awaiter(this, void 0, void 0, function () {
        var id, body, headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Query_1.query("id");
                    body = { comment: comment, time: time };
                    headers = new Headers({ "content-type": "application/json" });
                    return [4 /*yield*/, fetch("/apis/videos/" + id + "/comments", {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(body),
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function listComment() {
    return __awaiter(this, void 0, void 0, function () {
        var id, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Query_1.query("id");
                    return [4 /*yield*/, fetch("/apis/videos/" + id + "/comments")];
                case 1:
                    list = _a.sent();
                    return [4 /*yield*/, list.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}


/***/ })
/******/ ]);