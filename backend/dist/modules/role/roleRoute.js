"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoute = void 0;
const express_1 = __importDefault(require("express"));
const roleController_1 = require("./roleController");
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const roleValidation_1 = require("./roleValidation");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const Router = express_1.default.Router();
Router.post('/add', (0, verifyPermission_1.verifyPermission)('role', 'create'), (0, verifyValidate_1.default)(roleValidation_1.roleValidation), roleController_1.addRoleController);
Router.get('/all', (0, verifyPermission_1.verifyPermission)('role', 'read'), roleController_1.getAllRoleController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('role', 'read'), roleController_1.getSingleRoleController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('role', 'update'), (0, verifyValidate_1.default)(roleValidation_1.roleUpdateValidation), roleController_1.updateRoleController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('role', 'delete'), roleController_1.deleteRoleController);
exports.roleRoute = Router;
