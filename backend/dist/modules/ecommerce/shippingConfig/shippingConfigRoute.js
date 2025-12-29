"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingConfigRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const shippingConfigController_1 = require("./shippingConfigController");
const shippingConfigValidation_1 = require("./shippingConfigValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('shippingConfig', 'create'), (0, verifyValidate_1.default)(shippingConfigValidation_1.shippingConfigValidation), shippingConfigController_1.addShippingConfigController);
Router.get('/all', shippingConfigController_1.getAllShippingConfigController);
Router.get('/:id', shippingConfigController_1.getSingleShippingConfigController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('shippingConfig', 'update'), (0, verifyValidate_1.default)(shippingConfigValidation_1.updateShippingConfigValidation), shippingConfigController_1.updateShippingConfigController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('shippingConfig', 'delete'), shippingConfigController_1.deleteShippingConfigController);
exports.shippingConfigRoute = Router;
