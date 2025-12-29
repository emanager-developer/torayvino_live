"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignBannerRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const campaignBannerController_1 = require("./campaignBannerController");
const fileUploader_1 = require("../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('banner').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('campaignBanner', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, campaignBannerController_1.addCampaignBannerController);
Router.get('/all', campaignBannerController_1.getAllCampaignBannerController);
Router.get('/:id', campaignBannerController_1.getSingleCampaignBannerController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('campaignBanner', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, campaignBannerController_1.updateCampaignBannerController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('campaignBanner', 'delete'), campaignBannerController_1.deleteCampaignBannerController);
exports.campaignBannerRoute = Router;
