"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const emailController_1 = require("./emailController");
const emailValidation_1 = require("./emailValidation");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const Router = express_1.default.Router();
Router.get('/', emailController_1.getEmailController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('email', 'create'), (0, verifyValidate_1.default)(emailValidation_1.emailValidation), emailController_1.createEmailController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('email', 'update'), emailController_1.updateEmailController);
exports.emailRoute = Router;
