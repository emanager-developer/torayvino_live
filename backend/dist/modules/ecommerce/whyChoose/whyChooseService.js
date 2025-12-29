"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWhyChooseService = exports.getWhyChooseService = exports.addWhyChooseService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const deleteFile_1 = require("../../../utils/deleteFile");
const whyChooseModel_1 = require("./whyChooseModel");
const addWhyChooseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield whyChooseModel_1.WhyChoose.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'WhyChoose already exist');
    const result = yield whyChooseModel_1.WhyChoose.create(data);
    return result;
});
exports.addWhyChooseService = addWhyChooseService;
const getWhyChooseService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield whyChooseModel_1.WhyChoose.findOne();
    return result;
});
exports.getWhyChooseService = getWhyChooseService;
const updateWhyChooseService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield whyChooseModel_1.WhyChoose.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'WhyChoose not found');
    // Clean up old images if new data has different images
    if (isExist.points && data.points) {
        isExist.points.forEach((oldPoint, index) => {
            const newPoint = data.points[index];
            // If new point has different image or point is removed, delete old image
            if (oldPoint.image && (!newPoint || newPoint.image !== oldPoint.image)) {
                const imagePath = oldPoint.image.startsWith('/') ? oldPoint.image.substring(1) : oldPoint.image;
                (0, deleteFile_1.deleteFile)(`./uploads/${imagePath}`);
            }
        });
    }
    const result = yield whyChooseModel_1.WhyChoose.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateWhyChooseService = updateWhyChooseService;
