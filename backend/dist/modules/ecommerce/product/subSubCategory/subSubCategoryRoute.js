"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subSubCategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const subSubCategoryController_1 = require("./subSubCategoryController");
const subSubCategoryValidation_1 = require("./subSubCategoryValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('faq', 'create'), (0, verifyValidate_1.default)(subSubCategoryValidation_1.subSubCategoryValidation), subSubCategoryController_1.addSubSubCategoryController);
Router.get('/all', subSubCategoryController_1.getAllSubSubCategoryController);
Router.get('/:id', subSubCategoryController_1.getSingleSubSubCategoryController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('faq', 'update'), (0, verifyValidate_1.default)(subSubCategoryValidation_1.updateSubSubCategoryValidation), subSubCategoryController_1.updateSubSubCategoryController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('faq', 'delete'), subSubCategoryController_1.deleteSubSubCategoryController);
exports.subSubCategoryRoute = Router;
