"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const customerValidation_1 = require("./customerValidation");
const customerController_1 = require("./customerController");
const fileUploader_1 = require("../../utils/fileUploader");
const Router = express_1.default.Router();
const upload = (0, fileUploader_1.fileUploader)('customer').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('customer', 'create'), (0, verifyValidate_1.default)(customerValidation_1.customerValidation), customerController_1.addCustomerController);
Router.post('/register', customerController_1.registerCustomerController);
Router.post('/verify-and-register', (0, verifyValidate_1.default)(customerValidation_1.verifyPhoneAndRegisterValidation), customerController_1.verifyPhoneAndRegisterController);
Router.post('/login', customerController_1.loginCustomerController);
Router.get('/all', (0, verifyPermission_1.verifyPermission)('customer', 'read'), customerController_1.getAllCustomerController);
Router.get('/:id', 
// verifyPermission('customer', 'read'),
customerController_1.getByIdCustomerController);
Router.get('/phone/:phone', customerController_1.getCustomerByPhoneController);
// Update customer password
Router.patch('/password/:id', 
// verifyPermission('customer', 'update'),
(0, verifyValidate_1.default)(customerValidation_1.updatePasswordValidation), customerController_1.updateCustomerPasswordController);
// Reset password using OTP verification
Router.post('/reset-password', 
// public endpoint: no permission check
(0, verifyValidate_1.default)(customerValidation_1.resetPasswordValidation), customerController_1.resetCustomerPasswordController);
// Update customer profile
Router.put('/update/:id', 
// verifyPermission('customer', 'update'),
(0, verifyValidate_1.default)(customerValidation_1.updateCustomerValidation), customerController_1.updateCustomerProfileController);
Router.patch('/updateImage/:id', upload, 
// verifyPermission('customer', 'update'),
customerController_1.updateCustomerImageController);
Router.patch('/updateActive/:id', 
// verifyPermission('customer', 'update'),
customerController_1.updateCustomerActiveController);
Router.post('/send-sms', customerController_1.sendSMSController);
Router.post('/send-email', customerController_1.sendEmailController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('customer', 'delete'), customerController_1.deleteCustomerController);
exports.customerRoute = Router;
