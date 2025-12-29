"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    PORT: process.env.PORT || 1701,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    // SSLCommerz Configuration
    SSL_STORE_ID: process.env.SSL_STORE_ID,
    SSL_STORE_PASSWORD: process.env.SSL_STORE_PASSWORD,
    SSL_PAYMENT_URL: process.env.SSL_PAYMENT_URL || 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
    // bKash Configuration
    BKASH_BASE_URL: process.env.BKASH_BASE_URL,
    BKASH_APP_KEY: process.env.BKASH_APP_KEY,
    BKASH_APP_SECRET: process.env.BKASH_APP_SECRET,
    BKASH_USERNAME: process.env.BKASH_USERNAME,
    BKASH_PASSWORD: process.env.BKASH_PASSWORD,
};
