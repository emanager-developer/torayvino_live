"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllSalesService = exports.getTodaysSalesService = exports.sendToPathaoService = exports.sendToSteadfastService = exports.exportOrdersService = exports.deleteOrderService = exports.updateOrderStatusByCustomerService = exports.updateOrderStatusService = exports.getOrdersByCustomerIdService = exports.searchOrderService = exports.getOrderByIdService = exports.getAllOrdersService = exports.addOrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customerModel_1 = require("../../customer/customerModel");
const userModel_1 = require("../../user/userModel");
const orderModel_1 = require("./orderModel");
const xlsx = __importStar(require("xlsx"));
const productModel_1 = require("../product/product/productModel");
const kitModel_1 = require("../kit/kitModel");
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendSMS_1 = require("../../../utils/sendSMS");
const sendEmail_1 = require("../../../utils/sendEmail");
function updateStock(productId, quantityOrdered, sku, session) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const product = yield productModel_1.Product.findById(productId).session(session);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock < quantityOrdered) {
            throw new Error('Insufficient stock available');
        }
        product.stock -= quantityOrdered;
        if (product.isVariant &&
            ((_a = product === null || product === void 0 ? void 0 : product.variants) === null || _a === void 0 ? void 0 : _a.length) &&
            product.variants.length > 0) {
            const selectedVariant = product === null || product === void 0 ? void 0 : product.variants.find((variant) => variant.sku === sku);
            if (selectedVariant) {
                if (selectedVariant.stock < quantityOrdered) {
                    throw new Error('Insufficient stock available for the variant');
                }
                selectedVariant.stock -= quantityOrdered;
                product.markModified('variants');
            }
            else {
                throw new Error('Variant not found for the specified SKU');
            }
        }
        yield product.save({ session });
    });
}
function restoreStock(productId, quantity, sku, session) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const product = yield productModel_1.Product.findById(productId).session(session);
        if (!product) {
            throw new Error('Product not found');
        }
        product.stock = (product.stock || 0) + quantity;
        if (product.isVariant &&
            ((_a = product === null || product === void 0 ? void 0 : product.variants) === null || _a === void 0 ? void 0 : _a.length) &&
            product.variants.length > 0) {
            const selectedVariant = product === null || product === void 0 ? void 0 : product.variants.find((variant) => variant.sku === sku);
            if (selectedVariant) {
                selectedVariant.stock = (selectedVariant.stock || 0) + quantity;
                product.markModified('variants');
            }
            else {
                // If SKU not found, still allow restoring to main stock
            }
        }
        yield product.save({ session });
    });
}
function updateKitStock(kitId, quantityOrdered, session) {
    return __awaiter(this, void 0, void 0, function* () {
        const kit = yield kitModel_1.Kit.findById(kitId).session(session);
        if (!kit) {
            throw new Error('Kit not found');
        }
        if (kit.stock && kit.stock < quantityOrdered) {
            throw new Error('Insufficient kit stock available');
        }
        if (kit.stock) {
            kit.stock -= quantityOrdered;
            yield kit.save({ session });
        }
    });
}
function restoreKitStock(kitId, quantity, session) {
    return __awaiter(this, void 0, void 0, function* () {
        const kit = yield kitModel_1.Kit.findById(kitId).session(session);
        if (!kit) {
            throw new Error('Kit not found');
        }
        kit.stock = (kit.stock || 0) + quantity;
        yield kit.save({ session });
    });
}
const addOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Generate invoice number
        const orders = yield orderModel_1.Order.find({}).session(session);
        let invoiceNumber;
        if ((orders === null || orders === void 0 ? void 0 : orders.length) > 0) {
            const invoiceNumbers = orders
                .map((order) => {
                const num = parseInt((order === null || order === void 0 ? void 0 : order.invoiceNumber) || '0');
                return isNaN(num) ? 0 : num;
            })
                .filter((num) => num > 0);
            const maxInvoiceNumber = invoiceNumbers.length > 0 ? Math.max(...invoiceNumbers) : 0;
            const newNumber = maxInvoiceNumber + 1;
            if (newNumber < 10) {
                invoiceNumber = '0000' + newNumber;
            }
            else if (newNumber < 100) {
                invoiceNumber = '000' + newNumber;
            }
            else if (newNumber < 1000) {
                invoiceNumber = '00' + newNumber;
            }
            else if (newNumber < 10000) {
                invoiceNumber = '0' + newNumber;
            }
            else {
                invoiceNumber = newNumber.toString();
            }
        }
        else {
            invoiceNumber = '00001';
        }
        const superAdmin = yield userModel_1.User.findOne({ role: 'superAdmin' }).session(session);
        let customerId;
        const isExistCustomer = yield customerModel_1.Customer.findOne({
            phone: (_a = data === null || data === void 0 ? void 0 : data.customer) === null || _a === void 0 ? void 0 : _a.phone,
        }).session(session);
        if (!isExistCustomer) {
            const newCustomer = yield customerModel_1.Customer.create([
                Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.customer), { date: new Date(), password: (_b = data === null || data === void 0 ? void 0 : data.customer) === null || _b === void 0 ? void 0 : _b.phone, serviceBy: superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin._id, source: 'e-commerce' }),
            ], { session });
            customerId = (_c = newCustomer[0]) === null || _c === void 0 ? void 0 : _c._id;
        }
        else {
            customerId = isExistCustomer === null || isExistCustomer === void 0 ? void 0 : isExistCustomer._id;
        }
        // Update product stock
        if (data.products && data.products.length > 0) {
            for (const product of data.products) {
                const { productId, quantity, sku } = product;
                yield updateStock(productId, quantity, sku, session);
            }
        }
        // Update kit stock
        if (data.kits && data.kits.length > 0) {
            for (const kit of data.kits) {
                const { kitId, quantity } = kit;
                yield updateKitStock(kitId, quantity, session);
            }
        }
        // eslint-disable-next-line no-console
        console.log(data);
        if (data.couponCode) {
            const coupon = yield Promise.resolve().then(() => __importStar(require('../coupon/couponModel'))).then((mod) => mod.Coupon.findOne({ code: data.couponCode }).session(session));
            if (coupon) {
                if (coupon.isUsageLimit === true) {
                    coupon.availableCount = Math.max(coupon.availableCount - 1, 0);
                    yield coupon.save({ session });
                }
            }
        }
        const orderData = Object.assign(Object.assign({}, data), { invoiceNumber, customer: customerId });
        const [result] = yield orderModel_1.Order.create([orderData], { session });
        yield session.commitTransaction();
        session.endSession();
        // Send SMS confirmation to customer (best-effort, do not block order creation)
        try {
            const rawPhone = ((_d = data === null || data === void 0 ? void 0 : data.customer) === null || _d === void 0 ? void 0 : _d.phone) || '';
            const normalizeBDPhone = (phone) => {
                const p = String(phone || '').replace(/\D/g, '');
                if (p.startsWith('880'))
                    return p;
                if (p.startsWith('0'))
                    return '88' + p;
                if (p.startsWith('1'))
                    return '880' + p;
                return p;
            };
            const customerPhone = normalizeBDPhone(rawPhone);
            if (customerPhone) {
                let message = `Thank you for your order with TorayvinoBD.\nInvoice: ${result.invoiceNumber}.\nTotal: ${result.totalPrice || ''}.`;
                if (!isExistCustomer) {
                    message += `\n\nYour login information:\nUser ID: ${rawPhone}\nPassword: ${rawPhone}`;
                }
                message += `\n\nVisit: ${process.env.FRONTEND_URL}`;
                const smsResult = yield (0, sendSMS_1.sendSMS)(customerPhone, message);
                // eslint-disable-next-line no-console
                console.log('order-confirmation-sms:', smsResult);
            }
        }
        catch (smsError) {
            // eslint-disable-next-line no-console
            console.error('Failed to send order confirmation SMS:', smsError);
        }
        // send email to admin
        try {
            const emailData = {
                customerName: (_e = data === null || data === void 0 ? void 0 : data.customer) === null || _e === void 0 ? void 0 : _e.name,
                customerPhone: (_f = data === null || data === void 0 ? void 0 : data.customer) === null || _f === void 0 ? void 0 : _f.phone,
                customerEmail: ((_g = data === null || data === void 0 ? void 0 : data.customer) === null || _g === void 0 ? void 0 : _g.email) || "",
                address: ((_h = data === null || data === void 0 ? void 0 : data.shippingInfo) === null || _h === void 0 ? void 0 : _h.address) || "",
                invoiceNumber: result.invoiceNumber,
                totalPrice: result.totalPrice,
                paymentMethod: result.paymentMethod,
                createdAt: new Date(),
            };
            yield (0, sendEmail_1.notificationForNewOrder)(emailData);
        }
        catch (emailError) {
            // eslint-disable-next-line no-console
            console.error('Failed to send order confirmation email:', emailError);
        }
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.addOrderService = addOrderService;
const getAllOrdersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseFilter = {};
    if ((query === null || query === void 0 ? void 0 : query.startDate) || (query === null || query === void 0 ? void 0 : query.endDate)) {
        baseFilter.createdAt = {};
        if (query.startDate) {
            const start = new Date(query.startDate);
            start.setHours(0, 0, 0, 0);
            baseFilter.createdAt.$gte = start;
        }
        if (query.endDate) {
            const end = new Date(query.endDate);
            end.setHours(23, 59, 59, 999);
            baseFilter.createdAt.$lte = end;
        }
    }
    if (query === null || query === void 0 ? void 0 : query.search) {
        const raw = String(query.search).trim();
        const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escaped = escapeRegex(raw);
        const regex = new RegExp(escaped, 'i');
        const matchingCustomers = yield customerModel_1.Customer.find({
            $or: [{ name: regex }, { phone: regex }],
        }).select('_id');
        const customerIds = (matchingCustomers || []).map((c) => c._id);
        const orCond = [{ invoiceNumber: regex }];
        if (customerIds.length) {
            orCond.push({ customer: { $in: customerIds } });
        }
        baseFilter.$or = orCond;
    }
    // Remove date params from query to prevent QueryBuilder from interfering
    const queryWithoutDates = Object.assign({}, query);
    delete queryWithoutDates.startDate;
    delete queryWithoutDates.endDate;
    const OrderQuery = new QueryBuilder_1.default(orderModel_1.Order.find(baseFilter)
        .populate('customer', 'name phone')
        .populate('products.productId', 'title thumbnail')
        .populate('kits.kitId', 'name image'), queryWithoutDates)
        // only search invoiceNumber here; customer matching handled above
        .search(['invoiceNumber'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OrderQuery.countTotal();
    const data = yield OrderQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllOrdersService = getAllOrdersService;
const getOrderByIdService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = { invoiceNumber: query };
    if (mongoose_1.default.Types.ObjectId.isValid(query)) {
        filter = { $or: [{ _id: query }, { invoiceNumber: query }] };
    }
    const order = yield orderModel_1.Order.findOne(filter)
        .populate('customer')
        .populate('products.productId')
        .populate('kits.kitId');
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
});
exports.getOrderByIdService = getOrderByIdService;
const searchOrderService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const rawSearch = (params === null || params === void 0 ? void 0 : params.search) ? String(params.search).trim() : '';
    const rawPhone = (params === null || params === void 0 ? void 0 : params.phone) ? String(params.phone).trim() : '';
    if (!rawSearch || !rawPhone) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Both invoice number (search) and phone are required.');
    }
    const matchingCustomers = yield customerModel_1.Customer.find({ phone: rawPhone }).select('_id');
    const customerIds = (matchingCustomers || []).map((c) => c._id);
    if (!customerIds.length)
        return null;
    const s = rawSearch;
    const orForSearch = [{ invoiceNumber: s }];
    if (mongoose_1.default.Types.ObjectId.isValid(s)) {
        orForSearch.push({ _id: s });
    }
    const finalQuery = {
        $and: [{ $or: orForSearch }, { customer: { $in: customerIds } }],
    };
    const order = yield orderModel_1.Order.findOne(finalQuery)
        .populate('customer')
        .populate('products.productId')
        .populate('kits.kitId');
    return order;
});
exports.searchOrderService = searchOrderService;
const getOrdersByCustomerIdService = (customerId, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(customerId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid customer ID');
    }
    const OrderQuery = new QueryBuilder_1.default(orderModel_1.Order.find({ customer: customerId })
        .populate('customer', 'name phone email')
        .populate('products.productId', 'title thumbnail')
        .populate('kits.kitId', 'name image'), query)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OrderQuery.countTotal();
    const data = yield OrderQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getOrdersByCustomerIdService = getOrdersByCustomerIdService;
const updateOrderStatusService = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(id);
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    // If changing to cancelled from a non-cancelled status, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // restore product stocks
            if (order.products && order.products.length > 0) {
                for (const p of order.products) {
                    yield restoreStock(p.productId, p.quantity, p.sku, session);
                }
            }
            // restore kit stocks
            if (order.kits && order.kits.length > 0) {
                for (const k of order.kits) {
                    yield restoreKitStock(k.kitId, k.quantity, session);
                }
            }
            const updated = yield orderModel_1.Order.findByIdAndUpdate(id, { status }, { new: true, session });
            yield session.commitTransaction();
            session.endSession();
            return updated;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    // Otherwise just update status normally
    const updatedOrder = yield orderModel_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    return updatedOrder;
});
exports.updateOrderStatusService = updateOrderStatusService;
const updateOrderStatusByCustomerService = (id, status, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(id);
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    if (order.customer.toString() !== customerId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this order');
    }
    if (status === 'cancelled' && order.status !== 'cancelled') {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            if (order.products && order.products.length > 0) {
                for (const p of order.products) {
                    yield restoreStock(p.productId, p.quantity, p.sku, session);
                }
            }
            if (order.kits && order.kits.length > 0) {
                for (const k of order.kits) {
                    yield restoreKitStock(k.kitId, k.quantity, session);
                }
            }
            const updated = yield orderModel_1.Order.findByIdAndUpdate(id, { status }, { new: true, session });
            yield session.commitTransaction();
            session.endSession();
            return updated;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    const updatedOrder = yield orderModel_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    return updatedOrder;
});
exports.updateOrderStatusByCustomerService = updateOrderStatusByCustomerService;
const deleteOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield orderModel_1.Order.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    yield orderModel_1.Order.findByIdAndDelete(id);
    return { message: 'Order deleted successfully' };
});
exports.deleteOrderService = deleteOrderService;
const exportOrdersService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, query, paginate } = options || {};
    let ordersQuery;
    if (ids && Array.isArray(ids) && ids.length > 0) {
        ordersQuery = orderModel_1.Order.find({ _id: { $in: ids } })
            .populate('customer', 'name phone email')
            .populate('products.productId', 'title thumbnail')
            .populate('kits.kitId', 'name image');
    }
    else {
        const qb = new QueryBuilder_1.default(orderModel_1.Order.find()
            .populate('customer', 'name phone email')
            .populate('products.productId', 'title thumbnail')
            .populate('kits.kitId', 'name image'), query || {})
            .search([])
            .filter()
            .sort()
            .fields();
        // If paginate flag or page/limit present in query, apply pagination to return only that page
        if (paginate || (query && (query.page || query.limit || query.paginate))) {
            qb.paginate();
        }
        ordersQuery = qb.modelQuery;
    }
    const orders = yield ordersQuery;
    const rows = (orders || []).map((order) => {
        var _a, _b, _c;
        const products = (order.products || [])
            .map((p) => { var _a; return `${((_a = p.productId) === null || _a === void 0 ? void 0 : _a.title) || ''} x ${p.quantity}`; })
            .join(' | ');
        const kits = (order.kits || [])
            .map((k) => { var _a; return `${((_a = k.kitId) === null || _a === void 0 ? void 0 : _a.name) || ''} x ${k.quantity}`; })
            .join(' | ');
        return {
            invoiceNumber: order.invoiceNumber,
            date: order.createdAt ? order.createdAt.toISOString() : '',
            customerName: ((_a = order.customer) === null || _a === void 0 ? void 0 : _a.name) || '',
            customerPhone: ((_b = order.customer) === null || _b === void 0 ? void 0 : _b.phone) || '',
            shippingAddress: ((_c = order.shippingInfo) === null || _c === void 0 ? void 0 : _c.address) || '',
            items: [products, kits].filter(Boolean).join(' || '),
            totalPrice: order.totalPrice,
            shippingCharge: order.shippingCharge,
            status: order.status,
            isPaid: order.isPaid,
            paymentMethod: order.paymentMethod,
            transactionId: order.transactionId || '',
        };
    });
    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const csv = xlsx.write(workbook, { bookType: 'csv', type: 'buffer' });
    return csv;
});
exports.exportOrdersService = exportOrdersService;
// Helper to obtain Pathao access token
function getPathaoAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authData = {
                client_id: process.env.PATHAO_API_CLIENT_ID,
                client_secret: process.env.PATHAO_API_CLIENT_SECRET,
                username: process.env.PATHAO_API_USERNAME,
                password: process.env.PATHAO_API_PASSWORD,
                grant_type: 'password',
            };
            const resp = yield fetch(`${process.env.PATHAO_API_BASE_URL}/aladdin/api/v1/issue-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(authData),
            });
            const result = yield resp.json();
            if (result === null || result === void 0 ? void 0 : result.access_token)
                return result.access_token;
            throw new Error((result === null || result === void 0 ? void 0 : result.error) || (result === null || result === void 0 ? void 0 : result.message) || 'Failed to get Pathao token');
        }
        catch (err) {
            throw new Error(`Pathao authentication failed: ${(err === null || err === void 0 ? void 0 : err.message) || err}`);
        }
    });
}
/**
 * Send bulk data to Steadfast (Packzy) and update local orders based on response.
 * Expects `payload` to be what the external API requires.
 */
const sendToSteadfastService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const steadfastApiKey = process.env.STEADFAST_API_KEY;
    const steadfastApiSecretKey = process.env.STEADFAST_API_SECRET_KEY;
    const response = yield fetch(`${process.env.STEADFAST_API_URL}/create_order/bulk-order`, {
        method: 'POST',
        headers: {
            'Api-Key': steadfastApiKey || '',
            'Secret-Key': steadfastApiSecretKey || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const result = yield response.json();
    if ((result === null || result === void 0 ? void 0 : result.status) !== 200) {
        return {
            success: false,
            message: 'Failed to send orders to Steadfast',
            result,
        };
    }
    const session = yield orderModel_1.Order.startSession();
    let successCount = 0;
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            for (const orderData of (result === null || result === void 0 ? void 0 : result.data) || []) {
                const order = yield orderModel_1.Order.findOne({
                    invoiceNumber: orderData === null || orderData === void 0 ? void 0 : orderData.invoice,
                }).session(session);
                if (order) {
                    order.status = 'shipped';
                    order.tracking_code = (orderData === null || orderData === void 0 ? void 0 : orderData.tracking_code) || order.tracking_code;
                    order.courierBy = 'Steadfast';
                    yield order.save({ session });
                    successCount++;
                }
            }
        }));
        yield session.endSession();
        return {
            success: true,
            message: `${successCount} orders sent successfully to Steadfast.`,
            processed: successCount,
        };
    }
    catch (err) {
        yield session.endSession();
        throw err;
    }
});
exports.sendToSteadfastService = sendToSteadfastService;
/**
 * Send orders to Pathao one-by-one and update orders locally based on API responses.
 * Expects `orders` as an array of order objects (from local DB or transformed payload).
 */
const sendToPathaoService = (orders) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const accessToken = yield getPathaoAccessToken();
    const results = [];
    let successCount = 0;
    let failedCount = 0;
    for (let i = 0; i < (orders || []).length; i++) {
        const order = orders[i];
        try {
            // Transform order into Pathao payload
            const pathaoOrder = {
                store_id: parseInt(process.env.PATHAO_STORE_ID || '1'),
                merchant_order_id: order.invoiceNumber,
                recipient_name: ((_a = order.user) === null || _a === void 0 ? void 0 : _a.name) || order.recipient_name || 'Customer',
                recipient_phone: ((_b = order.user) === null || _b === void 0 ? void 0 : _b.phone) || order.recipient_phone,
                recipient_address: order.recipient_address || ((_c = order.shippingInfo) === null || _c === void 0 ? void 0 : _c.address),
                delivery_type: parseInt(process.env.PATHAO_DELIVERY_TYPE || '48'),
                item_type: parseInt(process.env.PATHAO_ITEM_TYPE || '2'),
                special_instruction: order.special_instruction || ((_d = order.shippingInfo) === null || _d === void 0 ? void 0 : _d.note) || '',
                item_quantity: (order.products || []).reduce((sum, p) => sum + parseInt(p.quantity || 0), 0) || 1,
                item_weight: parseFloat(process.env.PATHAO_DEFAULT_WEIGHT || '0.5'),
                amount_to_collect: parseFloat(order.totalPrice || order.cod_amount || 0),
                item_description: (order.products || [])
                    .map((p) => { var _a; return `${((_a = p.productId) === null || _a === void 0 ? void 0 : _a.title) || p.title || 'Product'} ${p.sku ? '(' + p.sku + ')' : ''}`; })
                    .join(', ') || 'Order items',
            };
            const resp = yield fetch(`${process.env.PATHAO_API_BASE_URL}/aladdin/api/v1/orders`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(pathaoOrder),
            });
            const result = yield resp.json();
            if ((result === null || result === void 0 ? void 0 : result.code) === 200 && ((_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.consignment_id)) {
                const orderSession = yield orderModel_1.Order.startSession();
                try {
                    yield orderSession.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
                        var _a;
                        const dbOrder = yield orderModel_1.Order.findOne({
                            invoiceNumber: order.invoiceNumber,
                        }).session(orderSession);
                        if (dbOrder) {
                            dbOrder.status = 'shipped';
                            dbOrder.tracking_code =
                                ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.consignment_id) || dbOrder.tracking_code;
                            dbOrder.courierBy = 'Pathao';
                            yield dbOrder.save({ session: orderSession });
                        }
                    }));
                    yield orderSession.endSession();
                }
                catch (sessionErr) {
                    yield orderSession.endSession();
                    throw sessionErr;
                }
                successCount++;
                results.push({
                    invoiceNumber: order.invoiceNumber,
                    status: 'success',
                    consignment_id: result.data.consignment_id,
                });
            }
            else {
                failedCount++;
                results.push({
                    invoiceNumber: order.invoiceNumber,
                    status: 'failed',
                    message: (result === null || result === void 0 ? void 0 : result.message) || 'Failed to create order',
                    error: result,
                });
            }
        }
        catch (err) {
            failedCount++;
            results.push({
                invoiceNumber: order.invoiceNumber,
                status: 'error',
                message: err.message,
            });
        }
    }
    return {
        success: successCount > 0,
        message: `Processed ${orders.length} orders: ${successCount} successful, ${failedCount} failed.`,
        data: {
            total: orders.length,
            successful: successCount,
            failed: failedCount,
            results,
        },
    };
});
exports.sendToPathaoService = sendToPathaoService;
const getTodaysSalesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));
    const baseFilter = {
        createdAt: {
            $gte: start,
            $lte: end,
        },
        status: { $ne: 'cancelled' },
    };
    const OrderQuery = new QueryBuilder_1.default(orderModel_1.Order.find(baseFilter)
        .populate('customer', 'name phone email')
        .populate('products.productId', 'title thumbnail')
        .populate('kits.kitId', 'name image')
        .sort({ createdAt: -1 }), query)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OrderQuery.countTotal();
    const data = yield OrderQuery.modelQuery;
    // Calculate total sales for today
    const totalSaleAggregation = yield orderModel_1.Order.aggregate([
        {
            $match: baseFilter,
        },
        {
            $group: {
                _id: null,
                totalSale: { $sum: '$totalPrice' },
            },
        },
    ]);
    const totalSale = ((_a = totalSaleAggregation[0]) === null || _a === void 0 ? void 0 : _a.totalSale) || 0;
    return {
        meta,
        totalSale,
        data,
    };
});
exports.getTodaysSalesService = getTodaysSalesService;
const getAllSalesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const OrderQuery = new QueryBuilder_1.default(orderModel_1.Order.find({ status: { $ne: 'cancelled' } })
        .populate('customer', 'name phone email')
        .populate('products.productId', 'title thumbnail')
        .populate('kits.kitId', 'name image')
        .sort({ createdAt: -1 }), query)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OrderQuery.countTotal();
    const data = yield OrderQuery.modelQuery;
    // Calculate total sales for all orders (excluding cancelled)
    const totalSaleAggregation = yield orderModel_1.Order.aggregate([
        {
            $match: { status: { $ne: 'cancelled' } },
        },
        {
            $group: {
                _id: null,
                totalSale: { $sum: '$totalPrice' },
            },
        },
    ]);
    const totalSale = ((_a = totalSaleAggregation[0]) === null || _a === void 0 ? void 0 : _a.totalSale) || 0;
    return {
        meta,
        totalSale,
        data,
    };
});
exports.getAllSalesService = getAllSalesService;
