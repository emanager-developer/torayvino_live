"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const brandController_1 = require("./brandController");
const fileUploader_1 = require("../../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('brand').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('brand', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, brandController_1.addBrandController);
Router.get('/all', brandController_1.getAllBrandController);
Router.get('/:id', brandController_1.getSingleBrandController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('brand', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, brandController_1.updateBrandController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('brand', 'delete'), brandController_1.deleteBrandController);
exports.brandRoute = Router;
