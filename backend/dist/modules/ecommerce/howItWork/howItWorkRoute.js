"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.howItWorkRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const howItWorkController_1 = require("./howItWorkController");
const fileUploader_1 = require("../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)('howItWork').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('howItWork', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, howItWorkController_1.addHowItWorkController);
Router.get('/all', howItWorkController_1.getAllHowItWorkController);
Router.get('/:id', howItWorkController_1.getSingleHowItWorkController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('howItWork', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, howItWorkController_1.updateHowItWorkController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('howItWork', 'delete'), howItWorkController_1.deleteHowItWorkController);
exports.howItWorkRoute = Router;
