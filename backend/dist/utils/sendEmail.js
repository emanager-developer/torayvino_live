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
exports.notificationForNewOrder = exports.notificationForComplaintSubmit = exports.notificationForSupportSubmit = exports.notificationForWarrantyClaimSubmit = exports.sendEmailToLead = exports.verifyEmailSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const verifyEmailSend = (userMail, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'mamun.emanager@gmail.com',
            pass: process.env.EMAIL_PASS || 'qopu pvlc pkbi xpny',
        },
    });
    const info = yield transporter.sendMail({
        from: 'Torayvino BD', // sender address
        to: userMail, // list of receivers
        subject: 'Password Recover', // Subject line
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <h1 style="color: #333;">Verify Your Email</h1>

  <p style="color: #555; line-height: 1.6;">
    Welcome to Torayvino BD! To complete your verification, please use the code below.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <div style="display: inline-block; padding: 15px 30px; font-size: 28px; font-weight: bold; color: #333; background-color: #f4f4f4; border-radius: 8px; border: 1px solid #ccc; letter-spacing: 4px;">
      ${otp}
    </div>
  </div>

  <p style="color: #555; line-height: 1.6;">
    This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
  </p>

  <p style="color: #555; line-height: 1.6;">
    If you did not request this verification, you can safely ignore this email.
  </p>

  <p style="color: #555; line-height: 1.6;">
    Best regards,<br>
    <strong>Torayvino BD</strong>
  </p>
</div>
`, // html body
    });
    // eslint-disable-next-line no-console
    console.log(info);
});
exports.verifyEmailSend = verifyEmailSend;
// email to lead
const sendEmailToLead = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    yield transporter.sendMail({
        from: `"Torayvino BD Notification" <${process.env.EMAIL_USER}>`,
        to: Array.isArray(data.to) ? data.to.join(',') : data.to,
        subject: data.subject,
        text: '',
        html: data.body,
    });
});
exports.sendEmailToLead = sendEmailToLead;
const notificationForWarrantyClaimSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, device, problemCategory, problemDescription, } = data;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; 
  padding: 20px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">

    <h2 style="color: #2a2a2a; text-align: center;">🔔 New Warranty Claim Submitted</h2>

    <p style="color: #444; font-size: 15px;">
      A customer has submitted a warranty claim. Below are the details:
    </p>

    <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 10px;">
      <h3 style="margin-bottom: 8px; color: #222;">👤 Customer Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "Not Provided"}</p>

      <h3 style="margin: 15px 0 8px; color: #222;">📦 Product Details</h3>
      <p><strong>Product Name:</strong> ${device}</p>
      <p><strong>Problem Category:</strong> ${problemCategory}</p>
      <h3 style="margin: 15px 0 8px; color: #222;">⚠️ Issue Details</h3>
      <p>${problemDescription}</p>
    </div>

    <p style="color: #555; margin-top: 20px;">
      Please check the admin dashboard for more details.
    </p>

    <p style="margin-top: 20px; color: #333;">
      <strong>Torayvino BD System</strong>
    </p>

  </div>
  `;
    const info = yield transporter.sendMail({
        from: `"Torayvino BD Notification" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: "🔔 New Warranty Claim Submitted",
        html: htmlTemplate,
    });
    // eslint-disable-next-line no-console
    console.log("Warranty claim notification sent:", info.messageId);
});
exports.notificationForWarrantyClaimSubmit = notificationForWarrantyClaimSubmit;
const notificationForSupportSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, subject, message } = data;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;
  padding: 20px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">

    <h2 style="color: #2a2a2a; text-align: center;">📩 New Support Form Submitted.</h2>

    <p style="color: #444; font-size: 15px;">
      A customer has submitted a new support request. Details are below:
    </p>

    <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 10px;">
      
      <h3 style="margin-bottom: 8px; color: #222;">👤 Customer Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "Not Provided"}</p>

      <h3 style="margin: 15px 0 8px; color: #222;">📝 Support Details</h3>
      <p><strong>Subject:</strong> ${subject || "Not Provided"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background:#f8f8f8; padding:10px; border-radius:8px;">
        ${message}
      </p>
    </div>

    <p style="color: #555; margin-top: 20px;">
      Please log in to your admin dashboard to take action.
    </p>

    <p style="margin-top: 20px; color: #333;">
      <strong>Torayvino BD System</strong>
    </p>

  </div>
  `;
    const info = yield transporter.sendMail({
        from: `"Torayvino BD Notification" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: "📩 New Support Form Submission",
        html: htmlTemplate,
    });
    console.log("Support form notification sent:", info.messageId);
});
exports.notificationForSupportSubmit = notificationForSupportSubmit;
const notificationForComplaintSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, device, problemDescription } = data;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;
    padding: 20px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">

    <h2 style="color: #2a2a2a; text-align: center;">⚠️ New Complaint Submitted</h2>

    <p style="color: #444; font-size: 15px;">
      A customer has submitted a new complaint. Please review the details below:
    </p>

    <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 10px;">
      
      <h3 style="margin-bottom: 8px; color: #222;">👤 Customer Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "Not Provided"}</p>

      <h3 style="margin: 15px 0 8px; color: #222;">📦 Device Information</h3>
      <p><strong>Device:</strong> ${device}</p>

      <h3 style="margin: 15px 0 8px; color: #222;">🔧 Problem Description</h3>
      <p style="white-space: pre-wrap; background:#f8f8f8; padding:10px; border-radius:8px;">
        ${problemDescription}
      </p>

    </div>

    <p style="color: #555; margin-top: 20px;">
      Please log in to your admin dashboard to take necessary action.
    </p>

    <p style="margin-top: 20px; color: #333;">
      <strong>Torayvino BD System</strong>
    </p>

  </div>
  `;
    const info = yield transporter.sendMail({
        from: `"Torayvino BD Notification" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: "⚠️ New Complaint Submitted",
        html: htmlTemplate,
    });
    console.log("Complaint notification sent:", info.messageId);
});
exports.notificationForComplaintSubmit = notificationForComplaintSubmit;
// new order email to admin
const notificationForNewOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerName, customerPhone, customerEmail, address, invoiceNumber, totalPrice, paymentMethod, createdAt, } = order;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // Email Template
    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; 
    padding: 20px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">

      <h2 style="color: #222; text-align: center;">🛒 New Order Received</h2>

      <p style="color: #444; font-size: 15px;">
        A new order has been placed on Torayvino BD. Here are the details:
      </p>

      <!-- Customer Info -->
      <div style="margin: 20px 0; padding: 15px; background: #fff; border-radius: 10px;">
        <h3 style="color: #222;">👤 Customer Details</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Email:</strong> ${customerEmail || "Not Provided"}</p>
        <p><strong>Address:</strong> ${address}</p>
      </div>

      <!-- Order Summary -->
      <div style="margin: 20px 0; padding: 15px; background: #fff; border-radius: 10px;">
        <h3 style="color: #222;">📄 Order Summary</h3>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
        <p><strong>Total Price:</strong> ${totalPrice} TK</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      </div>


      <!-- Footer -->
      <p style="color: #555; margin-top: 20px;">
        Please check your dashboard for full order details.
      </p>

      <p style="margin-top: 20px; color: #333;">
        <strong>Torayvino BD System</strong>
      </p>
    </div>
  `;
    const info = yield transporter.sendMail({
        from: `"Torayvino BD Notification" <${process.env.NOTIFICATION_EMAIL}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: "🛒 New Order Placed",
        html: htmlTemplate,
    });
    // eslint-disable-next-line no-console
    console.log("Order notification sent:", info.messageId);
});
exports.notificationForNewOrder = notificationForNewOrder;
