"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorhandler_1 = __importDefault(require("./errors/globalErrorhandler"));
const notFound_1 = require("./errors/notFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json({
    limit: '2mb',
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
    limit: '2mb',
}));
app.use(express_1.default.static('uploads'));
app.use((0, cors_1.default)({
    origin: ['https://torayvinobd.store', 'http://localhost:1700'],
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send(`server is running on port ${config_1.default.PORT} 🏃‍♂️‍➡️`);
});
// use Routes
app.use('/api', routes_1.default);
// global error handler
app.use(globalErrorhandler_1.default);
//Not Found
app.use(notFound_1.notFound);
exports.default = app;
