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
exports.deleteCampaignBannerService = exports.updateCampaignBannerService = exports.getSingleCampaignBannerService = exports.getAllCampaignBannerService = exports.addCampaignBannerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const campaignBannerModel_1 = require("./campaignBannerModel");
const addCampaignBannerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield campaignBannerModel_1.CampaignBanner.create(data);
    return result;
});
exports.addCampaignBannerService = addCampaignBannerService;
const getAllCampaignBannerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield campaignBannerModel_1.CampaignBanner.find({});
    return result;
});
exports.getAllCampaignBannerService = getAllCampaignBannerService;
const getSingleCampaignBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield campaignBannerModel_1.CampaignBanner.findById(id);
    return result;
});
exports.getSingleCampaignBannerService = getSingleCampaignBannerService;
const updateCampaignBannerService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield campaignBannerModel_1.CampaignBanner.findById(id);
    if (!isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data === null || data === void 0 ? void 0 : data.image}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'CampaignBanner not found !');
    }
    const result = yield campaignBannerModel_1.CampaignBanner.findByIdAndUpdate(id, data, {
        new: true,
    });
    if (result && (data === null || data === void 0 ? void 0 : data.image))
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return result;
});
exports.updateCampaignBannerService = updateCampaignBannerService;
const deleteCampaignBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield campaignBannerModel_1.CampaignBanner.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'CampaignBanner not found !');
    }
    const result = yield campaignBannerModel_1.CampaignBanner.findByIdAndDelete(id);
    if (result)
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return true;
});
exports.deleteCampaignBannerService = deleteCampaignBannerService;
