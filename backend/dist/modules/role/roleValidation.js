"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUpdateValidation = exports.roleValidation = exports.permissionSchema = void 0;
const zod_1 = require("zod");
exports.permissionSchema = zod_1.z.object({
    route: zod_1.z.string().nonempty('Route is required'),
    all: zod_1.z.boolean().default(false),
    create: zod_1.z.boolean().default(false),
    read: zod_1.z.boolean().default(false),
    update: zod_1.z.boolean().default(false),
    delete: zod_1.z.boolean().default(false),
});
exports.roleValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Role name is required'),
    permissions: zod_1.z.array(exports.permissionSchema),
});
exports.roleUpdateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Role name is required').optional(),
    permissions: zod_1.z.array(exports.permissionSchema).optional(),
});
