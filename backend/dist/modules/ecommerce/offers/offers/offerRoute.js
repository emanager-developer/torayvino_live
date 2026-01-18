"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoute = void 0;
const express_1 = __importDefault(require("express"));
const offerController_1 = require("./offerController");
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const multerUploader_1 = require("../../../../utils/multerUploader");
const Router = express_1.default.Router();
const upload = (0, multerUploader_1.createUploader)({
    uploadSubdir: 'offers',
    rules: [
        { fieldName: 'thumbnail', allowed: ['image'] },
        { fieldName: 'desktopBanners', allowed: ['image'] },
        { fieldName: 'mobileBanners', allowed: ['image'] },
    ],
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'desktopBanners', maxCount: 10 }, // Allow up to 10 desktop banner images
    { name: 'mobileBanners', maxCount: 10 }, // Allow up to 10 mobile banner images
]);
// Parse JSON data from multipart form
const parseFormData = (req, res, next) => {
    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (_a) {
            // If parsing fails, keep the original body
        }
    }
    next();
};
// Public routes
Router.get('/all', offerController_1.getAllOfferController);
Router.get('/active', offerController_1.getActiveOffersController);
Router.get('/slug/:slug', offerController_1.getBySlugOfferController);
Router.get('/:id', offerController_1.getByIdOfferController);
// Protected routes
Router.post('/add', (0, verifyPermission_1.verifyPermission)('offer', 'create'), upload, parseFormData, offerController_1.createOfferController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('offer', 'update'), upload, parseFormData, offerController_1.updateOfferController);
Router.patch('/toggle-status/:id', (0, verifyPermission_1.verifyPermission)('offer', 'update'), offerController_1.toggleOfferStatusController);
Router.patch('/add-product/:offerId/:productId', (0, verifyPermission_1.verifyPermission)('offer', 'update'), offerController_1.addProductToOfferController);
Router.patch('/remove-product/:offerId/:productId', (0, verifyPermission_1.verifyPermission)('offer', 'update'), offerController_1.removeProductFromOfferController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('offer', 'delete'), offerController_1.deleteOfferController);
exports.offerRoute = Router;
