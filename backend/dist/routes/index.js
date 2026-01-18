"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authRoute_1 = require("../modules/auth/authRoute");
const roleRoute_1 = require("../modules/role/roleRoute");
const userRoute_1 = require("../modules/user/userRoute");
const leadRoute_1 = require("../modules/lead/leadRoute");
const customerRoute_1 = require("../modules/customer/customerRoute");
const activityRoute_1 = require("../modules/activity/activityRoute");
const settingRoute_1 = require("../modules/setting/settingRoute");
const emailRoute_1 = require("../modules/email/emailRoute");
const smsConfigRoute_1 = require("../modules/smsConfig/smsConfigRoute");
const leadPurposeRoute_1 = require("../modules/leadPurpose/leadPurposeRoute");
const leadSourceRoute_1 = require("../modules/leadSource/leadSourceRoute");
const leadStatusRoute_1 = require("../modules/leadStatus/leadStatusRoute");
const taskRoute_1 = require("../modules/task/taskRoute");
const marketingTargetRoute_1 = require("../modules/marketingTarget/marketingTargetRoute");
const categoryRoute_1 = require("../modules/ecommerce/product/category/categoryRoute");
const subCategoryRoute_1 = require("../modules/ecommerce/product/subCategory/subCategoryRoute");
const subSubCategoryRoute_1 = require("../modules/ecommerce/product/subSubCategory/subSubCategoryRoute");
const brandRoute_1 = require("../modules/ecommerce/product/brand/brandRoute");
const colorRoute_1 = require("../modules/ecommerce/product/color/colorRoute");
const tagsRoute_1 = require("../modules/ecommerce/product/tags/tagsRoute");
const seoRoute_1 = require("../modules/ecommerce/seo/seoRoute");
const logoRoute_1 = require("../modules/ecommerce/logo/logoRoute");
const popupRoute_1 = require("../modules/ecommerce/popup/popupRoute");
const faviconRoute_1 = require("../modules/ecommerce/favicon/faviconRoute");
const aboutRoute_1 = require("../modules/ecommerce/about/aboutRoute");
const contactRoute_1 = require("../modules/ecommerce/contact/contactRoute");
const pageRoute_1 = require("../modules/ecommerce/page/pageRoute");
const companyInfoRoute_1 = require("../modules/ecommerce/companyInfo/companyInfoRoute");
const couponRoute_1 = require("../modules/ecommerce/coupon/couponRoute");
const shippingConfigRoute_1 = require("../modules/ecommerce/shippingConfig/shippingConfigRoute");
const serviceConfigRoute_1 = require("../modules/ecommerce/service/serviceConfigRoute");
const campaignBannerRoute_1 = require("../modules/ecommerce/campaignBanner/campaignBannerRoute");
const bannerRoute_1 = require("../modules/ecommerce/banner/bannerRoute");
const productRoute_1 = require("../modules/ecommerce/product/product/productRoute");
const orderRoute_1 = require("../modules/ecommerce/order/orderRoute");
const reviewRoute_1 = require("../modules/ecommerce/review/reviewRoute");
const whyChooseRoute_1 = require("../modules/ecommerce/whyChoose/whyChooseRoute");
const offerBannerRoute_1 = require("../modules/ecommerce/offers/offerBanner/offerBannerRoute");
const offerRoute_1 = require("../modules/ecommerce/offers/offers/offerRoute");
const featureRoute_1 = require("../modules/ecommerce/product/feature/featureRoute");
const shortFeatureRoute_1 = require("../modules/ecommerce/product/shortFeature/shortFeatureRoute");
const kitRoutes_1 = require("../modules/ecommerce/kit/kitRoutes");
const paymentRoute_1 = require("../modules/ecommerce/payment/paymentRoute");
const emiRoute_1 = require("../modules/ecommerce/emi/emiRoute");
const otpRoute_1 = require("../modules/otp/otpRoute");
const exploreRoute_1 = require("../modules/ecommerce/exploreVideo/exploreRoute");
const supportFormRoute_1 = require("../modules/ecommerce/support/supportFormRoute");
const complainFormRoute_1 = require("../modules/ecommerce/complaint/complainFormRoute");
const blogRoute_1 = require("../modules/ecommerce/blog/blogRoute");
const warrantyFormRoute_1 = require("../modules/ecommerce/warrantyClaim/warrantyFormRoute");
const flashDealRoute_1 = require("../modules/ecommerce/flashDeal/flashDealRoute");
const faqRoute_1 = require("../modules/ecommerce/faq/faqRoute");
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute_1.authRoute,
        permissionRoute: false,
    },
    {
        path: '/otp',
        route: otpRoute_1.OTPRoutes,
        permissionRoute: false,
    },
    {
        path: '/user',
        route: userRoute_1.userRoute,
        permissionRoute: true,
    },
    {
        path: '/role',
        route: roleRoute_1.roleRoute,
        permissionRoute: true,
    },
    {
        path: '/marketing-target',
        route: marketingTargetRoute_1.marketingTargetRoute,
        permissionRoute: true,
    },
    {
        path: '/lead',
        route: leadRoute_1.leadRoute,
        permissionRoute: true,
    },
    {
        path: '/leadPurpose',
        route: leadPurposeRoute_1.leadPurposeRoute,
        permissionRoute: true,
    },
    {
        path: '/leadSource',
        route: leadSourceRoute_1.leadSourceRoute,
        permissionRoute: true,
    },
    {
        path: '/leadStatus',
        route: leadStatusRoute_1.leadStatusRoute,
        permissionRoute: true,
    },
    {
        path: '/activity',
        route: activityRoute_1.activityRoute,
        permissionRoute: true,
    },
    {
        path: '/task',
        route: taskRoute_1.taskRoute,
        permissionRoute: true,
    },
    {
        path: '/customer',
        route: customerRoute_1.customerRoute,
        permissionRoute: true,
    },
    {
        path: '/setting',
        route: settingRoute_1.settingRoute,
        permissionRoute: true,
    },
    {
        path: '/email',
        route: emailRoute_1.emailRoute,
        permissionRoute: true,
    },
    {
        path: '/sms-config',
        route: smsConfigRoute_1.smsConfigRoute,
        permissionRoute: true,
    },
    // e-commerce
    {
        path: '/category',
        route: categoryRoute_1.categoryRoute,
        permissionRoute: true,
    },
    {
        path: '/subCategory',
        route: subCategoryRoute_1.subCategoryRoute,
        permissionRoute: true,
    },
    {
        path: '/subSubCategory',
        route: subSubCategoryRoute_1.subSubCategoryRoute,
        permissionRoute: true,
    },
    {
        path: '/brand',
        route: brandRoute_1.brandRoute,
        permissionRoute: true,
    },
    {
        path: '/color',
        route: colorRoute_1.colorRoute,
        permissionRoute: true,
    },
    {
        path: '/tags',
        route: tagsRoute_1.tagsRoute,
        permissionRoute: true,
    },
    {
        path: '/feature',
        route: featureRoute_1.featureRoute,
        permissionRoute: true,
    },
    {
        path: '/shortFeature',
        route: shortFeatureRoute_1.shortFeatureRoute,
        permissionRoute: true,
    },
    {
        path: '/kit',
        route: kitRoutes_1.kitRoutes,
        permissionRoute: true,
    },
    {
        path: '/product',
        route: productRoute_1.productRoute,
        permissionRoute: true,
    },
    {
        path: '/order',
        route: orderRoute_1.orderRoute,
        permissionRoute: true,
    },
    {
        path: '/payment',
        route: paymentRoute_1.PaymentRoutes,
        permissionRoute: true,
    },
    {
        path: '/emi',
        route: emiRoute_1.emiRoutes,
        permissionRoute: true,
    },
    {
        path: '/review',
        route: reviewRoute_1.reviewRoute,
        permissionRoute: true,
    },
    // offers
    {
        path: '/offer',
        route: offerRoute_1.offerRoute,
        permissionRoute: true,
    },
    {
        path: '/offerBanner',
        route: offerBannerRoute_1.offerBannerRoute,
        permissionRoute: true,
    },
    // frontend
    {
        path: '/logo',
        route: logoRoute_1.logoRoute,
        permissionRoute: true,
    },
    {
        path: '/popup',
        route: popupRoute_1.popupRoute,
        permissionRoute: true,
    },
    {
        path: '/favicon',
        route: faviconRoute_1.faviconRoute,
        permissionRoute: true,
    },
    {
        path: '/about',
        route: aboutRoute_1.aboutRoute,
        permissionRoute: true,
    },
    {
        path: '/contact',
        route: contactRoute_1.contactRoute,
        permissionRoute: true,
    },
    {
        path: '/page',
        route: pageRoute_1.pageRoute,
        permissionRoute: true,
    },
    {
        path: '/whyChoose',
        route: whyChooseRoute_1.whyChooseRoute,
        permissionRoute: true,
    },
    {
        path: '/companyInfo',
        route: companyInfoRoute_1.companyInfoRoute,
        permissionRoute: true,
    },
    // e-commerce setting
    {
        path: '/coupon',
        route: couponRoute_1.couponRoute,
        permissionRoute: true,
    },
    {
        path: '/shippingConfig',
        route: shippingConfigRoute_1.shippingConfigRoute,
        permissionRoute: true,
    },
    {
        path: '/serviceConfig',
        route: serviceConfigRoute_1.serviceConfigRoute,
        permissionRoute: true,
    },
    // banner
    {
        path: '/campaignBanner',
        route: campaignBannerRoute_1.campaignBannerRoute,
        permissionRoute: true,
    },
    {
        path: '/banner',
        route: bannerRoute_1.bannerRoute,
        permissionRoute: true,
    },
    // blog
    {
        path: '/blog',
        route: blogRoute_1.blogRoute,
        permissionRoute: true,
    },
    // seo setting
    {
        path: '/seo',
        route: seoRoute_1.seoRoute,
        permissionRoute: true,
    },
    {
        path: '/explore',
        route: exploreRoute_1.exploreRoute,
        permissionRoute: true,
    },
    {
        path: '/support',
        route: supportFormRoute_1.supportRoute,
        permissionRoute: true,
    },
    {
        path: '/complaint',
        route: complainFormRoute_1.complaintRoute,
        permissionRoute: true,
    },
    {
        path: '/warranty-claim',
        route: warrantyFormRoute_1.warrantyFormRoute,
        permissionRoute: true,
    },
    {
        path: '/flash-deal',
        route: flashDealRoute_1.flashDealRoute,
        permissionRoute: true,
    },
    {
        path: '/faq',
        route: faqRoute_1.faqRoutes,
        permissionRoute: false,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
router.get('/permission-routes/all', (req, res) => {
    const routes = moduleRoutes
        .filter((route) => route.permissionRoute)
        .map((route) => route.path.replace('/', ''));
    res.json({
        success: true,
        message: 'All routes get success',
        data: routes,
    });
});
exports.default = router;
