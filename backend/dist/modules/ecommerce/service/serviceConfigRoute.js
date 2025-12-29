"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceConfigRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const serviceConfigValidation_1 = require("./serviceConfigValidation");
const serviceConfigController_1 = require("./serviceConfigController");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('serviceConfig', 'create'), (0, verifyValidate_1.default)(serviceConfigValidation_1.serviceConfigValidation), serviceConfigController_1.addServiceConfigController);
Router.get('/all', serviceConfigController_1.getAllServiceConfigController);
Router.get('/:id', serviceConfigController_1.getSingleServiceConfigController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('serviceConfig', 'update'), (0, verifyValidate_1.default)(serviceConfigValidation_1.updateServiceConfigValidation), serviceConfigController_1.updateServiceConfigController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('serviceConfig', 'delete'), serviceConfigController_1.deleteServiceConfigController);
exports.serviceConfigRoute = Router;
