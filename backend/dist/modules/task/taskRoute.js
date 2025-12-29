"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const taskController_1 = require("./taskController");
const verifyPermission_1 = require("../../middlewares/verifyPermission");
const taskValidation_1 = require("./taskValidation");
const Router = express_1.default.Router();
Router.get('/all', (0, verifyPermission_1.verifyPermission)('task', 'read'), taskController_1.getAllTaskController);
Router.post('/add', (0, verifyPermission_1.verifyPermission)('task', 'create'), (0, verifyValidate_1.default)(taskValidation_1.taskValidation), taskController_1.createTaskController);
Router.get('/:id', (0, verifyPermission_1.verifyPermission)('task', 'read'), taskController_1.getByIdTaskController);
Router.put('/update/:id', (0, verifyPermission_1.verifyPermission)('task', 'update'), (0, verifyValidate_1.default)(taskValidation_1.updateTaskValidation), taskController_1.updateTaskController);
Router.put('/isShow-true/:id', taskController_1.trueTaskIsShowController);
Router.delete('/delete/:id', (0, verifyPermission_1.verifyPermission)('task', 'delete'), taskController_1.deleteTaskController);
exports.taskRoute = Router;
