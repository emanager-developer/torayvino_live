"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsConfigRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const smsConfigController_1 = require("./smsConfigController");
const smsConfigValidation_1 = require("./smsConfigValidation");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const Router = express_1.default.Router();
Router.get('/', (0, verifyPermission_1.verifyPermission)('SMSConfig', 'read'), smsConfigController_1.getSMSConfigController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('SMSConfig', 'create'), (0, verifyValidate_1.default)(smsConfigValidation_1.smsConfigValidation), smsConfigController_1.createSMSConfigController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('SMSConfig', 'update'), smsConfigController_1.updateSMSConfigController);
exports.smsConfigRoute = Router;
