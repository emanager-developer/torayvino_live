"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../../middlewares/verifyPermission");
const tagsController_1 = require("./tagsController");
const tagsValidation_1 = require("./tagsValidation");
Router.post('/add', (0, verifyPermission_1.verifyPermission)('tags', 'create'), (0, verifyValidate_1.default)(tagsValidation_1.tagsValidation), tagsController_1.addTagsController);
Router.get('/all', tagsController_1.getAllTagsController);
Router.get('/:id', tagsController_1.getSingleTagsController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('tags', 'update'), (0, verifyValidate_1.default)(tagsValidation_1.updateTagsValidation), tagsController_1.updateTagsController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('tags', 'delete'), tagsController_1.deleteTagsController);
exports.tagsRoute = Router;
