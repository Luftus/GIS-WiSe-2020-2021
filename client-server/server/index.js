"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.A08Server = void 0;
var Http = __importStar(require("http"));
var Mongo = require('mongodb');
var DB_NAME = 'luft';
var mongoClient = null;
var users = null;
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    var port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    mongoDbConnect();
    var server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function mongoDbConnect() {
        return __awaiter(this, void 0, void 0, function () {
            var uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "mongodb+srv://GISWISE2021:GISWISE2021@cluster0.qcexn.mongodb.net/<dbname>?retryWrites=true&w=majority";
                        mongoClient = new Mongo.MongoClient(uri, { useNewUrlParser: true });
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1:
                        _a.sent();
                        users = mongoClient.db(DB_NAME).collection("users");
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleListen() {
        console.log("Listening");
    }
    function register(request) {
        return __awaiter(this, void 0, void 0, function () {
            var vorname, nachname, psw, email, userArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vorname = request.get('vorname');
                        nachname = request.get('nachname');
                        psw = request.get('psw');
                        email = request.get('email');
                        //check if data is correct
                        if (!vorname || !nachname || !psw || !email) {
                            return [2 /*return*/, "error"];
                        }
                        return [4 /*yield*/, users.find({ email: email }).toArray()];
                    case 1:
                        userArray = _a.sent();
                        if (userArray && userArray.length > 0) {
                            return [2 /*return*/, "already_existing"];
                        }
                        if (!users) {
                            return [2 /*return*/, "error"];
                        }
                        //insert document
                        return [4 /*yield*/, users.insertOne({ vorname: vorname, nachname: nachname, password: psw, email: email })];
                    case 2:
                        //insert document
                        _a.sent();
                        return [2 /*return*/, "success: user_created"];
                }
            });
        });
    }
    function login(request) {
        return __awaiter(this, void 0, void 0, function () {
            var psw, email, userArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        psw = request.get('psw');
                        email = request.get('email');
                        if (!psw || !email) {
                            return [2 /*return*/, "error"];
                        }
                        return [4 /*yield*/, users.find({ email: email, password: psw }).toArray()];
                    case 1:
                        userArray = _a.sent();
                        if (userArray && userArray.length > 0) {
                            return [2 /*return*/, "success"];
                        }
                        return [2 /*return*/, "not_existing"];
                }
            });
        });
    }
    function getUserlist() {
        return __awaiter(this, void 0, void 0, function () {
            var userArray, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!users) {
                            return [2 /*return*/, ""];
                        }
                        return [4 /*yield*/, users.find({}).toArray()];
                    case 1:
                        userArray = _a.sent();
                        names = [];
                        userArray.forEach(function (entry) {
                            names.push(entry.vorname + " " + entry.nachname);
                        });
                        return [2 /*return*/, names.join('<br/>')];
                }
            });
        });
    }
    function evaluateResponse(url, request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(url);
                        response = '';
                        if (!url.startsWith('/register')) return [3 /*break*/, 2];
                        data = new URLSearchParams(url.replace('/register', ''));
                        return [4 /*yield*/, register(data)];
                    case 1:
                        response = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!url.startsWith('/login')) return [3 /*break*/, 4];
                        data = new URLSearchParams(url.replace('/login', ''));
                        return [4 /*yield*/, login(data)];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!url.startsWith('/userlist')) return [3 /*break*/, 6];
                        return [4 /*yield*/, getUserlist()];
                    case 5:
                        response = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, response];
                }
            });
        });
    }
    function handleRequest(_request, _response) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("I hear voices!", _request.url);
                        return [4 /*yield*/, evaluateResponse(_request.url, _request)];
                    case 1:
                        response = _a.sent();
                        _response.setHeader("content-type", "text/html; charset=utf-8");
                        _response.setHeader("Access-Control-Allow-Origin", "*");
                        _response.write(response);
                        _response.end();
                        return [2 /*return*/];
                }
            });
        });
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
