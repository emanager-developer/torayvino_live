"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const bannerController_1 = require("./bannerController");
const fileUploader_1 = require("../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('banner').fields([
    { name: 'image', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 }
]);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('banner', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, bannerController_1.addBannerController);
Router.get('/all', bannerController_1.getAllBannerController);
Router.get('/:id', bannerController_1.getSingleBannerController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('banner', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, bannerController_1.updateBannerController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('banner', 'delete'), bannerController_1.deleteBannerController);
exports.bannerRoute = Router;
