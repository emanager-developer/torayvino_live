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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDefaultAdmin = void 0;
const userModel_1 = require("../modules/user/userModel");
const defaultAdmin = {
    employee: undefined,
    email: 'sa@mail.com',
    name: 'Super Admin',
    designation: 'Super Admin',
    password: 'sa@mail.com',
    needsPasswordChange: false,
    role: 'superAdmin',
    isDeleted: false,
    status: 'active',
};
const seedDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isSuperAdminExits = yield userModel_1.User.findOne({ role: 'superAdmin' });
    if (!isSuperAdminExits) {
        const result = yield userModel_1.User.create(defaultAdmin);
        if (result) {
            console.log('Default superAdmin created successfully');
        }
    }
});
exports.seedDefaultAdmin = seedDefaultAdmin;
