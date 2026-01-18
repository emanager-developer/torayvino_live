"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashDealRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const flashDealController_1 = require("./flashDealController");
const flashDealValidation_1 = require("./flashDealValidation");
// Public
Router.get('/active', flashDealController_1.getActiveFlashDealController);
// Admin / dashboard (frontend uses these endpoints)
Router.post('/add-flashDeal', (0, verifyPermission_1.verifyPermission)('flash-deal', 'create'), (0, verifyValidate_1.default)(flashDealValidation_1.flashDealValidation), flashDealController_1.addFlashDealController);
Router.get('/all', (0, verifyPermission_1.verifyPermission)('flash-deal', 'read'), flashDealController_1.getAllFlashDealController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('flash-deal', 'read'), flashDealController_1.getFlashDealByIdController);
Router.patch('/update-status/:id', (0, verifyPermission_1.verifyPermission)('flash-deal', 'update'), flashDealController_1.updateFlashDealstatusController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('flash-deal', 'update'), (0, verifyValidate_1.default)(flashDealValidation_1.updateFlashDealValidation), flashDealController_1.updateFlashDealController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('flash-deal', 'delete'), flashDealController_1.deleteFlashDealController);
exports.flashDealRoute = Router;
