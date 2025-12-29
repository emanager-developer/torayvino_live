"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const colorController_1 = require("./colorController");
const colorValidation_1 = require("./colorValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('color', 'create'), (0, verifyValidate_1.default)(colorValidation_1.colorValidation), colorController_1.addColorController);
Router.get('/all', colorController_1.getAllColorController);
Router.get('/:id', colorController_1.getSingleColorController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('color', 'update'), (0, verifyValidate_1.default)(colorValidation_1.updateColorValidation), colorController_1.updateColorController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('color', 'delete'), colorController_1.deleteColorController);
exports.colorRoute = Router;
