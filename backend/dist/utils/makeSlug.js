"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSlug = void 0;
const makeSlug = (name) => {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s\u0980-\u09FF-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};
exports.makeSlug = makeSlug;
