"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const couponController_1 = require("./couponController");
const couponValidation_1 = require("./couponValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('coupon', 'create'), (0, verifyValidate_1.default)(couponValidation_1.couponValidation), couponController_1.addCouponController);
Router.post('/apply', couponController_1.applyCouponController);
Router.get('/all', couponController_1.getAllCouponController);
Router.get('/:id', couponController_1.getSingleCouponController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('coupon', 'update'), (0, verifyValidate_1.default)(couponValidation_1.updateCouponValidation), couponController_1.updateCouponController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('coupon', 'delete'), couponController_1.deleteCouponController);
exports.couponRoute = Router;
