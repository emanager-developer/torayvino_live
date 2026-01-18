"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const kitController_1 = require("./kitController");
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const multerUploader_1 = require("../../../utils/multerUploader");
const router = express_1.default.Router();
const upload = (0, multerUploader_1.createUploader)({
    uploadSubdir: 'kit',
    rules: [{ fieldName: 'image', allowed: ['image'] }],
}).single('image');
router.post('/add', upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyPermission_1.verifyPermission)('kit', 'create'), kitController_1.createKitController);
router.get('/all', kitController_1.getAllKitController);
router.get('/:id', kitController_1.getByIdKitController);
router.patch('/update/:id', upload, (req, res, next) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
}, (0, verifyPermission_1.verifyPermission)('kit', 'update'), kitController_1.updateKitController);
router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('kit', 'delete'), kitController_1.deleteKitController);
exports.kitRoutes = router;
