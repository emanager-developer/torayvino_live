"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const supportFormValidation_1 = require("./supportFormValidation");
const supportFormController_1 = require("./supportFormController");
Router.post('/add', (0, verifyValidate_1.default)(supportFormValidation_1.supportFormValidation), supportFormController_1.addSupportFormController);
Router.get('/', (0, verifyPermission_1.verifyPermission)('supportForm', 'read'), supportFormController_1.getAllSupportFormController);
Router.get('/phone/:phone', supportFormController_1.getSupportsByCustomerPhoneController);
Router.get('/:id', supportFormController_1.getSingleSupportFormController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('supportForm', 'update'), (0, verifyValidate_1.default)(supportFormValidation_1.updateSupportFormValidation), supportFormController_1.updateSupportFormController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('supportForm', 'delete'), supportFormController_1.deleteSupportFormController);
exports.supportRoute = Router;
