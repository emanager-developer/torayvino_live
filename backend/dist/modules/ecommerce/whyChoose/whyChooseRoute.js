"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whyChooseRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const whyChooseController_1 = require("./whyChooseController");
const fileUploader_1 = require("../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('whyChoose').array('pointImages');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('whyChoose', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, whyChooseController_1.addWhyChooseController);
Router.get('/', whyChooseController_1.getWhyChooseController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('whyChoose', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, whyChooseController_1.updateWhyChooseController);
exports.whyChooseRoute = Router;
