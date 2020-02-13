"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var utils_1 = require("./utils");
exports.onCreateWebpackConfig = function (_a, options) {
    var actions = _a.actions, reporter = _a.reporter;
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var setWebpackConfig, include, _b, projectPath, _c, strict, nodeModules, pnpmNodeModules, gatsbyNodeModules, modulePaths, _i, include_1, incName, isDirectory, nodePath, _d, absPath, pkgPath, config;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    setWebpackConfig = actions.setWebpackConfig;
                    include = options.include, _b = options.projectPath, projectPath = _b === void 0 ? process.cwd() : _b, _c = options.strict, strict = _c === void 0 ? true : _c;
                    nodeModules = path.resolve(path.join(projectPath, 'node_modules'));
                    pnpmNodeModules = path.join(nodeModules, '.pnpm', 'node_modules');
                    return [4, utils_1.getPkgNodeModules({ pkgName: 'gatsby', nodeModules: nodeModules, strict: strict })];
                case 1:
                    gatsbyNodeModules = _e.sent();
                    if (!gatsbyNodeModules) {
                        return [2, reporter.panic('[gatsby-plugin-pnpm] You must have Gatsby installed to use this plugin!')];
                    }
                    modulePaths = [
                        'node_modules',
                        nodeModules,
                        gatsbyNodeModules,
                        pnpmNodeModules,
                    ];
                    if (!include) return [3, 7];
                    _i = 0, include_1 = include;
                    _e.label = 2;
                case 2:
                    if (!(_i < include_1.length)) return [3, 7];
                    incName = include_1[_i];
                    isDirectory = /^[./\\]/.test(incName);
                    _d = !isDirectory;
                    if (!_d) return [3, 4];
                    return [4, utils_1.getPkgNodeModules({ pkgName: incName, nodeModules: nodeModules, strict: strict })];
                case 3:
                    _d = (_e.sent());
                    _e.label = 4;
                case 4:
                    nodePath = _d;
                    if (nodePath) {
                        modulePaths.push(nodePath);
                        return [3, 6];
                    }
                    absPath = path.isAbsolute(incName) ? incName : path.join(projectPath, incName);
                    return [4, utils_1.isDir(absPath)];
                case 5:
                    pkgPath = (_e.sent()) && absPath || '';
                    if (pkgPath) {
                        modulePaths.push(absPath);
                        return [3, 6];
                    }
                    reporter.warn("[gatsby-plugin-pnpm] Unable to locate dependency " + incName + "!");
                    _e.label = 6;
                case 6:
                    _i++;
                    return [3, 2];
                case 7:
                    config = {
                        resolve: {
                            modules: modulePaths,
                        },
                        resolveLoader: {
                            modules: modulePaths,
                        },
                    };
                    setWebpackConfig(config);
                    return [2];
            }
        });
    });
};
