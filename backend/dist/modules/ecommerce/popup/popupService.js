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
exports.deletePopupService = exports.togglePopupStatusService = exports.updatePopupService = exports.getPopupByIdService = exports.getActivePopupService = exports.getPopupsService = exports.addPopupService = void 0;
const popupModel_1 = require("./popupModel");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const addPopupService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // If creating an active popup, deactivate all other popups
    if (data.isActive === true) {
        yield popupModel_1.Popup.updateMany({}, { isActive: false });
    }
    const result = yield popupModel_1.Popup.create(data);
    return result;
});
exports.addPopupService = addPopupService;
const getPopupsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield popupModel_1.Popup.find().sort({ createdAt: -1 });
    return result;
});
exports.getPopupsService = getPopupsService;
const getActivePopupService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield popupModel_1.Popup.findOne({ isActive: true });
    return result;
});
exports.getActivePopupService = getActivePopupService;
const getPopupByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield popupModel_1.Popup.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Popup not found!');
    }
    return result;
});
exports.getPopupByIdService = getPopupByIdService;
const updatePopupService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield popupModel_1.Popup.findById(id);
    if (!isExist) {
        if (data.image) {
            (0, deleteFile_1.deleteFile)(`./uploads/${data.image}`);
        }
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Popup not found!');
    }
    // If setting this popup as active, deactivate others
    if (data.isActive === true) {
        yield popupModel_1.Popup.updateMany({ _id: { $ne: id } }, { isActive: false });
    }
    const result = yield popupModel_1.Popup.findByIdAndUpdate(id, data, { new: true });
    // Delete old image if a new one is uploaded
    if ((result === null || result === void 0 ? void 0 : result.image) && (data === null || data === void 0 ? void 0 : data.image) && (isExist === null || isExist === void 0 ? void 0 : isExist.image) && data.image !== isExist.image) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    }
    return result;
});
exports.updatePopupService = updatePopupService;
const togglePopupStatusService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const popup = yield popupModel_1.Popup.findById(id);
    if (!popup) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Popup not found!');
    }
    // If activating this popup, deactivate all others
    if (!popup.isActive) {
        yield popupModel_1.Popup.updateMany({ _id: { $ne: id } }, { isActive: false });
    }
    const result = yield popupModel_1.Popup.findByIdAndUpdate(id, { isActive: !popup.isActive }, { new: true });
    return result;
});
exports.togglePopupStatusService = togglePopupStatusService;
const deletePopupService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield popupModel_1.Popup.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Popup not found!');
    }
    const result = yield popupModel_1.Popup.findByIdAndDelete(id);
    // Delete the associated image file
    if (isExist === null || isExist === void 0 ? void 0 : isExist.image) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist.image}`);
    }
    return result;
});
exports.deletePopupService = deletePopupService;
