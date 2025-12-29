"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortFeatureRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const fileUploader_1 = require("../../../../utils/fileUploader");
const shortFeatureController_1 = require("./shortFeatureController");
const upload = (0, fileUploader_1.fileUploader)('feature').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('feature', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, shortFeatureController_1.addShortFeatureController);
Router.get('/all', shortFeatureController_1.getAllShortFeatureController);
Router.get('/:id', shortFeatureController_1.getSingleShortFeatureController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('feature', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, shortFeatureController_1.updateShortFeatureController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('feature', 'delete'), shortFeatureController_1.deleteShortFeatureController);
exports.shortFeatureRoute = Router;
