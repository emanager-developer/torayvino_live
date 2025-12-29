"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const contactValidation_1 = require("./contactValidation");
const contactController_1 = require("./contactController");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('contact', 'create'), (0, verifyValidate_1.default)(contactValidation_1.contactValidation), contactController_1.addContactController);
Router.get('/', contactController_1.getContactController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('contact', 'update'), (0, verifyValidate_1.default)(contactValidation_1.updateContactValidation), contactController_1.updateContactController);
exports.contactRoute = Router;
