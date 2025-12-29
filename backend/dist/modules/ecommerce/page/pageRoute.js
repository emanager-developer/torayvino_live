"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const pageController_1 = require("./pageController");
const pageValidation_1 = require("./pageValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('page', 'create'), (0, verifyValidate_1.default)(pageValidation_1.pageValidation), pageController_1.addPageController);
Router.get('/all', pageController_1.getAllPageController);
Router.get('/:id', pageController_1.getSinglePageController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('page', 'update'), (0, verifyValidate_1.default)(pageValidation_1.updatePageValidation), pageController_1.updatePageController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('page', 'delete'), pageController_1.deletePageController);
exports.pageRoute = Router;
