"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const emiController_1 = require("./emiController");
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const emiValidation_1 = require("./emiValidation");
const fileUploader_1 = require("../../../utils/fileUploader");
const Router = express_1.default.Router();
const upload = (0, fileUploader_1.fileUploader)('emi').single('emi');
// Create new bank
Router.post('/create', upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyValidate_1.default)(emiValidation_1.createBankValidation), emiController_1.createBankController);
// Get all banks
Router.get('/all', emiController_1.getAllBanksController);
// Get single bank
Router.get('/:id', emiController_1.getSingleBankController);
// Update bank
Router.put('/update/:id', upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyValidate_1.default)(emiValidation_1.updateBankValidation), emiController_1.updateBankController);
// Delete bank
Router.delete('/delete/:id', emiController_1.deleteBankController);
exports.emiRoutes = Router;
