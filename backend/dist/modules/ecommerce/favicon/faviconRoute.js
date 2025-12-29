"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faviconRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const faviconController_1 = require("./faviconController");
const fileUploader_1 = require("../../../utils/fileUploader");
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const upload = (0, fileUploader_1.fileUploader)('favicon').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('favicon', 'create'), upload, faviconController_1.addFavicon);
Router.get('/', faviconController_1.getFavicon);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('favicon', 'update'), upload, faviconController_1.updateFavicon);
exports.faviconRoute = Router;
