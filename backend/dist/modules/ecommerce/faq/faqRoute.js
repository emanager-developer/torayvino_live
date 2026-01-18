"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoutes = void 0;
const express_1 = require("express");
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const faqController_1 = require("./faqController");
const faqValidation_1 = require("./faqValidation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', faqController_1.getAllFaqController);
router.get('/categories', faqController_1.getFaqCategoriesController);
// Admin routes
router.post('/add', (0, verifyPermission_1.verifyPermission)('faq', 'create'), (0, verifyValidate_1.default)(faqValidation_1.addFaqZodSchema), faqController_1.addFaqController);
router.get('/admin', (0, verifyPermission_1.verifyPermission)('faq', 'read'), faqController_1.getAllFaqForAdminController);
router.get('/:id', faqController_1.getSingleFaqController);
router.patch('/:id', (0, verifyPermission_1.verifyPermission)('faq', 'update'), (0, verifyValidate_1.default)(faqValidation_1.updateFaqZodSchema), faqController_1.updateFaqController);
router.delete('/:id', (0, verifyPermission_1.verifyPermission)('faq', 'delete'), faqController_1.deleteFaqController);
exports.faqRoutes = router;
