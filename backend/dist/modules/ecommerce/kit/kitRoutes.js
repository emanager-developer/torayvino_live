"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const kitController_1 = require("./kitController");
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/kit');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
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
