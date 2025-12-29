"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadPurposeRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const leadPurposeController_1 = require("./leadPurposeController");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const leadPurposeValidation_1 = require("./leadPurposeValidation");
const Router = express_1.default.Router();
Router.get('/all', (0, verifyPermission_1.verifyPermission)('leadPurpose', 'read'), leadPurposeController_1.getAllLeadPurposeController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('leadPurpose', 'create'), (0, verifyValidate_1.default)(leadPurposeValidation_1.leadPurposeValidation), leadPurposeController_1.createLeadPurposeController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('leadPurpose', 'read'), leadPurposeController_1.getLeadPurposeByIdController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('leadPurpose', 'update'), (0, verifyValidate_1.default)(leadPurposeValidation_1.leadPurposeValidation), leadPurposeController_1.updateLeadPurposeController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('leadPurpose', 'delete'), leadPurposeController_1.deleteLeadPurposeController);
exports.leadPurposeRoute = Router;
