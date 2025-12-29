"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const settingController_1 = require("./settingController");
const settingValidation_1 = require("./settingValidation");
const fileUploader_1 = require("../../utils/fileUploader");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const Router = express_1.default.Router();
const upload = (0, fileUploader_1.fileUploader)('setting').single('favicon');
Router.get('/', (0, verifyPermission_1.verifyPermission)('setting', 'read'), settingController_1.getSettingController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('setting', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyValidate_1.default)(settingValidation_1.settingValidation), settingController_1.createSettingController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('setting', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, settingController_1.updateSettingController);
exports.settingRoute = Router;
