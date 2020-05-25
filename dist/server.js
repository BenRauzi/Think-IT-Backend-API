(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/app.ts":
/*!***********************!*\
  !*** ./server/app.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./server/services/index.ts");





var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express__WEBPACK_IMPORTED_MODULE_0__();
        this.port = port;
        this.init = new _services__WEBPACK_IMPORTED_MODULE_4__["InitService"]();
        this.initializeMiddleware();
        this.initializeServer();
        this.initializeControllers(controllers);
    }
    App.prototype.initializeMiddleware = function () {
        this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_2__["urlencoded"]({ extended: true }));
        this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_2__["json"]());
        this.app.use(cors__WEBPACK_IMPORTED_MODULE_1__({
            origin: 'http://localhost:4200'
        }));
        console.log("setup origin: http://localhost:4200");
    };
    App.prototype.initializeServer = function () {
        var _this = this;
        var config = {
            user: 'SwishAdmin',
            password: 'Windyrain1',
            server: 'swishblaqstudioserver.database.windows.net',
            database: 'ValorantLFG',
            encrypt: true
        };
        mssql__WEBPACK_IMPORTED_MODULE_3__["connect"](config, function (err) {
            if (err) {
                console.log(err);
            }
            _this.init.noticesTimeout();
        });
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/api', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server started on port " + _this.port);
        });
    };
    return App;
}());
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./server/controllers/AuthController.ts":
/*!**********************************************!*\
  !*** ./server/controllers/AuthController.ts ***!
  \**********************************************/
/*! exports provided: AuthController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthController", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services */ "./server/services/index.ts");



var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.router = express__WEBPACK_IMPORTED_MODULE_1__["Router"]();
        this.authenticate = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                authToken = req.headers.authorization;
                if (this.auth.isExpired(authToken)) {
                    res.json({ msg: 'Token Expired' });
                }
                else {
                    res.json({ msg: 'Token Cleared' });
                }
                return [2 /*return*/];
            });
        }); };
        this.intializeRoutes();
        this.auth = new _services__WEBPACK_IMPORTED_MODULE_2__["AuthService"]();
    }
    AuthController.prototype.intializeRoutes = function () {
        this.router.post('/authenticate', this.authenticate);
    };
    return AuthController;
}());



/***/ }),

/***/ "./server/controllers/NoticesController.ts":
/*!*************************************************!*\
  !*** ./server/controllers/NoticesController.ts ***!
  \*************************************************/
/*! exports provided: NoticesController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticesController", function() { return NoticesController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services */ "./server/services/index.ts");




var NoticesController = /** @class */ (function () {
    function NoticesController() {
        var _this = this;
        this.router = express__WEBPACK_IMPORTED_MODULE_1__["Router"]();
        this.playerJoined = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var request, RiotID, PlayersNeeded, Activity, Language, NeedMic, PNeeded, PlayersNeededs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                console.log("player has joined a team!");
                RiotID = req.body.RiotID;
                PlayersNeeded = req.body.PlayersNeeded;
                Activity = req.body.Activity;
                Language = req.body.Language;
                NeedMic = req.body.NeedMic;
                PNeeded = Number(req.body.PlayersNeeded) - 1;
                PlayersNeededs = String(PNeeded);
                request.query("DELETE FROM lfgrequests WHERE CONVERT (VARCHAR, RiotID)='" + RiotID + "'", function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (PNeeded !== 0) {
                        console.log("Minusing 1");
                        request.query("insert into lfgrequests(RiotID, PlayersNeeded, Activity, Language, NeedMic) values('" + RiotID + "','" + PlayersNeededs + "','" + Activity + "','" + Language + "','" + NeedMic + "')", function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    else {
                        console.log("team Full");
                    }
                    res.json({ msg: 'Notice Created' });
                });
                return [2 /*return*/];
            });
        }); };
        this.Minus1 = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var request, RiotID, PNeeded, Activity, Language, NeedMic, PlayersNeeded;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log("recieved Minus1 request");
                request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                RiotID = req.body.RiotID;
                PNeeded = Number(req.body.PlayersNeeded) - 1;
                Activity = req.body.Activity;
                Language = req.body.Language;
                NeedMic = req.body.NeedMic;
                PlayersNeeded = String(PNeeded);
                if (PNeeded != 0) {
                    // tslint:disable-next-line: max-line-length
                    request.query("insert into lfgrequests(RiotID, PlayersNeeded, Activity, Language, NeedMic) values('" + RiotID + "','" + PlayersNeeded + "','" + Activity + "','" + Language + "','" + NeedMic + "')", function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        res.json({ msg: 'Notice Created' });
                    });
                }
                else {
                    console.log("team Full");
                }
                return [2 /*return*/];
            });
        }); };
        this.addNotice = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var request, RiotID, PlayersNeeded, Activity, Language, NeedMic;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log("recieved Addnotice request");
                request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                RiotID = req.body.RiotID;
                PlayersNeeded = req.body.PlayersNeeded;
                Activity = req.body.Activity;
                Language = req.body.Language;
                NeedMic = req.body.NeedMic;
                // tslint:disable-next-line: max-line-length
                request.query("insert into lfgrequests(RiotID, PlayersNeeded, Activity, Language, NeedMic) values('" + RiotID + "','" + PlayersNeeded + "','" + Activity + "','" + Language + "','" + NeedMic + "')", function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({ msg: 'Notice Created' });
                });
                return [2 /*return*/];
            });
        }); };
        this.getNotices = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log("recieved Getnotice request");
                request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                request.query("select * from lfgrequests", function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    res.send(result.recordset);
                });
                return [2 /*return*/];
            });
        }); };
        console.log("InitializedRoutes '/notices'");
        this.intializeRoutes();
        this.auth = new _services__WEBPACK_IMPORTED_MODULE_3__["AuthService"]();
    }
    NoticesController.prototype.intializeRoutes = function () {
        this.router.post('/notices', this.addNotice);
        this.router.get('/notices', this.getNotices);
        this.router.post('/playerjoined', this.playerJoined);
        console.log("InitializedRoutes '/notices'");
    };
    return NoticesController;
}());



/***/ }),

/***/ "./server/controllers/StudentController.ts":
/*!*************************************************!*\
  !*** ./server/controllers/StudentController.ts ***!
  \*************************************************/
/*! exports provided: StudentController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentController", function() { return StudentController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services */ "./server/services/index.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);





var StudentController = /** @class */ (function () {
    function StudentController() {
        var _this = this;
        this.router = express__WEBPACK_IMPORTED_MODULE_1__["Router"]();
        this.getStudentNames = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Teacher')];
                    case 1:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            request.query("SELECT Name, UserID FROM Users WHERE AccountType = 'Student'", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                res.send(result.recordset);
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        res.send(401);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStudentInfo = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Teacher')];
                    case 1:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            request.query("SELECT * FROM StudentInfo", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                res.send(result.recordset);
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        res.send(401);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStudentDetailsAsStudent = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, request, token, UUID;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Student')];
                    case 1:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            token = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"])(authToken, "to_be_replaced");
                            UUID = token.userId;
                            request.query("select * from StudentDetails WHERE UUID = '" + UUID + "'", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                if (result.rowsAffected !== 0) {
                                    res.send(result.recordset[0]);
                                }
                                else {
                                    // error
                                }
                            });
                        }
                        else {
                            res.send(401);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        res.send(401);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStudentDetailsAsAdmin = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, userId, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        userId = req.body.userId;
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Administrator')];
                    case 1:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            request.query("select * from StudentDetails WHERE UUID = '" + userId + "'", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                res.send(result.recordset[0]);
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        res.send(401);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.replaceStudentDetails = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, student, userId, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        student = req.body;
                        userId = student.UUID;
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Administrator')];
                    case 1:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            // tslint:disable-next-line: max-line-length
                            request.query("update StudentDetails set FirstName = '" + student.FirstName + "', ForeNames = '" + student.ForeNames + "', LastName = '" + student.LastName + "', DateOfBirth = '" + student.DateOfBirth + "', NSN = '" + student.NSN + "', HomePhone = '" + student.HomePhone + "', PhysicalUnitNo = '" + student.PhysicalUnitNo + "', PhysicalNumber = '" + student.PhysicalNumber + "', PhysicalStreet = '" + student.PhysicalStreet + "', PhysicalRuralDelivery = '" + student.PhysicalRuralDelivery + "', PhysicalSuburb = '" + student.PhysicalSuburb + "', PhysicalPostcode = '" + student.PhysicalPostcode + "', PostalUnitNo = '" + student.PostalUnitNo + "', PostalNumber = '" + student.PostalNumber + "', PostalStreet = '" + student.PostalStreet + "', PostalRuralDelivery = '" + student.PostalRuralDelivery + "', PostalSuburb = '" + student.PostalSuburb + "', PostalPostcode = '" + student.PostalPostcode + "', CaregiverOneRelationship = '" + student.CaregiverOneRelationship + "', CaregiverOneName = '" + student.CaregiverOneName + "', CaregiverOneAddress = '" + student.CaregiverOneAddress + "', CaregiverOneHomePhone = '" + student.CaregiverOneHomePhone + "', CaregiverOneMobilePhone = '" + student.CaregiverOneMobilePhone + "', CaregiverOneOccupation = '" + student.CaregiverOneOccupation + "', CaregiverOneWorkPhone = '" + student.CaregiverOneWorkPhone + "', CaregiverOneEmail = '" + student.CaregiverOneEmail + "', CaregiverTwoRelationship = '" + student.CaregiverTwoRelationship + "', CaregiverTwoName = '" + student.CaregiverTwoName + "', CaregiverTwoAddress = '" + student.CaregiverTwoAddress + "', CaregiverTwoHomePhone = '" + student.CaregiverTwoHomePhone + "', CaregiverTwoMobilePhone = '" + student.CaregiverTwoMobilePhone + "', CaregiverTwoOccupation = '" + student.CaregiverTwoOccupation + "', CaregiverTwoWorkPhone = '" + student.CaregiverTwoWorkPhone + "', CaregiverTwoEmail = '" + student.CaregiverTwoEmail + "', EmergencyContactRelationship = '" + student.EmergencyContactRelationship + "', EmergencyContactName = '" + student.EmergencyContactName + "', EmergencyContactAddress = '" + student.EmergencyContactAddress + "', EmergencyContactHomePhone = '" + student.EmergencyContactHomePhone + "', EmergencyContactMobilePhone = '" + student.EmergencyContactMobilePhone + "', EmergencyContactOccupation = '" + student.EmergencyContactOccupation + "', EmergencyContactWorkPhone = '" + student.EmergencyContactWorkPhone + "' where UUID = '" + userId + "'", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                res.send(result);
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        res.send(401);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getNCEACreditAmounts = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, user, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        return [4 /*yield*/, this.auth.getUserByToken(authToken)];
                    case 1:
                        user = _a.sent();
                        if (!!this.auth.isExpired(authToken)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.auth.isPermitted(authToken, 'Student')];
                    case 2:
                        if (_a.sent()) {
                            request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            // tslint:disable-next-line: max-line-length
                            request.query("SELECT LevelOneNotAchieved, LevelOneAchieved, LevelOneMerit, LevelOneExcellence, LevelTwoNotAchieved, LevelTwoAchieved, LevelTwoMerit, LevelTwoExcellence, LevelThreeNotAchieved, LevelThreeAchieved, LevelThreeMerit, LevelThreeExcellence FROM StudentInfo WHERE uuid = '" + user.UserID + "'", function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                if (result.recordset.length === 1) {
                                    var recordset = result.recordset[0];
                                    var notachieved = recordset.LevelOneNotAchieved + recordset.LevelTwoNotAchieved + recordset.LevelThreeNotAchieved;
                                    var achieved = recordset.LevelOneAchieved + recordset.LevelTwoAchieved + recordset.LevelThreeAchieved;
                                    var merit = recordset.LevelOneMerit + recordset.LevelTwoMerit + recordset.LevelThreeMerit;
                                    var excellence = recordset.LevelOneExcellence + recordset.LevelTwoExcellence + recordset.LevelThreeExcellence;
                                    res.send({ notachieved: notachieved, achieved: achieved, merit: merit, excellence: excellence });
                                }
                                else {
                                    res.send(result);
                                }
                            });
                            // res.send({excellence: 6, merit: 5, achieved: 4, notachieved: 3});
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.intializeRoutes();
        this.auth = new _services__WEBPACK_IMPORTED_MODULE_3__["AuthService"]();
    }
    StudentController.prototype.intializeRoutes = function () {
        this.router.get('/student/studentInfo', this.getStudentInfo);
        this.router.get('/student/names', this.getStudentNames);
        this.router.get('/student/details', this.getStudentDetailsAsStudent);
        this.router.post('/student/details', this.getStudentDetailsAsAdmin);
        this.router.put('/student/details', this.replaceStudentDetails);
        this.router.get('/student/credits/totals', this.getNCEACreditAmounts);
    };
    return StudentController;
}());



/***/ }),

/***/ "./server/controllers/UserController.ts":
/*!**********************************************!*\
  !*** ./server/controllers/UserController.ts ***!
  \**********************************************/
/*! exports provided: UserController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserController", function() { return UserController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services */ "./server/services/index.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);






var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.router = express__WEBPACK_IMPORTED_MODULE_1__["Router"]();
        this.getUserByToken = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, user;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        return [4 /*yield*/, this.auth.getUserByToken(authToken)];
                    case 1:
                        user = _a.sent();
                        res.json({ role: user.AccountType });
                        return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var Username, Password, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                Username = req.body.username;
                Password = req.body.password;
                request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                request.query("select * from Users where Username = '" + Username + "'", function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.rowsAffected[0] !== 0) {
                        var user = result.recordset[0];
                        if (user.Password.trim() === Password) {
                            var userID = user.UserID;
                            var role = user.AccountType;
                            var username = user.Username;
                            var jwtToken = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["sign"])({ userId: userID }, "to_be_replaced", { expiresIn: '1h' });
                            res.json({ token: jwtToken, user: { username: username, role: role } });
                        }
                        else {
                            res.send({ msg: 'Password incorrect' });
                        }
                    }
                    else {
                        res.send({ msg: 'User not found!' });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.ping = function (req, res) {
            res.json({ msg: 'pong' });
        };
        this.register = function (req, res) {
            var username = req.body.username;
            var name = req.body.name;
            var password = req.body.password;
            var role = req.body.role;
            var userId = uuid__WEBPACK_IMPORTED_MODULE_5__();
            var request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
            request.query("select * from Users where Username = '" + username + "' OR Name = '" + name + "'", function (err, recordset) {
                if (err) {
                    console.log(err);
                }
                if (recordset.rowsAffected == 0) {
                    // tslint:disable-next-line: max-line-length
                    request.query("insert into Users (\"Username\", \"Name\", \"Password\", \"AccountType\", \"UserID\") values ('" + username + "', '" + name + "', '" + password + "', '" + role + "', '" + userId + "');", function (err2, result) {
                        if (err2) {
                            console.log(err2);
                        }
                        console.log(result);
                        if (role === 'Student') {
                            var request2 = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            request2.query("insert into StudentDetails (\"UUID\") values ('" + userId + "')", function (err3, result2) {
                                if (err3) {
                                    console.log(err3);
                                }
                                console.log(result2);
                            });
                            var request3 = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                            // tslint:disable-next-line: max-line-length
                            request3.query("insert into StudentInfo (\"LevelOneNotAchieved\", \"LevelOneAchieved\", \"LevelOneMerit\", \"LevelOneExcellence\", \"LevelTwoNotAchieved\", \"LevelTwoAchieved\", \"LevelTwoMerit\", \"LevelTwoExcellence\", \"LevelThreeNotAchieved\", \"LevelThreeAchieved\", \"LevelThreeMerit\", \"LevelThreeExcellence\", \"uuid\") values ('" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + 0 + "', '" + userId + "')", function (err4, result3) {
                                if (err4) {
                                    console.log(err4);
                                }
                                console.log(result3);
                            });
                        }
                        res.json({ msg: 'Register Successful' });
                    });
                }
                else {
                    res.json({ msg: 'User already exists!' });
                }
            });
        };
        this.getProfileImage = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, user, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        return [4 /*yield*/, this.auth.getUserByToken(authToken)];
                    case 1:
                        user = _a.sent();
                        request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                        request.query("SELECT ProfileImage FROM Users WHERE UserID = '" + user.UserID + "'", function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            res.json({ image: "" + result.recordset[0].ProfileImage });
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.updateProfileImage = function (req, res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var authToken, imageDetails, user, request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authToken = req.headers.authorization;
                        imageDetails = req.body.image;
                        return [4 /*yield*/, this.auth.getUserByToken(authToken)];
                    case 1:
                        user = _a.sent();
                        request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                        request.query("UPDATE Users set ProfileImage = '" + imageDetails + "' WHERE UserID = '" + user.UserID + "'", function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            res.send(result);
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.intializeRoutes();
        this.auth = new _services__WEBPACK_IMPORTED_MODULE_4__["AuthService"]();
    }
    UserController.prototype.intializeRoutes = function () {
        this.router.get('/ping', this.ping);
        this.router.post('/login', this.login);
        this.router.get('/getuser', this.getUserByToken);
        this.router.post('/register', this.register);
        this.router.get('/profileimage', this.getProfileImage);
        this.router.put('/profileimage', this.updateProfileImage);
    };
    return UserController;
}());



/***/ }),

/***/ "./server/controllers/index.ts":
/*!*************************************!*\
  !*** ./server/controllers/index.ts ***!
  \*************************************/
/*! exports provided: UserController, AuthController, NoticesController, StudentController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserController */ "./server/controllers/UserController.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserController", function() { return _UserController__WEBPACK_IMPORTED_MODULE_0__["UserController"]; });

/* harmony import */ var _AuthController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AuthController */ "./server/controllers/AuthController.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthController", function() { return _AuthController__WEBPACK_IMPORTED_MODULE_1__["AuthController"]; });

/* harmony import */ var _NoticesController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoticesController */ "./server/controllers/NoticesController.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoticesController", function() { return _NoticesController__WEBPACK_IMPORTED_MODULE_2__["NoticesController"]; });

/* harmony import */ var _StudentController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StudentController */ "./server/controllers/StudentController.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StudentController", function() { return _StudentController__WEBPACK_IMPORTED_MODULE_3__["StudentController"]; });







/***/ }),

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./server/app.ts");
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers */ "./server/controllers/index.ts");


var app = new _app__WEBPACK_IMPORTED_MODULE_0__["default"]([
    new _controllers__WEBPACK_IMPORTED_MODULE_1__["UserController"](),
    new _controllers__WEBPACK_IMPORTED_MODULE_1__["AuthController"](),
    new _controllers__WEBPACK_IMPORTED_MODULE_1__["NoticesController"](),
    new _controllers__WEBPACK_IMPORTED_MODULE_1__["StudentController"]()
], 3000);
console.log("serverscript run");
app.listen();


/***/ }),

/***/ "./server/services/authService.ts":
/*!****************************************!*\
  !*** ./server/services/authService.ts ***!
  \****************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_2__);



var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.isExpired = function (token) {
        try {
            Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"])(token, "to_be_replaced");
        }
        catch (TokenExpiredError) {
            return true;
        }
        return false;
    };
    AuthService.prototype.isPermitted = function (token, requestedRole) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var user;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getUserByToken(token)];
                                case 1:
                                    user = _a.sent();
                                    if (user.AccountType === requestedRole) {
                                        resolve(true);
                                    }
                                    else if (user.AccountType === 'Administrator') {
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AuthService.prototype.getUserByToken = function (token) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var verifiedToken;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                verifiedToken = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"])(token, "to_be_replaced");
                // tslint:disable-next-line: max-line-length
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = new mssql__WEBPACK_IMPORTED_MODULE_2__["Request"]();
                        request.query("select * from Users where UserID = '" + verifiedToken.userId + "'", function (err, recordset) {
                            if (err) {
                                console.log(err);
                            }
                            if (recordset.rowsAffected[0] !== 0) {
                                var result = recordset.recordset[0];
                                return resolve(result);
                            }
                            else {
                                return reject('Error!');
                            }
                        });
                    })];
            });
        });
    };
    return AuthService;
}());



/***/ }),

/***/ "./server/services/index.ts":
/*!**********************************!*\
  !*** ./server/services/index.ts ***!
  \**********************************/
/*! exports provided: AuthService, InitService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authService */ "./server/services/authService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return _authService__WEBPACK_IMPORTED_MODULE_0__["AuthService"]; });

/* harmony import */ var _initService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initService */ "./server/services/initService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InitService", function() { return _initService__WEBPACK_IMPORTED_MODULE_1__["InitService"]; });





/***/ }),

/***/ "./server/services/initService.ts":
/*!****************************************!*\
  !*** ./server/services/initService.ts ***!
  \****************************************/
/*! exports provided: InitService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitService", function() { return InitService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mssql */ "mssql");
/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_1__);


var InitService = /** @class */ (function () {
    function InitService() {
    }
    InitService.prototype.noticesTimeout = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var request;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                request = new mssql__WEBPACK_IMPORTED_MODULE_1__["Request"]();
                request.query("SELECT * FROM lfgrequests", function (err, result) {
                    console.log(result);
                    var recordset = result.recordset;
                    if (err) {
                        console.log(err);
                    }
                    var _loop_1 = function (record) {
                        if (record.enddate !== null) {
                            setTimeout(function () {
                                new mssql__WEBPACK_IMPORTED_MODULE_1__["Request"]().query("DELETE FROM lfgrequests WHERE enddate='" + record.enddate + "'", function (err2, result2) {
                                    if (err2) {
                                        console.log(err2);
                                    }
                                    console.log(result2);
                                });
                            }, (new Date(record.enddate).getTime() - new Date().getTime()));
                        }
                    };
                    for (var _i = 0, recordset_1 = recordset; _i < recordset_1.length; _i++) {
                        var record = recordset_1[_i];
                        _loop_1(record);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return InitService;
}());



/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./server/server ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./server/server */"./server/server.ts");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mssql":
/*!************************!*\
  !*** external "mssql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mssql");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ })));
//# sourceMappingURL=server.map