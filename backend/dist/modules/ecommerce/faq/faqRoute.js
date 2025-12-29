"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const faqController_1 = require("./faqController");
const faqValidation_1 = require("./faqValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('faq', 'create'), (0, verifyValidate_1.default)(faqValidation_1.faqValidation), faqController_1.addFaqController);
Router.get('/', faqController_1.getAllFaqController);
Router.get('/:id', faqController_1.getSingleFaqController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('faq', 'update'), (0, verifyValidate_1.default)(faqValidation_1.updateFaqValidation), faqController_1.updateFaqController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('faq', 'delete'), faqController_1.deleteFaqController);
exports.faqRoute = Router;
