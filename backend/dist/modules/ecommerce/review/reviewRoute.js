"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("./reviewController");
const Router = express_1.default.Router();
Router.post('/add', reviewController_1.addReviewController);
Router.get('/all', reviewController_1.getAllReviewController);
Router.delete('/delete/:id', reviewController_1.deleteReviewController);
Router.patch('/update/:id', reviewController_1.updateReviewController);
exports.reviewRoute = Router;
