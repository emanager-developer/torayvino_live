"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoGalleryRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const videoGalleryController_1 = require("./videoGalleryController");
const videoGalleryValidation_1 = require("./videoGalleryValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('videoGallery', 'create'), (0, verifyValidate_1.default)(videoGalleryValidation_1.videoGalleryValidation), videoGalleryController_1.addVideoGalleryController);
Router.get('/', videoGalleryController_1.getAllVideoGalleryController);
Router.get('/:id', videoGalleryController_1.getSingleVideoGalleryController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('videoGallery', 'update'), (0, verifyValidate_1.default)(videoGalleryValidation_1.updateVideoGalleryValidation), videoGalleryController_1.updateVideoGalleryController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('videoGallery', 'delete'), videoGalleryController_1.deleteVideoGalleryController);
exports.videoGalleryRoute = Router;
