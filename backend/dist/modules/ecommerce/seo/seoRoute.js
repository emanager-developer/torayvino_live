"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const seoController_1 = require("./seoController");
const seoValidation_1 = require("./seoValidation");
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('seo', 'create'), (0, verifyValidate_1.default)(seoValidation_1.seoValidation), seoController_1.createSeo);
Router.get('/', seoController_1.getSeo);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('seo', 'update'), (0, verifyValidate_1.default)(seoValidation_1.updateSeoValidation), seoController_1.updateSeo);
exports.seoRoute = Router;
