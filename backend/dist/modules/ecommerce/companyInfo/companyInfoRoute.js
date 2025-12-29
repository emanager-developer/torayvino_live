"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyInfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const companyInfoController_1 = require("./companyInfoController");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('companyInfo', 'create'), companyInfoController_1.addCompanyInfoController);
Router.get('/', companyInfoController_1.getCompanyInfoController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('companyInfo', 'update'), companyInfoController_1.updateCompanyInfoController);
exports.companyInfoRoute = Router;
