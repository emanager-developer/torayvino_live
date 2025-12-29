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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExploreService = exports.updateExploreService = exports.getSingleExploreService = exports.getAllExploreService = exports.addExploreService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const exploreModel_1 = require("./exploreModel");
const addExploreService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exploreModel_1.Explore.create(data);
    return result;
});
exports.addExploreService = addExploreService;
const getAllExploreService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exploreModel_1.Explore.find({});
    return result;
});
exports.getAllExploreService = getAllExploreService;
const getSingleExploreService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exploreModel_1.Explore.findById(id);
    return result;
});
exports.getSingleExploreService = getSingleExploreService;
const updateExploreService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield exploreModel_1.Explore.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Explore not found !');
    const result = yield exploreModel_1.Explore.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateExploreService = updateExploreService;
const deleteExploreService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield exploreModel_1.Explore.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Explore not found !');
    yield exploreModel_1.Explore.findByIdAndDelete(id);
    return true;
});
exports.deleteExploreService = deleteExploreService;
