"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateInBD = dateInBD;
function dateInBD(dateStr) {
    const date = new Date(dateStr);
    const bdTime = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    return new Date(Date.UTC(bdTime.getUTCFullYear(), bdTime.getUTCMonth(), bdTime.getUTCDate()));
}
