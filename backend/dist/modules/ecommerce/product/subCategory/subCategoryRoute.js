"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const subCategoryController_1 = require("./subCategoryController");
const subCategoryValidation_1 = require("./subCategoryValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('faq', 'create'), (0, verifyValidate_1.default)(subCategoryValidation_1.subCategoryValidation), subCategoryController_1.addSubCategoryController);
Router.get('/all', subCategoryController_1.getAllSubCategoryController);
Router.get('/:id', subCategoryController_1.getSingleSubCategoryController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('faq', 'update'), (0, verifyValidate_1.default)(subCategoryValidation_1.updateSubCategoryValidation), subCategoryController_1.updateSubCategoryController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('faq', 'delete'), subCategoryController_1.deleteSubCategoryController);
exports.subCategoryRoute = Router;
