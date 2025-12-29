"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.complaintRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const complainFormValidation_1 = require("./complainFormValidation");
const complainFormController_1 = require("./complainFormController");
Router.post('/add', (0, verifyValidate_1.default)(complainFormValidation_1.complaintFormValidation), complainFormController_1.addComplaintFormController);
Router.get('/', (0, verifyPermission_1.verifyPermission)('complaintForm', 'read'), complainFormController_1.getAllComplaintFormController);
Router.get('/phone/:phone', complainFormController_1.getComplaintsByCustomerPhoneController);
Router.get('/:id', complainFormController_1.getSingleComplaintFormController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('complaintForm', 'update'), (0, verifyValidate_1.default)(complainFormValidation_1.updateComplaintFormValidation), complainFormController_1.updateComplaintFormController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('complaintForm', 'delete'), complainFormController_1.deleteComplaintFormController);
exports.complaintRoute = Router;
