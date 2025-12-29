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
exports.trueTaskIsShowService = exports.deleteTaskService = exports.updateTaskService = exports.getByIdTaskService = exports.getAllTaskService = exports.createTaskService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const taskModel_1 = require("./taskModel");
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const createTaskService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskModel_1.Task.create(data);
    return result;
});
exports.createTaskService = createTaskService;
const getAllTaskService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskQuery = new QueryBuilder_1.default(taskModel_1.Task.find().populate('assignedBy assignedTo', 'name'), query)
        .search(['title', 'description'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TaskQuery.countTotal();
    const data = yield TaskQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllTaskService = getAllTaskService;
const getByIdTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskModel_1.Task.findById(id).populate('assignedBy assignedTo', 'name');
    return result;
});
exports.getByIdTaskService = getByIdTaskService;
const updateTaskService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield taskModel_1.Task.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    const result = yield taskModel_1.Task.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateTaskService = updateTaskService;
const deleteTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskModel_1.Task.findByIdAndDelete(id);
    return result;
});
exports.deleteTaskService = deleteTaskService;
const trueTaskIsShowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield taskModel_1.Task.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    const result = yield taskModel_1.Task.findByIdAndUpdate(id, { isShow: true }, { new: true });
    return result;
});
exports.trueTaskIsShowService = trueTaskIsShowService;
