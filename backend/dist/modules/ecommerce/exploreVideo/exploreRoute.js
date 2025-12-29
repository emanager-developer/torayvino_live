"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const exploreController_1 = require("./exploreController");
const exploreValidation_1 = require("./exploreValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('explore', 'create'), (0, verifyValidate_1.default)(exploreValidation_1.exploreValidation), exploreController_1.addExploreController);
Router.get('/', exploreController_1.getAllExploreController);
Router.get('/:id', exploreController_1.getSingleExploreController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('explore', 'update'), (0, verifyValidate_1.default)(exploreValidation_1.updateExploreValidation), exploreController_1.updateExploreController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('explore', 'delete'), exploreController_1.deleteExploreController);
exports.exploreRoute = Router;
