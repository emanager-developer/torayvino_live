"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketingTargetRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const marketingTargetController_1 = require("./marketingTargetController");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const marketingTargetValidation_1 = require("./marketingTargetValidation");
const Router = express_1.default.Router();
Router.get('/all', (0, verifyPermission_1.verifyPermission)('marketing-target', 'read'), marketingTargetController_1.getAllMarketingTargetController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('marketing-target', 'create'), (0, verifyValidate_1.default)(marketingTargetValidation_1.marketingTargetValidation), marketingTargetController_1.createMarketingTargetController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('marketing-target', 'read'), marketingTargetController_1.getByIdMarketingTargetController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('marketing-target', 'update'), (0, verifyValidate_1.default)(marketingTargetValidation_1.updateMarketingTargetValidation), marketingTargetController_1.updateMarketingTargetController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('marketing-target', 'delete'), marketingTargetController_1.deleteMarketingTargetController);
exports.marketingTargetRoute = Router;
