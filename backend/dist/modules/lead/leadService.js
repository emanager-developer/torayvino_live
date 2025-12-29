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
exports.bulkBackLeadService = exports.bulkSoftDeleteLeadService = exports.backLeadService = exports.updateLeadStatusService = exports.getTargetedLeadEmailService = exports.getTargetedLeadService = exports.bulkLeadService = exports.deleteLeadService = exports.updateLeadService = exports.getByIdLeadService = exports.getAllLeadService = exports.addLeadService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const leadModel_1 = require("./leadModel");
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const mongoose_1 = __importDefault(require("mongoose"));
const customerModel_1 = require("../customer/customerModel");
const addLeadService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadModel_1.Lead.create(data);
    return result;
});
exports.addLeadService = addLeadService;
const getAllLeadService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const LeadQuery = new QueryBuilder_1.default(leadModel_1.Lead.find().populate('serviceBy deletedBy'), query)
        .search(['name', 'email', 'phone', 'company'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield LeadQuery.countTotal();
    const data = yield LeadQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllLeadService = getAllLeadService;
const getByIdLeadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadModel_1.Lead.findById(id).populate('serviceBy addedBy');
    return result;
});
exports.getByIdLeadService = getByIdLeadService;
const updateLeadService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const existingLead = yield leadModel_1.Lead.findById(id).session(session);
        if (!existingLead)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lead not found');
        const isNameChanged = data.name && data.name !== existingLead.name;
        const isPhoneChanged = data.phone && data.phone !== existingLead.phone;
        const isServiceByChanged = data.serviceBy && data.serviceBy !== existingLead.serviceBy;
        // Update the lead itself
        const updatedLead = yield leadModel_1.Lead.findByIdAndUpdate(id, data, {
            new: true,
            session,
        });
        // Update all customers linked to this lead
        if (isNameChanged || isPhoneChanged || isServiceByChanged) {
            yield customerModel_1.Customer.updateMany({ lead: id }, Object.assign(Object.assign(Object.assign({}, (isNameChanged && { name: data.name })), (isPhoneChanged && { phone: data.phone })), (isServiceByChanged && { serviceBy: data.serviceBy })), { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return updatedLead;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.updateLeadService = updateLeadService;
const deleteLeadService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield leadModel_1.Lead.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lead not found');
    const result = yield leadModel_1.Lead.findByIdAndUpdate(id, { isDeleted: true, deletedBy: user }, { new: true });
    return result;
});
exports.deleteLeadService = deleteLeadService;
const bulkLeadService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield leadModel_1.Lead.insertMany(data, { session });
        yield session.commitTransaction();
        session.endSession();
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.bulkLeadService = bulkLeadService;
const getTargetedLeadService = (ids, purpose) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (ids) {
        const splitIds = ids.split(',');
        filter._id = { $in: splitIds };
    }
    if (purpose && purpose !== 'null')
        filter.purpose = purpose;
    const result = yield leadModel_1.Lead.find(filter).select('email phone');
    return result;
});
exports.getTargetedLeadService = getTargetedLeadService;
const getTargetedLeadEmailService = (ids, purpose) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (ids) {
        const splitIds = ids.split(',');
        filter._id = { $in: splitIds };
    }
    if (purpose && purpose !== 'null')
        filter.purpose = purpose;
    filter.email = { $nin: [null, ''] };
    const result = yield leadModel_1.Lead.find(filter).select('email phone');
    return result;
});
exports.getTargetedLeadEmailService = getTargetedLeadEmailService;
const updateLeadStatusService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield leadModel_1.Lead.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lead not found');
    const { status, updatedBy } = data;
    const result = yield leadModel_1.Lead.findByIdAndUpdate(id, { status, updatedBy });
    return result;
});
exports.updateLeadStatusService = updateLeadStatusService;
const backLeadService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield leadModel_1.Lead.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lead not found');
    const { updatedBy } = data;
    const result = yield leadModel_1.Lead.findByIdAndUpdate(id, {
        updatedBy,
        isDeleted: false,
    });
    return result;
});
exports.backLeadService = backLeadService;
// bulk soft delete isDeleted false
const bulkSoftDeleteLeadService = (ids, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadModel_1.Lead.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true, deletedBy: user } });
    return result;
});
exports.bulkSoftDeleteLeadService = bulkSoftDeleteLeadService;
const bulkBackLeadService = (ids, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadModel_1.Lead.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: false, updatedBy: user } });
    return result;
});
exports.bulkBackLeadService = bulkBackLeadService;
// export const findDuplicateLeadsByPhoneService = async () => {
//   const duplicates = await Lead.aggregate([
//     { $match: { phone: { $type: 'string' } } },
//     // Trimmed phone
//     {
//       $addFields: {
//         trimmedPhone: { $trim: { input: '$phone' } },
//       },
//     },
//     // Add phone length
//     {
//       $addFields: {
//         phoneLength: { $strLenCP: '$trimmedPhone' },
//       },
//     },
//     { $match: { phoneLength: { $gte: 10 } } },
//     // Extract last 10 digits from trimmed phone
//     {
//       $addFields: {
//         last10: {
//           $substrCP: ['$trimmedPhone', { $subtract: ['$phoneLength', 10] }, 10],
//         },
//       },
//     },
//     // Group by last 10 digits
//     {
//       $group: {
//         _id: '$last10',
//         phones: { $push: '$trimmedPhone' },
//         count: { $sum: 1 },
//       },
//     },
//     // Only where more than one match
//     { $match: { count: { $gt: 1 } } },
//     { $unwind: '$phones' },
//     // Determine duplicate: true if phone does NOT start with 0
//     {
//       $addFields: {
//         duplicate: {
//           $not: [{ $regexMatch: { input: '$phones', regex: /^0/ } }],
//         },
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: { phone: '$phones', duplicate: '$duplicate' },
//       },
//     },
//   ]);
//   // const toDelete = duplicates.filter((d) => d.duplicate).map((d) => d.phone);
//   // if (toDelete.length) {
//   //   await Lead.updateMany(
//   //     { phone: { $in: toDelete } },
//   //     { $set: { isDeleted: true } },
//   //   );
//   // }
//   return duplicates;
// };
// export const findLeadWithOutStart0Service = async () => {
//   const leads = await Lead.find({
//     phone: { $type: 'string', $regex: /^\s|\s$/ },
//   });
//   const operations = [];
//   for (const lead of leads) {
//     const trimmedPhone = lead.phone.trim();
//     // Check if another lead already has the trimmed phone number
//     const exists = await Lead.findOne({
//       _id: { $ne: lead._id }, // exclude current lead
//       phone: trimmedPhone,
//     });
//     if (!exists) {
//       operations.push({
//         updateOne: {
//           filter: { _id: lead._id },
//           update: { $set: { phone: trimmedPhone } },
//         },
//       });
//     }
//   }
//   if (operations.length) {
//     await Lead.bulkWrite(operations);
//   }
//   return operations.length;
// };
