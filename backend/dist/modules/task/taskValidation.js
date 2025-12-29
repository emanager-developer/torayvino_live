"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskValidation = exports.taskValidation = void 0;
const zod_1 = require("zod");
exports.taskValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.string().nonempty('Date is required'),
    endDate: zod_1.z.string().nonempty('Date is required'),
    status: zod_1.z
        .enum(['not-started', 'in-progress', 'completed', 'ready'])
        .default('not-started'),
    priority: zod_1.z.enum(['low', 'medium', 'high']).default('medium'),
    assignedTo: zod_1.z.array(zod_1.z.string().nonempty('Assigned user ID is required')),
});
exports.updateTaskValidation = exports.taskValidation.partial();
