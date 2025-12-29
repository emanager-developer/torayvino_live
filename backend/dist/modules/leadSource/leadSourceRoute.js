"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadSourceRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const leadSourceController_1 = require("./leadSourceController");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const leadSourceValidation_1 = require("./leadSourceValidation");
const Router = express_1.default.Router();
Router.get('/all', (0, verifyPermission_1.verifyPermission)('leadSource', 'read'), leadSourceController_1.getAllLeadSourceController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('leadSource', 'create'), (0, verifyValidate_1.default)(leadSourceValidation_1.leadSourceValidation), leadSourceController_1.createLeadSourceController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('leadSource', 'read'), leadSourceController_1.getLeadSourceByIdController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('leadSource', 'update'), (0, verifyValidate_1.default)(leadSourceValidation_1.leadSourceValidation), leadSourceController_1.updateLeadSourceController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('leadSource', 'delete'), leadSourceController_1.deleteLeadSourceController);
exports.leadSourceRoute = Router;
