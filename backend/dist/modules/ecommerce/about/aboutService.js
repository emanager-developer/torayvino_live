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
exports.updateAboutService = exports.getAboutService = exports.addAboutService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const aboutModel_1 = require("./aboutModel");
const omitUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
};
const addAboutService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield aboutModel_1.About.findOne();
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'About already exist !');
    }
    const result = yield aboutModel_1.About.create(data);
    return result;
});
exports.addAboutService = addAboutService;
const getAboutService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aboutModel_1.About.findOne();
    if (!result)
        return result;
    const hasTestimonials = Array.isArray(result.testimonials) &&
        result.testimonials.length > 0;
    if (!hasTestimonials && result.testimonial) {
        result.testimonials = [result.testimonial];
    }
    return result;
});
exports.getAboutService = getAboutService;
const updateAboutService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isExist = yield aboutModel_1.About.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'About not found !');
    }
    const hasNewTestimonialImage = Boolean((_a = data === null || data === void 0 ? void 0 : data.testimonial) === null || _a === void 0 ? void 0 : _a.image);
    const isReplacingTestimonials = Array.isArray(data === null || data === void 0 ? void 0 : data.testimonials);
    const updateData = omitUndefined(data);
    const mergeNested = (incoming, existing) => {
        if (!incoming)
            return undefined;
        return Object.assign(Object.assign({}, (existing || {})), (incoming || {}));
    };
    if (updateData.testimonial) {
        updateData.testimonial = mergeNested(updateData.testimonial, isExist.testimonial);
    }
    if (updateData.testimonials && Array.isArray(updateData.testimonials)) {
        // Merge by _id when possible, else keep incoming.
        const existingById = new Map();
        for (const t of isExist.testimonials || []) {
            if (t === null || t === void 0 ? void 0 : t._id)
                existingById.set(String(t._id), t);
        }
        updateData.testimonials = updateData.testimonials.map((incoming) => {
            var _a;
            const incomingId = (incoming === null || incoming === void 0 ? void 0 : incoming._id) ? String(incoming._id) : undefined;
            const existing = incomingId ? existingById.get(incomingId) : undefined;
            return existing ? Object.assign(Object.assign({}, (_a = existing.toObject) === null || _a === void 0 ? void 0 : _a.call(existing)), incoming) : incoming;
        });
    }
    if (updateData.whatWeDo) {
        updateData.whatWeDo = mergeNested(updateData.whatWeDo, isExist.whatWeDo);
    }
    if (updateData.whoWeServe) {
        updateData.whoWeServe = mergeNested(updateData.whoWeServe, isExist.whoWeServe);
    }
    if (updateData.ourVision) {
        updateData.ourVision = mergeNested(updateData.ourVision, isExist.ourVision);
    }
    const result = yield aboutModel_1.About.findByIdAndUpdate(id, updateData, { new: true });
    if (result && (updateData === null || updateData === void 0 ? void 0 : updateData.image))
        (0, deleteFile_1.deleteFile)(`./uploads${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    if (result && hasNewTestimonialImage && ((_b = isExist === null || isExist === void 0 ? void 0 : isExist.testimonial) === null || _b === void 0 ? void 0 : _b.image)) {
        (0, deleteFile_1.deleteFile)(`./uploads${isExist.testimonial.image}`);
    }
    if (result && isReplacingTestimonials) {
        const next = (updateData.testimonials || []);
        const nextById = new Map();
        next.forEach((t) => {
            if (t === null || t === void 0 ? void 0 : t._id)
                nextById.set(String(t._id), t);
        });
        // Delete removed testimonial images
        for (const oldT of isExist.testimonials || []) {
            const oldId = (oldT === null || oldT === void 0 ? void 0 : oldT._id) ? String(oldT._id) : undefined;
            const stillExists = oldId ? nextById.has(oldId) : false;
            if (!stillExists && (oldT === null || oldT === void 0 ? void 0 : oldT.image)) {
                (0, deleteFile_1.deleteFile)(`./uploads${oldT.image}`);
            }
        }
        // Delete replaced testimonial images (matched by _id)
        for (const oldT of isExist.testimonials || []) {
            const oldId = (oldT === null || oldT === void 0 ? void 0 : oldT._id) ? String(oldT._id) : undefined;
            if (!oldId)
                continue;
            const newT = nextById.get(oldId);
            if ((newT === null || newT === void 0 ? void 0 : newT.image) && (oldT === null || oldT === void 0 ? void 0 : oldT.image) && newT.image !== oldT.image) {
                (0, deleteFile_1.deleteFile)(`./uploads${oldT.image}`);
            }
        }
    }
    return result;
});
exports.updateAboutService = updateAboutService;
