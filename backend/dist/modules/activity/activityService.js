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
exports.updateNotificationService = exports.getActivityNotificationService = exports.deleteActivityService = exports.updateActivityService = exports.getServiceByIdService = exports.getAllActivityService = exports.createActivityService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const activityModel_1 = require("./activityModel");
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const createActivityService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activityModel_1.Activity.create(data);
    return result;
});
exports.createActivityService = createActivityService;
const getAllActivityService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const activityQuery = new QueryBuilder_1.default(activityModel_1.Activity.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield activityQuery.countTotal();
    const data = yield activityQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllActivityService = getAllActivityService;
const getServiceByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activityModel_1.Activity.findById(id);
    return result;
});
exports.getServiceByIdService = getServiceByIdService;
const updateActivityService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield activityModel_1.Activity.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    const result = yield activityModel_1.Activity.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateActivityService = updateActivityService;
const deleteActivityService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activityModel_1.Activity.findByIdAndDelete(id);
    return result;
});
exports.deleteActivityService = deleteActivityService;
const getActivityNotificationService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activityModel_1.Activity.find({ notification: true });
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No notifications found');
    return result;
});
exports.getActivityNotificationService = getActivityNotificationService;
const updateNotificationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield activityModel_1.Activity.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Notification not found');
    const result = yield activityModel_1.Activity.findByIdAndUpdate(id, { notification: false }, { new: true });
    return result;
});
exports.updateNotificationService = updateNotificationService;
