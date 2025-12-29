"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const logoController_1 = require("./logoController");
const fileUploader_1 = require("../../../utils/fileUploader");
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const upload = (0, fileUploader_1.fileUploader)('logo').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('logo', 'create'), upload, logoController_1.addLogo);
Router.get('/', logoController_1.getLogo);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('logo', 'update'), upload, logoController_1.updateLogo);
exports.logoRoute = Router;
