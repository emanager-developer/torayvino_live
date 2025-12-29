"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadStatusRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const leadStatusController_1 = require("./leadStatusController");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const leadStatusValidation_1 = require("./leadStatusValidation");
const Router = express_1.default.Router();
Router.get('/all', (0, verifyPermission_1.verifyPermission)('leadStatus', 'read'), leadStatusController_1.getAllLeadStatusController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('leadStatus', 'create'), (0, verifyValidate_1.default)(leadStatusValidation_1.leadStatusValidation), leadStatusController_1.createLeadStatusController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('leadStatus', 'read'), leadStatusController_1.getLeadStatusByIdController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('leadStatus', 'update'), (0, verifyValidate_1.default)(leadStatusValidation_1.leadStatusValidation), leadStatusController_1.updateLeadStatusController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('leadStatus', 'delete'), leadStatusController_1.deleteLeadStatusController);
exports.leadStatusRoute = Router;
