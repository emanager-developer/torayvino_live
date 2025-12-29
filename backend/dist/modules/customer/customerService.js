"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendSMSService = exports.sendEmailService = exports.resetCustomerPasswordService = exports.updateCustomerActiveService = exports.updateCustomerImageService = exports.updateCustomerProfileService = exports.updateCustomerPasswordService = exports.verifyPhoneAndRegisterService = exports.getCustomerByPhoneService = exports.getByIdCustomerService = exports.getAllCustomerService = exports.loginCustomerService = exports.registerCustomerService = exports.addCustomerService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const customerModel_1 = require("./customerModel");
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../user/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../../utils/createToken");
const config_1 = __importDefault(require("../../config"));
const sendSMS_1 = require("../../utils/sendSMS");
const sendEmail_1 = require("../../utils/sendEmail");
const addCustomerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // check by phone customer already exist
        const isExistCustomer = yield customerModel_1.Customer.findOne({
            phone: data.phone,
        });
        if (isExistCustomer) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Customer already exist with this phone number');
        }
        const [newCustomer] = yield customerModel_1.Customer.create([data], { session });
        yield session.commitTransaction();
        session.endSession();
        return newCustomer;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.addCustomerService = addCustomerService;
const registerCustomerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomer = yield customerModel_1.Customer.findOne({
        phone: data.phone,
    });
    if (isExistCustomer) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Customer already exist with this phone number');
    }
    const superAdmin = yield userModel_1.User.findOne({ role: 'superAdmin' });
    const newData = Object.assign(Object.assign({}, data), { source: 'e-commerce', serviceBy: superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin._id, date: new Date() });
    const result = yield customerModel_1.Customer.create(newData);
    return result;
});
exports.registerCustomerService = registerCustomerService;
const loginCustomerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customerModel_1.Customer.findOne({ phone: data === null || data === void 0 ? void 0 : data.phone }).select('+password');
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This customer is not found !');
    }
    // checking active status
    const isActive = customer === null || customer === void 0 ? void 0 : customer.isActive;
    if (!isActive) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Your account is not active ! Please contact with support.');
    }
    // checking if the customer is blocked
    const isDeleted = customer === null || customer === void 0 ? void 0 : customer.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This customer is delete !');
    }
    //checking if the password is correct
    const isMatch = yield bcrypt_1.default.compare(data === null || data === void 0 ? void 0 : data.password, customer === null || customer === void 0 ? void 0 : customer.password);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //create token and sent to the client
    const jwtPayload = {
        _id: customer === null || customer === void 0 ? void 0 : customer._id,
        phone: customer === null || customer === void 0 ? void 0 : customer.phone,
        name: customer === null || customer === void 0 ? void 0 : customer.name,
        email: customer === null || customer === void 0 ? void 0 : customer.email,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.JWT_ACCESS_SECRET, config_1.default.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.JWT_REFRESH_SECRET, config_1.default.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginCustomerService = loginCustomerService;
const getAllCustomerService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const CustomerQuery = new QueryBuilder_1.default(customerModel_1.Customer.find().populate('serviceBy', 'name'), query)
        .search(['name', 'phone', 'email'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield CustomerQuery.countTotal();
    const data = yield CustomerQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllCustomerService = getAllCustomerService;
const getByIdCustomerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customerModel_1.Customer.findById(id).populate({
        path: 'serviceBy',
        select: 'name',
    });
    return result;
});
exports.getByIdCustomerService = getByIdCustomerService;
const getCustomerByPhoneService = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customerModel_1.Customer.findOne({ phone });
    return result;
});
exports.getCustomerByPhoneService = getCustomerByPhoneService;
const verifyPhoneAndRegisterService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Import OTPVerification model here to avoid circular dependency
    const OTPVerification = (yield Promise.resolve().then(() => __importStar(require('../otp/otpVerificationModel')))).default;
    // Verify that the OTP was actually verified for this phone number
    const verification = yield OTPVerification.findOne({
        verificationId: data.verificationId,
        phoneNumber: data.phone,
        isVerified: true,
        isExpired: false,
    });
    if (!verification) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Phone number not verified or verification expired');
    }
    // Check if verification is still valid (within 24 hours)
    const verificationTime = verification.verifiedAt;
    if (!verificationTime) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification record. Please verify your phone number again.');
    }
    const now = new Date();
    const timeDiff = now.getTime() - verificationTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff > 24) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Phone verification expired. Please verify your phone number again.');
    }
    // Check if customer already exists
    const isExistCustomer = yield customerModel_1.Customer.findOne({
        phone: data.phone,
    });
    if (isExistCustomer) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Customer already exist with this phone number');
    }
    const superAdmin = yield userModel_1.User.findOne({ role: 'superAdmin' });
    const newData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        source: 'e-commerce',
        serviceBy: superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin._id,
        date: new Date(),
    };
    const result = yield customerModel_1.Customer.create(newData);
    // Mark the verification as used (optional - expire it)
    yield OTPVerification.updateOne({ verificationId: data.verificationId }, { isExpired: true });
    return result;
});
exports.verifyPhoneAndRegisterService = verifyPhoneAndRegisterService;
const updateCustomerPasswordService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customerModel_1.Customer.findById(id).select('+password');
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    const isMatch = yield bcrypt_1.default.compare(data.oldPassword, customer.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Old password is incorrect');
    }
    customer.password = data.newPassword;
    yield customer.save();
    return true;
});
exports.updateCustomerPasswordService = updateCustomerPasswordService;
const updateCustomerProfileService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // if phone is being updated, ensure it's not used by another customer
    if (data.phone) {
        const existing = yield customerModel_1.Customer.findOne({ phone: data.phone, _id: { $ne: id } });
        if (existing) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Another customer already uses this phone number');
        }
    }
    const updated = yield customerModel_1.Customer.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate({ path: 'serviceBy', select: 'name' });
    if (!updated) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    return updated;
});
exports.updateCustomerProfileService = updateCustomerProfileService;
const updateCustomerImageService = (id, imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield customerModel_1.Customer.findByIdAndUpdate(id, { image: imagePath }, { new: true });
    if (!updated) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    return updated;
});
exports.updateCustomerImageService = updateCustomerImageService;
const updateCustomerActiveService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield customerModel_1.Customer.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    return updated;
});
exports.updateCustomerActiveService = updateCustomerActiveService;
const resetCustomerPasswordService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Import OTPVerification model here to avoid circular dependency
    const OTPVerification = (yield Promise.resolve().then(() => __importStar(require('../otp/otpVerificationModel')))).default;
    const verification = yield OTPVerification.findOne({
        verificationId: data.verificationId,
        phoneNumber: data.phone,
        isVerified: true,
        isExpired: false,
    });
    if (!verification) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Phone number not verified or verification expired');
    }
    const verificationTime = verification.verifiedAt;
    if (!verificationTime) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification record. Please verify your phone number again.');
    }
    const now = new Date();
    const timeDiff = now.getTime() - verificationTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff > 24) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Phone verification expired. Please verify your phone number again.');
    }
    const customer = yield customerModel_1.Customer.findOne({ phone: data.phone }).select('+password');
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    customer.password = data.newPassword;
    yield customer.save();
    // Optionally expire the verification after successful reset
    yield OTPVerification.updateOne({ verificationId: data.verificationId }, { isExpired: true });
    return true;
});
exports.resetCustomerPasswordService = resetCustomerPasswordService;
const sendEmailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(data === null || data === void 0 ? void 0 : data.to))
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email is required');
    const result = yield (0, sendEmail_1.sendEmailToLead)(data);
    return result;
});
exports.sendEmailService = sendEmailService;
const sendSMSService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(data === null || data === void 0 ? void 0 : data.to)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Phone number is required");
    }
    const normalizeBDPhone = (phone) => {
        const p = String(phone || "").replace(/\D/g, "");
        if (p.startsWith("880"))
            return p;
        if (p.startsWith("0"))
            return "88" + p;
        if (p.startsWith("1"))
            return "880" + p;
        return p;
    };
    // Always convert to an array then normalize
    const phoneList = Array.isArray(data.to)
        ? data.to.map(normalizeBDPhone)
        : [normalizeBDPhone(data.to)];
    // Join numbers into API-required format: "num1+num2+num3"
    const contacts = phoneList.join("+");
    const result = yield (0, sendSMS_1.sendSMS)(contacts, data.message);
    return result;
});
exports.sendSMSService = sendSMSService;
