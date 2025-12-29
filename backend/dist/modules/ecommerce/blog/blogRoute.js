"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const blogController_1 = require("./blogController");
const fileUploader_1 = require("../../../utils/fileUploader");
const blogValidation_1 = require("./blogValidation");
const upload = (0, fileUploader_1.fileUploader)('blog').single('image');
Router.post('/add', (0, verifyPermission_1.verifyPermission)('blog', 'create'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyValidate_1.default)(blogValidation_1.blogValidation), blogController_1.addBlogController);
Router.get('/', blogController_1.getAllBlogController);
Router.get('/:id', blogController_1.getSingleBlogController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('blog', 'update'), upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyValidate_1.default)(blogValidation_1.updateBlogValidation), blogController_1.updateBlogController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('blog', 'delete'), blogController_1.deleteBlogController);
exports.blogRoute = Router;
