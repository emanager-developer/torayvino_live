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
exports.sendSMS = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.SMS_API_KEY || '';
const apiUrl = process.env.SMS_API_URL || '';
const senderId = process.env.SMS_SENDER_ID || '';
/**
 * Send SMS via Elitbuzz (or compatible SMS API)
 */
const sendSMS = (phoneNumber, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        if (!apiKey || !apiUrl || !senderId) {
            throw new Error('SMS API configuration missing');
        }
        const purpose = 'promotional';
        const payload = {
            api_key: apiKey,
            senderid: senderId,
            recipient: phoneNumber,
            message: message,
            apiUrl: apiUrl,
            purpose: purpose,
            type: 'text',
        };
        // eslint-disable-next-line no-console
        console.log('sms payload: ', payload);
        const response = yield axios_1.default.post(`${apiUrl}?api_key=${apiKey}&type=text&contacts=${phoneNumber}&senderid=${senderId}&msg=${message}&purpose=${purpose}`);
        // const response = await axios.post(apiUrl, payload);
        // eslint-disable-next-line no-console
        console.log('sms-response: ', response.data);
        return {
            success: true,
            messageId: (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.message_id) !== null && _b !== void 0 ? _b : `elitbuzz_${Date.now()}`,
            raw: response.data,
        };
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('🚨 SMS sending failed:', ((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message);
        return {
            success: false,
            raw: ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) || error.message,
        };
    }
});
exports.sendSMS = sendSMS;
