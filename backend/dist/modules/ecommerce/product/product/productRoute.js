"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("./productController");
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const multer_1 = __importDefault(require("multer"));
const Router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Allow images for thumbnail and gallery
        if (file.fieldname === 'thumbnail' || file.fieldname === 'gallery') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        }
        // Allow PDF files for productManual
        else if (file.fieldname === 'productManual') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        }
        else {
            cb(null, true);
        }
    }
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery' },
    { name: 'productManual', maxCount: 1 },
    { name: 'variantImages' },
]);
Router.get('/all', productController_1.getAllProductController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('product', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, productController_1.createProductController);
Router.get('/:id', productController_1.getByIdProductController);
Router.get('/slug/:slug', productController_1.getBySlugProductController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('product', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, productController_1.updateProductController);
Router.patch('/isShow-true/:id', productController_1.trueProductIsShowController);
Router.patch('/update/feature/:id', productController_1.updateProductFeatureController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('product', 'delete'), productController_1.deleteProductController);
exports.productRoute = Router;
