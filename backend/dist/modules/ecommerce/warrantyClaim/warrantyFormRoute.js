"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warrantyFormRoute = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const warrantyFormController_1 = require("./warrantyFormController");
const warrantyFormValidation_1 = require("./warrantyFormValidation");
const fileUploader_1 = require("../../../utils/fileUploader");
const upload = (0, fileUploader_1.fileUploader)("warranty").fields([
    { name: "images", maxCount: 10 },
]);
Router.post("/add", upload, (0, verifyValidate_1.default)(warrantyFormValidation_1.warrantyFormValidation), warrantyFormController_1.addWarrantyFormController);
Router.get('/', warrantyFormController_1.getAllWarrantyFormController);
Router.get('/phone/:phone', warrantyFormController_1.getWarrantyFormsByCustomerPhoneController);
Router.get('/:id', warrantyFormController_1.getSingleWarrantyFormController);
Router.patch('/update/:id', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'update'), (0, verifyValidate_1.default)(warrantyFormValidation_1.updateWarrantyFormValidation), warrantyFormController_1.updateWarrantyFormController);
Router.delete('/:id', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'delete'), warrantyFormController_1.deleteWarrantyFormController);
Router.patch('/update-status/:id', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'update'), (0, verifyValidate_1.default)(warrantyFormValidation_1.updateStatusValidation), warrantyFormController_1.updateWarrantyFormStatusController);
Router.patch('/add-notes/:id', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'update'), (0, verifyValidate_1.default)(warrantyFormValidation_1.updateNotesValidation), warrantyFormController_1.addNotesToWarrantyFormController);
Router.get('/export', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'read'), warrantyFormController_1.exportWarrantyClaimController);
Router.post('/export', (0, verifyPermission_1.verifyPermission)('warrantyForm', 'read'), warrantyFormController_1.exportSelectedWarrantyClaimController);
exports.warrantyFormRoute = Router;
