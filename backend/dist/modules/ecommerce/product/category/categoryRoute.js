"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const categoryController_1 = require("./categoryController");
const fileUploader_1 = require("../../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('category').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('category', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, categoryController_1.addCategoryController);
Router.get('/all', categoryController_1.getAllCategoryController);
Router.get('/:id', categoryController_1.getSingleCategoryController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('category', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, categoryController_1.updateCategoryController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('category', 'delete'), categoryController_1.deleteCategoryController);
exports.categoryRoute = Router;
