"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("./productController");
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const multerUploader_1 = require("../../../../utils/multerUploader");
const Router = express_1.default.Router();
const upload = (0, multerUploader_1.createUploader)({
    uploadSubdir: 'product',
    rules: [
        { fieldName: 'thumbnail', allowed: ['image'] },
        { fieldName: 'gallery', allowed: ['image'] },
        { fieldName: 'variantImages', allowed: ['image'] },
        { fieldName: 'productManual', allowed: ['pdf'] },
    ],
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
    { name: 'productManual', maxCount: 1 },
    { name: 'variantImages', maxCount: 20 },
]);
Router.get('/all', productController_1.getAllProductController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('product', 'create'), upload, (req, res, next) => {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.data))
        return next();
    try {
        req.body = JSON.parse(req.body.data);
        return next();
    }
    catch (_b) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid JSON in form-data field: data'));
    }
}, productController_1.createProductController);
Router.get('/:id', productController_1.getByIdProductController);
Router.get('/slug/:slug', productController_1.getBySlugProductController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('product', 'update'), upload, (req, res, next) => {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.data))
        return next();
    try {
        req.body = JSON.parse(req.body.data);
        return next();
    }
    catch (_b) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid JSON in form-data field: data'));
    }
}, productController_1.updateProductController);
Router.patch('/isShow-true/:id', productController_1.trueProductIsShowController);
Router.patch('/update/feature/:id', productController_1.updateProductFeatureController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('product', 'delete'), productController_1.deleteProductController);
exports.productRoute = Router;
