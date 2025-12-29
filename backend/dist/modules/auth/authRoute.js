"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const authValidation_1 = require("./authValidation");
const authController_1 = require("./authController");
const Router = express_1.default.Router();
Router.post('/login', (0, verifyValidate_1.default)(authValidation_1.loginValidation), authController_1.loginUserController);
Router.post('/refresh-token', authController_1.refreshTokenController);
exports.authRoute = Router;
