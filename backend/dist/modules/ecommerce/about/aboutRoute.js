"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const fileUploader_1 = require("../../../utils/fileUploader");
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const aboutController_1 = require("./aboutController");
const upload = (0, fileUploader_1.fileUploader)('about').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('about', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, aboutController_1.addAboutController);
Router.get('/', aboutController_1.getAboutController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('about', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, aboutController_1.updateAboutController);
exports.aboutRoute = Router;
