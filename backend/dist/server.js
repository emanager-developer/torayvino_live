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
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const DB_1 = require("./DB");
const scheduler_1 = require("./utils/scheduler");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.DB_URL);
            console.log('database connect success 🚀');
            // Initialize scheduled jobs for OTP cleanup
            (0, scheduler_1.initializeScheduledJobs)();
            console.log('scheduled jobs initialized 🕒');
            app_1.default.listen(config_1.default.PORT, () => {
                console.log(`server is running on port ${config_1.default.PORT} 🏃‍♂️‍➡️`);
            });
            (0, DB_1.seedDefaultAdmin)();
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
